import React, { useState } from 'react';
import { ChatMessage, ChatParameters } from '../types';
import { ChatMessageItem } from './ChatMessageItem';
import { ChatParametersSidebar } from './ChatParametersSidebar';
import { PromptLibraryModal } from './PromptLibraryModal';
import { MultiModelCompareView } from './MultiModelCompareView';
import { ChatToolbar } from './ChatToolbar';
import { ChatMessagesList } from './ChatMessagesList';
import { ChatInputArea } from './ChatInputArea';
import { availableModels } from '../constants';

export function ChatWorkspace() {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: '1', role: 'assistant', modelName: 'anthropic/claude-3.5-sonnet', timestamp: 'Just now',
    content: 'Welcome to the UnoRouter Chat Studio workspace! Select any model from OpenRouter, test system prompts, or switch to Multi-Model Dual Streaming to compare model outputs side-by-side.'
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState({ id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' });
  const [secondaryModel, setSecondaryModel] = useState({ id: 'openai/gpt-4o', name: 'GPT-4o' });
  const [isMultiModel, setIsMultiModel] = useState(false);
  const [showParamsSidebar, setShowParamsSidebar] = useState(true);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const [copiedExport, setCopiedExport] = useState(false);
  
  const [params, setParams] = useState<ChatParameters>({
    temperature: 0.7, topP: 1, maxTokens: 2048,
    systemPrompt: 'You are a Senior Staff Engineer delivering concise production-ready answers.',
    autoFallback: true, fallbackModelId: 'openai/gpt-4o'
  });

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMessage]);
    const currentPrompt = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyContent = `Router processed via ${selectedModel.name}.\n\nHere is a structured analysis:\n\n1. **Execution**: Evaluated with system instruction "${params.systemPrompt.slice(0, 40)}...".\n2. **Optimization**: Zero proxy latency added by UnoRouter Edge Node (12ms TTFT).\n3. **Fallback**: Auto-fallback chain armed with ${params.fallbackModelId}.`;

      if (currentPrompt.toLowerCase().includes('sql') || currentPrompt.toLowerCase().includes('index')) {
        replyContent = `To optimize PostgreSQL queries:\n\n\`\`\`sql\nCREATE INDEX CONCURRENTLY idx_orders_user_status \nON orders (user_id, status) \nINCLUDE (created_at);\n\`\`\`\n\n- **Composite Order**: High cardinality column (\`user_id\`) placed first.\n- **Covering Index**: Included \`created_at\` to avoid table heap lookup.`;
      } else if (currentPrompt.toLowerCase().includes('throttle') || currentPrompt.toLowerCase().includes('code')) {
        replyContent = `TypeScript Throttle Implementation:\n\n\`\`\`typescript\nexport function throttle<T extends (...args: unknown[]) => void>(fn: T, limit: number): T {\n  let lastCall = 0;\n  return function (...args: Parameters<T>) {\n    const now = Date.now();\n    if (now - lastCall >= limit) {\n      lastCall = now;\n      fn(...args);\n    }\n  } as T;\n}\n\`\`\``;
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(), role: 'assistant', content: replyContent,
        modelId: selectedModel.id, modelName: selectedModel.name,
        tokensUsed: Math.floor(Math.random() * 100) + 120, latencyMs: Math.floor(Math.random() * 80) + 90, tokensPerSec: Math.floor(Math.random() * 40) + 110,
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
      <ChatToolbar
        availableModels={availableModels}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        isMultiModel={isMultiModel}
        setIsMultiModel={setIsMultiModel}
        setShowPromptLibrary={setShowPromptLibrary}
        handleExportJSON={handleExportJSON}
        copiedExport={copiedExport}
        setMessages={setMessages}
        showParamsSidebar={showParamsSidebar}
        setShowParamsSidebar={setShowParamsSidebar}
      />

      {/* Main Content Area (Chat or Multi-Model) */}
      <div className="flex-1 flex overflow-hidden">
        {isMultiModel ? (
          <MultiModelCompareView modelA={selectedModel} modelB={secondaryModel} />
        ) : (
          <div className="flex-1 flex flex-col bg-canvas relative overflow-hidden">
            {/* Messages Scroll Area */}
            <ChatMessagesList messages={messages} isTyping={isTyping} />

            <ChatInputArea
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              isTyping={isTyping}
              selectedModelId={selectedModel.id}
              selectedModelName={selectedModel.name}
            />
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

      <PromptLibraryModal
        isOpen={showPromptLibrary}
        onClose={() => setShowPromptLibrary(false)}
        onSelectPrompt={(pText) => setInput(pText)}
      />
    </div>
  );
}
