import React from 'react';
import { ChatMessage } from '../types';
import { ChatMessageItem } from './ChatMessageItem';

interface ChatMessagesListProps {
  messages: ChatMessage[];
  isTyping: boolean;
}

export function ChatMessagesList({ messages, isTyping }: ChatMessagesListProps) {
  return (
    <div className="flex-1 p-lg flex flex-col gap-md overflow-y-auto">
      {messages.map((msg) => (
        <ChatMessageItem key={msg.id} message={msg} />
      ))}
      
      {isTyping && (
        <div className="flex items-center gap-xs p-md bg-surface border border-hairline rounded-md max-w-[200px]">
          <span className="w-2 h-2 rounded-full bg-chart-blue animate-pulse" />
          <span className="w-2 h-2 rounded-full bg-chart-teal animate-pulse delay-100" />
          <span className="w-2 h-2 rounded-full bg-chart-pink animate-pulse delay-200" />
          <span className="text-body-sm text-muted font-mono ml-xs">Streaming...</span>
        </div>
      )}
    </div>
  );
}
