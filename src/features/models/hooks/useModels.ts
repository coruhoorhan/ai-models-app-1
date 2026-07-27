import { useState, useEffect } from 'react';
import { fetchModels, ModelConfig } from '../../../shared/api/models.api';
import { logError } from '../../../shared/lib/logError';

export function useModels(searchQuery = '', provider = 'All', tier = 'All', sort = 'Newest', page = 1) {
  const [data, setData] = useState<ModelConfig[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(true);
        const result = await fetchModels(searchQuery, provider, tier, sort, page);
        if (isMounted) {
          setData(result.data);
          setMeta(result.meta);
        }
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err : new Error('Unknown error'));
        logError(err, { feature: 'Models', action: 'fetchModels' });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    
    // Basit debounce işlemi
    const timeoutId = setTimeout(() => {
      loadData();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [searchQuery, provider, tier, sort, page]);

  return { data, meta, isLoading, error };
}
