// components/chat/TypingIndicator.tsx - Shows when AI is typing

import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex gap-3 max-w-[80%]">
        {/* Avatar */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
          <span className="text-white font-semibold text-sm">🤖</span>
        </div>

        {/* Typing animation */}
        <div className="bg-gray-100 border border-gray-200 rounded-2xl px-6 py-4 flex items-center gap-1.5">
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
