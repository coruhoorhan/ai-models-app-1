import { useState, useEffect } from 'react';
import { logError } from '../../../shared/lib/logError';

export interface RankingData {
  id: string;
  rank: number;
  score: number;
  speed_viz: number;
  weekly_change: number;
  model: {
    name: string;
    context_size: number;
    price_per_1m: number;
    speed_tok_s: number;
    category: string;
    provider: {
      name: string;
    };
  };
}

export function useRankings() {
  const [rankings, setRankings] = useState<RankingData[]>([]);
  const [highlights, setHighlights] = useState<RankingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const [rankRes, highRes] = await Promise.all([
          fetch('/api/rankings'),
          fetch('/api/rankings/highlights')
        ]);

        if (!rankRes.ok) throw new Error('Failed to fetch rankings');
        if (!highRes.ok) throw new Error('Failed to fetch highlights');

        const rankData = await rankRes.json();
        const highData = await highRes.json();

        if (isMounted) {
          setRankings(rankData);
          setHighlights(highData);
        }
      } catch (err) {
        logError(err, { feature: 'Rankings', action: 'loadData' });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, []);

  return { rankings, highlights, isLoading };
}
