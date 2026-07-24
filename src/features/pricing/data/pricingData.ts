import { Terminal, Zap, Shield } from 'lucide-react';
import { PricingTier } from '../components/PricingTierCard';
import { PayAsYouGoModel } from '../components/PayAsYouGoTable';

export const TIERS: PricingTier[] = [
  {
    name: "DEVELOPER",
    price: "$0",
    description: "Perfect for testing, personal projects, and learning the API.",
    icon: Terminal,
    features: [
      { text: "1M free tokens / month" },
      { text: "Standard rate limits (5 RPM)" },
      { text: "Community support" },
      { text: "Access to GPT-3.5 & Claude Haiku" },
    ],
    buttonText: "Start Building",
    isPrimary: false,
  },
  {
    name: "PRO",
    price: "$20",
    period: "/mo",
    description: "For professionals and startups scaling their AI usage.",
    icon: Zap,
    features: [
      { text: "10M tokens included" },
      { text: "High rate limits (500 RPM)" },
      { text: "Priority email support" },
      { text: "Access to all top-tier models" },
      { text: "Pay-as-you-go overages" },
    ],
    buttonText: "Start Pro Trial",
    isPrimary: true,
  },
  {
    name: "ENTERPRISE",
    price: "CUSTOM",
    description: "Advanced security, controls, and volume discounts.",
    icon: Shield,
    features: [
      { text: "Unlimited tokens (volume pricing)" },
      { text: "Unlimited rate limits" },
      { text: "24/7 Phone & Slack support" },
      { text: "Custom model fine-tuning & RAG" },
      { text: "Dedicated account manager" },
    ],
    buttonText: "Contact Sales",
    isPrimary: false,
  }
];

export const PAYG_MODELS: PayAsYouGoModel[] = [
  { name: 'GPT-4o (2024-08-06)', input: '$5.00', output: '$15.00', context: '128k', badge: 'POPULAR' },
  { name: 'Claude 3.5 Sonnet', input: '$3.00', output: '$15.00', context: '200k' },
  { name: 'Gemini 1.5 Pro', input: '$3.50', output: '$10.50', context: '2M' },
  { name: 'Llama 3.1 405B', input: '$2.70', output: '$2.70', context: '128k', badge: 'NEW' },
  { name: 'GPT-4o mini', input: '$0.15', output: '$0.60', context: '128k' },
  { name: 'Claude 3 Haiku', input: '$0.25', output: '$1.25', context: '200k' },
];
