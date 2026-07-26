import React from 'react';

interface RouterConfigPanelProps {
  primaryModel: string;
  setPrimaryModel: (val: string) => void;
  fallbackModel: string;
  setFallbackModel: (val: string) => void;
  testResult: {
    primaryLatency: number;
    fallbackLatency: number;
    totalMs: number;
    status: string;
    tokensServed: number;
  } | null;
}

export function RouterConfigPanel({
  primaryModel,
  setPrimaryModel,
  fallbackModel,
  setFallbackModel,
  testResult
}: RouterConfigPanelProps) {
  return (
    <div className="lg:col-span-5 flex flex-col gap-md bg-canvas p-md border border-hairline rounded-sm">
      <span className="text-label text-subtle">PRIMARY & FALLBACK MODELS</span>
      
      <div className="flex flex-col gap-xs">
        <label className="text-body-sm text-ink font-medium">1. Primary Target Model</label>
        <select
          value={primaryModel}
          onChange={(e) => setPrimaryModel(e.target.value)}
          className="bg-surface border border-hairline rounded-sm p-sm text-body-sm text-ink outline-none focus:border-ink font-mono cursor-pointer"
        >
          <option value="anthropic/claude-3.5-sonnet">anthropic/claude-3.5-sonnet ($3/1M)</option>
          <option value="openai/gpt-4o">openai/gpt-4o ($2.5/1M)</option>
          <option value="google/gemini-1.5-pro">google/gemini-1.5-pro ($1.25/1M)</option>
          <option value="deepseek/deepseek-r1">deepseek/deepseek-r1 ($0.55/1M)</option>
        </select>
      </div>

      <div className="flex flex-col gap-xs">
        <label className="text-body-sm text-ink font-medium">2. Automatic Fallback Model</label>
        <select
          value={fallbackModel}
          onChange={(e) => setFallbackModel(e.target.value)}
          className="bg-surface border border-hairline rounded-sm p-sm text-body-sm text-ink outline-none focus:border-ink font-mono cursor-pointer"
        >
          <option value="openai/gpt-4o">openai/gpt-4o ($2.5/1M)</option>
          <option value="meta-llama/llama-3.3-70b-instruct">meta-llama/llama-3.3-70b-instruct ($0.4/1M)</option>
          <option value="mistralai/mistral-large">mistralai/mistral-large ($2.0/1M)</option>
        </select>
      </div>

      {testResult && (
        <div className="p-sm rounded-sm bg-surface border border-hairline flex flex-col gap-xs animate-in fade-in duration-200">
          <div className="flex justify-between items-center text-label">
            <span className="text-subtle">ROUTE STATUS</span>
            <span className="text-live font-mono font-bold">{testResult.status}</span>
          </div>
          <div className="flex justify-between items-center text-body-sm font-mono">
            <span className="text-muted">Primary Node Latency:</span>
            <span className="text-ink">{testResult.primaryLatency}ms</span>
          </div>
          <div className="flex justify-between items-center text-body-sm font-mono">
            <span className="text-muted">Fallback Ready:</span>
            <span className="text-chart-teal">{testResult.fallbackLatency}ms</span>
          </div>
          <div className="flex justify-between items-center text-body-sm font-mono border-t border-hairline pt-xs">
            <span className="text-ink font-bold">Total Request Time:</span>
            <span className="text-live font-bold">{testResult.totalMs}ms</span>
          </div>
        </div>
      )}
    </div>
  );
}
