// Mock API service
export interface DashboardStats {
  balance: string;
  consumption: string;
  requests: string;
  statisticalCount: string;
  quota: string;
  tokens: string;
  averageRpm: string;
  averageTpm: string;
}

export interface ChartDataPoint {
  name: string;
  gpt: number;
  claude: number;
  gemini: number;
}

const API_BASE = '/api';

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch(`${API_BASE}/dashboard/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard stats');
  }
  return response.json();
};

export const fetchDashboardChart = async (range: string): Promise<ChartDataPoint[]> => {
  const response = await fetch(`${API_BASE}/dashboard/chart?range=${range}`);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard chart data');
  }
  return response.json();
};
