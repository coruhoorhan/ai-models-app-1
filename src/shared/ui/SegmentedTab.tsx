import React from 'react';
import { cn } from '../lib/cn';
import { SegmentedTabProps } from '../../types';

export function SegmentedTab({ tabs, activeTab, onChange }: SegmentedTabProps) {
  return (
    <div className="flex bg-surface-sunken p-[4px] rounded-sm border border-hairline-soft">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex-1 px-sm py-xs text-caption font-medium rounded-xs transition-fast text-center focus-ring',
            activeTab === tab.id 
              ? 'bg-canvas text-ink shadow-sm' 
              : 'text-subtle hover:text-ink'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
