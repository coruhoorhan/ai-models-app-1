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

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    balance: "$4,250.00",
    consumption: "$142.50",
    requests: "1.2M",
    statisticalCount: "842,104",
    quota: "$5,000.00",
    tokens: "45.2M",
    averageRpm: "4,520",
    averageTpm: "185K",
  };
};

export const fetchDashboardChart = async (range: string): Promise<ChartDataPoint[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Dummy logic for different ranges
  const multiplier = range === '24h' ? 0.5 : range === '30d' ? 4 : range === 'all' ? 10 : 1;
  
  return [
    { name: 'Mon', gpt: 4000 * multiplier, claude: 2400 * multiplier, gemini: 2400 * multiplier },
    { name: 'Tue', gpt: 3000 * multiplier, claude: 1398 * multiplier, gemini: 2210 * multiplier },
    { name: 'Wed', gpt: 2000 * multiplier, claude: 9800 * multiplier, gemini: 2290 * multiplier },
    { name: 'Thu', gpt: 2780 * multiplier, claude: 3908 * multiplier, gemini: 2000 * multiplier },
    { name: 'Fri', gpt: 1890 * multiplier, claude: 4800 * multiplier, gemini: 2181 * multiplier },
    { name: 'Sat', gpt: 2390 * multiplier, claude: 3800 * multiplier, gemini: 2500 * multiplier },
    { name: 'Sun', gpt: 3490 * multiplier, claude: 4300 * multiplier, gemini: 2100 * multiplier },
  ];
};
