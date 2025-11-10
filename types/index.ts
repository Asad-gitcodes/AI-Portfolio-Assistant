// types/index.ts - All TypeScript type definitions

// ============================================
// Profile Types
// ============================================

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  yearsOfExperience: number;
  currentRole: string;
  availability: string;
  preferredRoles: string[];
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  phone?: string;
}

export interface Skill {
  name: string;
  proficiency: string;
  yearsOfExperience: number;
  description: string;
}

export interface AIMLCategory {
  category: string;
  technologies: string[];
  expertise: string[];
}

export interface CloudDevOpsCategory {
  category: string;
  technologies: string[];
}

export interface Skills {
  programming: Skill[];
  aiMachineLearning: AIMLCategory[];
  cloudDevOps: CloudDevOpsCategory[];
  frameworks: string[];
  tools: string[];
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export interface Project {
  name: string;
  description: string;
  role: string;
  duration: string;
  technologies: string[];
  highlights: string[];
  links: {
    live?: string;
    github?: string;
  };
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  duration: string;
  location: string;
  gpa?: string;
  honors?: string;
  highlights?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

export interface Publication {
  title: string;
  venue: string;
  year: string;
  link?: string;
}

export interface WorkPreferences {
  workStyle: string;
  preferredIndustries: string[];
  companySize: string;
  willingToRelocate: boolean;
  visaSponsorship: string;
  salaryExpectation: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Metadata {
  lastUpdated: string;
  version: string;
  visibility: string;
}

export interface Profile {
  personal: PersonalInfo;
  contact: ContactInfo;
  skills: Skills;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  publications?: Publication[];
  achievements: string[];
  interests: string[];
  workPreferences: WorkPreferences;
  faqs: FAQ[];
  metadata: Metadata;
}

// ============================================
// Chat Types
// ============================================

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    model?: string;
    tokens?: number;
    retrievedContext?: string[];
  };
}

export interface ChatSession {
  sessionId: string;
  messages: Message[];
  recruiterId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Recruiter Types
// ============================================

export interface RecruiterInfo {
  name: string;
  company: string;
  email: string;
  role: string;
  message?: string;
}

export interface Recruiter {
  _id?: string;
  name: string;
  company: string;
  email: string;
  role: string;
  message?: string;
  chatTranscript: Message[];
  metadata: {
    ip?: string;
    userAgent?: string;
    sessionId: string;
  };
  createdAt: Date;
  status: 'new' | 'contacted' | 'interested' | 'not-interested';
}

// ============================================
// API Request/Response Types
// ============================================

export interface ChatRequest {
  message: string;
  sessionId: string;
  recruiterId?: string;
}

export interface ChatResponse {
  message: string;
  sessionId: string;
  timestamp: Date;
  error?: string;
}

export interface RecruiterSubmission {
  name: string;
  company: string;
  email: string;
  role: string;
  message?: string;
  sessionId: string;
}

export interface RecruiterResponse {
  success: boolean;
  recruiterId?: string;
  message: string;
  error?: string;
}

// ============================================
// RAG (Retrieval-Augmented Generation) Types
// ============================================

export interface EmbeddingChunk {
  text: string;
  embedding: number[];
  metadata: {
    section: string;
    type: string;
  };
}

export interface RetrievalResult {
  text: string;
  score: number;
  metadata: {
    section: string;
    type: string;
  };
}

// ============================================
// Database Types
// ============================================

export interface DBRecruiter {
  name: string;
  company: string;
  email: string;
  role: string;
  message?: string;
  chatTranscript: {
    role: string;
    content: string;
    timestamp: Date;
  }[];
  metadata: {
    ip?: string;
    userAgent?: string;
    sessionId: string;
  };
  createdAt: Date;
  status: string;
}

export interface DBChatMessage {
  sessionId: string;
  recruiterId?: string;
  role: string;
  content: string;
  timestamp: Date;
  metadata?: {
    model?: string;
    tokens?: number;
    retrievedContext?: string[];
  };
}

// ============================================
// Email Types
// ============================================

export interface EmailNotification {
  to: string;
  subject: string;
  recruiterInfo: RecruiterInfo;
  chatTranscript: Message[];
}

// ============================================
// Utility Types
// ============================================

export interface APIError {
  error: string;
  message: string;
  statusCode: number;
}

export interface SuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
}

export type APIResponse<T = any> = SuccessResponse<T> | ErrorResponse;