import React from 'react';
import { ArrowRight, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';

interface QuoteBuilderSummaryProps {
  totalMonthlyEstimate: number;
  handleGenerateQuoteSummary: () => void;
  copiedQuote: boolean;
}

export function QuoteBuilderSummary({
  totalMonthlyEstimate,
  handleGenerateQuoteSummary,
  copiedQuote
}: QuoteBuilderSummaryProps) {
  return (
    <div className="lg:col-span-5 bg-surface-sunken p-lg border border-hairline rounded-sm flex flex-col justify-between">
      <div className="flex flex-col gap-md">
        <span className="text-label text-subtle">ESTIMATED INVESTMENT</span>
        <div className="flex items-baseline gap-xs">
          <span className="text-[48px] font-bold font-mono text-ink tracking-tight leading-none">
            ${totalMonthlyEstimate.toLocaleString()}
          </span>
          <span className="text-body-sm text-muted">/ mo</span>
        </div>

        <div className="flex flex-col gap-sm mt-sm">
          {[
            'Custom Master Services Agreement (MSA)',
            'Volume-tiered token discounts applied',
            'Direct Slack channel with engineering',
            'Custom compliance auditing (SOC2/HIPAA)'
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-sm">
              <CheckCircle2 className="w-4 h-4 text-ink shrink-0" />
              <span className="text-body-sm text-ink">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-sm mt-xl pt-lg border-t border-hairline">
        <Button variant="primary" icon={ArrowRight} className="w-full">
          Contact Enterprise Sales
        </Button>
        <Button variant="secondary" icon={copiedQuote ? Sparkles : FileText} onClick={handleGenerateQuoteSummary} className="w-full">
          {copiedQuote ? 'Quote Copied to Clipboard!' : 'Copy Quote Summary'}
        </Button>
        <p className="text-label text-muted text-center">Includes 24/7 dedicated Slack channel & custom SOC2 compliance attestation.</p>
      </div>
    </div>
  );
}
