export interface ModelRanking {
  id: string;
  name: string;
  provider: string;
  eloScore: number;
  parameters: string | null;
  inputPrice: number;
  outputPrice: number;
  category: string;
}

export type SortOption = 'elo_desc' | 'elo_asc' | 'price_asc' | 'price_desc';
export type CategoryOption = 'all' | 'llm' | 'image' | 'audio';
