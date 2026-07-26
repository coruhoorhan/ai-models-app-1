export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  modelId?: string;
  modelName?: string;
  tokensUsed?: number;
  latencyMs?: number;
  tokensPerSec?: number;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  primaryModelId: string;
  secondaryModelId?: string;
  isMultiModel: boolean;
  messages: ChatMessage[];
  createdAt: string;
}

export interface ChatParameters {
  temperature: number;
  topP: number;
  maxTokens: number;
  systemPrompt: string;
  autoFallback: boolean;
  fallbackModelId: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'Coding' | 'Architecture' | 'Refactoring' | 'Analysis' | 'Writing';
  prompt: string;
  description: string;
}
