import React from 'react';
import { Card } from '../../../shared/ui/Card';
import { useModels } from '../hooks/useModels';

export function ModelsStatsRow() {
  const { stats, isLoading } = useModels();

  if (isLoading) {
    return (
      <Card className="flex flex-col sm:flex-row items-center divide-y sm:divide-y-0 sm:divide-x divide-hairline bg-canvas shadow-sm mt-md w-full md:w-max">
        <div className="w-full sm:w-auto py-md px-lg h-[72px] w-[120px] animate-pulse bg-surface-sunken" />
        <div className="w-full sm:w-auto py-md px-lg h-[72px] w-[120px] animate-pulse bg-surface-sunken" />
        <div className="w-full sm:w-auto py-md px-lg h-[72px] w-[120px] animate-pulse bg-surface-sunken" />
        <div className="w-full sm:w-auto py-md px-lg h-[72px] w-[120px] animate-pulse bg-surface-sunken" />
      </Card>
    );
  }

  return (
    <Card className="flex flex-col sm:flex-row items-center divide-y sm:divide-y-0 sm:divide-x divide-hairline bg-canvas shadow-sm mt-md w-full md:w-max">
      <div className="w-full sm:w-auto py-md px-lg flex items-baseline gap-sm">
        <span className="text-label text-subtle">MODELS</span>
        <span className="text-stat-number text-ink">{stats?.totalModels || 0}</span>
      </div>
      <div className="w-full sm:w-auto py-md px-lg flex items-baseline gap-sm">
        <span className="text-label text-subtle">PROVIDERS</span>
        <span className="text-stat-number text-ink">{stats?.totalProviders || 0}</span>
      </div>
      <div className="w-full sm:w-auto py-md px-lg flex items-baseline gap-sm">
        <span className="text-label text-subtle">FREE</span>
        <span className="text-stat-number text-ink">{stats?.freeModels || 0}</span>
      </div>
      <div className="w-full sm:w-auto py-md px-lg flex items-baseline gap-sm">
        <span className="text-label text-subtle">PAID</span>
        <span className="text-stat-number text-ink">{stats?.paidModels || 0}</span>
      </div>
    </Card>
  );
}
