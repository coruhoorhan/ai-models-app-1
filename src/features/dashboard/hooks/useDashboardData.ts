import { useState, useEffect } from 'react';
import { fetchDashboardStats, fetchDashboardChart, DashboardStats, ChartDataPoint } from '../../../shared/api/dashboard.api';
import { logError } from '../../../shared/lib/logError';

export function useDashboardStats() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function loadData() {
      try {
        setIsLoading(true);
        const stats = await fetchDashboardStats();
        if (isMounted) setData(stats);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err : new Error('Unknown error'));
        logError(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    
    loadData();
    return () => { isMounted = false; };
  }, []);

  return { data, isLoading, error };
}

export function useDashboardChart(range: string) {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function loadData() {
      try {
        setIsLoading(true);
        const chartData = await fetchDashboardChart(range);
        if (isMounted) setData(chartData);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err : new Error('Unknown error'));
        logError(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    
    loadData();
    return () => { isMounted = false; };
  }, [range]);

  return { data, isLoading, error };
}
