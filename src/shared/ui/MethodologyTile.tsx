import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MethodologyTileProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function MethodologyTile({ icon: Icon, title, description }: MethodologyTileProps) {
  return (
    <div className="flex flex-col gap-sm">
      <div className="w-10 h-10 rounded-sm bg-surface border border-hairline flex items-center justify-center">
        <Icon className="w-5 h-5 text-ink" />
      </div>
      <h4 className="text-body-md font-bold text-ink">{title}</h4>
      <p className="text-body-sm text-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}
