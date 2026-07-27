import React from 'react';
import { motion } from 'motion/react';
import { TopNav } from '../features/landing/components/TopNav';
import { Footer } from '../shared/ui/Footer';
import { BackgroundGrid } from '../shared/ui/BackgroundGrid';
import { ChatWorkspace } from '../features/chat/components/ChatWorkspace';
import { Sparkles, MessageSquare, Zap } from 'lucide-react';
import { Badge } from '../shared/ui/Badge';

export function ChatPage() {
  return (
    <div className="w-full flex flex-col items-center bg-canvas min-h-screen relative overflow-hidden text-ink">
      {/* Global Ambient Background Grid */}
      <BackgroundGrid />

      <div className="relative z-10 w-full flex flex-col items-center flex-1">
        <TopNav />

        <main className="w-full flex flex-col flex-1 items-center py-lg">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-[1440px] flex flex-col px-md lg:px-xl"
          >
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md mb-md border-b border-hairline pb-md bg-surface/30 backdrop-blur-xs p-md rounded-md border">
              <div>
                <div className="flex items-center gap-xs">
                  <div className="p-xs bg-ink text-canvas rounded-sm">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h1 className="text-heading-md text-ink font-bold">Chat Studio & Dual Arena</h1>
                  <Badge variant="status-live" label="UnoRouter Engine" />
                </div>
                <p className="text-body-sm text-muted mt-xs">
                  Test prompts against 200+ AI models, configure custom system instructions, and run side-by-side streaming benchmark arenas.
                </p>
              </div>

              <div className="flex items-center gap-xs font-mono text-label text-chart-teal bg-surface p-xs rounded-sm border border-hairline">
                <Zap className="w-3.5 h-3.5" />
                <span>217 Models Connected</span>
              </div>
            </div>

            {/* Interactive Chat Studio Workspace */}
            <ChatWorkspace />
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
