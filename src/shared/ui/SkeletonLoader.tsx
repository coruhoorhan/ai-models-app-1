import React from 'react';
import { cn } from '../lib/cn';

export interface SkeletonLoaderProps {
  className?: string;
}

export function SkeletonLoader({ className }: SkeletonLoaderProps) {
  return (
    <div className={cn("bg-surface animate-pulse rounded-sm", className)} />
  );
}

export function SkeletonTable({ rows = 5, className }: { rows?: number, className?: string }) {
  return (
    <div className={cn("flex flex-col gap-sm w-full", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-md border-b border-hairline pb-sm">
          <SkeletonLoader className="w-1/4 h-5" />
          <SkeletonLoader className="w-1/4 h-5" />
          <SkeletonLoader className="w-1/4 h-5" />
          <SkeletonLoader className="w-1/4 h-5" />
        </div>
      ))}
    </div>
  );
}
