import React, { useState } from 'react';
import { ShieldCheck, Building2, Cpu, CheckCircle2, ArrowRight, Sparkles, FileText } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';

export function EnterpriseCustomQuoteSection() {
  const [tokensBillions, setTokensBillions] = useState(1); // 1 Billion
  const [slaTier, setSlaTier] = useState<'99.9' | '99.99' | '99.999'>('99.99');
  const [dedicatedNodes, setDedicatedNodes] = useState(true);
  const [zeroDataRetention, setZeroDataRetention] = useState(true);
  const [copiedQuote, setCopiedQuote] = useState(false);

  // SLA Multiplier calculation
  const slaBaseCost = slaTier === '99.9' ? 500 : slaTier === '99.99' ? 1200 : 2500;
  const dedicatedCost = dedicatedNodes ? 1500 : 0;
  const retentionCost = zeroDataRetention ? 800 : 0;
  const tokenCost = tokensBillions * 1800; // $1,800 per Billion routed tokens

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
        {/* Controls */}
        <div className="lg:col-span-7 flex flex-col gap-lg">
          {/* Token Volume */}
          <div className="flex flex-col gap-xs">
            <div className="flex justify-between items-center">
              <span className="text-body-sm text-ink font-medium">Committed Monthly Volume</span>
              <span className="text-heading-sm font-mono text-ink">{tokensBillions} Billion Tokens</span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={tokensBillions}
              onChange={(e) => setTokensBillions(Number(e.target.value))}
              className="w-full accent-ink cursor-pointer h-2 bg-surface-sunken rounded-lg"
            />
            <div className="flex justify-between text-label text-subtle font-mono">
              <span>1B Tokens</span>
              <span>5B Tokens</span>
              <span>10B Tokens</span>
              <span>20B Tokens</span>
            </div>
          </div>

          {/* SLA Options */}
          <div className="flex flex-col gap-xs">
            <span className="text-body-sm text-ink font-medium">Uptime SLA Guarantee</span>
            <div className="flex flex-col lg:flex-row gap-xs">
              {[
                { tier: '99.9', label: '99.9% SLA', desc: 'Standard Edge' },
                { tier: '99.99', label: '99.99% SLA', desc: 'Dual-Region Failover' },
                { tier: '99.999', label: '99.999% SLA', desc: 'Multi-Cloud Active-Active' },
              ].map((item) => (
                <button
                  key={item.tier}
                  onClick={() => setSlaTier(item.tier as any)}
                  className={`flex-1 p-sm rounded-sm border text-left flex flex-col gap-[2px] transition-colors ${
                    slaTier === item.tier ? 'border-ink bg-canvas font-bold' : 'border-hairline bg-surface hover:bg-canvas'
                  }`}
                >
                  <span className="text-body-sm text-ink">{item.label}</span>
                  <span className="text-[11px] text-muted">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
            <div 
              onClick={() => setDedicatedNodes(!dedicatedNodes)}
              className={`p-md rounded-sm border cursor-pointer flex items-center justify-between transition-colors ${
                dedicatedNodes ? 'border-live bg-live/5' : 'border-hairline bg-surface'
              }`}
            >
              <div className="flex flex-col">
                <span className="text-body-sm font-bold text-ink">Dedicated Edge Transit</span>
                <span className="text-[12px] text-muted">Isolated IP & zero queue depth</span>
              </div>
              <CheckCircle2 className={`w-5 h-5 ${dedicatedNodes ? 'text-live' : 'text-subtle'}`} />
            </div>

            <div 
              onClick={() => setZeroDataRetention(!zeroDataRetention)}
              className={`p-md rounded-sm border cursor-pointer flex items-center justify-between transition-colors ${
                zeroDataRetention ? 'border-live bg-live/5' : 'border-hairline bg-surface'
              }`}
            >
              <div className="flex flex-col">
                <span className="text-body-sm font-bold text-ink">Zero Data Retention</span>
                <span className="text-[12px] text-muted">No prompt/completion logging</span>
              </div>
              <ShieldCheck className={`w-5 h-5 ${zeroDataRetention ? 'text-live' : 'text-subtle'}`} />
            </div>
          </div>
        </div>

        {/* Live Estimate Card */}
        <div className="lg:col-span-5 p-lg rounded-md bg-canvas border border-hairline flex flex-col justify-between gap-md shadow-sm">
          <div>
            <div className="flex items-center justify-between border-b border-hairline pb-xs mb-md">
              <span className="text-label text-subtle">CUSTOM ESTIMATE</span>
              <Badge variant="status-live" label="Instant Quote" />
            </div>

            <div className="flex flex-col gap-sm">
              <div className="flex justify-between text-body-sm">
                <span className="text-muted">Routed Token Capacity ({tokensBillions}B):</span>
                <span className="font-mono text-ink">${tokenCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-body-sm">
                <span className="text-muted">{slaTier}% SLA Guarantee:</span>
                <span className="font-mono text-ink">${slaBaseCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-body-sm">
                <span className="text-muted">Dedicated Edge Transit:</span>
                <span className="font-mono text-ink">${dedicatedCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-body-sm pb-xs border-b border-hairline">
                <span className="text-muted">Zero Data Retention (SOC2):</span>
                <span className="font-mono text-ink">${retentionCost.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center pt-xs">
                <span className="text-body font-bold text-ink">Estimated Total:</span>
                <span className="text-heading-md font-mono text-ink font-bold">
                  ${totalMonthlyEstimate.toLocaleString()}
                  <span className="text-body-sm font-normal text-muted">/mo</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-xs pt-md border-t border-hairline">
            <Button 
              variant="primary" 
              icon={FileText} 
              className="w-full justify-center"
              onClick={handleGenerateQuoteSummary}
            >
              {copiedQuote ? 'Quote Summary Copied!' : 'Copy Enterprise Quote Summary'}
            </Button>
            <p className="text-[11px] text-muted text-center">Includes 24/7 dedicated Slack channel & custom SOC2 compliance attestation.</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
