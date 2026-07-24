import { useState, useEffect } from 'react';

export interface RankingModelType {
  id: string;
  name: string;
  category: string | null;
  release_tag: string | null;
  context_size: number;
  price_per_1m: number;
  speed_tok_s: number;
  provider: {
    name: string;
  };
}

export interface RankingType {
  id: string;
  rank: number;
  score: number;
  speed_viz: number;
  weekly_change: number;
  model: RankingModelType;
}

export const useFetchRankings = () => {
  const [data, setData] = useState<RankingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/rankings');
        if (!res.ok) throw new Error('Failed to fetch rankings');
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRankings();
  }, []);

  return { data, loading, error };
};

export const useFetchHighlights = () => {
  const [highlights, setHighlights] = useState<any[]>([]);
  const [loadingHighlights, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/rankings/highlights');
        if (res.ok) {
          const json = await res.json();
          setHighlights(json);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHighlights();
  }, []);

  return { highlights, loadingHighlights };
};
