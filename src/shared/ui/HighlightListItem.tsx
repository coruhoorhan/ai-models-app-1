import React from 'react';
import { Badge } from './Badge';

interface HighlightListItemProps {
  modelName: string;
  context: string;
  provider: string;
  delta: number;
  price: string;
}

export function HighlightListItem({
  modelName,
  context,
  provider,
  delta,
  price,
}: HighlightListItemProps) {
  const isPositive = delta >= 0;

  return (
    <div className="flex items-center justify-between py-sm border-b border-hairline/50 last:border-0 hover:bg-surface/50 transition-colors px-xs rounded-sm">
      <div className="flex flex-col">
        <span className="font-bold text-ink text-body-sm">{modelName}</span>
        <span className="text-[11px] text-muted">{provider} · {context}</span>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className={`px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-bold ${
          isPositive ? 'bg-live/10 text-live' : 'bg-error/10 text-error'
        }`}>
          {isPositive ? '+' : ''}{delta}
        </div>
        <span className="text-[11px] font-mono text-muted">{price}</span>
      </div>
    </div>
  );
}
