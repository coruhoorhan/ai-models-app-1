import React from 'react';

const MODEL_COSTS = [
  { name: 'GPT-4o', amount: 150.20, color: 'bg-chart-purple' },
  { name: 'Claude 3.5 Sonnet', amount: 65.40, color: 'bg-chart-orange' },
  { name: 'Gemini 1.5 Pro', amount: 30.20, color: 'bg-chart-teal' },
];

export function BillingOverview() {
  const total = MODEL_COSTS.reduce((acc, m) => acc + m.amount, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
      {/* Existing overview cards taking 8 cols */}
      <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-md h-full">
        <div className="p-lg bg-canvas border border-hairline rounded-sm flex flex-col gap-sm transition-colors hover:border-ink/30 duration-300">
          <span className="text-label text-subtle flex items-center gap-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-live animate-pulse" />
            CURRENT USAGE (MTD)
          </span>
          <div className="flex items-end gap-sm mt-auto pt-md">
            <span className="text-heading-lg text-ink">${total.toFixed(2)}</span>
            <span className="text-body-sm text-subtle pb-xs">/ $1,000.00</span>
          </div>
          <div className="w-full h-1 bg-surface-sunken rounded-full overflow-hidden border border-hairline mt-xs">
            <div className="h-full bg-chart-blue" style={{ width: `${(total / 1000) * 100}%` }} />
          </div>
        </div>

        <div className="p-lg bg-canvas border border-hairline rounded-sm flex flex-col gap-sm transition-colors hover:border-ink/30 duration-300">
          <span className="text-label text-subtle">NEXT INVOICE</span>
          <span className="text-heading-lg text-ink font-mono tracking-tight mt-auto pt-md">Aug 1, 2026</span>
          <span className="text-body-sm text-subtle">Available Credit: <span className="text-chart-teal font-bold">$50.00</span></span>
        </div>
      </div>

      {/* Model Breakdown taking 4 cols */}
      <div className="lg:col-span-4 p-md bg-canvas border border-hairline rounded-sm flex flex-col gap-sm transition-colors hover:border-ink/30 duration-300 h-full">
        <span className="text-label text-subtle border-b border-hairline pb-xs">MODEL SPEND (MTD)</span>
        
        {/* Stacked Bar */}
        <div className="w-full h-2 rounded-full overflow-hidden flex border border-hairline mt-xs">
          {MODEL_COSTS.map(m => (
            <div key={m.name} className={`h-full ${m.color}`} style={{ width: `${(m.amount / total) * 100}%` }} />
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex flex-col gap-xs mt-sm flex-1 justify-center">
          {MODEL_COSTS.map(m => (
            <div key={m.name} className="flex items-center justify-between p-xs hover:bg-surface-sunken rounded-xs transition-colors">
              <div className="flex items-center gap-xs text-body-sm text-ink font-bold">
                <span className={`w-2 h-2 rounded-full ${m.color}`} />
                {m.name}
              </div>
              <span className="text-mono-inline text-subtle">${m.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
