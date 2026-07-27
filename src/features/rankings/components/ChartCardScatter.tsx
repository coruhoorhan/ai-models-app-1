import React, { useState } from 'react';
import { Card } from '../../../shared/ui/Card';
import { cn } from '../../../shared/lib/cn';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
  id: string;
  name: string;
  x: number; // Fiyat Rentabilite vs
  y: number; // Hız
  color: string;
}

interface ChartCardScatterProps {
  title: string;
  subtitle: string;
  isLive?: boolean;
  data: DataPoint[];
  className?: string;
}

export function ChartCardScatter({ title, subtitle, isLive, data, className }: ChartCardScatterProps) {
  const [activeTab, setActiveTab] = useState<'scatter' | 'radar'>('scatter');

  return (
    <Card className={cn("w-full flex flex-col p-lg gap-md", className)}>
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-xs">
          <span className="text-label text-ink">{subtitle}</span>
          <h3 className="text-heading-sm text-ink">{title}</h3>
        </div>
        {isLive && (
          <div className="flex items-center gap-xs bg-live-bg px-2 py-1 rounded-sm border border-live/20">
            <div className="w-1.5 h-1.5 rounded-full bg-live animate-pulse" />
            <span className="text-label text-live">LIVE ANALYTICS</span>
          </div>
        )}
      </div>

      <div className="flex w-full bg-surface-sunken p-1 rounded-sm border border-hairline">
        <button
          onClick={() => setActiveTab('scatter')}
          className={cn(
            "flex-1 text-body-sm font-medium py-1.5 rounded-sm transition-fast text-center focus-ring",
            activeTab === 'scatter' ? "bg-canvas border border-hairline shadow-sm text-ink" : "text-subtle hover:text-ink"
          )}
        >
          Dağılım
        </button>
        <button
          onClick={() => setActiveTab('radar')}
          className={cn(
            "flex-1 text-body-sm font-medium py-1.5 rounded-sm transition-fast text-center focus-ring",
            activeTab === 'radar' ? "bg-canvas border border-hairline shadow-sm text-ink" : "text-subtle hover:text-ink"
          )}
        >
          Top 8 Radar
        </button>
      </div>

      <div className="w-full h-[240px] mt-2">
        {activeTab === 'scatter' ? (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-hairline)" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Fiyat" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'var(--color-muted)' }}
                scale="log"
                domain={['auto', 'auto']}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Hız" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'var(--color-muted)' }} 
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: '6px', fontSize: '13px' }}
                itemStyle={{ color: 'var(--color-ink)' }}
              />
              {data.map((entry, index) => (
                <Scatter key={index} name={entry.name} data={[entry]} fill={entry.color} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-body-sm text-muted">
            Radar view is under construction.
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-sm mt-2">
        {data.slice(0, 3).map((item) => (
          <div key={item.id} className="flex items-center gap-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-caption text-muted">{item.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
