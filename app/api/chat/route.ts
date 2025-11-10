// app/api/chat/route.ts - Chat API endpoint

import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getRAGResponse } from '@/lib/ai/rag';
import { generateChatCompletion } from '@/lib/ai/openai';
import { getCollection, COLLECTIONS } from '@/lib/db/mongodb';
import { ChatRequest, Message } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ChatRequest = await request.json();
    const { message, sessionId, recruiterId } = body;

    // Validate input
    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Get RAG context for the user's message
    const { response: systemPrompt, retrievedContext } = await getRAGResponse(message);

    // Get chat history for this session
    const chatMessagesCollection = await getCollection(COLLECTIONS.CHAT_MESSAGES);
    const previousMessages = await chatMessagesCollection
      .find({ sessionId })
      .sort({ timestamp: 1 })
      .limit(10) // Keep last 10 messages for context
      .toArray();

    // Build messages array for OpenAI
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: systemPrompt },
    ];

    // Add previous conversation history
    previousMessages.forEach((msg: any) => {
      if (msg.role === 'user' || msg.role === 'assistant') {
        messages.push({
          role: msg.role,
          content: msg.content,
        });
      }
    });

    // Add current user message
    messages.push({
      role: 'user',
      content: message,
    });

    // Generate AI response
    const aiResponse = await generateChatCompletion(messages);

    // Save user message to database
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    await chatMessagesCollection.insertOne({
      sessionId,
      recruiterId: recruiterId || null,
      role: 'user',
      content: message,
      timestamp: new Date(),
      metadata: {
        retrievedContext,
      },
    });

    // Save AI response to database
    const assistantMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
      metadata: {
        model: 'gpt-4-turbo-preview',
        retrievedContext,
      },
    };

    await chatMessagesCollection.insertOne({
      sessionId,
      recruiterId: recruiterId || null,
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
      metadata: {
        model: 'gpt-4-turbo-preview',
        retrievedContext,
      },
    });

    // Return response
    return NextResponse.json({
      success: true,
      data: {
        message: aiResponse,
        sessionId,
        timestamp: new Date(),
      },
    });

  } catch (error: any) {
    console.error('❌ Chat API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process chat message',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve chat history
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve chat history
    const chatMessagesCollection = await getCollection(COLLECTIONS.CHAT_MESSAGES);
    const messages = await chatMessagesCollection
      .find({ sessionId })
      .sort({ timestamp: 1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: {
        sessionId,
        messages: messages.map((msg: any) => ({
          id: msg._id.toString(),
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp,
        })),
      },
    });

  } catch (error: any) {
    console.error('❌ Get Chat History Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve chat history',
        message: error.message,
      },
      { status: 500 }
    );
  }
}