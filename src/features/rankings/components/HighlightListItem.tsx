import React from 'react';

interface HighlightListItemProps {
  name: string;
  provider: string;
  contextLength: number;
  weeklyChange: number;
  pricePer1M: number;
}

export function HighlightListItem({ name, provider, contextLength, weeklyChange, pricePer1M }: HighlightListItemProps) {
  const isPositive = weeklyChange > 0;
  const isNegative = weeklyChange < 0;

  return (
    <div className="flex items-center justify-between py-sm border-b border-hairline-soft last:border-0">
      <div className="flex flex-col">
        <span className="text-body-sm-bold text-ink truncate max-w-[180px]">{name}</span>
        <span className="text-caption text-subtle truncate max-w-[180px]">
          {provider} · {contextLength >= 1000 ? `${contextLength/1000}k` : contextLength}
        </span>
      </div>
      <div className="flex flex-col items-end gap-[2px]">
        {weeklyChange === 0 ? (
          <span className="text-caption-bold text-muted bg-surface-sunken px-[6px] py-[2px] rounded-xs">
            -
          </span>
        ) : (
          <span className={`text-caption-bold px-[6px] py-[2px] rounded-xs ${
            isPositive ? 'text-live bg-live/10' : 'text-error bg-error/10'
          }`}>
            {isPositive ? '+' : ''}{weeklyChange}
          </span>
        )}
        <span className="text-caption text-muted font-mono">${pricePer1M.toFixed(2)} /1M</span>
      </div>
    </div>
  );
}
