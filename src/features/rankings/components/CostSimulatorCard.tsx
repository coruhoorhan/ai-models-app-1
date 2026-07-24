import React, { useState } from 'react';
import { Card } from '../../../shared/ui/Card';
import { Share2 } from 'lucide-react';
import { cn } from '../../../shared/lib/cn';

interface SimulatorModel {
  name: string;
  pricePer1M: number;
}

interface CostSimulatorCardProps {
  models?: SimulatorModel[];
  className?: string;
}

const DEFAULT_MODELS = [
  { name: 'GPT-4o', pricePer1M: 5.00 },
  { name: 'Claude 3.5 Sonnet', pricePer1M: 3.00 },
  { name: 'Gemini 1.5 Pro', pricePer1M: 1.25 }
];

export function CostSimulatorCard({ models = DEFAULT_MODELS, className }: CostSimulatorCardProps) {
  const [volume, setVolume] = useState<number>(10); // millions

  const volumes = [
    { label: '1M', value: 1 },
    { label: '10M', value: 10 },
    { label: '100M', value: 100 },
    { label: '1000M', value: 1000 },
  ];

  return (
    <Card className={cn("flex flex-col border border-hairline bg-surface w-full overflow-hidden", className)}>
      <div className="flex flex-col gap-sm p-md border-b border-hairline">
        <div className="flex flex-col gap-xs">
          <span className="text-label text-subtle uppercase">AYLIK TOKEN HACMİ: {volume >= 1000 ? `${volume/1000} MİLYAR` : `${volume} MİLYON`} TOKEN</span>
          <h3 className="text-body-md-bold text-ink">API Maliyet Simülasyonu</h3>
        </div>

        <div className="flex p-xs bg-surface-sunken rounded-sm w-full border border-hairline mt-xs">
          {volumes.map(v => (
            <button
              key={v.value}
              onClick={() => setVolume(v.value)}
              className={`flex-1 py-[2px] text-body-sm transition-colors rounded-[4px] ${
                volume === v.value ? 'bg-surface shadow-sm text-ink' : 'text-subtle hover:text-muted'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col p-md gap-0">
        {models.map((model, idx) => (
          <div key={idx} className="flex items-center justify-between py-sm border-b border-hairline-soft last:border-0">
            <span className="text-body-sm text-ink truncate max-w-[160px]">{model.name}</span>
            <span className="text-body-sm-bold text-ink font-mono">${(model.pricePer1M * volume).toFixed(2)} <span className="text-muted font-sans font-normal text-caption">/ay</span></span>
          </div>
        ))}
      </div>

      <div className="p-md pt-0 mt-2">
        <button className="w-full flex items-center justify-center gap-xs py-sm border border-hairline bg-surface-sunken hover:bg-surface text-body-sm-bold text-ink rounded-sm transition-colors">
          <Share2 className="w-4 h-4" />
          <span>Paylaş</span>
        </button>
      </div>
    </Card>
  );
}
