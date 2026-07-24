import { useState, useEffect } from 'react';

interface ModelStats {
  models: number;
  providers: number;
  free: number;
  paid: number;
}

export const useFetchModelStats = () => {
  const [stats, setStats] = useState<ModelStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/models/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch model stats');
        }
        const result = await response.json();
        setStats(result);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
