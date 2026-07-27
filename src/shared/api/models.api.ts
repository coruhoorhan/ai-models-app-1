export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  category: string[];
  context: string;
  price: string;
  isFree: boolean;
  speed: string;
}

const mockModels: ModelConfig[] = [
  { id: 'gpt-4o', name: 'gpt-4o', provider: 'OpenAI', category: ['Chat', 'Coding'], context: '128k', price: '$5.00 / 1M', isFree: false, speed: '105 tok/s' },
  { id: 'claude-3-opus', name: 'claude-3-opus-20240229', provider: 'Anthropic', category: ['Chat', 'Coding'], context: '200k', price: '$15.00 / 1M', isFree: false, speed: '45 tok/s' },
  { id: 'gemini-1.5-pro', name: 'gemini-1.5-pro-preview', provider: 'Google', category: ['Chat', 'Coding', 'Vision'], context: '2M', price: '$7.00 / 1M', isFree: false, speed: '80 tok/s' },
  { id: 'meta-llama-3', name: 'llama-3-70b-instruct', provider: 'Meta', category: ['Chat'], context: '8k', price: 'Free', isFree: true, speed: '240 tok/s' },
  { id: 'mistral-large', name: 'mistral-large-latest', provider: 'Mistral', category: ['Chat'], context: '32k', price: '$4.00 / 1M', isFree: false, speed: '90 tok/s' },
  { id: 'allam-2', name: 'allam-2-7b', provider: 'ALLaM', category: ['Chat', 'Character'], context: '8k', price: 'Free', isFree: true, speed: '180 tok/s' },
];

export const fetchModels = async (): Promise<ModelConfig[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return mockModels;
};
