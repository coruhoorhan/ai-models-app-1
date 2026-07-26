import { useState, useEffect } from 'react';
import { fetchModels, ModelConfig } from '../../../shared/api/models.api';
import { logError } from '../../../shared/lib/logError';

let cachedModels: ModelConfig[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function useModels() {
  const [data, setData] = useState<ModelConfig[]>(cachedModels || []);
  const [isLoading, setIsLoading] = useState(!cachedModels);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function loadData() {
      const now = Date.now();
      const isStale = !cachedModels || (now - lastFetchTime > CACHE_TTL_MS);

      if (!isStale) {
        return;
      }

      try {
        if (!cachedModels) setIsLoading(true);
        const models = await fetchModels();
        
        cachedModels = models;
        lastFetchTime = Date.now();

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
