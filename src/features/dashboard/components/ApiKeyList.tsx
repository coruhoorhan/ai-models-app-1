import React from 'react';
import { Sliders } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';

interface ApiKeyItem {
  id: string;
  name: string;
  keyMasked: string;
  monthlyLimit: number;
  spent: number;
  rpm: number;
  status: 'active' | 'revoked';
  createdAt: string;
}

interface ApiKeyListProps {
  keys: ApiKeyItem[];
}

export function ApiKeyList({ keys }: ApiKeyListProps) {
  return (
    <div className="lg:col-span-7 bg-canvas p-md border border-hairline rounded-sm flex flex-col gap-sm overflow-hidden">
      <div className="flex items-center justify-between pb-xs border-b border-hairline">
        <span className="text-label text-subtle">ACTIVE KEYS & USAGE</span>
      </div>

      <div className="flex-1 overflow-y-auto pr-xs flex flex-col gap-sm">
        {keys.map((k) => (
          <div key={k.id} className="p-sm bg-surface border border-hairline rounded-sm flex flex-col gap-sm">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-[2px]">
                <h4 className="text-body-sm font-bold text-ink flex items-center gap-xs">
                  {k.name}
                  {k.status === 'active' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-live" />
                  )}
                </h4>
                <span className="text-mono-inline text-muted bg-surface-sunken px-xs py-[2px] rounded-xs w-fit">
                  {k.keyMasked}
                </span>
              </div>
              <Button variant="secondary" icon={Sliders} size="sm">
                Edit
              </Button>
            </div>

            <div className="flex flex-col gap-xs pt-xs border-t border-hairline/50">
              <div className="flex justify-between items-center text-body-sm font-mono">
                <span className="text-muted">Usage (${k.spent.toFixed(2)} / ${k.monthlyLimit})</span>
                <span className="text-ink">
                  {((k.spent / k.monthlyLimit) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-[4px] bg-surface-sunken rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    (k.spent / k.monthlyLimit) > 0.8 ? 'bg-chart-orange' : 'bg-chart-blue'
                  }`}
                  style={{ width: `${Math.min((k.spent / k.monthlyLimit) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-md text-label text-subtle pt-xs">
              <span>{k.rpm} RPM</span>
              <span>•</span>
              <span>Created: {k.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
