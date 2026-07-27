import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';

interface ModelBenchmarkCardProps {
  model: {
    name: string;
    score: number;
    tokensPerSec: number;
  };
  onTestModel: () => void;
}

export function ModelBenchmarkCard({ model, onTestModel }: ModelBenchmarkCardProps) {
  return (
    <Card className="p-xl flex flex-col justify-between border-hairline bg-surface">
      <div>
        <div className="flex items-center justify-between mb-md">
          <span className="text-label text-subtle">BENCHMARK BREAKDOWN</span>
          <Sparkles className="w-4 h-4 text-chart-teal" />
        </div>
        
        <h3 className="text-heading-sm text-ink mb-xs">{model.name}</h3>
        <p className="text-body-sm text-muted mb-lg">Optimized router latency via lowest-cost active edge nodes.</p>
        
        <div className="flex flex-col gap-md mb-lg">
          <div>
            <div className="flex justify-between text-body-sm mb-xs">
              <span className="text-muted">Intelligence Score</span>
              <span className="font-mono text-ink font-bold">{model.score}/100</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-sunken overflow-hidden">
              <div className="h-full bg-chart-blue rounded-full transition-all duration-500" style={{ width: `${model.score}%` }} />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-body-sm mb-xs">
              <span className="text-muted">Throughput (Tokens/sec)</span>
              <span className="font-mono text-ink font-bold">{model.tokensPerSec} t/s</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-sunken overflow-hidden">
              <div className="h-full bg-chart-teal rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (model.tokensPerSec / 300) * 100)}%` }} />
            </div>
          </div>
        </div>
      </div>
      
      <Button variant="primary" className="w-full justify-between" onClick={onTestModel}>
        <span>TEST {model.name.toUpperCase()}</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
    </Card>
  );
}
