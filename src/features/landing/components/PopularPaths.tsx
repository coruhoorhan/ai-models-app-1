import React, { useState } from 'react';
import { Terminal, Bot, MessageCircle, Code2, X, Copy, Check } from 'lucide-react';
import { FeatureCard } from '../../../shared/ui/FeatureCard';
import { TickerBar } from '../../../shared/ui/TickerBar';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';

export function PopularPaths() {
  const navigate = useNavigate();
  const [activeGuide, setActiveGuide] = useState<{ title: string; code: string; desc: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const models = [
    'gpt-4o', 'claude-3-opus', 'gemini-1.5-pro', 'meta-llama-3-70b',
    'mistral-large', 'cohere-command-r-plus', 'grok-1.5', 'qwen-2.5-72b'
  ];

  const guides = {
    coding: {
      title: 'Coding Agents Integration',
      desc: 'Set OPENAI_API_BASE to OpenRouter URL in your IDE or CLI agent (Cline, Roo Code, Aider, Cursor):',
      code: 'export OPENAI_API_BASE="https://openrouter.ai/api/v1"\nexport OPENAI_API_KEY="sk-or-v1-YOUR_KEY"\n# Configure model in your client:\nexport MODEL="anthropic/claude-3.5-sonnet"'
    },
    character: {
      title: 'Character & Fiction Clients',
      desc: 'Paste your OpenRouter API key directly in SillyTavern or Janitor.AI under OpenAI / Custom Endpoint settings:',
      code: 'API Endpoint: https://openrouter.ai/api/v1\nAPI Key: sk-or-v1-YOUR_API_KEY\nContext Length: 8192 - 128000 tokens'
    },
    chat: {
      title: 'Chat Clients & Web UI',
      desc: 'OpenWebUI, TypingMind, and NextChat native OpenRouter integration:',
      code: 'OPENAI_API_BASE=https://openrouter.ai/api/v1\nOPENAI_API_KEY=sk-or-v1-YOUR_KEY\nDEFAULT_MODEL=openai/gpt-4o'
    },
    cli: {
      title: 'CLI Tools & Terminal Agents',
      desc: 'Run Aider or OpenClaw directly with OpenRouter model prefixes:',
      code: 'aider --openai-api-base https://openrouter.ai/api/v1 \\\n      --openai-api-key $OPENROUTER_KEY \\\n      --model openrouter/anthropic/claude-3.5-sonnet'
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full flex flex-col gap-xl py-section relative">
      <div className="flex flex-col items-center text-center px-lg">
        <span className="text-label text-subtle mb-md">POPULAR PATHS</span>
        <h2 className="text-heading-lg text-ink mb-sm">Integrate anywhere.</h2>
        <p className="text-body text-muted max-w-2xl">
          Drop-in compatibility with the tools you already use. Switch models without rewriting your stack.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-md px-lg lg:px-xl">
        <FeatureCard
          icon={Code2}
          accentColor="chart-green"
          title="Coding agents"
          description="OpenCode, Cline, Roo Code, Kilo Code, Zed, and more."
          ctaLabel="View Guide"
          onCtaClick={() => setActiveGuide(guides.coding)}
        />
        <FeatureCard
          icon={Bot}
          accentColor="chart-pink"
          title="Character & fiction clients"
          description="SillyTavern, Janitor.AI, Chub, and RisuAI."
          ctaLabel="View Guide"
          onCtaClick={() => setActiveGuide(guides.character)}
        />
        <FeatureCard
          icon={MessageCircle}
          accentColor="chart-blue"
          title="Chat clients"
          description="Desktop apps, web UIs, and generic OpenAI-compatible clients."
          ctaLabel="View Guide"
          onCtaClick={() => setActiveGuide(guides.chat)}
        />
        <FeatureCard
          icon={Terminal}
          accentColor="chart-orange"
          title="CLI tools"
          description="Aider, Codex, Gemini CLI, OpenClaw, and terminal agents."
          ctaLabel="View Guide"
          onCtaClick={() => setActiveGuide(guides.cli)}
        />
      </div>

      <div className="mt-lg">
        <TickerBar tps={842} models={models} />
      </div>

      {/* Guide Modal Popover */}
      {activeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-ink/40 backdrop-blur-xs">
          <div className="bg-canvas border border-hairline rounded-lg w-full max-w-[540px] p-xl shadow-xl flex flex-col gap-md relative">
            <div className="flex items-center justify-between border-b border-hairline pb-md">
              <h3 className="text-heading-sm text-ink">{activeGuide.title}</h3>
              <button 
                onClick={() => setActiveGuide(null)}
                className="w-8 h-8 rounded-sm hover:bg-surface flex items-center justify-center text-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-body-sm text-muted">{activeGuide.desc}</p>
            
            <div className="relative bg-surface-sunken border border-hairline rounded-sm p-md font-mono text-[13px] text-ink overflow-x-auto">
              <pre className="whitespace-pre">{activeGuide.code}</pre>
              <button
                onClick={() => handleCopy(activeGuide.code)}
                className="absolute top-2 right-2 p-xs bg-surface border border-hairline rounded-sm hover:bg-surface-sunken text-muted hover:text-ink flex items-center gap-xs text-[11px]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-live" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="flex justify-end gap-md pt-sm">
              <Button variant="secondary" onClick={() => setActiveGuide(null)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => navigate('/models')}>
                Browse Models
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

