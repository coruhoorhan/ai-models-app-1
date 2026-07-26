import React, { useState } from 'react';
import { X, Copy, Check, Zap, Play, Send, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { ModelConfig } from '../../../shared/api/models.api';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { useNavigate } from 'react-router-dom';

interface ModelDetailDrawerProps {
  model: ModelConfig | null;
  onClose: () => void;
}

export function ModelDetailDrawer({ model, onClose }: ModelDetailDrawerProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [prompt, setPrompt] = useState('Explain how routing algorithms reduce API latency in 2 sentences.');
  const [response, setResponse] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [metrics, setMetrics] = useState<{ ttft: number; speed: number } | null>(null);

  if (!model) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(`${model.provider.toLowerCase()}/${model.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunPrompt = () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setResponse('');
    setMetrics(null);

    const startTime = Date.now();
    setTimeout(() => {
      const ttft = Date.now() - startTime;
      const fullText = `${model.name} routes incoming inference prompts to the closest edge node with the lowest current queue depth.\nThis dynamically eliminates cold starts and cuts round-trip latency by up to 40%.`;
      
      let index = 0;
      const streamInterval = setInterval(() => {
        index += 5;
        setResponse(fullText.slice(0, index));
        if (index >= fullText.length) {
          clearInterval(streamInterval);
          setIsGenerating(false);
          setMetrics({ ttft, speed: Math.floor(Math.random() * 80) + 80 });
        }
      }, 30);
    }, 180);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/40 backdrop-blur-xs">
      <div className="bg-canvas border-l border-hairline w-full max-w-[560px] h-full flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="p-xl border-b border-hairline flex items-center justify-between sticky top-0 bg-canvas/90 backdrop-blur-md z-10">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-sm bg-surface border border-hairline flex items-center justify-center font-bold text-ink text-body-lg">
                {model.name[0]}
              </div>
              <div>
                <h2 className="text-heading-sm text-ink">{model.name}</h2>
                <span className="text-body-sm text-muted">{model.provider}</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-sm hover:bg-surface flex items-center justify-center text-muted hover:text-ink"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-xl flex flex-col gap-lg">
            {/* Quick API ID & Copy */}
            <div className="flex flex-col gap-xs">
              <span className="text-label text-subtle">MODEL ID FOR API / SDK</span>
              <div className="flex items-center gap-xs bg-surface-sunken border border-hairline rounded-sm p-sm">
                <code className="text-body-sm font-mono text-ink flex-1 truncate">
                  {model.provider.toLowerCase()}/{model.id}
                </code>
                <button
                  onClick={handleCopyId}
                  className="px-sm py-xs bg-surface border border-hairline rounded-sm hover:bg-canvas text-muted hover:text-ink flex items-center gap-xs text-[12px] font-medium transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-live" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy ID'}
                </button>
              </div>
            </div>

            {/* Spec Cards Grid */}
            <div className="grid grid-cols-2 gap-sm">
              <div className="p-md rounded-sm border border-hairline bg-surface flex flex-col">
                <span className="text-label text-subtle mb-xs">CONTEXT WINDOW</span>
                <span className="text-body font-bold font-mono text-ink">{model.context}</span>
              </div>
              <div className="p-md rounded-sm border border-hairline bg-surface flex flex-col">
                <span className="text-label text-subtle mb-xs">PRICING TIER</span>
                <span className="text-body font-bold font-mono text-ink">
                  {model.isFree ? <Badge variant="status-live" label="FREE" /> : model.price}
                </span>
              </div>
              <div className="p-md rounded-sm border border-hairline bg-surface flex flex-col">
                <span className="text-label text-subtle mb-xs">LATENCY / SPEED</span>
                <span className="text-body font-bold font-mono text-ink flex items-center gap-xs">
                  <Zap className="w-3.5 h-3.5 text-chart-teal" />
                  {model.speed}
                </span>
              </div>
              <div className="p-md rounded-sm border border-hairline bg-surface flex flex-col">
                <span className="text-label text-subtle mb-xs">PROVIDER STATUS</span>
                <span className="text-body font-bold font-mono text-live flex items-center gap-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  99.98% Active
                </span>
              </div>
            </div>

            {/* Interactive Test Sandbox */}
            <div className="flex flex-col gap-sm border-t border-hairline pt-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-xs">
                  <Sparkles className="w-4 h-4 text-chart-blue" />
                  <span className="text-label text-ink">MODEL SANDBOX TEST</span>
                </div>
                {metrics && (
                  <span className="text-label text-live font-mono">
                    TTFT: {metrics.ttft}ms | {metrics.speed} t/s
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-xs">
                <textarea
                  rows={2}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type a test prompt..."
                  className="w-full bg-surface-sunken border border-hairline rounded-sm p-sm text-body-sm text-ink placeholder:text-muted outline-none focus:border-ink resize-none font-sans"
                />
                <Button 
                  variant="secondary" 
                  icon={Play} 
                  disabled={isGenerating} 
                  onClick={handleRunPrompt}
                  className="self-end text-body-sm"
                >
                  {isGenerating ? 'Streaming output...' : 'Run Test Prompt'}
                </Button>
              </div>

              {/* Output Box */}
              {response !== null && (
                <div className="p-md rounded-sm bg-surface border border-hairline text-body-sm font-mono text-ink whitespace-pre-wrap animate-in fade-in duration-150 min-h-[80px]">
                  {response}
                  {isGenerating && <span className="inline-block w-2 h-4 bg-ink ml-1 animate-pulse" />}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-xl border-t border-hairline bg-surface flex items-center justify-between gap-md sticky bottom-0">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button 
            variant="primary" 
            icon={ExternalLink} 
            onClick={() => navigate('/dashboard')}
          >
            Open in Workspace
          </Button>
        </div>
      </div>
    </div>
  );
}
