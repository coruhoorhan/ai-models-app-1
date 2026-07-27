import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartDataPoint {
  date: string;
  openai: number;
  anthropic: number;
  google: number;
}

interface DashboardChartProps {
  data: ChartDataPoint[] | null;
}

export function DashboardChart({ data }: DashboardChartProps) {
  if (!data || data.length === 0) {
    return <div className="text-body-sm text-subtle">No chart data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={250}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorOpenai" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-chart-teal)" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="var(--color-chart-teal)" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorAnthropic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-chart-pink)" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="var(--color-chart-pink)" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorGoogle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-chart-blue)" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="var(--color-chart-blue)" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-hairline)" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fontFamily: 'var(--font-mono)', fill: 'var(--color-muted)' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(val) => {
            const date = new Date(val);
            return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
          }}
        />
        <YAxis
          tick={{ fontSize: 11, fontFamily: 'var(--font-mono)', fill: 'var(--color-muted)' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(val) => `$${val}`}
        />
        <Tooltip
          contentStyle={{ backgroundColor: 'var(--color-canvas)', borderColor: 'var(--color-hairline)', borderRadius: '6px' }}
          itemStyle={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}
          labelStyle={{ color: 'var(--color-muted)', marginBottom: '4px', fontSize: '12px' }}
        />
        <Area type="monotone" dataKey="openai" stackId="1" stroke="var(--color-chart-teal)" fill="url(#colorOpenai)" />
        <Area type="monotone" dataKey="anthropic" stackId="1" stroke="var(--color-chart-pink)" fill="url(#colorAnthropic)" />
        <Area type="monotone" dataKey="google" stackId="1" stroke="var(--color-chart-blue)" fill="url(#colorGoogle)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
