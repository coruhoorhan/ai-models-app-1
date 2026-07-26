import React, { useState } from 'react';
import { X, Check, ArrowRightLeft, Zap, DollarSign, ShieldCheck, Sparkles } from 'lucide-react';
import { ModelConfig } from '../../../shared/api/models.api';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';

interface ModelCompareModalProps {
  models: ModelConfig[];
  isOpen: boolean;
  onClose: () => void;
}

export function ModelCompareModal({ models, isOpen, onClose }: ModelCompareModalProps) {
  const [modelAId, setModelAId] = useState<string>(models[0]?.id || 'claude-3-5-sonnet');
  const [modelBId, setModelBId] = useState<string>(models[1]?.id || 'gpt-4o');

  if (!isOpen || models.length === 0) return null;

  const modelA = models.find(m => m.id === modelAId) || models[0];
  const modelB = models.find(m => m.id === modelBId) || models[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-ink/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-canvas border border-hairline rounded-lg w-full max-w-[800px] max-h-[90vh] overflow-y-auto p-xl shadow-2xl flex flex-col gap-lg relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-hairline pb-md">
          <div className="flex items-center gap-sm">
            <div className="p-sm rounded-sm bg-ink text-canvas">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-heading-sm text-ink">Side-by-Side Model Comparison</h2>
              <p className="text-body-sm text-muted">Compare context windows, pricing, speed, and capabilities.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-sm hover:bg-surface flex items-center justify-center text-muted hover:text-ink"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Model Selectors */}
        <div className="grid grid-cols-2 gap-md">
          <div className="flex flex-col gap-xs">
            <label className="text-label text-subtle">MODEL A</label>
            <select
              value={modelAId}
              onChange={(e) => setModelAId(e.target.value)}
              className="bg-surface border border-hairline rounded-sm p-sm text-body-sm font-bold text-ink outline-none focus:border-ink cursor-pointer"
            >
              {models.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.provider})</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="text-label text-subtle">MODEL B</label>
            <select
              value={modelBId}
              onChange={(e) => setModelBId(e.target.value)}
              className="bg-surface border border-hairline rounded-sm p-sm text-body-sm font-bold text-ink outline-none focus:border-ink cursor-pointer"
            >
              {models.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.provider})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="border border-hairline rounded-md bg-surface overflow-hidden">
          {/* Row 1: Name & Provider */}
          <div className="grid grid-cols-2 divide-x divide-hairline border-b border-hairline bg-canvas p-md">
            <div className="flex flex-col">
              <span className="text-heading-sm text-ink">{modelA.name}</span>
              <span className="text-body-sm text-muted">{modelA.provider}</span>
            </div>
            <div className="flex flex-col pl-md">
              <span className="text-heading-sm text-ink">{modelB.name}</span>
              <span className="text-body-sm text-muted">{modelB.provider}</span>
            </div>
          </div>

          {/* Row 2: Pricing */}
          <div className="grid grid-cols-2 divide-x divide-hairline border-b border-hairline p-md">
            <div>
              <span className="text-label text-subtle block mb-xs">PRICE TIER</span>
              <span className="text-body font-mono text-ink font-bold">
                {modelA.isFree ? <Badge variant="status-live" label="FREE" /> : modelA.price}
              </span>
            </div>
            <div className="pl-md">
              <span className="text-label text-subtle block mb-xs">PRICE TIER</span>
              <span className="text-body font-mono text-ink font-bold">
                {modelB.isFree ? <Badge variant="status-live" label="FREE" /> : modelB.price}
              </span>
            </div>
          </div>

          {/* Row 3: Context Window */}
          <div className="grid grid-cols-2 divide-x divide-hairline border-b border-hairline p-md">
            <div>
              <span className="text-label text-subtle block mb-xs">CONTEXT WINDOW</span>
              <span className="text-body font-mono text-ink font-bold">{modelA.context}</span>
            </div>
            <div className="pl-md">
              <span className="text-label text-subtle block mb-xs">CONTEXT WINDOW</span>
              <span className="text-body font-mono text-ink font-bold">{modelB.context}</span>
            </div>
          </div>

          {/* Row 4: Speed / Latency */}
          <div className="grid grid-cols-2 divide-x divide-hairline border-b border-hairline p-md">
            <div>
              <span className="text-label text-subtle block mb-xs">SPEED RATING</span>
              <span className="text-body font-mono text-chart-teal font-bold flex items-center gap-xs">
                <Zap className="w-4 h-4" /> {modelA.speed}
              </span>
            </div>
            <div className="pl-md">
              <span className="text-label text-subtle block mb-xs">SPEED RATING</span>
              <span className="text-body font-mono text-chart-teal font-bold flex items-center gap-xs">
                <Zap className="w-4 h-4" /> {modelB.speed}
              </span>
            </div>
          </div>

          {/* Row 5: Categories */}
          <div className="grid grid-cols-2 divide-x divide-hairline p-md">
            <div>
              <span className="text-label text-subtle block mb-xs">TAGS & CAPABILITIES</span>
              <div className="flex flex-wrap gap-xs">
                {modelA.category.map(c => <Badge key={c} variant="free" label={c} />)}
              </div>
            </div>
            <div className="pl-md">
              <span className="text-label text-subtle block mb-xs">TAGS & CAPABILITIES</span>
              <div className="flex flex-wrap gap-xs">
                {modelB.category.map(c => <Badge key={c} variant="free" label={c} />)}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-md pt-sm">
          <Button variant="secondary" onClick={onClose}>
            Close Matrix
          </Button>
        </div>
      </div>
    </div>
  );
}
