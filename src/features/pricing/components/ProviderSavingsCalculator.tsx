import React, { useState } from 'react';
import { DollarSign, TrendingDown, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';
import { useNavigate } from 'react-router-dom';

export function ProviderSavingsCalculator() {
  const navigate = useNavigate();
  const [tokensM, setTokensM] = useState(25); // 25M tokens
  const [selectedModel, setSelectedModel] = useState<'claude-3-5-sonnet' | 'gpt-4o' | 'gemini-1-5-pro'>('claude-3-5-sonnet');

  const modelRates = {
    'claude-3-5-sonnet': { name: 'Claude 3.5 Sonnet', directInput: 3.00, directOutput: 15.00, routerInput: 3.00, routerOutput: 15.00, discountPercent: 12 },
    'gpt-4o': { name: 'GPT-4o', directInput: 2.50, directOutput: 10.00, routerInput: 2.50, routerOutput: 10.00, discountPercent: 15 },
    'gemini-1-5-pro': { name: 'Gemini 1.5 Pro', directInput: 1.25, directOutput: 5.00, routerInput: 1.25, routerOutput: 5.00, discountPercent: 20 },
  };

  const current = modelRates[selectedModel];
  
  // 70% input, 30% output
  const directCostMonth = (tokensM * 0.7 * current.directInput) + (tokensM * 0.3 * current.directOutput);
  const routerCostMonth = directCostMonth * (1 - current.discountPercent / 100);
  const monthlySavings = directCostMonth - routerCostMonth;
  const annualSavings = monthlySavings * 12;

  return (
    <Card className="w-full p-xl border-hairline bg-surface/60 flex flex-col gap-lg my-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-md border-b border-hairline pb-md">
        <div className="flex items-center gap-sm">
          <div className="p-sm rounded-sm bg-live/10 text-live border border-live/20">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-xs">
              <h3 className="text-heading-sm text-ink">Zero-Markup Router Savings Calculator</h3>
              <Badge variant="status-live" label="Live Calculator" />
            </div>
            <p className="text-body-sm text-muted">See how edge prompt routing eliminates markup and reduces latency.</p>
          </div>
        </div>

        {/* Model Switcher Buttons */}
        <div className="flex items-center gap-xs bg-canvas p-xxs border border-hairline rounded-sm overflow-x-auto">
          {(Object.keys(modelRates) as Array<keyof typeof modelRates>).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedModel(key)}
              className={`px-sm py-xs text-body-sm rounded-xs transition-colors whitespace-nowrap ${
                selectedModel === key ? 'bg-ink text-canvas font-medium' : 'text-muted hover:text-ink'
              }`}
            >
              {modelRates[key].name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
        {/* Slider Controls */}
        <div className="lg:col-span-7 flex flex-col gap-md">
          <div className="flex justify-between items-center">
            <span className="text-body-sm text-ink font-medium">Monthly Token Volume</span>
            <span className="text-heading-sm font-mono text-ink">{tokensM} Million Tokens</span>
          </div>

          <input
            type="range"
            min={1}
            max={200}
            value={tokensM}
            onChange={(e) => setTokensM(Number(e.target.value))}
            className="w-full accent-ink cursor-pointer h-2 bg-surface-sunken rounded-lg"
          />

          <div className="flex justify-between text-label text-subtle font-mono">
            <span>1M tokens</span>
            <span>50M tokens</span>
            <span>100M tokens</span>
            <span>200M tokens</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm pt-sm">
            <div className="p-sm rounded-sm bg-canvas border border-hairline flex items-center justify-between">
              <span className="text-body-sm text-muted">Input Split (70%)</span>
              <span className="text-body-sm font-mono text-ink font-bold">{(tokensM * 0.7).toFixed(1)}M tok</span>
            </div>
            <div className="p-sm rounded-sm bg-canvas border border-hairline flex items-center justify-between">
              <span className="text-body-sm text-muted">Output Split (30%)</span>
              <span className="text-body-sm font-mono text-ink font-bold">{(tokensM * 0.3).toFixed(1)}M tok</span>
            </div>
          </div>
        </div>

        {/* Savings Results Card */}
        <div className="lg:col-span-5 p-lg rounded-md bg-canvas border border-hairline flex flex-col gap-md shadow-sm">
          <span className="text-label text-subtle">ESTIMATED COST COMPARISON</span>

          <div className="flex items-center justify-between pb-xs border-b border-hairline">
            <span className="text-body-sm text-muted">Direct Provider Cost</span>
            <span className="text-body-sm font-mono text-ink line-through">${directCostMonth.toFixed(2)}/mo</span>
          </div>

          <div className="flex items-center justify-between pb-xs border-b border-hairline">
            <span className="text-body-sm font-medium text-ink flex items-center gap-xs">
              <Sparkles className="w-3.5 h-3.5 text-live" /> OpenRouter Routed Cost
            </span>
            <span className="text-heading-sm font-mono text-live font-bold">${routerCostMonth.toFixed(2)}/mo</span>
          </div>

          <div className="p-sm rounded-sm bg-live/10 border border-live/20 flex items-center justify-between">
            <span className="text-body-sm font-bold text-ink">Annual Savings</span>
            <span className="text-body-sm font-mono text-live font-extrabold">+${annualSavings.toFixed(2)} / yr</span>
          </div>

          <Button 
            variant="primary" 
            icon={ArrowRight} 
            className="w-full justify-center mt-xs"
            onClick={() => navigate('/dashboard')}
          >
            START ROUTING & SAVE
          </Button>
        </div>
      </div>
    </Card>
  );
}
