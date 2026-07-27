import React, { forwardRef } from 'react';
import { cn } from '../lib/cn';

export interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const toggleId = id || (label ? `toggle-${generatedId}` : undefined);

    return (
      <div className="flex items-center gap-sm">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id={toggleId}
            ref={ref}
            className={cn(
              "appearance-none w-10 h-6 bg-surface-sunken border border-hairline rounded-full",
              "checked:bg-live checked:border-live transition-fast cursor-pointer focus-ring",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />
          {/* Thumb */}
          <div className="w-4 h-4 bg-canvas rounded-full absolute left-1 pointer-events-none transition-fast shadow-sm" />
          <style>{`
            input[type="checkbox"]:checked + div {
              transform: translateX(16px);
            }
          `}</style>
        </div>
        
        {label && (
          <label 
            htmlFor={toggleId} 
            className={cn(
              "text-body-sm font-medium text-ink cursor-pointer select-none",
              props.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Toggle.displayName = 'Toggle';
