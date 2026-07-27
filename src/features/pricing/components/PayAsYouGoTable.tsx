import React from 'react';
import { cn } from '../../../shared/lib/cn';

export interface PayAsYouGoModel {
  name: string;
  input: string;
  output: string;
  context: string;
  badge?: string;
}

interface PayAsYouGoTableProps {
  models: PayAsYouGoModel[];
}

export function PayAsYouGoTable({ models }: PayAsYouGoTableProps) {
  return (
    <div className="flex flex-col w-full border border-hairline rounded-md bg-canvas overflow-x-auto">
      <div className="min-w-[600px]">
        <div className="grid grid-cols-4 border-b border-hairline bg-surface p-md">
          <span className="text-label text-muted">MODEL</span>
          <span className="text-label text-muted">INPUT (1M)</span>
          <span className="text-label text-muted">OUTPUT (1M)</span>
          <span className="text-label text-muted">CONTEXT</span>
        </div>
        <div className="flex flex-col divide-y divide-hairline">
          {models.map((m) => (
            <div key={m.name} className="grid grid-cols-4 p-md items-center hover:bg-surface transition-colors group cursor-default">
              <div className="flex items-center gap-sm pr-xs">
                <span className="text-body-sm font-medium text-ink group-hover:text-ink transition-colors">{m.name}</span>
                {m.badge && (
                  <span className={cn(
                    "text-label font-mono uppercase px-1.5 py-xxs rounded-xs border leading-none shrink-0",
                    m.badge === 'POPULAR' ? "text-chart-blue bg-chart-blue/10 border-chart-blue/20" : "text-chart-orange bg-chart-orange/10 border-chart-orange/20"
                  )}>
                    {m.badge}
                  </span>
                )}
              </div>
              <span className="text-mono-inline font-mono text-muted group-hover:text-ink transition-colors">{m.input}</span>
              <span className="text-mono-inline font-mono text-muted group-hover:text-ink transition-colors">{m.output}</span>
              <span className="text-body-sm text-muted group-hover:text-ink transition-colors">{m.context}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
