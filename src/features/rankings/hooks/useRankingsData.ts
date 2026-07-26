import { useState, useEffect } from 'react';
import { logError } from '../../../shared/lib/logError';
import {
  fetchRankings,
  fetchRankingsHighlights,
  fetchScatterData,
  RankingEntryApi,
  HighlightEntryApi,
  ScatterDataApi
} from '../../../shared/api/rankings.api';

export function useRankingsData() {
  const [data, setData] = useState<RankingEntryApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const rankings = await fetchRankings();
        if (isMounted) setData(rankings);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err : new Error('Unknown error fetching rankings'));
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

export function useRankingsHighlights() {
  const [data, setData] = useState<HighlightEntryApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const highlights = await fetchRankingsHighlights();
        if (isMounted) setData(highlights);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err : new Error('Unknown error fetching highlights'));
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

export function useScatterData() {
  const [data, setData] = useState<ScatterDataApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const scatterData = await fetchScatterData();
        if (isMounted) setData(scatterData);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err : new Error('Unknown error fetching scatter data'));
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
