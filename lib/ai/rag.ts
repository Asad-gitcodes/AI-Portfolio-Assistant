// lib/ai/rag.ts - Retrieval-Augmented Generation system (FIXED VERSION)

import { Profile, EmbeddingChunk, RetrievalResult } from '@/types';
import { generateEmbedding, cosineSimilarity } from './openai';
import { getCollection, COLLECTIONS } from '../db/mongodb';
import profileData from '@/data/profile.json';

/**
 * Prepare profile data into searchable text chunks (with safe array handling)
 */
export function prepareProfileChunks(profile: Profile): string[] {
  const chunks: string[] = [];

  // Helper function to safely join arrays
  const safeJoin = (arr: any[] | undefined, separator: string = ', '): string => {
    return Array.isArray(arr) && arr.length > 0 ? arr.join(separator) : '';
  };

  // Personal info
  if (profile.personal) {
    chunks.push(
      `Name: ${profile.personal.name}. Title: ${profile.personal.title}. ${profile.personal.bio}`
    );
  }

  // Skills - Programming
  if (profile.skills?.programming && Array.isArray(profile.skills.programming)) {
    profile.skills.programming.forEach(skill => {
      chunks.push(
        `${skill.name}: ${skill.proficiency} level with ${skill.yearsOfExperience} years of experience. ${skill.description}`
      );
    });
  }

  // Skills - AI/ML
  if (profile.skills?.aiMachineLearning && Array.isArray(profile.skills.aiMachineLearning)) {
    profile.skills.aiMachineLearning.forEach(category => {
      const technologies = safeJoin(category.technologies);
      const expertise = safeJoin(category.expertise);
      if (technologies || expertise) {
        chunks.push(
          `${category.category} expertise: ${technologies}. Specializing in: ${expertise}`
        );
      }
    });
  }

  // Skills - Cloud & DevOps
  if (profile.skills?.cloudDevOps && Array.isArray(profile.skills.cloudDevOps)) {
    profile.skills.cloudDevOps.forEach(category => {
      const technologies = safeJoin(category.technologies);
      if (technologies) {
        chunks.push(`${category.category}: ${technologies}`);
      }
    });
  }

  // Skills - Frameworks
  if (profile.skills?.frameworks && Array.isArray(profile.skills.frameworks)) {
    const frameworks = safeJoin(profile.skills.frameworks);
    if (frameworks) {
      chunks.push(`Frameworks and libraries: ${frameworks}`);
    }
  }

  // Experience
  if (profile.experience && Array.isArray(profile.experience)) {
    profile.experience.forEach(exp => {
      const achievements = safeJoin(exp.achievements, '. ');
      const technologies = safeJoin(exp.technologies);
      chunks.push(
        `${exp.role} at ${exp.company} (${exp.duration}). ${exp.description}. ${achievements ? 'Key achievements: ' + achievements : ''}. Technologies: ${technologies}`
      );
    });
  }

  // Projects
  if (profile.projects && Array.isArray(profile.projects)) {
    profile.projects.forEach(project => {
      const technologies = safeJoin(project.technologies);
      const highlights = safeJoin(project.highlights, '. ');
      chunks.push(
        `Project: ${project.name}. ${project.description}. Technologies: ${technologies}. ${highlights ? 'Highlights: ' + highlights : ''}`
      );
    });
  }

  // Education
  if (profile.education && Array.isArray(profile.education)) {
    profile.education.forEach(edu => {
      const highlights = safeJoin(edu.highlights, '. ');
      chunks.push(
        `${edu.degree} from ${edu.institution} (${edu.duration}). ${highlights}`
      );
    });
  }

  // Certifications
  if (profile.certifications && Array.isArray(profile.certifications)) {
    profile.certifications.forEach(cert => {
      chunks.push(
        `Certification: ${cert.name} from ${cert.issuer} (${cert.year})`
      );
    });
  }

  // FAQs
  if (profile.faqs && Array.isArray(profile.faqs)) {
    profile.faqs.forEach(faq => {
      chunks.push(`Q: ${faq.question} A: ${faq.answer}`);
    });
  }

  // Work preferences
  if (profile.workPreferences) {
    const industries = safeJoin(profile.workPreferences.preferredIndustries);
    chunks.push(
      `Work preferences: ${profile.workPreferences.workStyle}. ${industries ? 'Preferred industries: ' + industries + '.' : ''} Salary expectation: ${profile.workPreferences.salaryExpectation}`
    );
  }

  // Achievements
  if (profile.achievements && Array.isArray(profile.achievements)) {
    const achievements = safeJoin(profile.achievements, '. ');
    if (achievements) {
      chunks.push(`Notable achievements: ${achievements}`);
    }
  }

  // Interests
  if (profile.interests && Array.isArray(profile.interests)) {
    const interests = safeJoin(profile.interests);
    if (interests) {
      chunks.push(`Professional interests: ${interests}`);
    }
  }

  return chunks;
}

/**
 * Generate and store embeddings for profile data
 * Call this once during setup or when profile is updated
 */
export async function generateProfileEmbeddings(): Promise<void> {
  try {
    console.log('📄 Generating profile embeddings...');
    
    const profile = profileData as Profile;
    const chunks = prepareProfileChunks(profile);
    
    if (chunks.length === 0) {
      throw new Error('No profile data found to generate embeddings');
    }
    
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
  if (text.includes('Certification:')) return 'certifications';
  if (text.startsWith('Q:')) return 'faqs';
  if (text.includes('Work preferences:')) return 'work_preferences';
  if (text.includes('Notable achievements:')) return 'achievements';
  if (text.includes('Professional interests:')) return 'interests';
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