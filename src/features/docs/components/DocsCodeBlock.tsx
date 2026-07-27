import React, { useState } from 'react';
import { Copy, Check, Terminal, Code } from 'lucide-react';
import { CodeSnippets } from '../../../types';

interface DocsCodeBlockProps {
  snippets: CodeSnippets;
}

export function DocsCodeBlock({ snippets }: DocsCodeBlockProps) {
  // Use the first available language as default, or fallback to something
  const availableLangs = Object.keys(snippets) as Array<keyof CodeSnippets>;
  const defaultLang = availableLangs.length > 0 ? availableLangs[0] : 'ts';
  
  const [lang, setLang] = useState<keyof CodeSnippets>(defaultLang);
  const [copied, setCopied] = useState(false);

  const activeSnippet = snippets[lang] || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLabel = (l: string) => {
    switch(l) {
      case 'ts': return 'TypeScript / Node';
      case 'python': return 'Python SDK';
      case 'curl': return 'cURL / REST';
      case 'json': return 'JSON';
      default: return l.toUpperCase();
    }
  };

  if (availableLangs.length === 0) return null;

  return (
    <div className="w-full bg-surface border border-hairline rounded-md overflow-hidden flex flex-col my-md">
      {/* Code Header */}
      <div className="h-[40px] bg-canvas border-b border-hairline px-md flex items-center justify-between">
        <div className="flex items-center gap-xs overflow-x-auto">
          <Code className="w-4 h-4 text-muted shrink-0" />
          <div className="flex items-center gap-xxs">
            {availableLangs.map((item) => (
              <button
                key={item}
                onClick={() => setLang(item)}
                className={`px-sm py-xs text-label rounded-xs font-mono transition-colors shrink-0 focus-ring ${
                  lang === item
                    ? 'bg-ink text-canvas font-bold'
                    : 'text-muted hover:text-ink hover:bg-surface'
                }`}
              >
                {getLabel(item)}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-xs text-label font-mono text-muted hover:text-ink px-xs py-xxs rounded-xs border border-hairline bg-surface focus-ring transition-fast"
          aria-label={copied ? "Copied to clipboard" : "Copy code block"}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-live" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Area */}
      <div className="p-md bg-canvas/80 font-mono text-body-sm text-ink overflow-x-auto">
        <pre className="leading-relaxed font-mono whitespace-pre">{activeSnippet}</pre>
      </div>
    </div>
  );
}
