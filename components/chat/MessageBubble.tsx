// components/chat/MessageBubble.tsx - Individual message display

"use client";

import React from "react";
import { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-3 md:mb-4 animate-fade-in`}
    >
      <div
        className={`flex gap-2 md:gap-3 max-w-[85%] md:max-w-[80%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
            isUser
              ? "bg-gradient-to-br from-blue-500 to-purple-600"
              : "bg-gradient-to-br from-green-400 to-blue-500"
          }`}
        >
          <span className="text-white font-semibold text-xs md:text-sm">
            {isUser ? "👤" : "🤖"}
          </span>
        </div>

        {/* Message Content */}
        <div
          className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
        >
          <div
            className={`rounded-xl md:rounded-2xl px-3 md:px-4 py-2 md:py-3 ${
              isUser
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "bg-gray-100 text-gray-800 border border-gray-200"
            }`}
          >
            <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>

          {/* Timestamp */}
          <span className="text-[10px] md:text-xs text-gray-500 mt-1 px-1">
            {new Date(message.timestamp).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
