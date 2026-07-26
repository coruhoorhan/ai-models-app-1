import { useState, useEffect } from 'react';
import { logError } from '../../../shared/lib/logError';

export interface DashboardStats {
  balance: number;
  consumption: number;
  requestsCount: number;
  requestsQuota: number;
  tokensCount: number;
  tokensQuota: number;
  avgRpm: number;
  avgTpm: number;
}

export interface ChartDataPoint {
  date: string;
  openai: number;
  anthropic: number;
  google: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/dashboard/stats');

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }

        const data = await response.json();

        if (isMounted) {
          setStats(data.stats);
          setChartData(data.chartData);
        }
      } catch (err) {
        logError(err, { feature: 'Dashboard', action: 'fetchStats' });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchStats();
    return () => { isMounted = false; };
  }, []);

  return { stats, chartData, isLoading };
}
