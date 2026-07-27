import React from 'react';
import { CostSimulatorCardProps } from '../../types';
import { HighlightListItem } from './HighlightListItem';
import { cn } from '../lib/cn';

export function CostSimulatorCard({
  title,
  volumeOptions,
  activeVolume,
  onVolumeChange,
  models,
}: CostSimulatorCardProps) {
  return (
    <div className="flex flex-col bg-canvas border border-hairline rounded-md overflow-hidden h-full">
      <div className="flex items-center justify-between p-lg border-b border-hairline">
        <h3 className="text-body font-semibold text-ink">{title}</h3>
        
        {/* Segmented Selector for Volume */}
        <div className="flex bg-surface-sunken p-1 rounded-sm border border-hairline-soft">
          {volumeOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onVolumeChange(opt.id)}
              className={cn(
                'px-sm py-xs text-caption font-medium rounded-xs transition-fast focus-ring',
                activeVolume === opt.id 
                  ? 'bg-canvas text-ink shadow-sm' 
                  : 'text-subtle hover:text-ink'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col p-lg">
        {models.map((model, index) => (
          <HighlightListItem
            key={index}
            title={model.name}
            subtitle={`${model.percentage}% volume share`}
            priceText={model.cost}
          />
        ))}
      </div>
    </div>
  );
}
