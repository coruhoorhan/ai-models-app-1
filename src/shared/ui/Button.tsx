import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/cn';

export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary' | 'icon-circular';
  icon?: LucideIcon;
  iconPosition?: 'leading' | 'trailing';
  size?: 'default' | 'sm';
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Button({
  variant,
  icon: Icon,
  iconPosition = 'leading',
  size = 'default',
  children,
  onClick,
  disabled = false,
  className,
}: ButtonProps) {
  const isCircular = variant === 'icon-circular';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center transition-colors',
        !isCircular && 'text-button',
        !isCircular && size === 'default' && 'h-[40px] px-lg rounded-sm',
        !isCircular && size === 'sm' && 'h-[36px] px-md rounded-sm',
        isCircular && 'w-[36px] h-[36px] rounded-full',
        variant === 'primary' && 'bg-ink text-canvas hover:bg-[#2A2A2A]',
        variant === 'secondary' && 'bg-transparent text-ink border border-ink hover:bg-surface',
        variant === 'tertiary' && 'bg-canvas text-ink border border-hairline hover:bg-surface',
        variant === 'icon-circular' && 'bg-canvas border border-hairline text-ink hover:bg-surface',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {Icon && iconPosition === 'leading' && (
        <Icon className={cn(isCircular ? 'w-4 h-4' : 'w-4 h-4 mr-xs')} />
      )}
      {!isCircular && children}
      {Icon && iconPosition === 'trailing' && !isCircular && (
        <Icon className="w-4 h-4 ml-xs" />
      )}
    </button>
  );
}
