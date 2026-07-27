import React, { forwardRef } from 'react';
import { cn } from '../lib/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || (label ? `textarea-${generatedId}` : undefined);

    return (
      <div className="flex flex-col gap-xs w-full">
        {label && (
          <label htmlFor={textareaId} className="text-body-sm font-medium text-ink">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "w-full min-h-[80px] p-md bg-canvas border border-hairline rounded-sm text-body-sm text-ink resize-y",
            "transition-fast focus-ring placeholder:text-subtle",
            error && "border-error focus:ring-error",
            props.disabled && "opacity-50 cursor-not-allowed bg-surface-sunken",
            className
          )}
          {...props}
        />
        {error && <span className="text-caption text-error">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
