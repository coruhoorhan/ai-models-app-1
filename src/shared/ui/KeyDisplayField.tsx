import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '../lib/cn';
import { Button } from './Button';

export interface KeyDisplayFieldProps {
  value: string;
  className?: string;
}

export function KeyDisplayField({ value, className }: KeyDisplayFieldProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between bg-surface-sunken border border-hairline rounded-sm px-md py-sm',
        className
      )}
    >
      <span className="text-mono-inline text-ink truncate mr-md">
        {value}
      </span>
      <Button
        variant="icon-circular"
        onClick={handleCopy}
        icon={copied ? Check : Copy}
        aria-label="Copy key to clipboard"
      />
    </div>
  );
}
