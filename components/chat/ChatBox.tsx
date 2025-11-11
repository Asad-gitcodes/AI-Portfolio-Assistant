// components/chat/ChatBox.tsx - Main chat interface

"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@/lib/hooks/useChat";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import RecruiterForm from "./RecruiterForm";
import Button from "@/components/ui/Button";

export default function ChatBox({ onClose }: { onClose?: () => void }) {
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
    <div className="flex flex-col h-full glass-strong rounded-3xl shadow-2xl overflow-hidden border-2 border-orange-500/30 glow">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600/95 to-red-600/95 backdrop-blur-xl text-white px-4 md:px-6 py-3 md:py-4 flex items-center justify-between border-b-2 border-orange-500/40">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 glass-strong rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-orange-400/50 glow-orange">
            <span className="text-xl md:text-2xl">🤖</span>
          </div>
          <div>
            <h2 className="font-bold text-base md:text-lg">AI Assistant</h2>
            <p className="text-xs md:text-sm text-orange-100">
              {isLoading ? "Typing..." : "Online & Ready"}
            </p>
          </div>
        </div>

        {messages.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearChat}
            className="glass border-orange-300/50 text-white hover:glass-strong hover:scale-105 hover:border-orange-400/70 text-xs md:text-sm"
          >
            🗑️ <span className="hidden sm:inline">Clear</span>
          </Button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 md:py-6 bg-black/20 custom-scrollbar backdrop-blur-sm">
        {showWelcome && (
          <div className="text-center py-8 md:py-12 animate-fade-in">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg glow">
              <span className="text-3xl md:text-4xl">👋</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 px-4">
              Welcome! Let's Chat
            </h3>
            <p className="text-sm md:text-base text-gray-300 max-w-md mx-auto mb-6 md:mb-8 px-4">
              I'm an AI assistant representing this candidate. Ask me anything
              about their experience, skills, projects, or availability!
            </p>

            {/* Suggested questions */}
            <div className="max-w-2xl mx-auto px-4">
              <p className="text-xs md:text-sm font-medium text-gray-400 mb-2 md:mb-3">
                Try asking:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                {[
                  "What's your experience with AI/ML?",
                  "Tell me about your recent projects",
                  "What are your salary expectations?",
                  "Are you open to remote work?",
                ].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(question)}
                    className="glass border border-orange-500/20 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-left hover:glass-strong hover:border-orange-500/50 transition-all text-gray-200 glow-hover"
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
        <div className="px-6 py-4 glass border-t-2 border-orange-500/30 bg-gradient-to-b from-transparent to-orange-500/5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center glow-orange">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Interested in connecting?
                </p>
                <p className="text-xs text-gray-400">
                  Share your details to get in touch!
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handleInterested}
              className="glow shadow-xl whitespace-nowrap"
            >
              Let's Connect 🚀
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
      <div className="border-t-2 border-orange-500/30 px-3 md:px-6 py-3 md:py-4 glass backdrop-blur-xl bg-gradient-to-b from-transparent to-black/10">
        <form onSubmit={handleSubmit} className="flex gap-2 md:gap-3">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 resize-none glass border-2 border-orange-500/30 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500/60 outline-none transition-all text-white placeholder-gray-400 bg-black/20 text-sm md:text-base"
            rows={1}
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={!inputValue.trim() || isLoading}
            className="self-end glow-hover shadow-lg px-3 md:px-6"
          >
            {isLoading ? (
              <span className="text-lg md:text-xl">⏳</span>
            ) : (
              <span className="text-lg md:text-xl">📤</span>
            )}
          </Button>
        </form>
        <p className="text-[10px] md:text-xs text-gray-400 mt-1.5 md:mt-2 text-center hidden sm:block">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
