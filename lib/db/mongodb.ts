// lib/db/mongodb.ts - MongoDB connection utility

import { MongoClient, Db, Document } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env.local file');
}

if (!process.env.MONGODB_DB_NAME) {
  throw new Error('Please define MONGODB_DB_NAME in your .env.local file');
}

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;

// Connection options for better performance and reliability
const options = {
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Use global variable in development to preserve connection across hot reloads
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to preserve the connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new connection
  client = new MongoClient(MONGODB_URI, options);
  clientPromise = client.connect();
}

/**
 * Get MongoDB database instance
 */
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(MONGODB_DB_NAME);
}

/**
 * Get a specific collection from the database
 */
export async function getCollection<T extends Document = Document>(collectionName: string) {
  const db = await getDatabase();
  return db.collection<T>(collectionName);
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const client = await clientPromise;
    await client.db('admin').command({ ping: 1 });
    console.log('✅ MongoDB connection successful');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    return false;
  }
}

// Collection names (centralized for consistency)
export const COLLECTIONS = {
  RECRUITERS: 'recruiters',
  CHAT_MESSAGES: 'chat_messages',
  EMBEDDINGS: 'embeddings',
} as const;

export default clientPromise;