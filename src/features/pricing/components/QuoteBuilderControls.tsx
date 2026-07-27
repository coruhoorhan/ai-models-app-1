import React from 'react';
import { Cpu, ShieldCheck } from 'lucide-react';

interface QuoteBuilderControlsProps {
  tokensBillions: number;
  setTokensBillions: (val: number) => void;
  slaTier: '99.9' | '99.99' | '99.999';
  setSlaTier: (val: '99.9' | '99.99' | '99.999') => void;
  dedicatedNodes: boolean;
  setDedicatedNodes: (val: boolean) => void;
  zeroDataRetention: boolean;
  setZeroDataRetention: (val: boolean) => void;
}

export function QuoteBuilderControls({
  tokensBillions,
  setTokensBillions,
  slaTier,
  setSlaTier,
  dedicatedNodes,
  setDedicatedNodes,
  zeroDataRetention,
  setZeroDataRetention
}: QuoteBuilderControlsProps) {
  return (
    <div className="lg:col-span-7 flex flex-col gap-lg">
      <div className="flex flex-col gap-xs">
        <div className="flex justify-between items-center">
          <span className="text-body-sm text-ink font-medium">Committed Monthly Volume</span>
          <span className="text-heading-sm font-mono text-ink">{tokensBillions} Billion Tokens</span>
        </div>
        <input
          type="range"
          min={1} max={20}
          value={tokensBillions}
          onChange={(e) => setTokensBillions(Number(e.target.value))}
          className="w-full accent-ink cursor-pointer h-2 bg-surface-sunken rounded-lg"
        />
        <div className="flex justify-between text-label text-subtle font-mono">
          <span>1B Tokens</span>
          <span>5B Tokens</span>
          <span>10B Tokens</span>
          <span>20B Tokens</span>
        </div>
      </div>

      <div className="flex flex-col gap-xs">
        <span className="text-body-sm text-ink font-medium">Uptime SLA Guarantee</span>
        <div className="flex flex-col lg:flex-row gap-xs">
          {[
            { tier: '99.9', label: '99.9% SLA', desc: 'Standard Edge' },
            { tier: '99.99', label: '99.99% SLA', desc: 'Dual-Region Failover' },
            { tier: '99.999', label: '99.999% SLA', desc: 'Multi-Cloud Active-Active' },
          ].map((item) => (
            <button
              key={item.tier}
              onClick={() => setSlaTier(item.tier as '99.9' | '99.99' | '99.999')}
              className={`flex-1 p-sm rounded-sm border text-left flex flex-col gap-[2px] transition-colors ${
                slaTier === item.tier ? 'border-ink bg-canvas font-bold' : 'border-hairline bg-surface hover:bg-canvas'
              }`}
            >
              <span className="text-body-sm text-ink">{item.label}</span>
              <span className="text-label text-muted">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-xs">
        <span className="text-body-sm text-ink font-medium">Security & Compliance</span>
        <div className="flex flex-col gap-xs">
          <label className="flex items-center gap-sm p-sm rounded-sm border border-hairline bg-surface cursor-pointer hover:bg-canvas transition-colors">
            <input 
              type="checkbox" 
              checked={dedicatedNodes}
              onChange={(e) => setDedicatedNodes(e.target.checked)}
              className="accent-ink w-4 h-4 cursor-pointer"
            />
            <Cpu className="w-4 h-4 text-ink" />
            <div className="flex flex-col">
              <span className="text-body-sm font-bold text-ink">Dedicated Edge Routing Nodes</span>
              <span className="text-body-sm text-muted">Isolated IP & zero queue depth</span>
            </div>
          </label>
          <label className="flex items-center gap-sm p-sm rounded-sm border border-hairline bg-surface cursor-pointer hover:bg-canvas transition-colors">
            <input 
              type="checkbox" 
              checked={zeroDataRetention}
              onChange={(e) => setZeroDataRetention(e.target.checked)}
              className="accent-ink w-4 h-4 cursor-pointer"
            />
            <ShieldCheck className="w-4 h-4 text-ink" />
            <div className="flex flex-col">
              <span className="text-body-sm font-bold text-ink">Zero Data Retention (Zero-Log)</span>
              <span className="text-body-sm text-muted">No prompt/completion logging</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
