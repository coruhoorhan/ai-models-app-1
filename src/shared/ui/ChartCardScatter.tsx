import React, { useState } from 'react';
import { Card } from './Card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ScatterData {
  id: string;
  name: string;
  x: number;
  y: number;
  category: string;
}

interface ChartCardScatterProps {
  data: ScatterData[];
}

export function ChartCardScatter({ data }: ChartCardScatterProps) {
  const [activeTab, setActiveTab] = useState('scatter');

  const getColor = (category: string) => {
    switch(category) {
      case 'Chat': return 'var(--color-chart-blue)';
      case 'Coding': return 'var(--color-chart-teal)';
      default: return 'var(--color-chart-pink)';
    }
  };

  return (
    <Card className="flex flex-col h-[400px]">
      <div className="p-md flex justify-between items-start">
        <div className="flex flex-col gap-xs">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-chart-purple" />
            <span className="text-label text-subtle uppercase tracking-widest">AKILLI ANALİZ & KIYAS</span>
          </div>
          <h3 className="text-heading-sm text-ink tracking-tight">Intelligence Hub 2030</h3>
        </div>
        <div className="flex items-center gap-2 border border-hairline rounded-full px-3 py-1 bg-live-bg">
          <div className="w-2 h-2 rounded-full bg-live animate-pulse" />
          <span className="text-label text-live">LIVE ANALYTICS</span>
        </div>
      </div>

      <div className="px-md flex gap-4 border-b border-hairline">
        <button
          onClick={() => setActiveTab('scatter')}
          className={`pb-2 text-body-sm transition-colors ${activeTab === 'scatter' ? 'text-ink border-b-2 border-ink font-medium' : 'text-muted'}`}
        >
          Dağılım
        </button>
        <button
          onClick={() => setActiveTab('radar')}
          className={`pb-2 text-body-sm transition-colors ${activeTab === 'radar' ? 'text-ink border-b-2 border-ink font-medium' : 'text-muted'}`}
        >
          Top 8 Radar
        </button>
      </div>

      <div className="flex-1 p-md pb-lg">
        {activeTab === 'scatter' ? (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-hairline)" vertical={false} />
              <XAxis
                type="number"
                dataKey="x"
                name="Fiyat ($/1M)"
                tick={{ fill: 'var(--color-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
                axisLine={false}
                tickLine={false}
                scale="log"
                domain={['auto', 'auto']}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Hız (tok/s)"
                tick={{ fill: 'var(--color-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: 'var(--color-canvas)', borderColor: 'var(--color-hairline)', borderRadius: '6px' }}
                itemStyle={{ color: 'var(--color-ink)', fontFamily: 'var(--font-mono)', fontSize: '13px' }}
                labelStyle={{ display: 'none' }}
              />
              <Scatter name="Modeller" data={data}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.category)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center border border-hairline border-dashed rounded-sm bg-surface-sunken">
            <span className="text-body-sm text-muted">Radar grafiği yakında eklenecek</span>
          </div>
        )}
      </div>
    </Card>
  );
}
