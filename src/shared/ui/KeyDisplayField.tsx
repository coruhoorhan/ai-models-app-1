import React, { useState } from 'react';
import { Copy, Check, Eye, EyeOff } from 'lucide-react';
import { cn } from '../lib/cn';
import { KeyDisplayFieldProps } from '../../types';
import { Button } from './Button';

export function KeyDisplayField({ label, value, onCopy, isSecret }: KeyDisplayFieldProps) {
  const [copied, setCopied] = useState(false);
  const [showSecret, setShowSecret] = useState(!isSecret);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  const displayValue = showSecret ? value : '•'.repeat(Math.min(value.length, 32));

  return (
    <div className="flex flex-col gap-xs w-full">
      <span className="text-label text-subtle uppercase">{label}</span>
      <div className="flex items-center gap-xs">
        <div className="flex-1 bg-surface border border-hairline rounded-sm px-sm h-[36px] flex items-center overflow-hidden">
          <span className="font-mono text-body-sm text-ink truncate select-all">{displayValue}</span>
        </div>
        
        {isSecret && (
          <Button 
            variant="tertiary" 
            size="sm" 
            icon={showSecret ? EyeOff : Eye} 
            onClick={() => setShowSecret(!showSecret)}
            className="shrink-0 w-[36px] px-0"
            aria-label={showSecret ? "Hide secret" : "Show secret"}
          />
        )}
        
        <Button 
          variant={copied ? "primary" : "secondary"} 
          size="sm" 
          icon={copied ? Check : Copy} 
          onClick={handleCopy}
          className="shrink-0"
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
    </div>
  );
}
