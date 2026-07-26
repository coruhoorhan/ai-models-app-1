import React, { useState } from 'react';
import { MoreHorizontal, Send } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';
import { cn } from '../../../shared/lib/cn';
import { ChatMockupSidebar } from './ChatMockupSidebar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMockup() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'user', content: 'Write a throttle function' },
    { role: 'assistant', content: 'Here is a clean implementation of a throttle function in TypeScript...\n\nfunction throttle() { ... }' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isTyping) return;
    
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let responseText = "Router processed request via allam-2-7b:free. Latency: 142ms.";
      if (text.toLowerCase().includes('explain')) {
        responseText = "Throttling limits execution rate to prevent overloading API endpoints.";
      }
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="w-full lg:max-w-xl bg-canvas border border-hairline rounded-lg overflow-hidden flex min-h-[460px] shadow-sm">
      <ChatMockupSidebar onReset={() => setMessages([
        { role: 'user', content: 'Write a throttle function' },
        { role: 'assistant', content: 'Here is a clean implementation...' }
      ])} />

      <div className="flex-1 flex flex-col bg-canvas">
        <div className="h-14 border-b border-hairline bg-surface/50 flex items-center justify-between px-md">
          <div className="flex items-center gap-sm">
            <span className="text-body-sm font-medium text-ink">allam-2-7b:free</span>
            <Badge variant="free" label="Free" />
          </div>
          <Button variant="icon-circular" icon={MoreHorizontal} size="sm" className="w-8 h-8 border-transparent hover:bg-surface" />
        </div>
        
        <div className="flex-1 p-md flex flex-col gap-sm overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={cn(
                "px-md py-sm rounded-lg max-w-[85%] text-body-sm whitespace-pre-wrap",
                msg.role === 'user' 
                  ? 'bg-ink text-canvas rounded-tr-sm' 
                  : 'bg-surface border border-hairline text-ink rounded-tl-sm font-mono'
              )}>
                {msg.content}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-surface border border-hairline text-muted rounded-lg rounded-tl-sm px-md py-sm text-body-sm flex items-center gap-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-chart-blue animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-chart-teal animate-pulse delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-chart-pink animate-pulse delay-200" />
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-xs mt-xs flex-wrap">
             <button
                onClick={() => handleSend("Explain the logic in detail")}
               className="px-sm py-xxs rounded-full border border-hairline bg-surface hover:bg-surface-sunken text-body-sm text-ink transition-colors"
             >
               Explain the logic
             </button>
             <button
                onClick={() => handleSend("Which model is fastest?")}
               className="px-sm py-xxs rounded-full border border-hairline bg-surface hover:bg-surface-sunken text-body-sm text-ink transition-colors"
             >
               Which model is fastest?
             </button>
          </div>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-md pt-xs border-t border-hairline bg-canvas">
          <div className="w-full bg-surface-sunken border border-hairline rounded-sm h-10 flex items-center px-sm gap-xs">
            <input
              type="text"
              placeholder="Type a message to test..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-body-sm text-ink placeholder:text-muted"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="w-7 h-7 rounded-sm bg-ink text-canvas flex items-center justify-center disabled:opacity-30 hover:opacity-90 transition-opacity"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex justify-between items-center mt-xs px-xs">
            <span className="text-label text-live font-mono flex items-center gap-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-live" /> Router Active
            </span>
            <span className="text-label text-subtle">LIVE DEMO</span>
          </div>
        </form>
      </div>
    </div>
  );
}
