import React from 'react';
import { motion } from 'motion/react';
import { Variants } from 'motion/react';
import { Check, ArrowRight, LucideIcon } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { BlazeEffect } from '../../../shared/ui/BlazeEffect';

export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  icon: LucideIcon;
  features: { text: string }[];
  buttonText: string;
  isPrimary: boolean;
}

interface PricingTierCardProps {
  tier: PricingTier;
  isAnnual: boolean;
  itemVariants: Variants;
}

export function PricingTierCard({ tier, isAnnual, itemVariants }: PricingTierCardProps) {
  const Icon = tier.icon;
  const displayPrice = tier.price === "$20" && isAnnual ? "$16" : tier.price;

  const cardContent = (
    <Card className="flex flex-col p-0 h-full overflow-hidden group border-hairline hover:border-ink transition-colors duration-300">
      <div className="p-xl border-b border-hairline bg-surface group-hover:bg-canvas transition-colors duration-300">
        <div className="flex items-center justify-between mb-md">
          <span className="text-label text-ink">{tier.name}</span>
          <Icon className="w-5 h-5 text-muted group-hover:text-ink transition-colors" />
        </div>
        <div className="flex items-baseline gap-xs">
          <span className="text-display font-bold tracking-tight font-mono text-ink">
            {displayPrice}
          </span>
          {tier.period && (
            <span className="text-body-sm text-muted">{tier.period}</span>
          )}
        </div>
        <p className="text-body-sm text-muted mt-sm h-[40px] leading-relaxed">
          {tier.description}
        </p>
      </div>

      <div className="flex flex-col p-xl bg-canvas grow">
        <span className="text-label text-muted mb-md">INCLUDED</span>
        <ul className="flex flex-col gap-sm">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-sm">
              <Check className="w-4 h-4 text-ink shrink-0 mt-[2px]" />
              <span className="text-body-sm text-ink">{feature.text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-xxl">
          <Button 
            variant={tier.isPrimary ? "primary" : "secondary"} 
            className="w-full justify-between"
          >
            {tier.buttonText}
            <ArrowRight className="w-4 h-4 opacity-50" />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <motion.div variants={itemVariants} className="h-full">
      {tier.isPrimary ? (
        <BlazeEffect color="fire" intensity="high" className="h-full">
          {cardContent}
        </BlazeEffect>
      ) : (
        cardContent
      )}
    </motion.div>
  );
}

