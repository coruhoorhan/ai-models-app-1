import useSWR from 'swr';
import { fetchModels, ModelConfig } from '../../../shared/api/models.api';
import { logError } from '../../../shared/lib/logError';

export function useModels() {
  const { data, error, isLoading } = useSWR<ModelConfig[]>('/api/models', fetchModels, {
    onError: (err) => {
      logError(err);
    }
  });

  return {
    data: data || [],
    isLoading,
    error
  };
}
