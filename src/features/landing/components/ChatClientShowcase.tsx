import React from 'react';
import { MessageSquare, Zap, Users, Lock, Sparkles, MoreHorizontal, MessageCircle } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';

export function ChatClientShowcase() {
  return (
    <section className="w-full flex flex-col lg:flex-row gap-xl py-section px-lg lg:px-xl">
      {/* Left: Chat Mockup */}
      <div className="flex-1 flex justify-center lg:justify-end">
        <div className="w-full max-w-[600px] bg-canvas border border-hairline rounded-lg overflow-hidden flex h-[450px] shadow-sm">
          {/* Sidebar */}
          <div className="w-[200px] border-r border-hairline bg-surface flex flex-col hidden sm:flex">
            <div className="p-md border-b border-hairline flex items-center gap-sm">
              <div className="w-6 h-6 bg-ink rounded-sm flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-canvas" />
              </div>
              <span className="text-body font-bold text-ink tracking-tight">Chat</span>
            </div>
            <div className="p-sm">
              <Button variant="secondary" className="w-full justify-start text-body-sm h-8 px-sm">
                + New Chat
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto px-sm py-xs flex flex-col gap-[2px]">
              {['Project planning', 'Code review', 'Writing assistant'].map((chat, i) => (
                <div key={i} className="flex items-center gap-xs px-sm py-[6px] rounded-sm hover:bg-surface-sunken cursor-pointer">
                  <span className={`w-2 h-2 rounded-full ${i===0 ? 'bg-chart-teal' : i===1 ? 'bg-chart-purple' : 'bg-chart-pink'}`} />
                  <span className="text-body-sm text-ink truncate">{chat}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Main Panel */}
          <div className="flex-1 flex flex-col bg-canvas relative">
            {/* Topbar */}
            <div className="h-[56px] border-b border-hairline flex items-center justify-between px-md">
              <div className="flex items-center gap-sm">
                <span className="text-body-sm font-medium text-ink">allam-2-7b:free</span>
                <Badge variant="free" label="Free" />
              </div>
              <Button variant="icon-circular" icon={MoreHorizontal} size="sm" className="w-8 h-8 border-transparent hover:bg-surface" />
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 p-md flex flex-col gap-md overflow-y-auto">
              <div className="flex justify-end">
                <div className="bg-ink text-canvas rounded-lg rounded-tr-sm px-md py-sm max-w-[80%] text-body-sm">
                  Write a function to throttle API requests.
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-surface border border-hairline text-ink rounded-lg rounded-tl-sm px-md py-sm max-w-[85%] text-body-sm">
                  Here is a simple implementation of a throttle function in TypeScript...
                </div>
              </div>
              
              <div className="flex justify-start mt-xs">
                 <button className="px-sm py-[4px] rounded-full border border-hairline bg-surface hover:bg-surface-sunken text-body-sm text-ink text-[12px] transition-colors">
                   Explain the logic
                 </button>
              </div>
            </div>
            
            {/* Input Area */}
            <div className="p-md pt-0">
              <div className="w-full bg-surface-sunken border border-hairline rounded-sm h-[44px] flex items-center px-md text-subtle text-body-sm">
                Type a message...
              </div>
              <div className="flex justify-end mt-xs pr-xs">
                <span className="text-label text-subtle">95 IN / 142 OUT</span>
              </div>
            </div>
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
          <Button variant="primary" icon={MessageSquare}>
            OPEN CHAT
          </Button>
          <Button variant="secondary">
            CONNECT YOUR CLIENT
          </Button>
        </div>
      </div>
    </section>
  );
}
