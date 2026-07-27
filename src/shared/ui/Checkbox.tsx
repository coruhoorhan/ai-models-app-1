import React, { forwardRef } from 'react';
import { cn } from '../lib/cn';
import { Check } from 'lucide-react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    // Generate a unique ID if none provided but label exists
    const generatedId = React.useId();
    const checkboxId = id || (label ? `checkbox-${generatedId}` : undefined);

    return (
      <div className="flex items-start gap-sm">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            className={cn(
              "appearance-none w-4 h-4 border border-hairline rounded-[4px] bg-canvas",
              "checked:bg-ink checked:border-ink transition-fast cursor-pointer focus-ring",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />
          <Check className="w-3 h-3 text-canvas absolute pointer-events-none opacity-0 peer-checked:opacity-100" />
          {/* We use a sibling selector trick to show the checkmark when input is checked */}
          <style>{`
            input[type="checkbox"]:checked + svg {
              opacity: 1;
            }
          `}</style>
        </div>
        
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label 
                htmlFor={checkboxId} 
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
Checkbox.displayName = 'Checkbox';
