import React from 'react';
import { cn } from '../lib/cn';

export interface BadgeProps {
  variant: 'status-live' | 'free' | 'category' | 'beta' | 'error' | 'new';
  label: string;
  showDot?: boolean; 
  categoryColor?: 'chart-green' | 'chart-pink' | 'chart-blue' | 'chart-orange' | 'chart-teal'; 
  className?: string;
}

export function Badge({ variant, label, showDot, categoryColor, className }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center',
        variant === 'status-live' && 'px-[12px] py-[6px] border border-hairline rounded-full bg-canvas',
        variant === 'free' && 'px-xs py-[2px] bg-live-bg text-live rounded-xs text-label normal-case',
        variant === 'category' && 'text-label', 
        (variant === 'beta' || variant === 'new') && 'px-xs py-[2px] bg-surface text-muted border border-hairline rounded-xs text-label',
        variant === 'error' && 'px-xs py-[2px] bg-red-50 text-error rounded-xs text-label normal-case',
        className
      )}
    >
      {variant === 'status-live' && (showDot ?? true) && (
        <span className="w-2 h-2 rounded-full bg-live mr-sm" />
      )}
      {variant === 'status-live' && (
        <span className="text-label text-ink">{label}</span>
      )}
      
      {(variant === 'free' || variant === 'beta' || variant === 'new' || variant === 'error') && (
        <span className={cn(variant === 'free' && 'normal-case')}>{label}</span>
      )}
      {variant === 'category' && (
        <span
          className={cn(
            'text-label',
            categoryColor === 'chart-green' && 'text-chart-green',
            categoryColor === 'chart-pink' && 'text-chart-pink',
            categoryColor === 'chart-blue' && 'text-chart-blue',
            categoryColor === 'chart-orange' && 'text-chart-orange',
            categoryColor === 'chart-teal' && 'text-chart-teal'
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
