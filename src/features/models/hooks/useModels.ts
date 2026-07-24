import { useState, useEffect } from 'react';
import { fetchModels, ModelConfig } from '../../../shared/api/models.api';
import { logError } from '../../../shared/lib/logError';

export function useModels() {
  const [data, setData] = useState<ModelConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function loadData() {
      try {
        setIsLoading(true);
        const models = await fetchModels();
        if (isMounted) setData(models);
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
