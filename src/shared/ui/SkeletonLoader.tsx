import React from 'react';
import { cn } from '../lib/cn';

export interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function SkeletonLoader({ className, ...props }: SkeletonLoaderProps) {
  return (
    <div
      className={cn("animate-pulse bg-surface rounded-sm border border-hairline", className)}
      {...props}
    />
  );
}
