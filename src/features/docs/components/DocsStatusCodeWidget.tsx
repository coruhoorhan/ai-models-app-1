import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert, RefreshCw, Server, HelpCircle } from 'lucide-react';

interface StatusCodeInfo {
  code: number;
  label: string;
  badgeClass: string;
  description: string;
  action: string;
}

const STATUS_CODES: StatusCodeInfo[] = [
  {
    code: 200,
    label: '200 OK',
    badgeClass: 'text-live bg-live/10 border-live/30',
    description: 'Request completed successfully. Standard OpenAI-compatible completion returned.',
    action: 'Parse choices[0].message.content or stream chunks via SSE reader.',
  },
  {
    code: 400,
    label: '400 Bad Request',
    badgeClass: 'text-chart-pink bg-chart-pink/10 border-chart-pink/30',
    description: 'Invalid JSON schema, unsupported model identifier, or illegal temperature range.',
    action: 'Check parameter types and ensure model ID follows standard vendor/model syntax.',
  },
  {
    code: 401,
    label: '401 Unauthorized',
    badgeClass: 'text-chart-orange bg-chart-orange/10 border-chart-orange/30',
    description: 'Missing or expired Bearer token, or insufficient account balance.',
    action: 'Verify your OPENROUTER_API_KEY environment variable in Dashboard settings.',
  },
  {
    code: 429,
    label: '429 Rate Limit',
    badgeClass: 'text-chart-yellow bg-chart-yellow/10 border-chart-yellow/30',
    description: 'Requests Per Minute (RPM) or Tokens Per Minute (TPM) quota exceeded.',
    action: 'Implement exponential backoff with jitter or enable automatic provider fallbacks.',
  },
  {
    code: 502,
    label: '502 Fallback Triggered',
    badgeClass: 'text-chart-blue bg-chart-blue/10 border-chart-blue/30',
    description: 'Upstream vendor (e.g. Anthropic/OpenAI) returned 5xx; OpenRouter rerouted payload.',
    action: 'No action needed! OpenRouter automatically attempts secondary model in fallback array.',
  },
];

export function DocsStatusCodeWidget() {
  const [selectedCode, setSelectedCode] = useState<number>(200);
  const activeStatus = STATUS_CODES.find((s) => s.code === selectedCode) || STATUS_CODES[0];

  return (
    <div className="w-full bg-surface border border-hairline rounded-md p-md flex flex-col gap-md my-md">
      <div className="flex items-center justify-between border-b border-hairline pb-xs">
        <div className="flex items-center gap-xs">
          <Server className="w-4 h-4 text-chart-blue" />
          <span className="text-body-sm font-bold text-ink">HTTP Status Codes & Resiliency Matrix</span>
        </div>
        <span className="text-label text-subtle font-mono">PROXY RESPONSE HANDLING</span>
      </div>

      <div className="flex flex-wrap gap-xs">
        {STATUS_CODES.map((s) => (
          <button
            key={s.code}
            onClick={() => setSelectedCode(s.code)}
            className={`px-sm py-xs text-label font-mono rounded-xs border transition-colors ${
              s.code === selectedCode
                ? 'bg-ink text-canvas font-bold border-ink'
                : 'bg-canvas text-muted border-hairline hover:text-ink'
            }`}
          >
            {s.code} {s.label.split(' ')[1]}
          </button>
        ))}
      </div>

      <div className="p-md bg-canvas border border-hairline rounded-sm flex flex-col gap-xs">
        <div className="flex items-center gap-xs">
          <span className={`px-xs py-xxs rounded-xs border text-label font-mono font-bold ${activeStatus.badgeClass}`}>
            HTTP {activeStatus.label}
          </span>
        </div>
        <p className="text-body-sm text-ink">{activeStatus.description}</p>
        <div className="flex items-center gap-xs text-label font-mono text-muted mt-xs pt-xs border-t border-hairline">
          <RefreshCw className="w-3.5 h-3.5 text-chart-teal" />
          <span>Recommended Action: {activeStatus.action}</span>
        </div>
      </div>
    </div>
  );
}
