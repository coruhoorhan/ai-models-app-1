import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ErrorStateBlockProps } from '../../types';
import { Button } from './Button';

export function ErrorStateBlock({
  message,
  onRetry,
}: ErrorStateBlockProps) {
  return (
    <div className="flex flex-col items-center justify-center p-xl w-full text-center">
      <AlertCircle className="w-6 h-6 text-error mb-md" />
      <span className="text-body-sm text-ink mb-lg max-w-md text-center">
        {message}
      </span>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
