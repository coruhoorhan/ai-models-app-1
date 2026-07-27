import useSWR from 'swr';
import { ModelRanking, CategoryOption, SortOption } from '../types';

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error('Failed to fetch rankings');
  return res.json();
});

export function useRankings(category: CategoryOption, sort: SortOption) {
  const url = `/api/rankings?category=${category}&sort=${sort}`;
  
  const { data, error, isLoading, mutate } = useSWR<ModelRanking[]>(url, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  return {
    rankings: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
