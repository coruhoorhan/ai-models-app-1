import { useState, useEffect } from 'react';
import { logError } from '../../../shared/lib/logError';

export interface UsageLog {
  id: string;
  created_at: string;
  model: {
    name: string;
    provider: {
      name: string;
    };
  };
  tokens_in: number;
  tokens_out: number;
  cost: number;
  duration_ms: number;
}

export function useUsageLogs(page = 1, pageSize = 10) {
  const [logs, setLogs] = useState<UsageLog[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadLogs() {
      try {
        setIsLoading(true);
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize)
        });

        const response = await fetch(`/api/usage-logs?${params.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to fetch usage logs');
        }

        const result = await response.json();

        if (isMounted) {
          setLogs(result.data);
          setMeta(result.meta);
        }
      } catch (err) {
        logError(err, { feature: 'UsageLogs', action: 'loadLogs' });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadLogs();
    return () => { isMounted = false; };
  }, [page, pageSize]);

  return { logs, meta, isLoading };
}
