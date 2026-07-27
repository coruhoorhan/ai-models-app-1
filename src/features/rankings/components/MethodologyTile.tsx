import React from 'react';
import { cn } from '../../../shared/lib/cn';
import { LucideIcon } from 'lucide-react';

interface MethodologyTileProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function MethodologyTile({ icon: Icon, title, description, className }: MethodologyTileProps) {
  return (
    <div className={cn("flex flex-col gap-sm p-lg rounded-sm bg-surface transition-fast hover:bg-surface-sunken", className)}>
      <div className="w-10 h-10 rounded-full bg-canvas border border-hairline flex items-center justify-center">
        <Icon className="w-5 h-5 text-ink" />
      </div>
      <div className="flex flex-col gap-xs mt-xs">
        <h3 className="text-body font-medium text-ink">{title}</h3>
        <p className="text-body-sm text-subtle leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
