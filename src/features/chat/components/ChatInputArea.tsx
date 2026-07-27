import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';

interface ChatInputAreaProps {
  input: string;
  setInput: (v: string) => void;
  handleSend: () => void;
  isTyping: boolean;
  selectedModelId: string;
  selectedModelName: string;
}

export function ChatInputArea({
  input,
  setInput,
  handleSend,
  isTyping,
  selectedModelId,
  selectedModelName
}: ChatInputAreaProps) {
  return (
    <form 
      onSubmit={(e) => { e.preventDefault(); handleSend(); }}
      className="p-md border-t border-hairline bg-canvas flex flex-col gap-xs"
    >
      <div className="w-full bg-surface-sunken border border-hairline rounded-sm min-h-[48px] flex items-center px-sm gap-sm">
        <input
          type="text"
          placeholder={`Ask ${selectedModelName}... (Press Enter to send)`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-body text-ink placeholder:text-muted font-sans"
        />
        <Button type="submit" variant="primary" icon={Send} disabled={!input.trim() || isTyping}>
          Send
        </Button>
      </div>
      <div className="flex justify-between items-center px-xs text-label font-mono text-subtle">
        <span className="flex items-center gap-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-live" /> Router Active: {selectedModelId}
        </span>
        <span>System Prompt Armed</span>
      </div>
    </form>
  );
}
