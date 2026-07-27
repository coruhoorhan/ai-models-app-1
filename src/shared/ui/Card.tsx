import React from 'react';
import { cn } from '../lib/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "bg-canvas border border-hairline rounded-md overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
