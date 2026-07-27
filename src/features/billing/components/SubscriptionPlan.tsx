import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function SubscriptionPlan() {
  return (
    <div className="p-lg bg-ink border border-hairline rounded-sm flex flex-col gap-md text-canvas relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-lg opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
        <ArrowUpRight className="w-32 h-32 text-canvas" />
      </div>

      <div className="flex items-center justify-between border-b border-white/20 pb-xs z-10">
        <span className="text-label text-canvas/70">CURRENT TIER</span>
        <span className="text-mono-inline bg-white/10 border border-white/20 px-sm py-[2px] rounded-xs text-canvas">PRO</span>
      </div>

      <div className="flex flex-col gap-xs z-10 flex-1">
        <h3 className="text-heading-lg">Professional</h3>
        <p className="text-body-sm text-canvas/70 max-w-[25ch]">Ideal for small teams requiring higher rate limits and priority support.</p>
      </div>

      <div className="flex flex-col gap-xs pt-md z-10">
        <button className="w-full bg-canvas text-ink py-md px-md rounded-sm font-bold flex items-center justify-between gap-xs hover:bg-surface-sunken hover:scale-[0.98] transition-all duration-300">
          <span>UPGRADE TO ENTERPRISE</span>
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
