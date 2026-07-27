import React from 'react';
import { MessageSquare, Zap, Users, Lock, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/ui/Card';

export function ChatClientShowcase() {
  const navigate = useNavigate();
  return (
    <section className="w-full max-w-[1440px] mx-auto py-xl px-md lg:px-xl">
      <div className="flex flex-col items-center text-center mb-xl">
        <div className="flex items-center gap-xs px-sm py-xxs bg-canvas border border-chart-blue text-chart-blue rounded-full mb-md">
          <MessageCircle className="w-3 h-3" />
          <span className="text-label text-chart-blue">BUILT-IN CHAT</span>
        </div>
        <h2 className="text-heading-lg mb-sm">
          <span className="text-ink">Not just an API. </span>
          <span className="text-chart-blue">A chat client too.</span>
        </h2>
        <p className="text-body text-muted max-w-2xl">
          Instantly chat with over 250+ AI models using our built-in Sandbox. No configuration required, fully private, and supports character-based roleplay out of the box.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md w-full max-w-[1200px] mx-auto">
        {/* Big Bento Item 1 */}
        <Card className="p-xl flex flex-col md:col-span-2 lg:col-span-2 min-h-[320px] relative overflow-hidden group">
           <div className="relative z-10">
             <Zap className="w-8 h-8 text-chart-blue mb-md" />
             <h3 className="text-heading-md text-ink mb-sm">Zero Setup Required</h3>
             <p className="text-body text-muted max-w-sm">Jump straight into testing prompts. Choose any model from the dropdown and start typing. We handle the context and API routing seamlessly behind the scenes.</p>
           </div>
           {/* Decorative UI */}
           <div className="absolute -right-4 -bottom-4 w-2/3 h-2/3 rounded-tl-xl border-t border-l border-hairline bg-surface/80 p-md flex flex-col gap-sm shadow-sm transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2">
              <div className="w-3/4 h-8 bg-canvas rounded-md border border-hairline flex items-center px-xs">
                <div className="w-2 h-2 rounded-full bg-chart-blue animate-pulse"></div>
              </div>
              <div className="w-full h-12 bg-canvas rounded-md border border-hairline flex items-center px-sm gap-sm">
                 <div className="w-6 h-6 rounded-full bg-chart-purple/20 flex-shrink-0"></div>
                 <div className="w-1/2 h-2 bg-surface-sunken rounded-full"></div>
              </div>
              <div className="w-5/6 h-12 bg-canvas rounded-md border border-hairline flex items-center px-sm gap-sm self-end">
                 <div className="w-3/4 h-2 bg-surface-sunken rounded-full"></div>
                 <div className="w-6 h-6 rounded-full bg-chart-blue/20 flex-shrink-0"></div>
              </div>
           </div>
        </Card>

        {/* Small Bento Item 2 */}
        <Card className="p-xl flex flex-col min-h-[320px] group">
           <Lock className="w-8 h-8 text-chart-purple mb-md" />
           <h3 className="text-heading-md text-ink mb-sm">Private & BYOK</h3>
           <p className="text-body text-muted">
             Your chats are entirely local. We don't store your logs. Use your own API keys for ultimate privacy and direct billing.
           </p>
           <div className="mt-auto pt-md border-t border-hairline">
             <Button variant="secondary" className="w-full justify-between border-transparent bg-surface hover:bg-surface-sunken">
                <span className="text-body-sm font-medium">Bring Your Own Key</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
             </Button>
           </div>
        </Card>

        {/* Small Bento Item 3 */}
        <Card className="p-xl flex flex-col min-h-[320px] group">
           <Users className="w-8 h-8 text-chart-green mb-md" />
           <h3 className="text-heading-md text-ink mb-sm">Custom Characters</h3>
           <p className="text-body text-muted">
             Define system prompts, custom instructions, and character personas. Switch between characters instantly to test behaviors.
           </p>
           <div className="mt-auto flex gap-xs">
             <div className="w-8 h-8 rounded-full bg-chart-blue/20 flex items-center justify-center text-xs font-bold text-chart-blue">A</div>
             <div className="w-8 h-8 rounded-full bg-chart-purple/20 flex items-center justify-center text-xs font-bold text-chart-purple">B</div>
             <div className="w-8 h-8 rounded-full bg-chart-green/20 flex items-center justify-center text-xs font-bold text-chart-green">C</div>
           </div>
        </Card>

        {/* Big Bento Item 4 */}
        <Card className="p-xl flex flex-col md:col-span-2 lg:col-span-2 min-h-[320px] bg-ink text-canvas relative overflow-hidden group">
           <div className="relative z-10 h-full flex flex-col">
             <Sparkles className="w-8 h-8 text-chart-pink mb-md" />
             <h3 className="text-heading-md text-canvas mb-sm">Launch Chat Studio</h3>
             <p className="text-body text-surface max-w-sm mb-lg opacity-80">
               Experience the most powerful multi-model chat interface designed for developers and AI enthusiasts.
             </p>
             <div className="mt-auto">
               <Button variant="primary" icon={MessageSquare} onClick={() => navigate('/chat')} className="border-canvas/20">
                 ENTER SANDBOX
               </Button>
             </div>
           </div>
           
           {/* Abstract Background Design */}
           <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-chart-blue/10 to-transparent pointer-events-none"></div>
           <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-chart-purple/20 blur-3xl group-hover:bg-chart-purple/30 transition-colors"></div>
           <div className="absolute right-10 -top-10 w-40 h-40 rounded-full bg-chart-blue/20 blur-3xl group-hover:bg-chart-blue/30 transition-colors"></div>
        </Card>
      </div>
    </section>
  );
}
