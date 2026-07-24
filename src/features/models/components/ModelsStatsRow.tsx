import React from 'react';
import { Card } from '../../../shared/ui/Card';

export function ModelsStatsRow() {
  return (
    <Card className="flex flex-col sm:flex-row items-center divide-y sm:divide-y-0 sm:divide-x divide-hairline bg-canvas shadow-sm mt-md w-full md:w-max">
      <div className="w-full sm:w-auto py-md px-lg flex items-baseline gap-sm">
        <span className="text-label text-subtle">MODELS</span>
        <span className="text-stat-number text-ink">217</span>
      </div>
      <div className="w-full sm:w-auto py-md px-lg flex items-baseline gap-sm">
        <span className="text-label text-subtle">PROVIDERS</span>
        <span className="text-stat-number text-ink">36+</span>
      </div>
      <div className="w-full sm:w-auto py-md px-lg flex items-baseline gap-sm">
        <span className="text-label text-subtle">FREE</span>
        <span className="text-stat-number text-ink">122</span>
      </div>
      <div className="w-full sm:w-auto py-md px-lg flex items-baseline gap-sm">
        <span className="text-label text-subtle">PAID</span>
        <span className="text-stat-number text-ink">95</span>
      </div>
    </Card>
  );
}
