import React, { useState } from 'react';
import { Card } from './Card';

interface SimModel {
  name: string;
  price_per_1m: number;
}

interface CostSimulatorCardProps {
  models: SimModel[];
}

export function CostSimulatorCard({ models }: CostSimulatorCardProps) {
  const volumes = [
    { label: '1M', value: 1 },
    { label: '10M', value: 10 },
    { label: '100M', value: 100 },
    { label: '1000M', value: 1000 },
  ];
  const [activeVolume, setActiveVolume] = useState(10);

  return (
    <Card className="flex flex-col h-full">
      <div className="p-md flex flex-col gap-xs">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-chart-blue" />
          <span className="text-label text-subtle uppercase tracking-widest">AYLIK TOKEN HACMİ</span>
        </div>
        <h3 className="text-heading-sm text-ink tracking-tight">API Maliyet Simülasyonu</h3>
      </div>

      <div className="px-md pb-md">
        <div className="flex w-full bg-surface-sunken p-1 rounded-sm border border-hairline mb-md">
          {volumes.map((vol) => (
            <button
              key={vol.value}
              onClick={() => setActiveVolume(vol.value)}
              className={`flex-1 text-center py-1.5 text-body-sm transition-all rounded-[4px] ${
                activeVolume === vol.value
                  ? 'bg-canvas border border-hairline text-ink shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {vol.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col">
          {models.slice(0, 4).map((model) => {
            const monthlyCost = model.price_per_1m * activeVolume;
            return (
              <div key={model.name} className="flex items-center justify-between py-2 border-b border-hairline/50 last:border-0">
                <span className="text-body-sm text-ink">{model.name}</span>
                <span className="font-mono text-body-sm font-bold text-ink">${monthlyCost.toFixed(2)} /ay</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
