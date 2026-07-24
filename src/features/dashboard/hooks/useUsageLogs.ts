import { useState, useEffect } from 'react';
import { logError } from '../../../shared/lib/logError';

export interface UsageLogType {
  id: string;
  timestamp: string;
  model: string;
  tokens_in: number;
  tokens_out: number;
  duration: string;
  cost: string;
}

export const useUsageLogs = (page: number, pageSize: number = 20) => {
  const [data, setData] = useState<{data: UsageLogType[], total: number}>({ data: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/usage-logs?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) throw new Error('Failed to fetch logs');
        const json = await response.json();
        if (isMounted) setData(json);
      } catch (err: any) {
        if (isMounted) setError(err);
        logError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchLogs();

    return () => { isMounted = false; };
  }, [page, pageSize]);

  return { data, loading, error };
};
