import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../lib/cn';
import { Button } from './Button';

export interface ErrorStateBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorStateBlock({ message = "An error occurred", onRetry, className, ...props }: ErrorStateBlockProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center p-xl bg-surface/50 rounded-sm border border-hairline gap-md text-center", className)}
      {...props}
    >
      <AlertCircle className="w-6 h-6 text-error" />
      <span className="text-body-sm text-ink">{message}</span>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Tekrar Dene
        </Button>
      )}
    </div>
  );
}
