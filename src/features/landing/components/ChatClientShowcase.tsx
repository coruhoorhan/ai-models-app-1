import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Bot, Shield, Zap, Users, ArrowRight, MessageSquare, Terminal } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { useNavigate } from 'react-router-dom';

const FLOATING_ANIMATION = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut" as const
  }
};

export function ChatClientShowcase() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={containerRef} className="w-full max-w-[1440px] mx-auto py-24 px-md lg:px-xl relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-chart-blue/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-chart-purple/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

      {/* Header section */}
      <motion.div 
        style={{ opacity }}
        className="flex flex-col items-center text-center mb-24 relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-xs px-sm py-xxs bg-chart-blue/10 border border-chart-blue/30 text-chart-blue rounded-full mb-md backdrop-blur-md"
        >
          <Sparkles className="w-3 h-3 animate-pulse" />
          <span className="text-label text-chart-blue tracking-wider">NEXT-GEN SANDBOX</span>
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-md max-w-4xl">
          <span className="text-ink">Not just an API.</span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-chart-blue via-chart-purple to-chart-pink">
            A limitless chat client.
          </span>
        </h2>
        
        <p className="text-lg text-muted max-w-2xl mt-4 leading-relaxed">
          Instantly chat with over 250+ AI models using our beautifully crafted Sandbox. Zero configuration. Fully private. Seamlessly switch between personalities.
        </p>
      </motion.div>

      {/* Main Showcase Area */}
      <motion.div 
        style={{ scale, opacity }}
        className="relative w-full max-w-[1000px] mx-auto z-10"
      >
        {/* Floating Badges (Hidden on mobile, visible on lg screens) */}
        <motion.div 
          animate={FLOATING_ANIMATION}
          className="hidden lg:flex absolute -left-12 -top-12 z-20 bg-surface/80 backdrop-blur-xl border border-hairline rounded-xl p-md shadow-2xl flex-col gap-xs max-w-[240px]"
        >
          <div className="w-8 h-8 rounded-full bg-chart-orange/20 flex items-center justify-center text-chart-orange mb-xs">
            <Users className="w-4 h-4" />
          </div>
          <h4 className="text-body font-bold text-ink">Custom Characters</h4>
          <p className="text-caption text-muted">Define personas and system prompts on the fly.</p>
        </motion.div>

        <motion.div 
          animate={{ ...FLOATING_ANIMATION, transition: { ...FLOATING_ANIMATION.transition, delay: 1 } }}
          className="hidden lg:flex absolute -right-16 top-1/4 z-20 bg-surface/80 backdrop-blur-xl border border-hairline rounded-xl p-md shadow-2xl flex-col gap-xs max-w-[240px]"
        >
          <div className="w-8 h-8 rounded-full bg-chart-green/20 flex items-center justify-center text-chart-green mb-xs">
            <Shield className="w-4 h-4" />
          </div>
          <h4 className="text-body font-bold text-ink">Private & BYOK</h4>
          <p className="text-caption text-muted">Chats run locally. Bring your own keys.</p>
        </motion.div>

        <motion.div 
          animate={{ ...FLOATING_ANIMATION, transition: { ...FLOATING_ANIMATION.transition, delay: 2 } }}
          className="hidden lg:flex absolute -left-8 -bottom-8 z-20 bg-surface/80 backdrop-blur-xl border border-hairline rounded-xl p-md shadow-2xl flex-col gap-xs max-w-[240px]"
        >
          <div className="w-8 h-8 rounded-full bg-chart-blue/20 flex items-center justify-center text-chart-blue mb-xs">
            <Zap className="w-4 h-4" />
          </div>
          <h4 className="text-body font-bold text-ink">Zero Setup</h4>
          <p className="text-caption text-muted">No configuration required to start prompting.</p>
        </motion.div>

        {/* Center Mock Window */}
        <div className="w-full rounded-2xl border border-hairline bg-surface/40 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col relative group">
          
          {/* Window Header */}
          <div className="h-12 border-b border-hairline flex items-center px-md gap-sm bg-surface-sunken/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-hairline group-hover:bg-error transition-colors" />
              <div className="w-3 h-3 rounded-full bg-hairline group-hover:bg-chart-orange transition-colors" />
              <div className="w-3 h-3 rounded-full bg-hairline group-hover:bg-chart-green transition-colors" />
            </div>
            <div className="mx-auto flex items-center gap-2 bg-surface border border-hairline px-4 py-1 rounded-md text-caption text-muted">
              <Terminal className="w-3 h-3" />
              <span>sandbox.aimodels.app</span>
            </div>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>

          {/* Window Body (Chat area) */}
          <div className="p-lg flex flex-col gap-lg min-h-[400px] relative">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-sunken/30 pointer-events-none" />

            {/* AI Message */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-md max-w-[80%]"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-chart-purple to-chart-blue flex items-center justify-center flex-shrink-0 shadow-sm border border-hairline">
                <Bot className="w-5 h-5 text-canvas" />
              </div>
              <div className="bg-surface border border-hairline rounded-2xl rounded-tl-none p-md shadow-sm">
                <p className="text-body text-ink">Hello! I am Claude 3 Opus. How can I help you architect your new application today?</p>
              </div>
            </motion.div>

            {/* User Message */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="flex items-start gap-md self-end max-w-[80%]"
            >
              <div className="bg-chart-blue/10 border border-chart-blue/20 rounded-2xl rounded-tr-none p-md shadow-sm text-right">
                <p className="text-body text-ink">Can we use Framer Motion for the UI animations?</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center flex-shrink-0 shadow-sm border border-hairline">
                <Users className="w-5 h-5 text-canvas" />
              </div>
            </motion.div>
            
            {/* AI Typing Indicator */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
              className="flex items-center gap-md mt-auto"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-chart-purple to-chart-blue flex items-center justify-center flex-shrink-0 shadow-sm border border-hairline">
                <Bot className="w-5 h-5 text-canvas" />
              </div>
              <div className="bg-surface border border-hairline rounded-2xl rounded-tl-none px-md py-sm shadow-sm flex items-center gap-1">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 rounded-full bg-chart-purple" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 rounded-full bg-chart-blue" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 rounded-full bg-chart-pink" />
              </div>
            </motion.div>
          </div>
          
          {/* Input Area */}
          <div className="p-md border-t border-hairline bg-surface flex items-center gap-md">
            <div className="flex-1 bg-surface-sunken border border-hairline rounded-full h-12 flex items-center px-md">
              <span className="text-muted text-body-sm">Type a message...</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <ArrowRight className="w-5 h-5 text-canvas" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Features List (Visible only on mobile/tablet when badges are hidden) */}
      <div className="lg:hidden w-full max-w-md mx-auto mt-16 flex flex-col gap-md relative z-10">
        <div className="flex items-start gap-sm bg-surface/50 border border-hairline p-md rounded-xl backdrop-blur-sm">
          <div className="p-xs bg-chart-blue/20 text-chart-blue rounded-md mt-1">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-body font-bold text-ink">Zero Setup Required</h4>
            <p className="text-body-sm text-muted">Jump straight into testing prompts.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-sm bg-surface/50 border border-hairline p-md rounded-xl backdrop-blur-sm">
          <div className="p-xs bg-chart-green/20 text-chart-green rounded-md mt-1">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-body font-bold text-ink">Private & BYOK</h4>
            <p className="text-body-sm text-muted">Your chats are entirely local.</p>
          </div>
        </div>

        <div className="flex items-start gap-sm bg-surface/50 border border-hairline p-md rounded-xl backdrop-blur-sm">
          <div className="p-xs bg-chart-orange/20 text-chart-orange rounded-md mt-1">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-body font-bold text-ink">Custom Characters</h4>
            <p className="text-body-sm text-muted">Define personas and system prompts.</p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex justify-center mt-20 relative z-10"
      >
        <Button 
          variant="primary" 
          icon={MessageSquare} 
          onClick={() => navigate('/chat')} 
          className="bg-ink text-canvas hover:bg-ink/90 px-8 py-6 text-lg shadow-[0_0_40px_rgba(0,0,0,0.1)] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)] transition-shadow rounded-full"
        >
          ENTER SANDBOX
        </Button>
      </motion.div>
    </section>
  );
}
