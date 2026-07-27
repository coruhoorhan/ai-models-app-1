import React from 'react';
import { List, RefreshCw } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { DashboardChart } from './DashboardChart';

interface DashboardChartCardProps {
  currentRange: string;
  onRangeChange: (range: string) => void;
  chartData: any;
  isLoading: boolean;
}

export function DashboardChartCard({
  currentRange,
  onRangeChange,
  chartData,
  isLoading
}: DashboardChartCardProps) {
  return (
    <Card className="flex-1 p-lg flex flex-col min-h-[400px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-lg gap-md">
        <div className="flex items-center gap-sm">
          <List className="w-5 h-5 text-ink" />
          <h2 className="text-heading-sm text-ink">Model Data Analysis</h2>
        </div>
        <div className="flex items-center gap-sm">
          <select 
            value={currentRange}
            onChange={(e) => onRangeChange(e.target.value)}
            className="px-sm py-xxs border border-hairline rounded-sm text-body-sm text-ink bg-surface outline-none cursor-pointer"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="all">All time</option>
          </select>
          <Button variant="icon-circular" icon={RefreshCw} />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-md mb-md">
        <div className="text-ink border-b-2 border-ink pb-[10px] text-body-sm px-sm font-medium">Consumption Distribution</div>
        <div className="text-muted pb-[10px] text-body-sm px-sm">Consumption Trend</div>
        <div className="text-muted pb-[10px] text-body-sm px-sm">Calls Distribution</div>
        <div className="text-muted pb-[10px] text-body-sm px-sm">Calls Ranking</div>
      </div>

      <div className="text-label text-subtle mb-md">TOTAL: $142.50</div>
      
      <div className="flex-1 bg-canvas flex items-center justify-center min-h-[300px]">
        {isLoading ? (
          <div className="w-full h-full bg-surface rounded-sm animate-pulse" />
        ) : (
          <DashboardChart data={chartData} />
        )}
      </div>

      <div className="flex items-center gap-md mt-md">
        <div className="flex items-center gap-xs">
          <div className="w-2 h-2 rounded-xs bg-chart-teal" />
          <span className="text-mono-inline text-ink">gpt-4o</span>
        </div>
        <div className="flex items-center gap-xs">
          <div className="w-2 h-2 rounded-xs bg-chart-pink" />
          <span className="text-mono-inline text-ink">claude-3-opus</span>
        </div>
        <div className="flex items-center gap-xs">
          <div className="w-2 h-2 rounded-xs bg-chart-blue" />
          <span className="text-mono-inline text-ink">gemini-1.5-pro</span>
        </div>
      </div>
    </Card>
  );
}
