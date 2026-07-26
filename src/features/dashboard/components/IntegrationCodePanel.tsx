import React, { useState } from 'react';
import { Code2, Check, Copy } from 'lucide-react';

interface IntegrationCodePanelProps {
  primaryModel: string;
  fallbackModel: string;
}

export function IntegrationCodePanel({ primaryModel, fallbackModel }: IntegrationCodePanelProps) {
  const [selectedLang, setSelectedLang] = useState<'curl' | 'js' | 'python'>('curl');
  const [copied, setCopied] = useState(false);

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

  return (
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
              className={`px-xs py-xxs rounded-xs text-label font-mono transition-colors uppercase ${
                selectedLang === lang ? 'bg-ink text-canvas font-bold' : 'text-muted hover:text-ink'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative bg-surface-sunken border border-hairline rounded-sm p-sm font-mono text-body-sm text-ink overflow-x-auto min-h-[160px] flex items-center">
        <pre className="whitespace-pre w-full">{getCodeSnippet()}</pre>
        <button
          onClick={handleCopyCode}
          className="absolute top-2 right-2 p-xs bg-surface border border-hairline rounded-sm hover:bg-canvas text-muted hover:text-ink flex items-center gap-xs text-label"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-live" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
