import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../lib/cn';
import { Button } from './Button';

export interface ErrorStateBlockProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorStateBlock({
  message = "Veri yüklenirken bir hata oluştu.",
  onRetry,
  className
}: ErrorStateBlockProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-xl gap-md", className)}>
      <AlertCircle className="w-6 h-6 text-error" />
      <span className="text-body-sm text-ink text-center max-w-sm">{message}</span>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Tekrar Dene
        </Button>
      )}
    </div>
  );
}
