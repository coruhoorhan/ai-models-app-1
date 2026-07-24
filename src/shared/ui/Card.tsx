import React from 'react';
import { cn } from '../lib/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn('bg-canvas border border-hairline rounded-md', className)}
      {...props}
    >
      {children}
    </div>
  );
}
