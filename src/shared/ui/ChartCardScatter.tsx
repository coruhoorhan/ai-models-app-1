import React, { useMemo } from 'react';
import { ChartCardScatterProps } from '../../types';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { cn } from '../lib/cn';

export function ChartCardScatter({
  title,
  data,
  xKey,
  yKey,
  zKey,
  tabs,
  activeTab,
  onTabChange,
  xLabel,
  yLabel,
  tooltipFormatter
}: ChartCardScatterProps) {
  
  const getThemeColor = (index: number) => {
    const colors = [
      'var(--color-chart-teal)',
      'var(--color-chart-pink)',
      'var(--color-chart-blue)',
      'var(--color-chart-orange)',
      'var(--color-chart-purple)'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="flex flex-col bg-canvas border border-hairline rounded-md h-full w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-lg border-b border-hairline gap-md">
        <h3 className="text-body font-semibold text-ink">{title}</h3>
        
        {tabs && activeTab && onTabChange && (
          <div className="flex bg-surface-sunken p-[4px] rounded-sm border border-hairline">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'px-sm py-xs text-caption font-medium rounded-xs transition-fast focus-ring',
                  activeTab === tab.id 
                    ? 'bg-canvas text-ink shadow-sm' 
                    : 'text-subtle hover:text-ink'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 p-lg min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-hairline)" vertical={false} />
            <XAxis 
              type="number" 
              dataKey={xKey} 
              name={xLabel || xKey} 
              tick={{ fill: 'var(--color-subtle)', fontSize: 11, fontFamily: 'var(--font-sans)' }}
              tickLine={false}
              axisLine={{ stroke: 'var(--color-hairline)' }}
              label={xLabel ? { value: xLabel, position: 'bottom', fill: 'var(--color-subtle)', fontSize: 11, fontFamily: 'var(--font-sans)' } : undefined}
            />
            <YAxis 
              type="number" 
              dataKey={yKey} 
              name={yLabel || yKey}
              tick={{ fill: 'var(--color-subtle)', fontSize: 11, fontFamily: 'var(--font-sans)' }}
              tickLine={false}
              axisLine={false}
              label={yLabel ? { value: yLabel, angle: -90, position: 'left', fill: 'var(--color-subtle)', fontSize: 11, fontFamily: 'var(--font-sans)' } : undefined}
            />
            {zKey && <ZAxis type="number" dataKey={zKey} range={[20, 400]} name={zKey} />}
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ 
                backgroundColor: 'var(--color-canvas)', 
                borderColor: 'var(--color-hairline)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                color: 'var(--color-ink)'
              }}
              itemStyle={{ color: 'var(--color-ink)', fontFamily: 'var(--font-sans)', fontSize: 13 }}
              formatter={tooltipFormatter ? tooltipFormatter : (value: any) => [value, '']}
            />
            <Scatter name={title} data={data}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getThemeColor(index)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
