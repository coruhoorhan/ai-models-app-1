export interface RankingEntryApi {
  id: string;
  rank: number;
  name: string;
  developer: string;
  context: string;
  score: number;
  speed: number;
  releaseTag?: string;
}

export interface HighlightEntryApi {
  id: string;
  modelName: string;
  developerInfo: string;
  delta: number;
  price: string;
}

export interface ScatterDataApi {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

const API_BASE = '/api';

export const fetchRankings = async (): Promise<RankingEntryApi[]> => {
  const response = await fetch(`${API_BASE}/rankings`);
  if (!response.ok) {
    throw new Error('Failed to fetch rankings');
  }
  return response.json();
};

export const fetchRankingsHighlights = async (): Promise<HighlightEntryApi[]> => {
  const response = await fetch(`${API_BASE}/rankings/highlights`);
  if (!response.ok) {
    throw new Error('Failed to fetch ranking highlights');
  }
  return response.json();
};

export const fetchScatterData = async (): Promise<ScatterDataApi[]> => {
  const response = await fetch(`${API_BASE}/rankings/scatter`);
  if (!response.ok) {
    throw new Error('Failed to fetch scatter data');
  }
  return response.json();
};
