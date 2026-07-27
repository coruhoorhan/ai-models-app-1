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
    <Card className={cn("w-full flex flex-col gap-md", className)}>
      <div className="flex items-center justify-between p-lg border-b border-hairline">
        <h3 className="text-body font-semibold text-ink">API Maliyet Simülasyonu</h3>
        
        {/* Segmented Selector for Volume */}
        <div className="flex bg-surface-sunken p-[4px] rounded-sm border border-hairline-soft">
          {VOLUMES.map((v) => (
            <button
              key={v}
              onClick={() => setVolume(v)}
              className={cn(
                'px-sm py-xs text-caption font-medium rounded-xs transition-fast focus-ring',
                volume === v 
                  ? 'bg-canvas text-ink shadow-sm' 
                  : 'text-subtle hover:text-ink'
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col p-lg pt-0">
        <span className="text-label text-ink mb-md block">AYLIK TOKEN HACMİ: {volume} TOKEN</span>
        {MOCK_MODELS.map((model) => (
          <HighlightListItem
            key={model.name}
            modelName={model.name}
            developerInfo={model.developer}
            price={`$${(model.basePricePerM * volumeMultiplier).toFixed(2)}`}
          />
        ))}
        
        <Button variant="tertiary" icon={Share} className="w-full mt-lg justify-center">
          Paylaş
        </Button>
      </div>
    </Card>
  );
}
