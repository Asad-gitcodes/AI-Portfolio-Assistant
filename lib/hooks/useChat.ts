// lib/hooks/useChat.ts - Custom hook for chat functionality

import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/types';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Initialize session ID on mount
  useEffect(() => {
    // Check if session ID exists in sessionStorage
    let existingSessionId = sessionStorage.getItem('chatSessionId');
    
    if (!existingSessionId) {
      existingSessionId = uuidv4();
      sessionStorage.setItem('chatSessionId', existingSessionId);
    }
    
    setSessionId(existingSessionId);
  }, []);

  // Send a message
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !sessionId) return;

    setIsLoading(true);
    setError(null);

    // Add user message immediately
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // Call chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content.trim(),
          sessionId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to get response');
      }

      // Add AI response
      const aiMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: data.data.message,
        timestamp: new Date(data.data.timestamp),
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (err: any) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message');
      
      // Add error message to chat
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  // Clear chat
  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    // Generate new session ID
    const newSessionId = uuidv4();
    sessionStorage.setItem('chatSessionId', newSessionId);
    setSessionId(newSessionId);
  }, []);

  return {
    messages,
    isLoading,
    sessionId,
    error,
    sendMessage,
    clearChat,
  };
}