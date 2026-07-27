import React, { forwardRef } from 'react';
import { cn } from '../lib/cn';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || (label ? `select-${generatedId}` : undefined);

    return (
      <div className="flex flex-col gap-xs w-full">
        {label && (
          <label htmlFor={selectId} className="text-body-sm font-medium text-ink">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "w-full h-10 px-md pr-xl bg-canvas border border-hairline rounded-sm text-body-sm text-ink appearance-none",
              "transition-fast focus-ring hover:bg-surface-sunken",
              error && "border-error focus:ring-error",
              props.disabled && "opacity-50 cursor-not-allowed bg-surface-sunken hover:bg-surface-sunken",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-subtle absolute right-md top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        {error && <span className="text-caption text-error">{error}</span>}
      </div>
    );
  }
);
Select.displayName = 'Select';
