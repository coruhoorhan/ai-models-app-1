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
    <div className={cn("flex flex-col gap-sm", className)}>
      <div className="flex items-center gap-sm">
        <Icon className="w-5 h-5 text-ink" />
        <h4 className="font-bold text-ink">{title}</h4>
      </div>
      <p className="text-body-sm text-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}
