import React, { useState } from 'react';
import { Send, Zap, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';

interface MultiModelCompareViewProps {
  modelA: { id: string; name: string };
  modelB: { id: string; name: string };
}

export function MultiModelCompareView({ modelA, modelB }: MultiModelCompareViewProps) {
  const [prompt, setPrompt] = useState('Compare PostgreSQL B-Tree indexes vs Hash indexes with query examples.');
  const [isStreaming, setIsStreaming] = useState(false);
  const [responseA, setResponseA] = useState('');
  const [responseB, setResponseB] = useState('');
  const [metricsA, setMetricsA] = useState<{ ttft: number; speed: number; tokens: number } | null>(null);
  const [metricsB, setMetricsB] = useState<{ ttft: number; speed: number; tokens: number } | null>(null);

  const handleRunDualStreaming = () => {
    if (!prompt.trim() || isStreaming) return;
    setIsStreaming(true);
    setResponseA('');
    setResponseB('');
    setMetricsA(null);
    setMetricsB(null);

    const fullA = `${modelA.name} Response:\n\n1. B-Tree Indexes:\n- Supports equality (=) and range queries (<, <=, >, >=).\n- Maintains sorted order for ORDER BY operations.\n\n2. Hash Indexes:\n- Supports fast O(1) equality comparisons only.\n- Does NOT support range queries or sorting.\n\nExample:\nCREATE INDEX idx_user_id ON users USING btree(user_id);`;
    const fullB = `${modelB.name} Response:\n\nKey Differences:\n- B-Tree: Default in PostgreSQL. Handles multi-column and range scans.\n- Hash: Ideal for strict key-value lookups, smaller index footprint.\n\nPerformance:\nHash lookups are ~5-10% faster for exact string matches but lack range capability.`;

    const startTime = Date.now();
    let indexA = 0;
    let indexB = 0;

    const interval = setInterval(() => {
      indexA += 4;
      indexB += 3;

      if (indexA <= fullA.length) setResponseA(fullA.slice(0, indexA));
      if (indexB <= fullB.length) setResponseB(fullB.slice(0, indexB));

      if (indexA >= fullA.length && indexB >= fullB.length) {
        clearInterval(interval);
        setIsStreaming(false);
        const elapsed = Date.now() - startTime;
        setMetricsA({ ttft: 110, speed: 135, tokens: 94 });
        setMetricsB({ ttft: 145, speed: 112, tokens: 88 });
      }
    }, 30);
  };

  return (
    <div className="flex-1 flex flex-col bg-canvas p-md gap-md overflow-hidden">
      {/* Header Banner */}
      <div className="p-sm rounded-sm bg-surface border border-hairline flex items-center justify-between">
        <div className="flex items-center gap-xs">
          <Sparkles className="w-4 h-4 text-chart-blue" />
          <span className="text-body-sm font-bold text-ink">Parallel Multi-Model Arena Stream</span>
        </div>
        <span className="text-label text-subtle font-mono">1 Prompt → 2 Live Model Streams</span>
      </div>

      {/* Side-by-Side Response Panels */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-md overflow-y-auto">
        {/* Model A */}
        <div className="p-md rounded-md bg-surface border border-hairline flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between pb-xs border-b border-hairline mb-sm">
              <span className="text-body-sm font-bold text-ink font-mono">{modelA.name}</span>
              {metricsA ? (
                <span className="text-label text-chart-teal font-mono flex items-center gap-xs">
                  <Zap className="w-3 h-3" /> {metricsA.speed} t/s | {metricsA.ttft}ms
                </span>
              ) : (
                <Badge variant="free" label="Model A" />
              )}
            </div>
            <pre className="text-body-sm font-mono text-ink whitespace-pre-wrap">{responseA || 'Awaiting prompt execution...'}</pre>
          </div>
        </div>

        {/* Model B */}
        <div className="p-md rounded-md bg-surface border border-hairline flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between pb-xs border-b border-hairline mb-sm">
              <span className="text-body-sm font-bold text-ink font-mono">{modelB.name}</span>
              {metricsB ? (
                <span className="text-label text-chart-blue font-mono flex items-center gap-xs">
                  <Zap className="w-3 h-3" /> {metricsB.speed} t/s | {metricsB.ttft}ms
                </span>
              ) : (
                <Badge variant="free" label="Model B" />
              )}
            </div>
            <pre className="text-body-sm font-mono text-ink whitespace-pre-wrap">{responseB || 'Awaiting prompt execution...'}</pre>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex flex-col gap-xs pt-xs border-t border-hairline">
        <div className="flex items-center gap-sm">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type a prompt to stream to both models simultaneously..."
            className="flex-1 bg-surface border border-hairline rounded-sm p-sm text-body-sm text-ink outline-none focus:border-ink font-sans"
          />
          <Button 
            variant="primary" 
            icon={Send} 
            disabled={isStreaming || !prompt.trim()}
            onClick={handleRunDualStreaming}
          >
            {isStreaming ? 'Streaming Both...' : 'Stream Both'}
          </Button>
        </div>
      </div>
    </div>
  );
}
