import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../../../shared/api/dashboard.api';

export function DashboardChart({ data }: { data: ChartDataPoint[] }) {
  if (!data || data.length === 0) {
    return <div className="text-body-sm text-subtle">No data available</div>;
  }

  return (
    <div className="w-full h-full min-h-[250px] mt-md">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorGpt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-chart-teal)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--color-chart-teal)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorClaude" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-chart-pink)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--color-chart-pink)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorGemini" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-chart-blue)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--color-chart-blue)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--color-surface)', 
              borderColor: 'var(--color-hairline)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px'
            }}
            itemStyle={{
               fontFamily: 'var(--font-mono)',
               fontSize: '13px'
            }}
          />
          <Area type="monotone" dataKey="gpt" stroke="var(--color-chart-teal)" strokeWidth={2} fillOpacity={1} fill="url(#colorGpt)" />
          <Area type="monotone" dataKey="claude" stroke="var(--color-chart-pink)" strokeWidth={2} fillOpacity={1} fill="url(#colorClaude)" />
          <Area type="monotone" dataKey="gemini" stroke="var(--color-chart-blue)" strokeWidth={2} fillOpacity={1} fill="url(#colorGemini)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
