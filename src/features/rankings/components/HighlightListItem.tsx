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
    <div className={cn("w-full flex items-center justify-between py-md border-b border-hairline last:border-0", className)}>
      <div className="flex flex-col gap-xs">
        <span className="text-body-md-bold text-ink">{modelName}</span>
        <span className="text-body-sm text-muted">{developerInfo}</span>
      </div>
      <div className="flex flex-col items-end gap-xs">
        {delta !== undefined && (
          <span
            className={cn(
              "text-caption-bold rounded-xs px-2 py-xxs",
              delta >= 0
                ? "bg-live-bg text-live"
                : "bg-error/10 text-error"
            )}
          >
            {delta >= 0 ? `+${delta}` : delta}
          </span>
        )}
        {price && (
          <span className="text-body-sm text-muted font-mono">{price}</span>
        )}
      </div>
    </div>
  );
}
