import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, Zap, ArrowRight, ShieldCheck, Layers, Code2 } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';

export function DashboardRouterInspector() {
  const [primaryModel, setPrimaryModel] = useState('anthropic/claude-3.5-sonnet');
  const [fallbackModel, setFallbackModel] = useState('openai/gpt-4o');
  const [selectedLang, setSelectedLang] = useState<'curl' | 'js' | 'python'>('curl');
  const [copied, setCopied] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    primaryLatency: number;
    fallbackLatency: number;
    totalMs: number;
    status: string;
    tokensServed: number;
  } | null>(null);

  const getCodeSnippet = () => {
    if (selectedLang === 'curl') {
      return `curl https://openrouter.ai/api/v1/chat/completions \\
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${primaryModel}",
    "models": ["${primaryModel}", "${fallbackModel}"],
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`;
    }
    if (selectedLang === 'js') {
      return `import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: "${primaryModel}",
  extra_body: { models: ["${primaryModel}", "${fallbackModel}"] },
  messages: [{ role: "user", content: "Hello!" }],
});`;
    }
    return `from openai import OpenAI
import os

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.environ["OPENROUTER_API_KEY"],
)

completion = client.chat.completions.create(
    model="${primaryModel}",
    extra_body={"models": ["${primaryModel}", "${fallbackModel}"]},
    messages=[{"role": "user", "content": "Hello!"}]
)`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunRouteTest = () => {
    setIsTesting(true);
    setTestResult(null);

    setTimeout(() => {
      setTestResult({
        primaryLatency: Math.floor(Math.random() * 30) + 110,
        fallbackLatency: Math.floor(Math.random() * 20) + 90,
        totalMs: Math.floor(Math.random() * 40) + 130,
        status: 'Optimal Route Resolved',
        tokensServed: Math.floor(Math.random() * 120) + 80,
      });
      setIsTesting(false);
    }, 1200);
  };

  return (
    <Card className="w-full p-lg border-hairline bg-surface flex flex-col gap-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md border-b border-hairline pb-md">
        <div className="flex items-center gap-sm">
          <div className="p-xs rounded-sm bg-ink text-canvas">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-xs">
              <h3 className="text-body font-bold text-ink">Smart Router & Code Generator</h3>
              <Badge variant="status-live" label="Live Inspector" />
            </div>
            <p className="text-body-sm text-muted">Configure fallback chains and generate ready-to-paste SDK code.</p>
          </div>
        </div>

        <Button 
          variant="secondary" 
          icon={Play} 
          disabled={isTesting}
          onClick={handleRunRouteTest}
          className="text-body-sm shrink-0"
        >
          {isTesting ? 'Simulating Route...' : 'Simulate Route Request'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-md">
        {/* Router Config Panel */}
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

          {/* Test Metrics Waterfall */}
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

        {/* Code Generator Snippets */}
        <div className="lg:col-span-7 flex flex-col gap-xs bg-canvas p-md border border-hairline rounded-sm">
          <div className="flex items-center justify-between pb-xs border-b border-hairline">
            <div className="flex items-center gap-xs">
              <Code2 className="w-4 h-4 text-chart-blue" />
              <span className="text-label text-subtle">INTEGRATION CODE</span>
            </div>

            <div className="flex items-center gap-xs">
              {(['curl', 'js', 'python'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`px-xs py-[2px] rounded-xs text-[11px] font-mono transition-colors uppercase ${
                    selectedLang === lang ? 'bg-ink text-canvas font-bold' : 'text-muted hover:text-ink'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="relative bg-surface-sunken border border-hairline rounded-sm p-sm font-mono text-[12px] text-ink overflow-x-auto min-h-[160px] flex items-center">
            <pre className="whitespace-pre w-full">{getCodeSnippet()}</pre>
            <button
              onClick={handleCopyCode}
              className="absolute top-2 right-2 p-xs bg-surface border border-hairline rounded-sm hover:bg-canvas text-muted hover:text-ink flex items-center gap-xs text-[11px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-live" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
