import React from 'react';
import { cn } from '../../../shared/lib/cn';

interface HighlightListItemProps {
  modelName: string;
  developerInfo: string;
  delta?: number;
  price?: string;
  className?: string;
}

export function HighlightListItem({ modelName, developerInfo, delta, price, className }: HighlightListItemProps) {
  return (
    <div className={cn("w-full flex items-center justify-between py-sm border-b border-hairline-soft last:border-0 hover:bg-surface-sunken transition-fast", className)}>
      <div className="flex flex-col">
        <span className="text-body-sm text-ink">{modelName}</span>
        <span className="text-caption text-subtle">{developerInfo}</span>
      </div>
      <div className="flex items-center gap-md">
        {delta !== undefined && (
          <span
            className={cn(
              "px-xs py-[2px] rounded-xs text-caption-bold",
              delta >= 0
                ? "bg-live-bg text-live"
                : "bg-error/10 text-error"
            )}
          >
            {delta >= 0 ? `+${delta}` : delta}
          </span>
        )}
        {price && (
          <span className="text-mono-inline text-muted min-w-[80px] text-right">{price}</span>
        )}
      </div>
    </div>
  );
}
