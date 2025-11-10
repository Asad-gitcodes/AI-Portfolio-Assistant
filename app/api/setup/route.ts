// app/api/setup/route.ts - Setup and utility endpoint

import { NextRequest, NextResponse } from 'next/server';
import { generateProfileEmbeddings } from '@/lib/ai/rag';
import { testConnection } from '@/lib/db/mongodb';
import { testEmailConfiguration } from '@/lib/email/mailer';

/**
 * POST: Generate embeddings for profile data
 * Call this once after setting up the project or when profile data changes
 */
export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Starting setup process...');

    // Generate embeddings
    await generateProfileEmbeddings();

    return NextResponse.json({
      success: true,
      message: 'Setup completed successfully! Embeddings generated.',
    });

  } catch (error: any) {
    console.error('❌ Setup Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Setup failed',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

/**
 * GET: Test all connections (database, email, etc.)
 */
export async function GET(request: NextRequest) {
  try {
    const results = {
      database: false,
      email: false,
      timestamp: new Date().toISOString(),
    };

    // Test MongoDB connection
    try {
      results.database = await testConnection();
    } catch (error) {
      console.error('Database test failed:', error);
    }

    // Test Email configuration
    try {
      results.email = await testEmailConfiguration();
    } catch (error) {
      console.error('Email test failed:', error);
    }

    const allPassed = results.database && results.email;

    return NextResponse.json({
      success: allPassed,
      message: allPassed 
        ? 'All systems operational!' 
        : 'Some systems need attention',
      results,
    });

  } catch (error: any) {
    console.error('❌ Health Check Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Health check failed',
        message: error.message,
      },
      { status: 500 }
    );
  }
}