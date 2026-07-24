import React, { useState } from 'react';
import { Card } from '../../../shared/ui/Card';
import { cn } from '../../../shared/lib/cn';
import { Button } from '../../../shared/ui/Button';
import { Share } from 'lucide-react';
import { HighlightListItem } from './HighlightListItem';

interface CostSimulatorCardProps {
  className?: string;
}

const VOLUMES = ['1M', '10M', '100M', '1000M'];

const MOCK_MODELS = [
  { name: 'GPT-4o', developer: 'OpenAI', basePricePerM: 5.0 },
  { name: 'Claude 3.5 Sonnet', developer: 'Anthropic', basePricePerM: 3.0 },
  { name: 'Gemini 1.5 Pro', developer: 'Google', basePricePerM: 3.5 },
  { name: 'Llama 3.1 405B', developer: 'Meta', basePricePerM: 0.9 },
];

export function CostSimulatorCard({ className }: CostSimulatorCardProps) {
  const [volume, setVolume] = useState('10M');

  const volumeMultiplier = 
    volume === '1M' ? 1 :
    volume === '10M' ? 10 :
    volume === '100M' ? 100 : 1000;

  return (
    <Card className={cn("w-full flex flex-col p-lg gap-md", className)}>
      <div className="flex flex-col gap-xs">
        <span className="text-label text-ink">AYLIK TOKEN HACMİ: {volume} TOKEN</span>
        <h3 className="text-heading-sm text-ink">API Maliyet Simülasyonu</h3>
      </div>

      <div className="flex w-full bg-surface-sunken p-1 rounded-sm border border-hairline">
        {VOLUMES.map((v) => (
          <button
            key={v}
            onClick={() => setVolume(v)}
            className={cn(
              "flex-1 text-body-sm font-medium py-1.5 rounded-sm transition-colors text-center",
              volume === v ? "bg-canvas border border-hairline shadow-sm text-ink" : "text-muted hover:text-ink"
            )}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="flex flex-col mt-2">
        {MOCK_MODELS.map((model) => (
          <HighlightListItem
            key={model.name}
            modelName={model.name}
            developerInfo={model.developer}
            price={`$${(model.basePricePerM * volumeMultiplier).toFixed(2)} /ay`}
            className="py-sm"
          />
        ))}
      </div>

      <Button variant="tertiary" icon={Share} className="w-full mt-sm justify-center">
        Paylaş
      </Button>
    </Card>
  );
}
