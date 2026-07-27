import React, { useState } from 'react';
import { Copy, Check, Sparkles, User, Zap, Clock } from 'lucide-react';
import { ChatMessage } from '../types';
import { Badge } from '../../../shared/ui/Badge';

interface ChatMessageItemProps {
  message: ChatMessage;
}

export function ChatMessageItem({ message }: ChatMessageItemProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col gap-xs ${isUser ? 'items-end' : 'items-start'} animate-in fade-in duration-150`}>
      {/* Header Info */}
      <div className="flex items-center gap-xs px-xs">
        {isUser ? (
          <>
            <span className="text-label font-medium text-muted">You</span>
            <div className="w-4 h-4 rounded-full bg-ink text-canvas flex items-center justify-center text-[9px] font-bold">
              U
            </div>
          </>
        ) : (
          <>
            <div className="w-4 h-4 rounded-full bg-live text-canvas flex items-center justify-center text-[9px] font-bold">
              <Sparkles className="w-2.5 h-2.5" />
            </div>
            <span className="text-label font-bold text-ink">{message.modelName || 'OpenRouter LLM'}</span>
            {message.tokensPerSec && (
              <span className="text-label font-mono text-chart-teal flex items-center gap-xxs">
                <Zap className="w-2.5 h-2.5" /> {message.tokensPerSec} t/s
              </span>
            )}
            {message.latencyMs && (
              <span className="text-label font-mono text-muted flex items-center gap-xxs">
                <Clock className="w-2.5 h-2.5" /> {message.latencyMs}ms
              </span>
            )}
          </>
        )}
      </div>

      {/* Message Box */}
      <div className={`relative group max-w-[90%] md:max-w-[80%] p-md rounded-md ${
        isUser 
          ? 'bg-ink text-canvas rounded-tr-xs shadow-xs' 
          : 'bg-surface border border-hairline text-ink rounded-tl-xs shadow-xs'
      }`}>
        <div className="text-body-sm whitespace-pre-wrap font-sans leading-relaxed">
          {message.content}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={`absolute top-2 right-2 p-xs rounded-xs opacity-0 group-hover:opacity-100 transition-opacity ${
            isUser ? 'bg-canvas/20 text-canvas hover:bg-canvas/30' : 'bg-canvas border border-hairline text-muted hover:text-ink'
          }`}
          title="Copy message text"
        >
          {copied ? <Check className="w-3 h-3 text-live" /> : <Copy className="w-3 h-3" />}
        </button>

        {/* Token Footer */}
        {!isUser && message.tokensUsed && (
          <div className="mt-xs pt-xs border-t border-hairline/50 flex justify-between items-center text-label font-mono text-subtle">
            <span>Tokens: {message.tokensUsed}</span>
            <span>{message.timestamp}</span>
          </div>
        )}
      </div>
    </div>
  );
}
