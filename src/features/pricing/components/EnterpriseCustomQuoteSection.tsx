import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { QuoteBuilderControls } from './QuoteBuilderControls';
import { QuoteBuilderSummary } from './QuoteBuilderSummary';

export function EnterpriseCustomQuoteSection() {
  const [tokensBillions, setTokensBillions] = useState(1);
  const [slaTier, setSlaTier] = useState<'99.9' | '99.99' | '99.999'>('99.99');
  const [dedicatedNodes, setDedicatedNodes] = useState(true);
  const [zeroDataRetention, setZeroDataRetention] = useState(true);
  const [copiedQuote, setCopiedQuote] = useState(false);

  const slaBaseCost = slaTier === '99.9' ? 500 : slaTier === '99.99' ? 1200 : 2500;
  const dedicatedCost = dedicatedNodes ? 1500 : 0;
  const retentionCost = zeroDataRetention ? 800 : 0;
  const tokenCost = tokensBillions * 1800;
  const totalMonthlyEstimate = slaBaseCost + dedicatedCost + retentionCost + tokenCost;

  const handleGenerateQuoteSummary = () => {
    const summaryText = `OPENROUTER ENTERPRISE CUSTOM QUOTE
------------------------------------
Monthly Volume: ${tokensBillions} Billion Tokens
SLA Guarantee: ${slaTier}% Uptime
Dedicated Edge Routing: ${dedicatedNodes ? 'Enabled (Isolated Transit)' : 'Shared Edge'}
Data Privacy: ${zeroDataRetention ? 'Zero Data Retention (Zero-Log)' : 'Standard 30-day Audit Log'}
------------------------------------
Estimated Monthly Investment: $${totalMonthlyEstimate.toLocaleString()}/mo`;
    
    navigator.clipboard.writeText(summaryText);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  return (
    <Card className="w-full p-xl border-hairline bg-surface/50 flex flex-col gap-lg my-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-md border-b border-hairline pb-md">
        <div className="flex items-center gap-sm">
          <div className="p-sm rounded-sm bg-ink text-canvas">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-xs">
              <h3 className="text-heading-sm text-ink">Custom Enterprise SLA & Quote Builder</h3>
              <Badge variant="status-live" label="Enterprise Grade" />
            </div>
            <p className="text-body-sm text-muted">Tailor dedicated edge throughput, zero-log privacy, and custom SLAs for your scale.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <QuoteBuilderControls
          tokensBillions={tokensBillions}
          setTokensBillions={setTokensBillions}
          slaTier={slaTier}
          setSlaTier={setSlaTier}
          dedicatedNodes={dedicatedNodes}
          setDedicatedNodes={setDedicatedNodes}
          zeroDataRetention={zeroDataRetention}
          setZeroDataRetention={setZeroDataRetention}
        />
        <QuoteBuilderSummary
          totalMonthlyEstimate={totalMonthlyEstimate}
          handleGenerateQuoteSummary={handleGenerateQuoteSummary}
          copiedQuote={copiedQuote}
        />
      </div>
    </Card>
  );
}
