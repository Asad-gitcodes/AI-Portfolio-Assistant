// app/api/contact/route.ts - API route to save contact form submissions to MongoDB

import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = 'portfolio';
const COLLECTION_NAME = 'contacts';

// Create MongoDB client
let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await connectToDatabase();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Create contact document
    const contactDocument = {
      name,
      email,
      message,
      submittedAt: new Date(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      status: 'new', // new, read, replied
    };

    // Insert into database
    const result = await collection.insertOne(contactDocument);

    // Optional: Send email notification
    // await sendEmailNotification(contactDocument);

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      id: result.insertedId,
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve contacts (admin only)
export async function GET(request: Request) {
  try {
    // TODO: Add authentication check here
    const client = await connectToDatabase();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Get all contacts, sorted by newest first
    const contacts = await collection
      .find({})
      .sort({ submittedAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({
      success: true,
      contacts,
    });

  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}