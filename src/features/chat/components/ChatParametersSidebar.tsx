import React from 'react';
import { Sliders, Sparkles, Shield, RotateCcw } from 'lucide-react';
import { ChatParameters } from '../types';
import { Button } from '../../../shared/ui/Button';

interface ChatParametersSidebarProps {
  params: ChatParameters;
  onChange: (newParams: ChatParameters) => void;
  onReset: () => void;
}

export function ChatParametersSidebar({ params, onChange, onReset }: ChatParametersSidebarProps) {
  const systemPresets = [
    { label: 'Default Helpful AI', prompt: 'You are a helpful, precise AI assistant.' },
    { label: 'Senior Software Engineer', prompt: 'You are a Senior Staff Engineer. Provide concise, production-ready code with no conversational fluff.' },
    { label: 'SQL & Database Architect', prompt: 'You are a database performance architect specializing in indexing, query plans, and schema design.' },
    { label: 'Concise Technical Summarizer', prompt: 'Provide bulleted summaries highlighting key architectural trade-offs in 3 sentences max.' }
  ];

  return (
    <div className="w-full lg:w-[300px] bg-canvas border-l border-hairline p-md flex flex-col gap-md shrink-0">
      <div className="flex items-center justify-between border-b border-hairline pb-sm">
        <div className="flex items-center gap-xs">
          <Sliders className="w-4 h-4 text-ink" />
          <span className="text-body-sm font-bold text-ink">Inference Parameters</span>
        </div>
        <button 
          onClick={onReset}
          className="text-[11px] font-mono text-muted hover:text-ink flex items-center gap-[2px]"
          title="Reset Parameters"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* System Prompt & Presets */}
      <div className="flex flex-col gap-xs">
        <span className="text-label text-subtle">SYSTEM PROMPT INSTRUCTION</span>
        <textarea
          rows={3}
          value={params.systemPrompt}
          onChange={(e) => onChange({ ...params, systemPrompt: e.target.value })}
          placeholder="System prompt..."
          className="bg-surface border border-hairline rounded-sm p-sm text-body-sm text-ink outline-none focus:border-ink resize-none font-sans"
        />
        <div className="flex flex-col gap-[3px] mt-xs">
          <span className="text-[10px] text-subtle uppercase font-mono">Quick Presets</span>
          {systemPresets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => onChange({ ...params, systemPrompt: p.prompt })}
              className="text-left text-[11px] px-xs py-[3px] rounded-xs bg-surface hover:bg-surface-sunken text-ink border border-hairline truncate transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Temperature Slider */}
      <div className="flex flex-col gap-xs pt-xs border-t border-hairline">
        <div className="flex justify-between items-center">
          <span className="text-body-sm text-ink font-medium">Temperature</span>
          <span className="text-body-sm font-mono font-bold text-ink">{params.temperature}</span>
        </div>
        <input
          type="range"
          min={0}
          max={1.5}
          step={0.1}
          value={params.temperature}
          onChange={(e) => onChange({ ...params, temperature: Number(e.target.value) })}
          className="w-full accent-ink cursor-pointer h-2 bg-surface-sunken rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-subtle font-mono">
          <span>Precise (0.0)</span>
          <span>Balanced (0.7)</span>
          <span>Creative (1.5)</span>
        </div>
      </div>

      {/* Max Tokens Slider */}
      <div className="flex flex-col gap-xs pt-xs border-t border-hairline">
        <div className="flex justify-between items-center">
          <span className="text-body-sm text-ink font-medium">Max Token Limit</span>
          <span className="text-body-sm font-mono font-bold text-ink">{params.maxTokens}</span>
        </div>
        <input
          type="range"
          min={256}
          max={8192}
          step={256}
          value={params.maxTokens}
          onChange={(e) => onChange({ ...params, maxTokens: Number(e.target.value) })}
          className="w-full accent-ink cursor-pointer h-2 bg-surface-sunken rounded-lg"
        />
      </div>

      {/* Auto Fallback Toggle */}
      <div className="flex flex-col gap-xs pt-xs border-t border-hairline">
        <div 
          onClick={() => onChange({ ...params, autoFallback: !params.autoFallback })}
          className={`p-sm rounded-sm border cursor-pointer flex items-center justify-between transition-colors ${
            params.autoFallback ? 'border-live bg-live/5' : 'border-hairline bg-surface'
          }`}
        >
          <div className="flex flex-col">
            <span className="text-body-sm font-bold text-ink">Auto-Fallback Chain</span>
            <span className="text-[11px] text-muted">Reroute on primary timeout</span>
          </div>
          <Shield className={`w-4 h-4 ${params.autoFallback ? 'text-live' : 'text-subtle'}`} />
        </div>

        {params.autoFallback && (
          <select
            value={params.fallbackModelId}
            onChange={(e) => onChange({ ...params, fallbackModelId: e.target.value })}
            className="bg-surface border border-hairline rounded-sm p-xs text-[11px] font-mono text-ink outline-none mt-xs cursor-pointer"
          >
            <option value="openai/gpt-4o">Fallback: openai/gpt-4o</option>
            <option value="meta-llama/llama-3.3-70b-instruct">Fallback: llama-3.3-70b-instruct</option>
            <option value="google/gemini-1.5-flash">Fallback: gemini-1.5-flash</option>
          </select>
        )}
      </div>
    </div>
  );
}
