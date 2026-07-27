import React from 'react';
import { MessageSquare, Zap, Users, Lock, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ChatMockup } from './ChatMockup';

export function ChatClientShowcase() {
  const navigate = useNavigate();
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-xl py-xl px-md lg:px-xl max-w-[1440px] mx-auto items-center">
      {/* Left: Interactive Chat Mockup */}
      <div className="w-full min-w-0 flex justify-center lg:justify-end">
        <div className="w-full max-w-2xl lg:max-w-xl">
          <ChatMockup />
        </div>
      </div>

      {/* Right: Copy & Features */}
      <div className="w-full min-w-0 flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="flex items-center gap-xs px-sm py-xxs bg-canvas border border-chart-blue text-chart-blue rounded-full mb-md">
          <MessageCircle className="w-3 h-3" />
          <span className="text-label text-chart-blue">BUILT-IN CHAT</span>
        </div>
        
        <h2 className="text-heading-lg mb-lg">
          <span className="text-ink block">Not just an API.</span>
          <span className="text-chart-blue block">A chat client too.</span>
        </h2>
        
        <div className="grid grid-cols-2 gap-md w-full max-w-md mb-xl">
          <div className="flex items-center justify-center lg:justify-start gap-sm">
            <Zap className="w-5 h-5 shrink-0 text-chart-blue" />
            <span className="text-body font-medium text-ink">No Setup</span>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-sm">
            <Users className="w-5 h-5 shrink-0 text-chart-green" />
            <span className="text-body font-medium text-ink">Characters</span>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-sm">
            <Lock className="w-5 h-5 shrink-0 text-chart-blue" />
            <span className="text-body font-medium text-ink">Private &amp; BYOK</span>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-sm">
            <Sparkles className="w-5 h-5 shrink-0 text-chart-pink" />
            <span className="text-body font-medium text-ink">Character Chat</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-md">
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
