import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../lib/cn';
import { TickerBarProps } from '../../types';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export function TickerBar({ items, speed = 'normal' }: TickerBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      // Calculate the width of the first set of items to set the animation distance
      const firstChild = containerRef.current.firstElementChild as HTMLElement;
      if (firstChild) {
        setContentWidth(firstChild.offsetWidth);
      }
    }
  }, [items]);

  const speedClass = 
    speed === 'slow' ? 'duration-[60s]' : 
    speed === 'fast' ? 'duration-[15s]' : 'duration-[30s]';

  return (
    <div className="w-full bg-surface-sunken border-y border-hairline overflow-hidden whitespace-nowrap py-xs flex items-center relative h-[32px]">
      <div 
        className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface-sunken to-transparent z-10" 
      />
      <div 
        className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface-sunken to-transparent z-10" 
      />
      
      <div 
        ref={containerRef}
        className={cn(
          "flex items-center min-w-full animate-marquee",
          speedClass
        )}
      >
        {/* Render items twice to create the continuous loop effect */}
        {[...Array(2)].map((_, arrayIndex) => (
          <div key={arrayIndex} className="flex items-center justify-around w-max shrink-0 px-md">
            {items.map((item, index) => (
              <div key={`${arrayIndex}-${index}`} className="flex items-center gap-sm mx-md">
                <span className="text-label text-subtle font-mono">{item.label}</span>
                <div className="flex items-center gap-xs">
                  <span className="font-mono text-body-sm font-bold text-ink">{item.value}</span>
                  {item.trend === 'up' && <ArrowUpRight className="w-3 h-3 text-live" />}
                  {item.trend === 'down' && <ArrowDownRight className="w-3 h-3 text-error" />}
                  {item.trend === 'neutral' && <Minus className="w-3 h-3 text-subtle" />}
                </div>
                <span className="text-hairline mx-sm">•</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* Translate by half since we doubled the content */
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
