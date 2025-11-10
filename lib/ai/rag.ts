// lib/ai/rag.ts - Retrieval-Augmented Generation system

import { Profile, EmbeddingChunk, RetrievalResult } from '@/types';
import { generateEmbedding, cosineSimilarity } from './openai';
import { getCollection, COLLECTIONS } from '../db/mongodb';
import profileData from '@/data/profile.json';

/**
 * Prepare profile data into searchable text chunks
 */
export function prepareProfileChunks(profile: Profile): string[] {
  const chunks: string[] = [];

  // Personal info
  chunks.push(
    `Name: ${profile.personal.name}. Title: ${profile.personal.title}. ${profile.personal.bio}`
  );

  // Skills - Programming
  profile.skills.programming.forEach(skill => {
    chunks.push(
      `${skill.name}: ${skill.proficiency} level with ${skill.yearsOfExperience} years of experience. ${skill.description}`
    );
  });

  // Skills - AI/ML
  profile.skills.aiMachineLearning.forEach(category => {
    chunks.push(
      `${category.category} expertise: ${category.technologies.join(', ')}. Specializing in: ${category.expertise.join(', ')}`
    );
  });

  // Experience
  profile.experience.forEach(exp => {
    chunks.push(
      `${exp.role} at ${exp.company} (${exp.duration}). ${exp.description}. Key achievements: ${exp.achievements.join('. ')}`
    );
  });

  // Projects
  profile.projects.forEach(project => {
    chunks.push(
      `Project: ${project.name}. ${project.description}. Technologies: ${project.technologies.join(', ')}. Highlights: ${project.highlights.join('. ')}`
    );
  });

  // Education
  profile.education.forEach(edu => {
    chunks.push(
      `${edu.degree} from ${edu.institution} (${edu.duration}). ${edu.highlights ? edu.highlights.join('. ') : ''}`
    );
  });

  // FAQs
  profile.faqs.forEach(faq => {
    chunks.push(`Q: ${faq.question} A: ${faq.answer}`);
  });

  // Work preferences
  chunks.push(
    `Work preferences: ${profile.workPreferences.workStyle}. Preferred industries: ${profile.workPreferences.preferredIndustries.join(', ')}. Salary expectation: ${profile.workPreferences.salaryExpectation}`
  );

  return chunks;
}

/**
 * Generate and store embeddings for profile data
 * Call this once during setup or when profile is updated
 */
export async function generateProfileEmbeddings(): Promise<void> {
  try {
    console.log('🔄 Generating profile embeddings...');
    
    const profile = profileData as Profile;
    const chunks = prepareProfileChunks(profile);
    
    const embeddingsCollection = await getCollection(COLLECTIONS.EMBEDDINGS);
    
    // Clear existing embeddings
    await embeddingsCollection.deleteMany({});
    
    // Generate embeddings for each chunk
    for (let i = 0; i < chunks.length; i++) {
      const text = chunks[i];
      const embedding = await generateEmbedding(text);
      
      await embeddingsCollection.insertOne({
        text,
        embedding,
        metadata: {
          section: determineSectionType(text),
          type: 'profile',
        },
        createdAt: new Date(),
      });
      
      console.log(`✅ Generated embedding ${i + 1}/${chunks.length}`);
    }
    
    console.log('✨ Profile embeddings generated successfully!');
  } catch (error) {
    console.error('❌ Error generating embeddings:', error);
    throw error;
  }
}

/**
 * Determine which section of the profile a chunk belongs to
 */
function determineSectionType(text: string): string {
  if (text.includes('Name:') || text.includes('Title:')) return 'personal';
  if (text.includes('level with') && text.includes('years of experience')) return 'skills';
  if (text.includes('at') && text.includes('Key achievements:')) return 'experience';
  if (text.includes('Project:')) return 'projects';
  if (text.includes('from') && text.includes('degree')) return 'education';
  if (text.startsWith('Q:')) return 'faqs';
  if (text.includes('Work preferences:')) return 'work_preferences';
  return 'other';
}

/**
 * Retrieve relevant context for a user query using RAG
 */
export async function retrieveRelevantContext(
  query: string,
  topK: number = 3
): Promise<RetrievalResult[]> {
  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);
    
    // Get all embeddings from database
    const embeddingsCollection = await getCollection(COLLECTIONS.EMBEDDINGS);
    const allEmbeddings = await embeddingsCollection.find({}).toArray();
    
    if (allEmbeddings.length === 0) {
      console.warn('⚠️ No embeddings found. Run generateProfileEmbeddings() first.');
      return [];
    }
    
    // Calculate similarity scores
    const results = allEmbeddings.map(item => ({
      text: item.text,
      score: cosineSimilarity(queryEmbedding, item.embedding),
      metadata: item.metadata,
    }));
    
    // Sort by similarity score (descending) and take top K
    results.sort((a, b) => b.score - a.score);
    
    return results.slice(0, topK);
  } catch (error) {
    console.error('❌ Error retrieving context:', error);
    return [];
  }
}

/**
 * Build the context string from retrieval results
 */
export function buildContextString(results: RetrievalResult[]): string {
  if (results.length === 0) {
    return 'No specific context available.';
  }
  
  return results
    .map((result, index) => `[Context ${index + 1}]: ${result.text}`)
    .join('\n\n');
}

/**
 * Create a system prompt with retrieved context
 */
export function createSystemPrompt(context: string): string {
  const profile = profileData as Profile;
  
  return `You are an AI assistant representing ${profile.personal.name}, a ${profile.personal.title}.

Your role is to professionally represent ${profile.personal.name.split(' ')[0]} to recruiters and answer questions about their background, skills, experience, and career goals.

IMPORTANT GUIDELINES:
1. Always respond in first person as if you ARE ${profile.personal.name.split(' ')[0]}
2. Be professional, friendly, and enthusiastic
3. Highlight relevant skills and experiences based on the recruiter's questions
4. If you don't know something, say "I'd be happy to discuss that in more detail during a call"
5. Keep responses concise but informative (2-4 sentences usually)
6. Show personality - be authentic and engaging
7. End with a call-to-action when appropriate (e.g., "Would you like to discuss this role further?")

RELEVANT CONTEXT FROM PROFILE:
${context}

Remember: You're helping to make a great first impression and facilitate meaningful conversations with recruiters!`;
}

/**
 * Main RAG function: Get AI response with relevant context
 */
export async function getRAGResponse(userMessage: string): Promise<{
  response: string;
  retrievedContext: string[];
}> {
  try {
    // Retrieve relevant context
    const retrievalResults = await retrieveRelevantContext(userMessage, 3);
    const contextString = buildContextString(retrievalResults);
    
    // Create system prompt with context
    const systemPrompt = createSystemPrompt(contextString);
    
    // This will be used in the chat API endpoint
    // We return both the prompt and the retrieved texts for transparency
    return {
      response: systemPrompt,
      retrievedContext: retrievalResults.map(r => r.text),
    };
  } catch (error) {
    console.error('❌ Error in RAG:', error);
    throw error;
  }
}