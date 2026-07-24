import React from 'react';
import { LucideIcon, ArrowRightCircle } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { cn } from '../lib/cn';

export interface FeatureCardProps {
  icon: LucideIcon;
  accentColor: 'chart-green' | 'chart-pink' | 'chart-blue' | 'chart-orange';
  title: string;
  description: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
}

const colorMap = {
  'chart-green': 'text-chart-green',
  'chart-pink': 'text-chart-pink',
  'chart-blue': 'text-chart-blue',
  'chart-orange': 'text-chart-orange',
};

export function FeatureCard({
  icon: Icon,
  accentColor,
  title,
  description,
  ctaLabel,
  onCtaClick,
  className
}: FeatureCardProps) {
  return (
    <Card className={cn('p-lg flex flex-col items-start', className)}>
      <div className="flex items-center gap-sm mb-sm">
        <Icon className={cn('w-6 h-6', colorMap[accentColor])} />
        <span className={cn('text-heading-sm', colorMap[accentColor])}>{title}</span>
      </div>
      <p className="text-body text-muted flex-grow mb-lg">
        {description}
      </p>
      
      {ctaLabel && (
        <div className="mt-auto">
          <Button 
            variant="tertiary" 
            icon={ArrowRightCircle}
            iconPosition="trailing"
            onClick={onCtaClick}
          >
            {ctaLabel}
          </Button>
        </div>
      )}
    </Card>
  );
}
