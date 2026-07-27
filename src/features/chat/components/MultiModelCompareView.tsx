import React, { useState } from 'react';
import { Send, Zap, Sparkles } from 'lucide-react';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { streamChatCompletion } from '../../../shared/api/llmStream.api';

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

  const handleRunDualStreaming = async () => {
    if (!prompt.trim() || isStreaming) return;
    setIsStreaming(true);
    setResponseA('');
    setResponseB('');
    setMetricsA(null);
    setMetricsB(null);

    let textA = '';
    let textB = '';

    const streamA = streamChatCompletion({
      messages: [{ role: 'user', content: prompt }],
      model: modelA.id,
      onChunk: (chunk) => {
        if (chunk.text) {
          textA += chunk.text;
          setResponseA(textA);
          setMetricsA({
            ttft: chunk.ttftMs ?? 0,
            speed: chunk.tps ?? 0,
            tokens: chunk.tokens ?? Math.ceil(textA.length / 4)
          });
        }
      },
      onDone: (done) => {
        setMetricsA(prev => prev ? { ...prev, ttft: done.ttftMs ?? prev.ttft, speed: done.tps ?? prev.speed, tokens: done.totalTokens ?? prev.tokens } : null);
      },
      onError: (err) => setResponseA(`⚠️ ${err}`)
    });

    const streamB = streamChatCompletion({
      messages: [{ role: 'user', content: prompt }],
      model: modelB.id === modelA.id ? 'gemini-1.5-pro' : modelB.id,
      onChunk: (chunk) => {
        if (chunk.text) {
          textB += chunk.text;
          setResponseB(textB);
          setMetricsB({
            ttft: chunk.ttftMs ?? 0,
            speed: chunk.tps ?? 0,
            tokens: chunk.tokens ?? Math.ceil(textB.length / 4)
          });
        }
      },
      onDone: (done) => {
        setMetricsB(prev => prev ? { ...prev, ttft: done.ttftMs ?? prev.ttft, speed: done.tps ?? prev.speed, tokens: done.totalTokens ?? prev.tokens } : null);
      },
      onError: (err) => setResponseB(`⚠️ ${err}`)
    });

    await Promise.all([streamA, streamB]);
    setIsStreaming(false);
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
