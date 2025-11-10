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
    <div className="flex flex-col h-[calc(100vh-200px)] max-h-[700px] glass-strong rounded-3xl shadow-2xl overflow-hidden border border-white/20 glow">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600/90 to-red-600/90 backdrop-blur-xl text-white px-6 py-4 flex items-center justify-between border-b border-orange-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 glass-strong rounded-full flex items-center justify-center backdrop-blur-sm border border-orange-400/40 glow-orange">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h2 className="font-bold text-lg">AI Assistant</h2>
            <p className="text-sm text-orange-100">
              {isLoading ? "Typing..." : "Online & Ready"}
            </p>
          </div>
        </div>

        {messages.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearChat}
            className="glass border-orange-300/40 text-white hover:glass-strong hover:scale-105 hover:border-orange-400/60"
          >
            🗑️ Clear
          </Button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 bg-black/20 custom-scrollbar backdrop-blur-sm">
        {showWelcome && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg glow">
              <span className="text-4xl">👋</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Welcome! Let's Chat
            </h3>
            <p className="text-gray-300 max-w-md mx-auto mb-8">
              I'm an AI assistant representing this candidate. Ask me anything
              about their experience, skills, projects, or availability!
            </p>

            {/* Suggested questions */}
            <div className="max-w-2xl mx-auto">
              <p className="text-sm font-medium text-gray-400 mb-3">
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
                    className="glass border border-orange-500/20 rounded-xl px-4 py-3 text-sm text-left hover:glass-strong hover:border-orange-500/50 transition-all text-gray-200 glow-hover"
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
        <div className="px-6 py-3 glass border-t border-white/10">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">
                Interested in connecting?
              </span>{" "}
              Share your details!
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={handleInterested}
              className="glow"
            >
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
      <div className="border-t border-white/10 px-6 py-4 glass backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here... (Shift + Enter for new line)"
            className="flex-1 resize-none glass border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400 bg-white/5"
            rows={1}
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={!inputValue.trim() || isLoading}
            className="self-end glow-hover"
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
