import React from 'react';
import { cn } from '../lib/cn';
import { SkeletonLoaderProps } from '../../types';

export function SkeletonLoader({ type, count = 1 }: SkeletonLoaderProps) {
  const renderItems = (renderFn: (index: number) => React.ReactNode) => {
    return Array.from({ length: count }).map((_, i) => renderFn(i));
  };

  switch (type) {
    case 'stat':
      return (
        <div className="flex flex-col gap-sm animate-pulse">
          <div className="h-3 w-16 bg-surface-sunken rounded-sm" />
          <div className="h-8 w-24 bg-surface-sunken rounded-sm" />
        </div>
      );
      
    case 'card':
      return (
        <div className="flex flex-col gap-md">
          {renderItems((i) => (
            <div key={`card-${i}`} className="w-full h-48 bg-surface-sunken rounded-sm animate-pulse" />
          ))}
        </div>
      );
      
    case 'list':
      return (
        <div className="flex flex-col">
          {renderItems((i) => (
            <div key={`list-${i}`} className="w-full flex items-center justify-between py-md border-b border-hairline-soft last:border-0 animate-pulse">
              <div className="flex flex-col gap-xs">
                <div className="h-4 w-32 bg-surface-sunken rounded-sm" />
                <div className="h-3 w-48 bg-surface-sunken rounded-sm" />
              </div>
              <div className="h-6 w-16 bg-surface-sunken rounded-xs" />
            </div>
          ))}
        </div>
      );
      
    case 'table':
      return (
        <div className="w-full border border-hairline rounded-sm bg-canvas overflow-hidden">
          <div className="w-full h-10 bg-surface border-b border-hairline" />
          {renderItems((i) => (
            <div key={`table-row-${i}`} className="w-full h-12 flex items-center px-md border-b border-hairline-soft last:border-0 animate-pulse">
              <div className="flex-1 flex gap-md">
                <div className="h-4 w-1/4 bg-surface-sunken rounded-sm" />
                <div className="h-4 w-1/3 bg-surface-sunken rounded-sm" />
                <div className="h-4 w-1/6 bg-surface-sunken rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
