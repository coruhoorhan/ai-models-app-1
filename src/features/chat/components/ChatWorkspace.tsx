import React, { useState } from 'react';
import { ChatMessage, ChatParameters } from '../types';
import { ChatParametersSidebar } from './ChatParametersSidebar';
import { PromptLibraryModal } from './PromptLibraryModal';
import { MultiModelCompareView } from './MultiModelCompareView';
import { ChatToolbar } from './ChatToolbar';
import { ChatMessagesList } from './ChatMessagesList';
import { ChatInputArea } from './ChatInputArea';
import { availableModels } from '../constants';
import { streamChatCompletion } from '../../../shared/api/llmStream.api';

export function ChatWorkspace() {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: '1', role: 'assistant', modelName: 'google/gemini-2.0-flash', timestamp: 'Just now',
    content: 'Welcome to UnoRouter Chat Studio! Live API stream enabled via Google Gemini SDK. Test system instructions, temperature, top-P tuning, or switch to Multi-Model Dual Streaming.'
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState({ id: 'google/gemini-2.0-flash', name: 'Gemini 2.0 Flash' });
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

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsgText = input.trim();
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const assistantMsgId = (Date.now() + 1).toString();
    const initialAssistantMsg: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      modelId: selectedModel.id,
      modelName: selectedModel.name,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMessage];
    setMessages([...newHistory, initialAssistantMsg]);
    setInput('');
    setIsTyping(true);

    let accumulatedText = '';

    await streamChatCompletion({
      messages: newHistory.map(m => ({ role: m.role, content: m.content })),
      model: selectedModel.id,
      systemPrompt: params.systemPrompt,
      temperature: params.temperature,
      topP: params.topP,
      maxTokens: params.maxTokens,
      onChunk: (chunk) => {
        if (chunk.text) {
          accumulatedText += chunk.text;
          setMessages(prev => prev.map(m => m.id === assistantMsgId ? {
            ...m,
            content: accumulatedText,
            latencyMs: chunk.ttftMs ?? m.latencyMs,
            tokensPerSec: chunk.tps ?? m.tokensPerSec,
            tokensUsed: chunk.tokens ?? m.tokensUsed
          } : m));
        }
      },
      onDone: (doneData) => {
        setMessages(prev => prev.map(m => m.id === assistantMsgId ? {
          ...m,
          latencyMs: doneData.ttftMs ?? m.latencyMs,
          tokensPerSec: doneData.tps ?? m.tokensPerSec,
          tokensUsed: doneData.totalTokens ?? m.tokensUsed
        } : m));
        setIsTyping(false);
      },
      onError: (errMsg) => {
        setMessages(prev => prev.map(m => m.id === assistantMsgId ? {
          ...m,
          content: `⚠️ API Error: ${errMsg}`
        } : m));
        setIsTyping(false);
      }
    });
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
