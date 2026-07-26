import React from 'react';
import { Layers, CheckCircle2, Shield } from 'lucide-react';

interface ResponseHeader {
  key: string;
  example: string;
  description: string;
}

const CUSTOM_HEADERS: ResponseHeader[] = [
  {
    key: 'x-openrouter-model',
    example: 'anthropic/claude-3.5-sonnet',
    description: 'Exact provider and model ID that fulfilled the request after fallback evaluation.',
  },
  {
    key: 'x-openrouter-cost-usd',
    example: '0.000142',
    description: 'Exact cost incurred in USD for prompt and completion token consumption.',
  },
  {
    key: 'x-openrouter-latency-ms',
    example: '382',
    description: 'End-to-end edge proxy latency in milliseconds from receipt to final token delivery.',
  },
  {
    key: 'x-openrouter-tokens-prompt',
    example: '148',
    description: 'Total input tokens processed by the primary upstream model tokenizer.',
  },
  {
    key: 'x-openrouter-tokens-completion',
    example: '64',
    description: 'Total generation tokens output in response payload.',
  },
];

export function DocsHeaderInspector() {
  return (
    <div className="w-full bg-surface border border-hairline rounded-md p-md flex flex-col gap-md my-md">
      <div className="flex items-center justify-between border-b border-hairline pb-xs">
        <div className="flex items-center gap-xs">
          <Layers className="w-4 h-4 text-chart-pink" />
          <span className="text-body-sm font-bold text-ink">Response Headers & Usage Telemetry</span>
        </div>
        <span className="text-label text-subtle font-mono">X-OPENROUTER-* METRICS</span>
      </div>

      <div className="border border-hairline rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-canvas border-b border-hairline text-label text-subtle font-mono">
              <th className="p-sm">HEADER NAME</th>
              <th className="p-sm">EXAMPLE VALUE</th>
              <th className="p-sm">TELEMETRY PURPOSE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline text-body-sm">
            {CUSTOM_HEADERS.map((h) => (
              <tr key={h.key} className="hover:bg-canvas/50">
                <td className="p-sm font-mono text-ink font-bold">{h.key}</td>
                <td className="p-sm font-mono text-chart-teal">{h.example}</td>
                <td className="p-sm text-muted">{h.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
