import React, { useState } from 'react';
import { Card } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

interface ScatterDataPoint {
  x: number;
  y: number;
  z: number;
  name: string;
  category: string;
}

interface ChartCardScatterProps {
  data: ScatterDataPoint[];
}

const CATEGORY_COLORS: Record<string, string> = {
  'Coding': 'var(--color-chart-teal)',
  'Chat': 'var(--color-chart-blue)',
  'Character': 'var(--color-chart-pink)',
  'default': 'var(--color-chart-orange)'
};

export function ChartCardScatter({ data }: ChartCardScatterProps) {
  const [activeTab, setActiveTab] = useState<'Dağılım' | 'Top 8 Radar'>('Dağılım');

  return (
    <Card className="flex flex-col border border-hairline bg-surface w-full overflow-hidden">
      <div className="flex flex-col gap-sm p-md border-b border-hairline">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-xs">
            <span className="text-label text-subtle uppercase">AKILLI ANALİZ & KIYAS</span>
            <h3 className="text-body-md-bold text-ink">Intelligence Hub 2030</h3>
          </div>
          <Badge variant="status-live" label="LIVE ANALYTICS" />
        </div>

        <div className="flex p-xs bg-surface-sunken rounded-sm w-max border border-hairline mt-xs">
          <button
            onClick={() => setActiveTab('Dağılım')}
            className={`px-sm py-[2px] text-body-sm transition-colors rounded-[4px] ${
              activeTab === 'Dağılım' ? 'bg-surface shadow-sm text-ink' : 'text-subtle hover:text-muted'
            }`}
          >
            Dağılım
          </button>
          <button
            onClick={() => setActiveTab('Top 8 Radar')}
            className={`px-sm py-[2px] text-body-sm transition-colors rounded-[4px] ${
              activeTab === 'Top 8 Radar' ? 'bg-surface shadow-sm text-ink' : 'text-subtle hover:text-muted'
            }`}
          >
            Top 8 Radar
          </button>
        </div>
      </div>

      <div className="p-md h-[240px] w-full">
        {activeTab === 'Dağılım' ? (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-hairline)" vertical={false} />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Fiyat" 
                scale="log" 
                domain={['auto', 'auto']}
                tick={{ fill: 'var(--color-muted)', fontSize: 11, fontFamily: 'monospace' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Hız" 
                tick={{ fill: 'var(--color-muted)', fontSize: 11, fontFamily: 'monospace' }}
                axisLine={false}
                tickLine={false}
              />
              <ZAxis type="number" dataKey="z" range={[20, 100]} name="Context" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-surface border border-hairline p-sm rounded-sm shadow-md">
                        <p className="text-body-sm-bold text-ink mb-1">{data.name}</p>
                        <p className="text-body-sm text-muted font-mono">Fiyat: ${data.x} /1M</p>
                        <p className="text-body-sm text-muted font-mono">Hız: {data.y} tok/s</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="Models" data={data}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.category] || CATEGORY_COLORS.default} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center border border-hairline border-dashed rounded-sm bg-surface-sunken">
            <span className="text-body-sm text-muted">Radar grafiği görselleştirme alanı</span>
          </div>
        )}
      </div>

      <div className="p-sm px-md border-t border-hairline bg-surface-sunken flex items-center gap-md">
        <div className="flex items-center gap-xs">
          <span className="w-2 h-2 rounded-full bg-chart-teal" />
          <span className="text-caption text-subtle">Coding</span>
        </div>
        <div className="flex items-center gap-xs">
          <span className="w-2 h-2 rounded-full bg-chart-blue" />
          <span className="text-caption text-subtle">Chat</span>
        </div>
        <div className="flex items-center gap-xs">
          <span className="w-2 h-2 rounded-full bg-chart-pink" />
          <span className="text-caption text-subtle">Character</span>
        </div>
      </div>
    </Card>
  );
}
