import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/cn';

interface BlazeEffectProps {
  color?: 'fire' | 'electric' | 'emerald';
  className?: string;
  intensity?: 'subtle' | 'medium' | 'high';
  children?: React.ReactNode;
}

export function BlazeEffect({
  color = 'fire',
  className,
  children,
}: BlazeEffectProps) {
  // Generate 20 stable embers rising from bottom to top
  const embers = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1.5, // 1.5px to 4.5px
      left: Math.random() * 100, // 0% to 100%
      duration: Math.random() * 3 + 2.5, // 2.5s to 5.5s
      delay: Math.random() * 3, // 0s to 3s delay
      drift: (Math.random() - 0.5) * 30, // -15px to +15px x-drift
    }));
  }, []);

  const borderGradient = {
    fire: 'from-amber-500 via-orange-500/60 to-orange-500/20',
    electric: 'from-cyan-400 via-blue-500/60 to-blue-500/20',
    emerald: 'from-emerald-400 via-teal-500/60 to-teal-500/20',
  };

  const emberColor = {
    fire: 'bg-amber-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.9)]',
    electric: 'bg-cyan-300 shadow-[0_0_8px_2px_rgba(103,232,249,0.9)]',
    emerald: 'bg-emerald-300 shadow-[0_0_8px_2px_rgba(110,231,183,0.9)]',
  };

  const heatGlow = {
    fire: 'from-amber-500/20 via-orange-500/10 to-transparent',
    electric: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    emerald: 'from-emerald-500/20 via-teal-500/10 to-transparent',
  };

  return (
    <div className={cn("relative rounded-md p-[1.5px] overflow-hidden bg-gradient-to-b", borderGradient[color], className)}>
      {/* Subtle outer glow tightly bound to the card */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 via-orange-500/10 to-transparent rounded-md blur-sm pointer-events-none" />

      {/* Floating Embers Canvas Layer - strictly contained inside rounded corners */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-md">
        {/* Ambient bottom heat glow */}
        <div className={cn("absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t pointer-events-none", heatGlow[color])} />

        {/* Rising Embers (Alev Kıvılcımları) */}
        {embers.map((ember) => (
          <motion.span
            key={ember.id}
            initial={{
              y: '105%',
              x: 0,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              y: '-10%',
              x: [0, ember.drift, ember.drift * -0.5, ember.drift],
              opacity: [0, 0.9, 0.7, 0],
              scale: [0.5, 1.2, 0.8, 0.2],
            }}
            transition={{
              duration: ember.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: ember.delay,
            }}
            style={{
              left: `${ember.left}%`,
              width: `${ember.size}px`,
              height: `${ember.size}px`,
            }}
            className={cn("absolute bottom-0 rounded-full shrink-0 pointer-events-none", emberColor[color])}
          />
        ))}
      </div>

      {/* Inner Content Container */}
      <div className="relative z-20 w-full h-full rounded-[calc(var(--radius-md)-1.5px)] bg-canvas overflow-hidden">
        {children}
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
