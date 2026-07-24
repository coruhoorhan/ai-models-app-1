import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../../shared/lib/cn';

interface MethodologyTileProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function MethodologyTile({ icon: Icon, title, description, className }: MethodologyTileProps) {
  return (
    <div className={cn("flex flex-col gap-sm p-lg border border-hairline bg-surface rounded-md h-full hover:border-chart-teal/30 transition-colors", className)}>
      <div className="w-10 h-10 rounded-full bg-surface-sunken flex items-center justify-center border border-hairline">
        <Icon className="w-5 h-5 text-chart-teal" />
      </div>
      <h4 className="text-body-md-bold text-ink mt-sm">{title}</h4>
      <p className="text-body-sm text-subtle leading-relaxed">
        {description}
      </p>
    </div>
  );
}
