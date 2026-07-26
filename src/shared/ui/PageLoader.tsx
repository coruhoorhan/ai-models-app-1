import React from 'react';
import { Command } from 'lucide-react';
import { cn } from '../lib/cn';

interface PageLoaderProps {
  className?: string;
}

export function PageLoader({ className }: PageLoaderProps) {
  return (
    <div className={cn("w-full h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-canvas relative overflow-hidden", className)}>
      <div className="flex flex-col items-center gap-md z-10">
        <div className="w-12 h-12 bg-surface-sunken border border-hairline rounded-sm flex items-center justify-center relative overflow-hidden">
          <Command className="w-6 h-6 text-ink animate-pulse relative z-10" />
          <div className="absolute inset-0 bg-chart-purple/10 animate-pulse" />
        </div>
        <span className="text-label text-subtle font-mono tracking-wider animate-pulse">
          YÜKLENİYOR...
        </span>
      </div>
      
      {/* Subtle background grid matching the app theme */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
}
