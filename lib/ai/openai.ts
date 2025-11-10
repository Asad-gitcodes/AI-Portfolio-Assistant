// lib/ai/openai.ts - OpenAI API integration

import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Please define OPENAI_API_KEY in your .env.local file');
}

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Model configurations
export const MODELS = {
  CHAT: 'gpt-4-turbo-preview', // or 'gpt-3.5-turbo' for lower cost
  EMBEDDING: 'text-embedding-3-small',
} as const;

/**
 * Generate chat completion with system context
 */
export async function generateChatCompletion(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  temperature: number = 0.7
): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: MODELS.CHAT,
      messages,
      temperature,
      max_tokens: 1000,
    });

    return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    throw new Error(`Failed to generate response: ${error.message}`);
  }
}

/**
 * Generate embeddings for text
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: MODELS.EMBEDDING,
      input: text,
    });

    return response.data[0].embedding;
  } catch (error: any) {
    console.error('OpenAI Embedding Error:', error);
    throw new Error(`Failed to generate embedding: ${error.message}`);
  }
}

/**
 * Generate embeddings for multiple texts (batch processing)
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  try {
    const response = await openai.embeddings.create({
      model: MODELS.EMBEDDING,
      input: texts,
    });

    return response.data.map(item => item.embedding);
  } catch (error: any) {
    console.error('OpenAI Batch Embedding Error:', error);
    throw new Error(`Failed to generate embeddings: ${error.message}`);
  }
}

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
  if (vectorA.length !== vectorB.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    magnitudeA += vectorA[i] * vectorA[i];
    magnitudeB += vectorB[i] * vectorB[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
}