import React from 'react';
import { DataTable, ColumnDef } from '../../../shared/ui/DataTable';
import { BadgeCategory } from '../../../shared/ui/BadgeCategory';
import { Button } from '../../../shared/ui/Button';
import { cn } from '../../../shared/lib/cn';

export interface RankingEntry {
  id: string;
  rank: number;
  name: string;
  developer: string;
  context: string;
  score: number;
  speed: number;
  releaseTag?: string;
}

const COLUMNS: ColumnDef<RankingEntry>[] = [
  {
    key: 'rank',
    header: 'SIRA',
    cell: (row) => (
      <span className={cn(
        "font-mono font-bold text-body",
        row.rank === 1 ? "text-chart-orange" : row.rank <= 3 ? "text-live" : "text-ink"
      )}>
        #{row.rank}
      </span>
    )
  },
  {
    key: 'name',
    header: 'MODEL & GELİŞTİRİCİ',
    cell: (row) => (
      <div className="flex flex-col">
        <div className="flex items-center gap-xs">
          <span className="text-body font-medium text-ink">{row.name}</span>
          {row.releaseTag && (
            <BadgeCategory variant="outline" label={row.releaseTag} />
          )}
        </div>
        <span className="text-caption text-subtle">
          {row.developer} <span className="text-hairline mx-1">•</span> {row.context}
        </span>
      </div>
    )
  },
  {
    key: 'chart',
    header: 'PERFORMANS',
    cell: (row) => (
      <div className="w-[80px] h-[24px] flex items-center">
        <div className="w-full h-[4px] bg-surface-sunken rounded-full overflow-hidden">
          <div 
            className={cn("h-full", row.rank === 1 ? "bg-chart-orange" : row.rank <= 3 ? "bg-live" : "bg-chart-teal")}
            style={{ width: `${(row.score / 1300) * 100}%` }}
          />
        </div>
      </div>
    )
  },
  {
    key: 'score',
    header: 'SKOR / VİZ',
    cell: (row) => (
      <div className="flex flex-col">
        <span className="font-mono text-body font-bold text-ink">{row.score}</span>
        <span className="font-mono text-caption text-subtle">{row.speed} tok/s</span>
      </div>
    )
  },
  {
    key: 'actions',
    header: '',
    cell: () => (
      <div className="w-4 h-4 rounded-xs border border-hairline bg-canvas flex-shrink-0 cursor-pointer hover:border-ink transition-colors focus-ring" tabIndex={0} role="button" aria-label="Select model" />
    )
  }
];

interface RankingsTableProps {
  data: RankingEntry[];
}

export function RankingsTable({ data }: RankingsTableProps) {
  return (
    <div className="w-full flex flex-col gap-md">
      <DataTable 
        data={data} 
        columns={COLUMNS} 
        pageSize={11}
        hideSearch={false}
      />
      <div className="w-full flex justify-center mt-sm">
        <Button variant="tertiary" className="w-full lg:w-auto">Load More</Button>
      </div>
    </div>
  );
}
