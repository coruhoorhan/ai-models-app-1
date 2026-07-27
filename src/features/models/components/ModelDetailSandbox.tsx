import React, { useState } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { ModelConfig } from '../../../shared/api/models.api';

export function ModelDetailSandbox({ model }: { model: ModelConfig }) {
  const [prompt, setPrompt] = useState('Explain how routing algorithms reduce API latency in 2 sentences.');
  const [response, setResponse] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [metrics, setMetrics] = useState<{ ttft: number; speed: number } | null>(null);

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
  );
}
