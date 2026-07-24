import React from 'react';
import { Card } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { LaserEffect } from '../../../shared/ui/LaserEffect';
import { Zap } from 'lucide-react';

export interface PodiumModel {
  rank: number;
  name: string;
  developer: string;
  score: number;
  speed: number;
}

interface RankingsPodiumProps {
  topModels: PodiumModel[];
}

export function RankingsPodium({ topModels }: RankingsPodiumProps) {
  if (topModels.length < 3) return null;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-md items-end h-auto md:h-[220px]">
      {/* 2nd Place */}
      <Card className="w-full flex flex-col items-center justify-between p-md border border-hairline bg-surface/50 h-[180px] order-2 md:order-1 relative overflow-hidden">
        <div className="flex flex-col items-center gap-xs z-10">
          <Badge variant="category" label="#2" categoryColor="chart-blue" />
          <h3 className="text-body-md-bold text-ink mt-sm">{topModels[1].name}</h3>
          <span className="text-body-sm text-subtle">{topModels[1].developer}</span>
        </div>
        <div className="flex flex-col items-center gap-xs w-full pt-md border-t border-hairline/50 z-10">
          <span className="font-mono text-heading-sm text-ink">{topModels[1].score}</span>
        </div>
      </Card>

      {/* 1st Place */}
      <Card className="w-full flex flex-col items-center justify-between p-lg border-2 border-live/30 bg-surface h-[220px] order-1 md:order-2 shadow-lg relative overflow-hidden group">
        <LaserEffect color="var(--color-live)" />
        <div className="flex flex-col items-center gap-xs z-10">
          <div className="w-8 h-8 rounded-full bg-live/20 flex items-center justify-center border border-live/30 text-live font-mono font-bold mb-xs">#1</div>
          <h3 className="text-heading-sm text-ink">{topModels[0].name}</h3>
          <span className="text-body-sm text-subtle">{topModels[0].developer}</span>
        </div>
        <div className="flex items-center justify-between w-full pt-md border-t border-hairline/50 z-10">
          <div className="flex flex-col">
            <span className="text-caption text-subtle uppercase">Score</span>
            <span className="font-mono text-heading-sm text-ink">{topModels[0].score}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-caption text-subtle uppercase">Speed</span>
            <div className="flex items-center gap-xs">
              <Zap className="w-3 h-3 text-chart-teal" />
              <span className="font-mono text-body-md-bold text-ink">{topModels[0].speed}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 3rd Place */}
      <Card className="w-full flex flex-col items-center justify-between p-md border border-hairline bg-surface/50 h-[160px] order-3 relative overflow-hidden">
        <div className="flex flex-col items-center gap-xs z-10">
          <Badge variant="category" label="#3" categoryColor="chart-pink" />
          <h3 className="text-body-md-bold text-ink mt-sm">{topModels[2].name}</h3>
          <span className="text-body-sm text-subtle">{topModels[2].developer}</span>
        </div>
        <div className="flex flex-col items-center gap-xs w-full pt-sm border-t border-hairline/50 z-10">
          <span className="font-mono text-body-lg-bold text-ink">{topModels[2].score}</span>
        </div>
      </Card>
    </div>
  );
}
