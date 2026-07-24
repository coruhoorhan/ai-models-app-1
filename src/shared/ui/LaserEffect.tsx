import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/cn';

interface LaserEffectProps {
  color?: string;
  glowColor?: string;
  className?: string;
  duration?: number;
}

export function LaserEffect({
  color = 'var(--color-chart-orange)',
  glowColor = 'rgba(235, 93, 28, 0.6)',
  className,
  duration = 3,
}: LaserEffectProps) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden rounded-md", className)}>
      {/* Outer Glow Laser Beam along top border */}
      <motion.div
        animate={{
          x: ['-100%', '200%'],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 1,
        }}
        className="absolute top-0 left-0 h-[2px] w-[60%] z-20"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${color} 50%, #ffffff 80%, transparent 100%)`,
          boxShadow: `0 0 12px 2px ${glowColor}, 0 0 24px 6px ${glowColor}`,
        }}
      />

      {/* Vertical Laser Beam along left border */}
      <motion.div
        animate={{
          y: ['-100%', '200%'],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: duration * 0.25,
          repeatDelay: 1,
        }}
        className="absolute top-0 left-0 w-[2px] h-[60%] z-20"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${color} 50%, #ffffff 80%, transparent 100%)`,
          boxShadow: `0 0 12px 2px ${glowColor}, 0 0 24px 6px ${glowColor}`,
        }}
      />

      {/* Laser Reflection Ambient Pulse */}
      <motion.div
        animate={{
          opacity: [0.15, 0.4, 0.15],
          scale: [0.98, 1.02, 0.98],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-16 rounded-full blur-2xl pointer-events-none"
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  );
}
