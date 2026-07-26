import React, { useState } from 'react';
import { Copy, Check, Terminal, Code } from 'lucide-react';

interface DocsCodeBlockProps {
  snippets: {
    ts: string;
    python: string;
    curl: string;
  };
}

export function DocsCodeBlock({ snippets }: DocsCodeBlockProps) {
  const [lang, setLang] = useState<'ts' | 'python' | 'curl'>('ts');
  const [copied, setCopied] = useState(false);

  const activeSnippet = snippets[lang];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-surface border border-hairline rounded-md overflow-hidden flex flex-col my-md">
      {/* Code Header */}
      <div className="h-[40px] bg-canvas border-b border-hairline px-md flex items-center justify-between">
        <div className="flex items-center gap-xs">
          <Code className="w-4 h-4 text-muted" />
          <div className="flex items-center gap-[2px]">
            {[
              { id: 'ts', label: 'TypeScript / Node' },
              { id: 'python', label: 'Python SDK' },
              { id: 'curl', label: 'cURL / REST' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setLang(item.id as any)}
                className={`px-sm py-xs text-label rounded-xs font-mono transition-colors ${
                  lang === item.id
                    ? 'bg-ink text-canvas font-bold'
                    : 'text-muted hover:text-ink hover:bg-surface'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-xs text-label font-mono text-muted hover:text-ink px-xs py-[2px] rounded-xs border border-hairline bg-surface"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-live" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Area */}
      <div className="p-md bg-canvas/80 font-mono text-body-sm text-ink overflow-x-auto">
        <pre className="leading-relaxed font-mono whitespace-pre">{activeSnippet}</pre>
      </div>
    </div>
  );
}
