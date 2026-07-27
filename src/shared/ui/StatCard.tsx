import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/cn';
import { Card } from './Card';
import { SkeletonLoader } from './SkeletonLoader';

export interface StatCardProps {
  icon?: LucideIcon;
  iconColor?: 'live' | 'error' | 'chart-teal' | 'chart-blue' | 'chart-pink' | 'chart-purple' | 'chart-orange' | 'chart-green';
  label: string;          
  value: string | number; 
  description?: string;   
  secondaryStat?: { label: string; value: string | number }; 
  className?: string;
  isLoading?: boolean;
}

const colorMap = {
  'live': 'text-live',
  'error': 'text-error',
  'chart-teal': 'text-chart-teal',
  'chart-blue': 'text-chart-blue',
  'chart-pink': 'text-chart-pink',
  'chart-purple': 'text-chart-purple',
  'chart-orange': 'text-chart-orange',
  'chart-green': 'text-chart-green',
};

export function StatCard({
  icon: Icon,
  iconColor,
  label,
  value,
  description,
  secondaryStat,
  className,
  isLoading
}: StatCardProps) {
  if (isLoading) {
    return (
      <Card className={cn('p-md flex flex-col', className)}>
        <div className="flex items-center gap-xs mb-xs">
          <SkeletonLoader className="w-4 h-4" />
          <SkeletonLoader className="w-16 h-4" />
        </div>
        <SkeletonLoader className="w-24 h-8 mb-1 mt-1" />
        {description && (
          <SkeletonLoader className="w-20 h-4 mt-1" />
        )}
        {secondaryStat && (
          <>
            <div className="h-px w-full bg-hairline my-md" />
            <div className="flex flex-col gap-xs">
              <SkeletonLoader className="w-16 h-4" />
              <SkeletonLoader className="w-20 h-6" />
            </div>
          </>
        )}
      </Card>
    );
  }

  return (
    <Card className={cn('p-md', className)}>
      <div className="flex flex-col">
        <div className="flex items-center gap-xs mb-xs">
          {Icon && (
            <Icon className={cn('w-4 h-4', iconColor && colorMap[iconColor])} />
          )}
          <span className="text-label text-subtle">{label}</span>
        </div>
        <div className="text-stat-number text-ink mb-1">{value}</div>
        {description && (
          <div className="text-body-sm text-muted">{description}</div>
        )}
      </div>

      {secondaryStat && (
        <>
          <div className="h-px w-full bg-hairline my-md" />
          <div className="flex flex-col">
            <span className="text-label text-subtle mb-xs">{secondaryStat.label}</span>
            <div className="text-stat-number text-ink">{secondaryStat.value}</div>
          </div>
        </>
      )}
    </Card>
  );
}
