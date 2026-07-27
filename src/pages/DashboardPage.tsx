import React from 'react';
import { Calendar, Wallet, Send, DollarSign, Gauge } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout';
import { StatCard } from '../shared/ui/StatCard';
import { useDashboardStats, useDashboardChart } from '../features/dashboard/hooks/useDashboardData';
import { DashboardApiInfoCard } from '../features/dashboard/components/DashboardApiInfoCard';
import { DashboardQuickLinks } from '../features/dashboard/components/DashboardQuickLinks';
import { DashboardRouterInspector } from '../features/dashboard/components/DashboardRouterInspector';
import { DashboardChartCard } from '../features/dashboard/components/DashboardChartCard';

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
            value={statsData?.balance || '0'}
            className="border-b lg:border-b-0 md:border-r border-hairline rounded-none border-t-0 border-l-0"
            secondaryStat={{ label: 'CONSUMPTION', value: statsData?.consumption || '0' }}
            isLoading={isStatsLoading}
          />
          <StatCard
            icon={Send}
            iconColor="chart-blue"
            label="NUMBER OF REQUESTS"
            value={statsData?.requests || '0'}
            className="border-b lg:border-b-0 lg:border-r border-hairline rounded-none border-t-0 border-l-0 md:border-r-0"
            secondaryStat={{ label: 'STATISTICAL COUNT', value: statsData?.statisticalCount || '0' }}
            isLoading={isStatsLoading}
          />
          <StatCard
            icon={DollarSign}
            iconColor="error"
            label="STATISTICAL QUOTA"
            value={statsData?.quota || '0'}
            className="border-b md:border-b-0 md:border-r border-hairline rounded-none border-t-0 border-l-0"
            secondaryStat={{ label: 'STATISTICAL TOKENS', value: statsData?.tokens || '0' }}
            isLoading={isStatsLoading}
          />
          <StatCard
            icon={Gauge}
            iconColor="chart-green"
            label="AVERAGE RPM"
            value={statsData?.averageRpm || '0'}
            className="rounded-none border-t-0 border-l-0 border-r-0 border-b-0"
            secondaryStat={{ label: 'AVERAGE TPM', value: statsData?.averageTpm || '0' }}
            isLoading={isStatsLoading}
          />
        </div>

        {/* Chart & Side Card */}
        <div className="flex flex-col xl:flex-row gap-md">
          <DashboardChartCard 
            currentRange={currentRange}
            onRangeChange={handleRangeChange}
            chartData={chartData}
            isLoading={isChartLoading}
          />
          <DashboardApiInfoCard />
        </div>

        {/* Live Router & Code Generator Inspector */}
        <DashboardRouterInspector />

        <DashboardQuickLinks />
      </div>
    </DashboardLayout>
  );
}
