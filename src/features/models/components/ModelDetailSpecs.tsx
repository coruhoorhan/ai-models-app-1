import React from 'react';
import { Zap, ShieldCheck } from 'lucide-react';
import { ModelConfig } from '../../../shared/api/models.api';
import { Badge } from '../../../shared/ui/Badge';

export function ModelDetailSpecs({ model }: { model: ModelConfig }) {
  return (
    <div className="grid grid-cols-2 gap-sm">
      <div className="p-md rounded-sm border border-hairline bg-surface flex flex-col">
        <span className="text-label text-subtle mb-xs">CONTEXT WINDOW</span>
        <span className="text-body font-bold font-mono text-ink">{model.context}</span>
      </div>
      <div className="p-md rounded-sm border border-hairline bg-surface flex flex-col">
        <span className="text-label text-subtle mb-xs">PRICING TIER</span>
        <span className="text-body font-bold font-mono text-ink">
          {model.isFree ? <Badge variant="status-live" label="FREE" /> : model.price}
        </span>
      </div>
      <div className="p-md rounded-sm border border-hairline bg-surface flex flex-col">
        <span className="text-label text-subtle mb-xs">LATENCY / SPEED</span>
        <span className="text-body font-bold font-mono text-ink flex items-center gap-xs">
          <Zap className="w-3.5 h-3.5 text-chart-teal" />
          {model.speed}
        </span>
      </div>
      <div className="p-md rounded-sm border border-hairline bg-surface flex flex-col">
        <span className="text-label text-subtle mb-xs">PROVIDER STATUS</span>
        <span className="text-body font-bold font-mono text-live flex items-center gap-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          99.98% Active
        </span>
      </div>
    </div>
  );
}
