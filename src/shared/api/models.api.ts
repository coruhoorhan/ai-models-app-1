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

export const fetchModels = async (): Promise<ModelConfig[]> => {
  const response = await fetch('/api/models');
  if (!response.ok) {
    throw new Error('Failed to fetch models');
  }
  return response.json();
};
