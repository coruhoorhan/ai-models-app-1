import React, { forwardRef } from 'react';
import { cn } from '../lib/cn';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const generatedId = React.useId();
    const radioId = id || (label ? `radio-${generatedId}` : undefined);

    return (
      <div className="flex items-start gap-sm">
        <div className="relative flex items-center justify-center pt-[2px]">
          <input
            type="radio"
            id={radioId}
            ref={ref}
            className={cn(
              "appearance-none w-4 h-4 border border-hairline rounded-full bg-canvas",
              "checked:border-ink transition-fast cursor-pointer focus-ring",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />
          {/* Inner circle for checked state */}
          <div className="w-2 h-2 rounded-full bg-ink absolute pointer-events-none opacity-0 transition-fast" />
          <style>{`
            input[type="radio"]:checked + div {
              opacity: 1;
            }
          `}</style>
        </div>
        
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label 
                htmlFor={radioId} 
                className={cn(
                  "text-body-sm font-medium text-ink cursor-pointer select-none",
                  props.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <span className={cn(
                "text-caption text-subtle",
                props.disabled && "opacity-50"
              )}>
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);
Radio.displayName = 'Radio';
