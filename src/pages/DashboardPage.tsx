import React from 'react';
import { Calendar, Wallet, Send, DollarSign, Gauge, List, RefreshCw } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout';
import { StatCard } from '../shared/ui/StatCard';
import { Card } from '../shared/ui/Card';
import { Button } from '../shared/ui/Button';
import { DashboardChart } from '../features/dashboard/components/DashboardChart';
import { useDashboardStats } from '../features/dashboard/hooks/useDashboardStats';
import { DashboardApiInfoCard } from '../features/dashboard/components/DashboardApiInfoCard';
import { DashboardQuickLinks } from '../features/dashboard/components/DashboardQuickLinks';
import { DashboardRouterInspector } from '../features/dashboard/components/DashboardRouterInspector';
import { ApiKeyQuotaManager } from '../features/dashboard/components/ApiKeyQuotaManager';

export function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentRange = searchParams.get('range') || '7d';

  const { stats, chartData, isLoading } = useDashboardStats();

  const handleRangeChange = (range: string) => {
    setSearchParams({ range });
  };

  const formatCurrency = (val: number | undefined) => val !== undefined ? `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '...';
  const formatNumber = (val: number | undefined) => val !== undefined ? val.toLocaleString() : '...';

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
            <span className="text-body-sm text-ink">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-hairline rounded-md bg-canvas">
          <StatCard
            icon={Wallet}
            iconColor="chart-green"
            label="CURRENT BALANCE"
            value={formatCurrency(stats?.balance)}
            className="border-b md:border-b-0 md:border-r border-hairline rounded-none border-t-0 border-l-0"
            secondaryStat={{ label: 'CONSUMPTION', value: formatCurrency(stats?.consumption) }}
          />
          <StatCard
            icon={Send}
            iconColor="chart-blue"
            label="NUMBER OF REQUESTS"
            value={formatNumber(stats?.requestsCount)}
            className="border-b lg:border-b-0 lg:border-r border-hairline rounded-none border-t-0 border-l-0 md:border-r-0"
            secondaryStat={{ label: 'STATISTICAL QUOTA', value: formatNumber(stats?.requestsQuota) }}
          />
          <StatCard
            icon={DollarSign}
            iconColor="error"
            label="STATISTICAL TOKENS"
            value={formatNumber(stats?.tokensCount)}
            className="border-b md:border-b-0 md:border-r border-hairline rounded-none border-t-0 border-l-0"
            secondaryStat={{ label: 'STATISTICAL QUOTA', value: formatNumber(stats?.tokensQuota) }}
          />
          <StatCard
            icon={Gauge}
            iconColor="chart-green"
            label="AVERAGE RPM"
            value={formatNumber(stats?.avgRpm)}
            className="rounded-none border-t-0 border-l-0 border-r-0 border-b-0"
            secondaryStat={{ label: 'AVERAGE TPM', value: formatNumber(stats?.avgTpm) }}
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
                <Button variant="icon-circular" icon={RefreshCw} aria-label="Refresh dashboard data" />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-md mb-md">
              <div className="text-ink border-b-2 border-ink pb-[10px] text-body-sm px-sm font-medium cursor-pointer">Consumption Distribution</div>
              <div className="text-muted pb-[10px] text-body-sm px-sm cursor-pointer hover:text-ink">Consumption Trend</div>
              <div className="text-muted pb-[10px] text-body-sm px-sm cursor-pointer hover:text-ink">Calls Distribution</div>
              <div className="text-muted pb-[10px] text-body-sm px-sm cursor-pointer hover:text-ink">Calls Ranking</div>
            </div>

            <div className="text-label text-subtle mb-md">TOTAL: {formatCurrency(stats?.consumption)}</div>
            
            <div className="flex-1 bg-canvas flex items-center justify-center">
              {isLoading ? (
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
