import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MessageSquare, Zap, Users, Lock, Sparkles, MessageCircle, ArrowRight, Bot, Shield, ChevronRight } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../shared/lib/cn';

const BENTO_VARIANTS = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { 
      type: 'spring', 
      damping: 20, 
      stiffness: 100 
    } 
  }
};

const GlowCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      variants={BENTO_VARIANTS}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-xl border border-hairline bg-surface/40 backdrop-blur-xl transition-all duration-300",
        "hover:border-chart-blue/30 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.15)]",
        className
      )}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
            }}
          />
        )}
      </AnimatePresence>
      <div className="relative z-10 h-full p-xl flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

export function ChatClientShowcase() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="w-full max-w-[1440px] mx-auto py-24 px-md lg:px-xl relative">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-chart-blue/10 blur-[120px] rounded-full pointer-events-none opacity-50 mix-blend-screen" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-chart-purple/10 blur-[120px] rounded-full pointer-events-none opacity-50 mix-blend-screen" />

      <motion.div 
        style={{ opacity }}
        className="flex flex-col items-center text-center mb-20 relative z-10"
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
        
        <h2 className="text-5xl lg:text-7xl font-bold tracking-tight mb-md">
          <span className="text-ink">Not just an API.</span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-chart-blue via-chart-purple to-chart-pink animate-gradient-x">
            A limitless chat client.
          </span>
        </h2>
        
        <p className="text-lg text-muted max-w-2xl mt-4 leading-relaxed">
          Instantly chat with over 250+ AI models using our beautifully crafted Sandbox. Zero configuration. Fully private. Seamlessly switch between personalities.
        </p>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-lg w-full max-w-[1200px] mx-auto relative z-10"
      >
        {/* BIG HERO BENTO */}
        <GlowCard className="md:col-span-6 lg:col-span-8 min-h-[380px] group bg-gradient-to-br from-surface/80 to-canvas/40">
           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-chart-blue to-chart-purple flex items-center justify-center mb-lg shadow-lg">
             <Zap className="w-6 h-6 text-canvas" />
           </div>
           <h3 className="text-3xl font-semibold text-ink mb-sm tracking-tight">Zero Setup Required</h3>
           <p className="text-body-lg text-muted max-w-md">Jump straight into testing prompts. Choose any model and start typing. We handle the complex API routing, context windows, and token limits automatically.</p>
           
           {/* Abstract Floating UI Elements */}
           <div className="absolute -right-10 -bottom-10 w-3/4 h-3/4 rounded-tl-2xl border-t border-l border-hairline bg-canvas/30 backdrop-blur-2xl p-lg flex flex-col gap-md shadow-2xl transition-transform duration-700 group-hover:-translate-y-4 group-hover:-translate-x-4">
              {/* Fake Chat bubbles */}
              <div className="w-3/4 bg-surface rounded-2xl rounded-tl-sm p-sm border border-hairline flex items-center gap-sm">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-chart-purple to-chart-pink flex-shrink-0" />
                 <div className="w-full flex flex-col gap-xs">
                    <div className="w-full h-2 bg-hairline rounded-full" />
                    <div className="w-2/3 h-2 bg-hairline rounded-full" />
                 </div>
              </div>
              <div className="w-3/4 bg-chart-blue/10 rounded-2xl rounded-tr-sm p-sm border border-chart-blue/20 flex items-center gap-sm self-end">
                 <div className="w-full flex flex-col gap-xs items-end">
                    <div className="w-full h-2 bg-chart-blue/30 rounded-full" />
                    <div className="w-1/2 h-2 bg-chart-blue/30 rounded-full" />
                 </div>
                 <div className="w-8 h-8 rounded-full bg-chart-blue flex-shrink-0 flex items-center justify-center">
                   <Bot className="w-4 h-4 text-canvas" />
                 </div>
              </div>
           </div>
        </GlowCard>

        {/* MEDIUM BENTO */}
        <GlowCard className="md:col-span-6 lg:col-span-4 min-h-[380px] group">
           <div className="w-12 h-12 rounded-xl bg-surface-sunken border border-hairline flex items-center justify-center mb-lg">
             <Shield className="w-6 h-6 text-chart-green" />
           </div>
           <h3 className="text-2xl font-semibold text-ink mb-sm tracking-tight">Private & BYOK</h3>
           <p className="text-body text-muted mb-auto">
             Your chats are entirely local. We don't store your logs. Use your own API keys for ultimate privacy and direct provider billing.
           </p>
           
           <div className="mt-8 pt-md border-t border-hairline">
             <Button variant="secondary" className="w-full justify-between border border-hairline bg-surface hover:bg-surface-sunken hover:border-chart-green/30 transition-colors">
                <span className="font-medium text-ink">Bring Your Own Key</span>
                <ChevronRight className="w-4 h-4 text-muted transition-transform group-hover:translate-x-1" />
             </Button>
           </div>
        </GlowCard>

        {/* SMALL BENTO */}
        <GlowCard className="md:col-span-6 lg:col-span-5 min-h-[300px]">
           <div className="w-12 h-12 rounded-xl bg-surface-sunken border border-hairline flex items-center justify-center mb-lg">
             <Users className="w-6 h-6 text-chart-orange" />
           </div>
           <h3 className="text-2xl font-semibold text-ink mb-sm tracking-tight">Custom Characters</h3>
           <p className="text-body text-muted">
             Define system prompts, custom instructions, and character personas. Switch between characters instantly to test behaviors.
           </p>
           <div className="mt-auto flex gap-2">
             {['A', 'B', 'C'].map((char, i) => (
               <motion.div 
                 key={char}
                 whileHover={{ y: -5, scale: 1.1 }}
                 className={cn(
                   "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm border border-hairline cursor-pointer",
                   i === 0 ? "bg-chart-blue/20 text-chart-blue border-chart-blue/30" :
                   i === 1 ? "bg-chart-purple/20 text-chart-purple border-chart-purple/30" :
                   "bg-chart-green/20 text-chart-green border-chart-green/30"
                 )}
               >
                 {char}
               </motion.div>
             ))}
           </div>
        </GlowCard>

        {/* CALL TO ACTION BENTO */}
        <GlowCard className="md:col-span-6 lg:col-span-7 min-h-[300px] bg-ink border-transparent group overflow-hidden">
           {/* Dynamic dark mode background effect */}
           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
           
           <div className="relative z-10 h-full flex flex-col justify-between">
             <div>
               <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center mb-lg">
                 <MessageSquare className="w-6 h-6 text-canvas" />
               </div>
               <h3 className="text-3xl font-semibold text-canvas mb-sm tracking-tight">Launch Chat Studio</h3>
               <p className="text-body-lg text-canvas/70 max-w-sm mb-lg">
                 Experience the most powerful multi-model chat interface designed for developers and AI enthusiasts.
               </p>
             </div>
             
             <div>
               <Button variant="primary" icon={ArrowRight} onClick={() => navigate('/chat')} className="bg-canvas text-ink hover:bg-canvas/90 border-transparent shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-shadow">
                 ENTER SANDBOX
               </Button>
             </div>
           </div>
           
           {/* Animated Glowing Orbs inside the dark card */}
           <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               opacity: [0.3, 0.5, 0.3],
             }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-chart-purple/30 blur-[80px] pointer-events-none" 
           />
           <motion.div 
             animate={{ 
               scale: [1, 1.5, 1],
               opacity: [0.2, 0.4, 0.2],
             }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute right-20 -top-20 w-64 h-64 rounded-full bg-chart-blue/30 blur-[80px] pointer-events-none" 
           />
        </GlowCard>

      </motion.div>
    </section>
  );
}
