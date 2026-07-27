import React from 'react';
import { cn } from '../lib/cn';
import { BadgeCategoryProps } from '../../types';

export function BadgeCategory({ label, variant = 'primary', icon: Icon }: BadgeCategoryProps) {
  const baseStyles = "inline-flex items-center justify-center gap-xs px-sm py-[2px] rounded-sm text-caption-bold border transition-fast";
  
  const variants = {
    'primary': "bg-ink text-canvas border-transparent",
    'secondary': "bg-surface-sunken text-ink border-hairline hover:bg-surface",
    'outline': "bg-transparent text-subtle border-hairline hover:text-ink hover:border-ink",
    'status-live': "bg-live-bg text-live border-live/20",
    'error': "bg-red-50 text-error border-error/20"
  };

  return (
    <span className={cn(baseStyles, variants[variant])}>
      {variant === 'status-live' && <div className="w-1.5 h-1.5 rounded-full bg-live animate-pulse" />}
      {Icon && <Icon className="w-3 h-3" />}
      {label}
    </span>
  );
}
