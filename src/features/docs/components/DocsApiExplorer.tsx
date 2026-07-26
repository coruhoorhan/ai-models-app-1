import React, { useState } from 'react';
import { Play, Check, Sparkles, Send, Clock, Zap } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';

export function DocsApiExplorer() {
  const [model, setModel] = useState('anthropic/claude-3.5-sonnet');
  const [prompt, setPrompt] = useState('Explain why edge model routing reduces latency.');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [latency, setLatency] = useState<number | null>(null);

  const handleTestApi = () => {
    setIsLoading(true);
    setResponse(null);
    setLatency(null);

    const start = Date.now();
    setTimeout(() => {
      const elapsed = Date.now() - start;
      setLatency(elapsed + 84);
      setResponse(`{
  "id": "gen-${Math.random().toString(36).substring(2, 10)}",
  "provider": "Anthropic via OpenRouter Edge",
  "model": "${model}",
  "object": "chat.completion",
  "created": ${Math.floor(Date.now() / 1000)},
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Edge model routing reduces latency by terminating TLS connections at the nearest geographical POP and applying global fallback chains before hitting upstream provider gateways."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 14,
    "completion_tokens": 32,
    "total_tokens": 46
  }
}`);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="w-full bg-surface border border-hairline rounded-md p-md flex flex-col gap-md my-lg">
      <div className="flex items-center justify-between border-b border-hairline pb-xs">
        <div className="flex items-center gap-xs">
          <Sparkles className="w-4 h-4 text-chart-teal" />
          <span className="text-body-sm font-bold text-ink">Interactive API Explorer Sandbox</span>
        </div>
        <Badge variant="status-live" label="Live Proxy Simulator" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Request Config */}
        <div className="flex flex-col gap-xs bg-canvas p-md rounded-sm border border-hairline">
          <span className="text-label text-subtle font-mono">POST /v1/chat/completions</span>

          <label className="text-body-sm font-medium text-ink mt-xs">Target Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="bg-surface border border-hairline rounded-sm p-xs text-body-sm font-mono text-ink outline-none"
          >
            <option value="anthropic/claude-3.5-sonnet">anthropic/claude-3.5-sonnet</option>
            <option value="openai/gpt-4o">openai/gpt-4o</option>
            <option value="meta-llama/llama-3.3-70b-instruct">meta-llama/llama-3.3-70b-instruct</option>
          </select>

          <label className="text-body-sm font-medium text-ink mt-xs">Prompt Content</label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-surface border border-hairline rounded-sm p-xs text-body-sm text-ink outline-none font-sans resize-none"
          />

          <Button
            variant="primary"
            icon={Play}
            disabled={isLoading || !prompt.trim()}
            onClick={handleTestApi}
            className="mt-xs justify-center"
          >
            {isLoading ? 'Routing Request...' : 'Send API Test Payload'}
          </Button>
        </div>

        {/* Response JSON */}
        <div className="flex flex-col gap-xs bg-canvas p-md rounded-sm border border-hairline justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-hairline pb-xs mb-xs">
              <span className="text-label text-subtle font-mono">RESPONSE PAYLOAD</span>
              {latency && (
                <span className="text-label font-mono text-chart-teal flex items-center gap-[2px]">
                  <Clock className="w-3 h-3" /> {latency}ms
                </span>
              )}
            </div>

            <pre className="text-[12px] font-mono text-ink whitespace-pre-wrap overflow-x-auto max-h-[180px]">
              {response || '// Click "Send API Test Payload" to trigger real-time endpoint execution.'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
