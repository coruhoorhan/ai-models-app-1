import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function BackgroundGrid() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated Grid lines */}
      <motion.div 
        animate={{ y: [0, 48] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        className="absolute -inset-[100px] bg-[linear-gradient(to_right,rgba(17,17,17,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" 
      />
      {/* Mouse Tracking Retro Interactive Dither Glow */}
      <motion.div
        className="fixed w-[450px] h-[450px] rounded-full blur-[90px] opacity-25 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          left: springX,
          top: springY,
          background: 'radial-gradient(circle, var(--color-chart-blue) 0%, var(--color-chart-teal) 50%, transparent 70%)',
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,transparent_40%,var(--color-canvas)_100%)]" />
      <div className="absolute top-[-10%] left-[-5%] w-[55%] h-[50%] bg-chart-blue/25 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[55%] h-[50%] bg-chart-teal/25 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] left-[15%] w-[70%] h-[40%] bg-chart-blue/15 blur-[140px] rounded-full pointer-events-none" />
    </div>
  );
}

