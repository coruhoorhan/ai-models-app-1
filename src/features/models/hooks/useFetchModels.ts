import { useState, useEffect } from 'react';

export interface ModelType {
  id: string;
  name: string;
  provider: string;
  context_length: number;
  price_per_1m: number;
  speed: number;
  is_free: boolean;
  category: 'Coding' | 'Chat' | 'Character' | null;
  release_tag: string | null;
}

interface FetchModelsParams {
  search?: string;
  provider?: string;
  tier?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
}

interface FetchModelsResponse {
  data: ModelType[];
  total: number;
  page: number;
  pageSize: number;
}

export const useFetchModels = (params: FetchModelsParams) => {
  const [data, setData] = useState<FetchModelsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        if (params.search) queryParams.append('search', params.search);
        if (params.provider) queryParams.append('provider', params.provider);
        if (params.tier) queryParams.append('tier', params.tier);
        if (params.sort) queryParams.append('sort', params.sort);
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());

        const response = await fetch(`/api/models?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch models');
        }
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [params.search, params.provider, params.tier, params.sort, params.page, params.pageSize]);

  return { data, loading, error };
};
