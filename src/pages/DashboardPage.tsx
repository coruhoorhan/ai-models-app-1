import React from 'react';
import { Calendar, Wallet, Send, DollarSign, Gauge, List, RefreshCw } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout';
import { StatCard } from '../shared/ui/StatCard';
import { Card } from '../shared/ui/Card';
import { Button } from '../shared/ui/Button';
import { DashboardChart } from '../features/dashboard/components/DashboardChart';
import { useDashboardStats, useDashboardChart } from '../features/dashboard/hooks/useDashboardData';
import { DashboardApiInfoCard } from '../features/dashboard/components/DashboardApiInfoCard';
import { DashboardQuickLinks } from '../features/dashboard/components/DashboardQuickLinks';
import { DashboardRouterInspector } from '../features/dashboard/components/DashboardRouterInspector';
import { ApiKeyQuotaManager } from '../features/dashboard/components/ApiKeyQuotaManager';

export function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentRange = searchParams.get('range') || '7d';

  const { data: statsData, isLoading: isStatsLoading } = useDashboardStats();
  const { data: chartData, isLoading: isChartLoading } = useDashboardChart(currentRange);

  const handleRangeChange = (range: string) => {
    setSearchParams({ range });
  };

  return (
    <DashboardLayout>
      <div className="w-full p-md 2xl:p-lg flex flex-col gap-lg">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md">
          <div>
            <div className="flex items-center gap-xs mb-xs">
              <span className="w-2 h-2 rounded-full bg-live" />
              <span className="text-label text-subtle">DASHBOARD</span>
            </div>
            <h1 className="text-heading-md text-ink">Good afternoon, admin</h1>
          </div>
          <div className="flex items-center gap-sm px-sm py-xs border border-hairline rounded-sm bg-surface">
            <Calendar className="w-4 h-4 text-muted" />
            <span className="text-body-sm text-ink">Apr 23, 2024</span>
          </div>
        </div>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-hairline rounded-md bg-canvas">
          <StatCard
            icon={Wallet}
            iconColor="chart-green"
            label="CURRENT BALANCE"
            value={isStatsLoading ? '...' : statsData?.balance || '0'}
            className="border-b lg:border-b-0 md:border-r border-hairline rounded-none border-t-0 border-l-0"
            secondaryStat={{ label: 'CONSUMPTION', value: isStatsLoading ? '...' : statsData?.consumption || '0' }}
          />
          <StatCard
            icon={Send}
            iconColor="chart-blue"
            label="NUMBER OF REQUESTS"
            value={isStatsLoading ? '...' : statsData?.requests || '0'}
            className="border-b lg:border-b-0 lg:border-r border-hairline rounded-none border-t-0 border-l-0 md:border-r-0"
            secondaryStat={{ label: 'STATISTICAL COUNT', value: isStatsLoading ? '...' : statsData?.statisticalCount || '0' }}
          />
          <StatCard
            icon={DollarSign}
            iconColor="error"
            label="STATISTICAL QUOTA"
            value={isStatsLoading ? '...' : statsData?.quota || '0'}
            className="border-b md:border-b-0 md:border-r border-hairline rounded-none border-t-0 border-l-0"
            secondaryStat={{ label: 'STATISTICAL TOKENS', value: isStatsLoading ? '...' : statsData?.tokens || '0' }}
          />
          <StatCard
            icon={Gauge}
            iconColor="chart-green"
            label="AVERAGE RPM"
            value={isStatsLoading ? '...' : statsData?.averageRpm || '0'}
            className="rounded-none border-t-0 border-l-0 border-r-0 border-b-0"
            secondaryStat={{ label: 'AVERAGE TPM', value: isStatsLoading ? '...' : statsData?.averageTpm || '0' }}
          />
        </div>

        {/* Chart & Side Card */}
        <div className="flex flex-col xl:flex-row gap-md">
          <Card className="flex-1 p-lg flex flex-col min-h-[400px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-lg gap-md">
              <div className="flex items-center gap-sm">
                <List className="w-5 h-5 text-ink" />
                <h2 className="text-heading-sm text-ink">Model Data Analysis</h2>
              </div>
              <div className="flex items-center gap-sm">
                <select 
                  value={currentRange}
                  onChange={(e) => handleRangeChange(e.target.value)}
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
            
            <div className="flex-1 bg-canvas flex items-center justify-center">
              {isChartLoading ? (
                <div className="text-body-sm text-subtle">Loading chart data...</div>
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

          <DashboardApiInfoCard />
        </div>

        {/* Live Router & Code Generator Inspector */}
        <DashboardRouterInspector />

        {/* API Key & Scoped Quota Manager */}
        <ApiKeyQuotaManager />

        <DashboardQuickLinks />
      </div>
    </DashboardLayout>
  );
}
