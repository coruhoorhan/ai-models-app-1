import React from 'react';
import { MethodologyTileProps } from '../../types';

export function MethodologyTile({
  icon: Icon,
  title,
  description,
}: MethodologyTileProps) {
  return (
    <div className="flex flex-col gap-sm p-lg rounded-sm bg-surface transition-fast hover:bg-surface-sunken">
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
