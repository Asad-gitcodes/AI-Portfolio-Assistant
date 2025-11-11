// components/chat/FloatingChatButton.tsx - Floating button to open chat

"use client";

import React, { useState } from "react";
import ChatBox from "./ChatBox";

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  // Close on ESC key press
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 glass-strong p-3 md:p-6 rounded-xl md:rounded-2xl border-2 border-orange-500/40 hover:border-orange-500/60 transition-all duration-300 glow-orange hover:scale-105 group animate-fade-in shadow-2xl"
        >
          <div className="flex items-center gap-2 md:gap-4">
            {/* Avatar Icon */}
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg md:rounded-xl flex items-center justify-center animate-pulse-glow">
              <span className="text-xl md:text-2xl">🤖</span>
            </div>

            {/* Text - Hidden on small mobile */}
            <div className="text-left hidden sm:block">
              <p className="text-white font-bold text-sm md:text-lg mb-0.5">
                Chat with AI
              </p>
              <p className="text-orange-300 text-xs md:text-sm">
                Ask me anything!
              </p>
            </div>

            {/* Pulse indicator */}
            <div className="relative">
              <span className="flex h-2.5 w-2.5 md:h-3 md:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-orange-500"></span>
              </span>
            </div>
          </div>
        </button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/70 backdrop-blur-md animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          {/* Close button - positioned better */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-14 md:h-14 glass-strong rounded-full flex items-center justify-center text-white hover:text-orange-400 transition-all hover:scale-110 hover:rotate-90 border-2 border-white/20 hover:border-orange-500/60 z-10 shadow-xl"
            aria-label="Close chat"
          >
            <svg
              className="w-5 h-5 md:w-7 md:h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          {/* Chat Container - Better centered and sized */}
          <div
            className="w-full max-w-4xl mx-auto animate-fade-in h-[90vh] sm:h-[85vh] md:h-auto"
            style={{
              animationDelay: "0.1s",
              maxHeight: "min(700px, 80vh)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ChatBox onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
