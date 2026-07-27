import React from 'react';
import { EmptyStateBlockProps } from '../../types';
import { Button } from './Button';

export function EmptyStateBlock({
  icon: Icon,
  message,
  actionLabel,
  onAction,
}: EmptyStateBlockProps) {
  return (
    <div className="flex flex-col items-center justify-center p-xl w-full text-center">
      <Icon className="w-8 h-8 text-subtle mb-md" />
      <span className="text-label text-subtle mb-lg uppercase tracking-wider">
        {message}
      </span>
      {actionLabel && onAction && (
        <Button variant="tertiary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
