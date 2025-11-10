// components/chat/ChatBox.tsx - Main chat interface

"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@/lib/hooks/useChat";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import RecruiterForm from "./RecruiterForm";
import Button from "@/components/ui/Button";

export default function ChatBox() {
  const { messages, isLoading, sessionId, sendMessage, clearChat } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [showRecruiterForm, setShowRecruiterForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInterested = () => {
    setShowRecruiterForm(true);
  };

  const handleFormSubmitted = () => {
    setShowRecruiterForm(false);
  };

  // Show welcome message if no messages
  const showWelcome = messages.length === 0;

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-h-[800px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h2 className="font-bold text-lg">AI Portfolio Assistant</h2>
            <p className="text-sm text-blue-100">
              {isLoading ? "Typing..." : "Online"}
            </p>
          </div>
        </div>

        {messages.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearChat}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            Clear Chat
          </Button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50">
        {showWelcome && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-4xl">👋</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Welcome! I'm here to help.
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              I'm an AI assistant representing this candidate. Ask me anything
              about their experience, skills, projects, or availability!
            </p>

            {/* Suggested questions */}
            <div className="max-w-2xl mx-auto">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Try asking:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "What's your experience with AI/ML?",
                  "Tell me about your recent projects",
                  "What are your salary expectations?",
                  "Are you open to remote work?",
                ].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(question)}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-left hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    💬 {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Interested Button (shows after some conversation) */}
      {messages.length >= 4 && !showRecruiterForm && (
        <div className="px-6 py-3 bg-blue-50 border-t border-blue-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Interested in connecting?</span>{" "}
              Share your details!
            </p>
            <Button variant="primary" size="sm" onClick={handleInterested}>
              I'm Interested 🎯
            </Button>
          </div>
        </div>
      )}

      {/* Recruiter Form Modal */}
      {showRecruiterForm && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50 overflow-y-auto">
          <div className="relative max-w-2xl w-full my-8">
            <button
              onClick={() => setShowRecruiterForm(false)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:scale-110 transition-transform z-10"
            >
              ✕
            </button>
            <RecruiterForm
              sessionId={sessionId}
              onSubmit={handleFormSubmitted}
            />
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 px-6 py-4 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here... (Shift + Enter for new line)"
            className="flex-1 resize-none border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            rows={1}
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={!inputValue.trim() || isLoading}
            className="self-end"
          >
            {isLoading ? (
              <span className="text-xl">⏳</span>
            ) : (
              <span className="text-xl">📤</span>
            )}
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
