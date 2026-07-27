import React from 'react';
import { cn } from '../lib/cn';
import { HighlightListItemProps } from '../../types';

export function HighlightListItem({
  title,
  subtitle,
  delta,
  priceText,
}: HighlightListItemProps) {
  return (
    <div className="flex items-center justify-between py-sm border-b border-hairline-soft last:border-0 hover:bg-surface-sunken transition-fast">
      <div className="flex flex-col">
        <span className="text-body-sm text-ink">{title}</span>
        {subtitle && <span className="text-caption text-subtle">{subtitle}</span>}
      </div>
      <div className="flex items-center gap-md">
        {delta && (
          <span
            className={cn(
              'px-xs py-[2px] rounded-xs text-caption-bold',
              delta.isPositive ? 'bg-live-bg text-live' : 'bg-red-50 text-error'
            )}
          >
            {delta.isPositive ? '+' : ''}{delta.value}
          </span>
        )}
        {priceText && (
          <span className="text-mono-inline text-muted min-w-[80px] text-right">
            {priceText}
          </span>
        )}
      </div>
    </div>
  );
}
