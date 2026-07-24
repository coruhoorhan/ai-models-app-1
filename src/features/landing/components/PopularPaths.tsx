import React from 'react';
import { Terminal, Bot, MessageCircle, Code2 } from 'lucide-react';
import { FeatureCard } from '../../../shared/ui/FeatureCard';
import { TickerBar } from '../../../shared/ui/TickerBar';

export function PopularPaths() {
  const models = [
    'gpt-4o', 'claude-3-opus', 'gemini-1.5-pro', 'meta-llama-3-70b',
    'mistral-large', 'cohere-command-r-plus', 'grok-1.5', 'qwen-2.5-72b'
  ];

  return (
    <section className="w-full flex flex-col gap-xl py-section">
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
          onCtaClick={() => {}}
        />
        <FeatureCard
          icon={Bot}
          accentColor="chart-pink"
          title="Character & fiction clients"
          description="SillyTavern, Janitor.AI, Chub, and RisuAI."
          ctaLabel="View Guide"
          onCtaClick={() => {}}
        />
        <FeatureCard
          icon={MessageCircle}
          accentColor="chart-blue"
          title="Chat clients"
          description="Desktop apps, web UIs, and generic OpenAI-compatible clients."
          ctaLabel="View Guide"
          onCtaClick={() => {}}
        />
        <FeatureCard
          icon={Terminal}
          accentColor="chart-orange"
          title="CLI tools"
          description="Aider, Codex, Gemini CLI, OpenClaw, and terminal agents."
          ctaLabel="View Guide"
          onCtaClick={() => {}}
        />
      </div>

      <div className="mt-lg">
        <TickerBar tps={842} models={models} />
      </div>
    </section>
  );
}
