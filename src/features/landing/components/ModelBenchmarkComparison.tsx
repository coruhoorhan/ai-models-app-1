import React, { useState } from 'react';
import { Sparkles, Zap, DollarSign, Clock, ArrowRight, Check } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { useNavigate } from 'react-router-dom';

interface ModelData {
  id: string;
  name: string;
  provider: string;
  category: 'Coding' | 'Reasoning' | 'Speed' | 'Vision';
  tokensPerSec: number;
  latencyMs: number;
  costPerMIn: number;
  costPerMOut: number;
  score: number;
  badge?: string;
}

const MODELS: ModelData[] = [
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', category: 'Coding', tokensPerSec: 112, latencyMs: 145, costPerMIn: 3.00, costPerMOut: 15.00, score: 98, badge: 'Top Rated' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', category: 'Reasoning', tokensPerSec: 135, latencyMs: 120, costPerMIn: 2.50, costPerMOut: 10.00, score: 96, badge: 'Popular' },
  { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', category: 'Vision', tokensPerSec: 160, latencyMs: 110, costPerMIn: 1.25, costPerMOut: 5.00, score: 95, badge: '2M Context' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', category: 'Reasoning', tokensPerSec: 95, latencyMs: 210, costPerMIn: 0.55, costPerMOut: 2.19, score: 97, badge: 'Best Value' },
  { id: 'llama-3-3-70b', name: 'Llama 3.3 70B', provider: 'Meta', category: 'Speed', tokensPerSec: 280, latencyMs: 65, costPerMIn: 0.40, costPerMOut: 0.40, score: 92, badge: 'Ultra Fast' },
];

export function ModelBenchmarkComparison() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedModel, setSelectedModel] = useState<ModelData>(MODELS[0]);

  const categories = ['All', 'Coding', 'Reasoning', 'Speed', 'Vision'];

  const filteredModels = MODELS.filter(m => 
    activeCategory === 'All' || m.category === activeCategory
  );

  return (
    <section className="w-full flex flex-col gap-lg py-section px-lg lg:px-xl border-t border-hairline">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <span className="text-label text-subtle mb-xs block">REAL-TIME BENCHMARKS</span>
          <h2 className="text-heading-lg text-ink">Compare performance & cost.</h2>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-xs bg-surface border border-hairline p-[3px] rounded-sm overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-sm py-xs rounded-xs text-body-sm transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-ink text-canvas font-medium'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Model List */}
        <div className="lg:col-span-2 flex flex-col gap-sm">
          {filteredModels.map((model) => {
            const isSelected = selectedModel.id === model.id;
            return (
              <Card
                key={model.id}
                onClick={() => setSelectedModel(model)}
                className={`p-md cursor-pointer transition-all border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-md ${
                  isSelected ? 'border-ink bg-surface-sunken shadow-xs' : 'hover:border-muted'
                }`}
              >
                <div className="flex items-center gap-md">
                  <div className="w-9 h-9 rounded-sm bg-surface border border-hairline flex items-center justify-center font-bold text-ink text-body shrink-0">
                    {model.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-xs">
                      <span className="text-body font-bold text-ink">{model.name}</span>
                      {model.badge && <Badge variant="free" label={model.badge} />}
                    </div>
                    <span className="text-body-sm text-muted">{model.provider} • {model.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-lg">
                  <div className="flex flex-col text-right">
                    <span className="text-label text-subtle">SPEED</span>
                    <span className="text-body-sm font-mono text-ink">{model.tokensPerSec} t/s</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-label text-subtle">LATENCY</span>
                    <span className="text-body-sm font-mono text-ink">{model.latencyMs}ms</span>
                  </div>
                  <div className="flex flex-col text-right min-w-[70px]">
                    <span className="text-label text-subtle">COST IN/OUT</span>
                    <span className="text-body-sm font-mono text-ink">${model.costPerMIn}/${model.costPerMOut}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detailed Benchmark Card */}
        <Card className="p-xl flex flex-col justify-between border-hairline bg-surface">
          <div>
            <div className="flex items-center justify-between mb-md">
              <span className="text-label text-subtle">BENCHMARK BREAKDOWN</span>
              <Sparkles className="w-4 h-4 text-chart-teal" />
            </div>

            <h3 className="text-heading-sm text-ink mb-xs">{selectedModel.name}</h3>
            <p className="text-body-sm text-muted mb-lg">Optimized router latency via lowest-cost active edge nodes.</p>

            <div className="flex flex-col gap-md mb-lg">
              <div>
                <div className="flex justify-between text-body-sm mb-xs">
                  <span className="text-muted">Intelligence Score</span>
                  <span className="font-mono text-ink font-bold">{selectedModel.score}/100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-sunken overflow-hidden">
                  <div className="h-full bg-chart-blue rounded-full transition-all duration-500" style={{ width: `${selectedModel.score}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-body-sm mb-xs">
                  <span className="text-muted">Throughput (Tokens/sec)</span>
                  <span className="font-mono text-ink font-bold">{selectedModel.tokensPerSec} t/s</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-sunken overflow-hidden">
                  <div className="h-full bg-chart-teal rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (selectedModel.tokensPerSec / 300) * 100)}%` }} />
                </div>
              </div>
            </div>
          </div>

          <Button variant="primary" className="w-full justify-between" onClick={() => navigate('/models')}>
            <span>TEST {selectedModel.name.toUpperCase()}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>
      </div>
    </section>
  );
}
