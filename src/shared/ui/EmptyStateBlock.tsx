import React from 'react';
import { LucideIcon, FileX } from 'lucide-react';
import { cn } from '../lib/cn';
import { Button } from './Button';

export interface EmptyStateBlockProps {
  icon?: LucideIcon;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyStateBlock({
  icon: Icon = FileX,
  message,
  actionLabel,
  onAction,
  className
}: EmptyStateBlockProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-xl gap-md", className)}>
      <Icon className="w-8 h-8 text-subtle" />
      <span className="text-label text-ink">{message}</span>
      {actionLabel && onAction && (
        <Button variant="tertiary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
