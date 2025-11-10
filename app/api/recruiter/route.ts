import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getCollection, COLLECTIONS } from '@/lib/db/mongodb';
import { sendRecruiterNotification } from '@/lib/email/mailer';
import { RecruiterSubmission, Message } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: RecruiterSubmission = await request.json();
    const { name, company, email, role, message, sessionId } = body;

    // Validate required fields
    if (!name || !company || !email || !role || !sessionId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'Name, company, email, role, and sessionId are required',
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
          message: 'Please provide a valid email address',
        },
        { status: 400 }
      );
    }

    // Get client IP and user agent for metadata
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Retrieve chat transcript for this session
    const chatMessagesCollection = await getCollection(COLLECTIONS.CHAT_MESSAGES);
    const chatHistory = await chatMessagesCollection
      .find({ sessionId })
      .sort({ timestamp: 1 })
      .toArray();

    // Format chat transcript
    const chatTranscript: Message[] = chatHistory.map((msg: any) => ({
      id: msg._id.toString(),
      role: msg.role,
      content: msg.content,
      timestamp: msg.timestamp,
    }));

    // Save recruiter information to database
    const recruitersCollection = await getCollection(COLLECTIONS.RECRUITERS);
    
    const recruiterData = {
      name,
      company,
      email,
      role,
      message: message || '',
      chatTranscript: chatTranscript.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
      })),
      metadata: {
        ip,
        userAgent,
        sessionId,
      },
      createdAt: new Date(),
      status: 'new',
    };

    const result = await recruitersCollection.insertOne(recruiterData);
    const recruiterId = result.insertedId.toString();

    // Send email notification (non-blocking)
    sendRecruiterNotification(
      { name, company, email, role, message },
      chatTranscript
    ).catch(error => {
      console.error('Failed to send email notification:', error);
    });

    // Update chat messages with recruiter ID
    await chatMessagesCollection.updateMany(
      { sessionId },
      { $set: { recruiterId } }
    );

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        recruiterId,
        message: 'Thank you! Your information has been submitted successfully.',
      },
    });

  } catch (error: any) {
    console.error('Recruiter Submission Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit recruiter information',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const recruiterId = searchParams.get('id');

    const recruitersCollection = await getCollection(COLLECTIONS.RECRUITERS);

    if (recruiterId) {
      const recruiter = await recruitersCollection.findOne({
        _id: new ObjectId(recruiterId),
      });

      if (!recruiter) {
        return NextResponse.json(
          { success: false, error: 'Recruiter not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: recruiter,
      });
    } else {
      const recruiters = await recruitersCollection
        .find({})
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();

      return NextResponse.json({
        success: true,
        data: {
          count: recruiters.length,
          recruiters,
        },
      });
    }

  } catch (error: any) {
    console.error('Get Recruiter Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve recruiter information',
        message: error.message,
      },
      { status: 500 }
    );
  }
}