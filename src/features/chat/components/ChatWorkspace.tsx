import React, { useState } from 'react';
import { Send, Sparkles, Sliders, BookOpen, Trash2, Download, Layers, ShieldAlert, Check } from 'lucide-react';
import { ChatMessage, ChatParameters } from '../types';
import { ChatMessageItem } from './ChatMessageItem';
import { ChatParametersSidebar } from './ChatParametersSidebar';
import { PromptLibraryModal } from './PromptLibraryModal';
import { MultiModelCompareView } from './MultiModelCompareView';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';

export function ChatWorkspace() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to the UnoRouter Chat Studio workspace! Select any model from OpenRouter, test system prompts, or switch to Multi-Model Dual Streaming to compare model outputs side-by-side.',
      modelName: 'anthropic/claude-3.5-sonnet',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState({ id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' });
  const [secondaryModel, setSecondaryModel] = useState({ id: 'openai/gpt-4o', name: 'GPT-4o' });
  const [isMultiModel, setIsMultiModel] = useState(false);
  const [showParamsSidebar, setShowParamsSidebar] = useState(true);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const [copiedExport, setCopiedExport] = useState(false);

  const [params, setParams] = useState<ChatParameters>({
    temperature: 0.7,
    topP: 1,
    maxTokens: 2048,
    systemPrompt: 'You are a Senior Staff Engineer delivering concise production-ready answers.',
    autoFallback: true,
    fallbackModelId: 'openai/gpt-4o'
  });

  const availableModels = [
    { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
    { id: 'openai/gpt-4o', name: 'OpenAI GPT-4o' },
    { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1 (Reasoning)' },
    { id: 'google/gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
    { id: 'meta-llama/llama-3.3-70b-instruct', name: 'Meta Llama 3.3 70B' },
    { id: 'allam/allam-2-7b:free', name: 'ALLaM 2 7B (Free)' }
  ];

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    const currentPrompt = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyContent = `Router processed via ${selectedModel.name}.\n\nHere is a structured analysis:\n\n1. **Execution**: Evaluated with system instruction "${params.systemPrompt.slice(0, 40)}...".\n2. **Optimization**: Zero proxy latency added by UnoRouter Edge Node (12ms TTFT).\n3. **Fallback**: Auto-fallback chain armed with ${params.fallbackModelId}.`;

      if (currentPrompt.toLowerCase().includes('sql') || currentPrompt.toLowerCase().includes('index')) {
        replyContent = `To optimize PostgreSQL queries:\n\n\`\`\`sql\nCREATE INDEX CONCURRENTLY idx_orders_user_status \nON orders (user_id, status) \nINCLUDE (created_at);\n\`\`\`\n\n- **Composite Order**: High cardinality column (\`user_id\`) placed first.\n- **Covering Index**: Included \`created_at\` to avoid table heap lookup.`;
      } else if (currentPrompt.toLowerCase().includes('throttle') || currentPrompt.toLowerCase().includes('code')) {
        replyContent = `TypeScript Throttle Implementation:\n\n\`\`\`typescript\nexport function throttle<T extends (...args: any[]) => void>(fn: T, limit: number): T {\n  let lastCall = 0;\n  return function (...args: Parameters<T>) {\n    const now = Date.now();\n    if (now - lastCall >= limit) {\n      lastCall = now;\n      fn(...args);\n    }\n  } as T;\n}\n\`\`\``;
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replyContent,
        modelId: selectedModel.id,
        modelName: selectedModel.name,
        tokensUsed: Math.floor(Math.random() * 100) + 120,
        latencyMs: Math.floor(Math.random() * 80) + 90,
        tokensPerSec: Math.floor(Math.random() * 40) + 110,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 700);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(messages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `chat_session_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2000);
  };

  return (
    <div className="w-full h-[calc(100vh-140px)] min-h-[550px] bg-canvas border border-hairline rounded-lg shadow-sm flex flex-col overflow-hidden relative">
      {/* Top Toolbar */}
      <div className="h-[56px] border-b border-hairline bg-surface px-md flex items-center justify-between shrink-0 gap-sm flex-wrap">
        {/* Model Selector & Multi-Model Toggle */}
        <div className="flex items-center gap-sm">
          <div className="flex items-center gap-xs">
            <span className="text-body-sm font-bold text-ink">Primary Model:</span>
            <select
              value={selectedModel.id}
              onChange={(e) => {
                const found = availableModels.find(m => m.id === e.target.value);
                if (found) setSelectedModel(found);
              }}
              className="bg-canvas border border-hairline rounded-sm p-xs text-body-sm font-bold text-ink cursor-pointer outline-none focus:border-ink"
            >
              {availableModels.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsMultiModel(!isMultiModel)}
            className={`px-sm py-xs text-body-sm rounded-sm border font-medium flex items-center gap-xs transition-colors ${
              isMultiModel ? 'bg-ink text-canvas border-ink' : 'bg-canvas border-hairline text-ink hover:bg-surface-sunken'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {isMultiModel ? 'Dual Arena Stream ON' : 'Dual Compare Arena'}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-xs">
          <Button 
            variant="secondary" 
            icon={BookOpen} 
            size="sm"
            onClick={() => setShowPromptLibrary(true)}
          >
            Presets
          </Button>

          <Button
            variant="secondary"
            icon={Download}
            size="sm"
            onClick={handleExportJSON}
          >
            {copiedExport ? 'Exported!' : 'Export JSON'}
          </Button>

          <Button
            variant="secondary"
            icon={Trash2}
            size="sm"
            onClick={() => setMessages([])}
          >
            Clear
          </Button>

          <button
            onClick={() => setShowParamsSidebar(!showParamsSidebar)}
            className={`p-xs rounded-sm border ${
              showParamsSidebar ? 'bg-surface-sunken border-ink text-ink' : 'bg-canvas border-hairline text-muted hover:text-ink'
            }`}
            title="Toggle Parameters Sidebar"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area (Chat or Multi-Model) */}
      <div className="flex-1 flex overflow-hidden">
        {isMultiModel ? (
          <MultiModelCompareView modelA={selectedModel} modelB={secondaryModel} />
        ) : (
          <div className="flex-1 flex flex-col bg-canvas relative overflow-hidden">
            {/* Messages Scroll Area */}
            <div className="flex-1 p-lg flex flex-col gap-md overflow-y-auto">
              {messages.map((msg) => (
                <ChatMessageItem key={msg.id} message={msg} />
              ))}

              {isTyping && (
                <div className="flex items-center gap-xs p-md bg-surface border border-hairline rounded-md max-w-[200px]">
                  <span className="w-2 h-2 rounded-full bg-chart-blue animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-chart-teal animate-pulse delay-100" />
                  <span className="w-2 h-2 rounded-full bg-chart-pink animate-pulse delay-200" />
                  <span className="text-body-sm text-muted font-mono ml-xs">Streaming...</span>
                </div>
              )}
            </div>

            {/* Bottom Input Area */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-md border-t border-hairline bg-canvas flex flex-col gap-xs"
            >
              <div className="w-full bg-surface-sunken border border-hairline rounded-sm min-h-[48px] flex items-center px-sm gap-sm">
                <input
                  type="text"
                  placeholder={`Ask ${selectedModel.name}... (Press Enter to send)`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-body text-ink placeholder:text-muted font-sans"
                />
                <Button type="submit" variant="primary" icon={Send} disabled={!input.trim() || isTyping}>
                  Send
                </Button>
              </div>

              <div className="flex justify-between items-center px-xs text-[11px] font-mono text-subtle">
                <span className="flex items-center gap-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-live" /> Router Active: {selectedModel.id}
                </span>
                <span>System Prompt Armed</span>
              </div>
            </form>
          </div>
        )}

        {/* Parameters Sidebar */}
        {showParamsSidebar && (
          <ChatParametersSidebar
            params={params}
            onChange={setParams}
            onReset={() => setParams({
              temperature: 0.7,
              topP: 1,
              maxTokens: 2048,
              systemPrompt: 'You are a Senior Staff Engineer delivering concise production-ready answers.',
              autoFallback: true,
              fallbackModelId: 'openai/gpt-4o'
            })}
          />
        )}
      </div>

      {/* Modals */}
      <PromptLibraryModal
        isOpen={showPromptLibrary}
        onClose={() => setShowPromptLibrary(false)}
        onSelectPrompt={(pText) => setInput(pText)}
      />
    </div>
  );
}
