import React from 'react';
import { cn } from '../lib/cn';
import { Badge } from './Badge';

export interface TickerBarProps {
  tps: number | string;
  models: string[];
  className?: string;
}

export function TickerBar({ tps, models, className }: TickerBarProps) {
  return (
    <div
      className={cn(
        'w-full h-[56px] bg-surface-sunken border-t border-hairline flex items-center px-lg overflow-hidden',
        className
      )}
    >
      <div className="flex-shrink-0 z-10 bg-surface-sunken pr-md">
        <Badge variant="status-live" label="LIVE INFERENCE" />
      </div>

      <div className="flex-grow overflow-hidden relative mx-md flex items-center h-full">
        {/* Simple CSS animation would go here, for now flex layout */}
        <div className="flex whitespace-nowrap text-mono-inline text-muted animate-pulse">
          {models.join(' · ')}
        </div>
      </div>

      <div className="flex-shrink-0 z-10 bg-surface-sunken pl-md flex items-center gap-xs">
        <span className="text-label text-subtle">TPS:</span>
        <span className="text-mono-inline font-bold text-ink">{tps}</span>
      </div>
    </div>
  );
}
