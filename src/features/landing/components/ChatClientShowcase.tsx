import React, { useState } from 'react';
import { MessageSquare, Zap, Users, Lock, Sparkles, MoreHorizontal, MessageCircle, Send } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';
import { useNavigate } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatClientShowcase() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'user', content: 'Write a function to throttle API requests.' },
    { role: 'assistant', content: 'Here is a clean implementation of a throttle function in TypeScript:\n\nfunction throttle<T extends (...args: any[]) => any>(fn: T, limit: number) {\n  let inThrottle: boolean;\n  return function(this: any, ...args: Parameters<T>) {\n    if (!inThrottle) {\n      fn.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isTyping) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let responseText = "Router processed request via allam-2-7b:free. Latency: 142ms. Zero configuration required!";
      if (text.toLowerCase().includes('explain')) {
        responseText = "Throttling limits the execution rate of a function so it executes at most once every specified time interval. It prevents overloading API endpoints under burst conditions.";
      } else if (text.toLowerCase().includes('model') || text.toLowerCase().includes('route')) {
        responseText = "OpenRouter dynamically routes your request to the lowest-latency active provider for optimum throughput and uptime.";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <section className="w-full flex flex-col lg:flex-row gap-xl py-section px-lg lg:px-xl">
      {/* Left: Interactive Chat Mockup */}
      <div className="flex-1 flex justify-center lg:justify-end">
        <div className="w-full max-w-[600px] bg-canvas border border-hairline rounded-lg overflow-hidden flex h-[460px] shadow-sm">
          {/* Sidebar */}
          <div className="w-[200px] border-r border-hairline bg-surface flex flex-col hidden sm:flex">
            <div className="p-md border-b border-hairline flex items-center gap-sm">
              <div className="w-6 h-6 bg-ink rounded-sm flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-canvas" />
              </div>
              <span className="text-body font-bold text-ink tracking-tight">Chat Sandbox</span>
            </div>
            <div className="p-sm">
              <Button 
                variant="secondary" 
                className="w-full justify-start text-body-sm h-8 px-sm"
                onClick={() => setMessages([
                  { role: 'user', content: 'Write a function to throttle API requests.' },
                  { role: 'assistant', content: 'Here is a clean implementation of a throttle function in TypeScript...' }
                ])}
              >
                + Reset Chat
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto px-sm py-xs flex flex-col gap-[2px]">
              {[
                { name: 'Throttle request', active: true, color: 'bg-chart-teal' },
                { name: 'Model benchmarking', active: false, color: 'bg-chart-purple' },
                { name: 'Code optimization', active: false, color: 'bg-chart-pink' }
              ].map((chat, i) => (
                <div key={i} className={`flex items-center gap-xs px-sm py-[6px] rounded-sm cursor-pointer transition-colors ${chat.active ? 'bg-surface-sunken' : 'hover:bg-surface-sunken'}`}>
                  <span className={`w-2 h-2 rounded-full ${chat.color}`} />
                  <span className="text-body-sm text-ink truncate">{chat.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Main Panel */}
          <div className="flex-1 flex flex-col bg-canvas relative">
            {/* Topbar */}
            <div className="h-[52px] border-b border-hairline flex items-center justify-between px-md shrink-0">
              <div className="flex items-center gap-sm">
                <span className="text-body-sm font-medium text-ink">allam-2-7b:free</span>
                <Badge variant="free" label="Free" />
              </div>
              <Button variant="icon-circular" icon={MoreHorizontal} size="sm" className="w-8 h-8 border-transparent hover:bg-surface" />
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 p-md flex flex-col gap-sm overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-md py-sm rounded-lg max-w-[85%] text-body-sm whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-ink text-canvas rounded-tr-sm' 
                      : 'bg-surface border border-hairline text-ink rounded-tl-sm font-mono text-[13px]'
                  }`}>
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
                   className="px-sm py-[4px] rounded-full border border-hairline bg-surface hover:bg-surface-sunken text-body-sm text-ink text-[12px] transition-colors"
                 >
                   Explain the logic
                 </button>
                 <button 
                   onClick={() => handleSend("Which model is fastest?")}
                   className="px-sm py-[4px] rounded-full border border-hairline bg-surface hover:bg-surface-sunken text-body-sm text-ink text-[12px] transition-colors"
                 >
                   Which model is fastest?
                 </button>
              </div>
            </div>
            
            {/* Input Area */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-md pt-xs border-t border-hairline bg-canvas">
              <div className="w-full bg-surface-sunken border border-hairline rounded-sm h-[40px] flex items-center px-sm gap-xs">
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
                <span className="text-[11px] text-live font-mono flex items-center gap-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-live" /> Router Active
                </span>
                <span className="text-label text-subtle">LIVE DEMO</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right: Copy & Features */}
      <div className="flex-1 flex flex-col items-start justify-center">
        <div className="flex items-center gap-xs px-sm py-[4px] bg-canvas border border-chart-blue text-chart-blue rounded-full mb-md">
          <MessageCircle className="w-3 h-3" />
          <span className="text-label text-chart-blue">BUILT-IN CHAT</span>
        </div>
        
        <h2 className="text-heading-lg mb-lg">
          <span className="text-ink block">Not just an API.</span>
          <span className="text-chart-blue block">A chat client too.</span>
        </h2>
        
        <div className="grid grid-cols-2 gap-md w-full max-w-[500px] mb-xl">
          <div className="flex items-center gap-sm">
            <Zap className="w-5 h-5 text-chart-blue" />
            <span className="text-body font-medium text-ink">No Setup</span>
          </div>
          <div className="flex items-center gap-sm">
            <Users className="w-5 h-5 text-chart-green" />
            <span className="text-body font-medium text-ink">Characters</span>
          </div>
          <div className="flex items-center gap-sm">
            <Lock className="w-5 h-5 text-chart-blue" />
            <span className="text-body font-medium text-ink">Private & BYOK</span>
          </div>
          <div className="flex items-center gap-sm">
            <Sparkles className="w-5 h-5 text-chart-pink" />
            <span className="text-body font-medium text-ink">Character Chat</span>
          </div>
        </div>
        
        <div className="flex items-center gap-md">
          <Button variant="primary" icon={MessageSquare} onClick={() => navigate('/chat')}>
            LAUNCH CHAT STUDIO
          </Button>
          <Button variant="secondary" onClick={() => navigate('/models')}>
            EXPLORE MODELS
          </Button>
        </div>
      </div>
    </section>
  );
}

