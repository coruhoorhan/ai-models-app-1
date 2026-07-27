import useSWR from 'swr';
import { fetchDashboardStats, fetchDashboardChart, DashboardStats, ChartDataPoint } from '../../../shared/api/dashboard.api';
import { logError } from '../../../shared/lib/logError';

export function useDashboardStats() {
  const { data, error, isLoading } = useSWR<DashboardStats>('/api/dashboard/stats', fetchDashboardStats, {
    onError: (err) => logError(err)
  });

  return {
    data,
    isLoading,
    error
  };
}

export function useDashboardChart(range: string) {
  const url = `/api/dashboard/chart?range=${range}`;
  const { data, error, isLoading } = useSWR<ChartDataPoint[]>(url, fetchDashboardChart, {
    onError: (err) => logError(err)
  });

  return {
    data: data || [],
    isLoading,
    error
  };
}
