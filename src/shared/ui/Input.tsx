import React, { forwardRef } from 'react';
import { cn } from '../lib/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="flex flex-col gap-xs w-full">
        {label && (
          <label htmlFor={inputId} className="text-label text-ink uppercase tracking-widest">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-md text-muted pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full bg-surface border border-hairline rounded-sm px-md py-sm text-body text-ink transition-colors placeholder:text-muted focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink/20",
              leftIcon && "pl-[40px]",
              error && "border-error focus:border-error focus:ring-error",
              className
            )}
            {...props}
          />
        </div>
        {error && <span className="text-caption text-error">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
