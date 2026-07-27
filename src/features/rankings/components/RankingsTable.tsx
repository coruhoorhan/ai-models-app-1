import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { DataTable, ColumnDef } from '../../../shared/ui/DataTable';
import { Badge } from '../../../shared/ui/Badge';
import { BadgeCategory } from '../../../shared/ui/BadgeCategory';
import { ErrorStateBlock } from '../../../shared/ui/ErrorStateBlock';
import { ModelRanking, SortOption } from '../types';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface RankingsTableProps {
  data: ModelRanking[];
  isLoading: boolean;
  isError: any;
}

export function RankingsTable({ data, isLoading, isError }: RankingsTableProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = (searchParams.get('sort') as SortOption) || 'elo_desc';

  const handleSort = (field: 'elo' | 'price') => {
    setSearchParams((prev) => {
      const isAsc = currentSort === `${field}_asc`;
      prev.set('sort', `${field}_${isAsc ? 'desc' : 'asc'}`);
      return prev;
    });
  };

  const getSortIcon = (field: 'elo' | 'price') => {
    if (currentSort === `${field}_asc`) return <ArrowUp className="w-3 h-3 ml-1" />;
    if (currentSort === `${field}_desc`) return <ArrowDown className="w-3 h-3 ml-1" />;
    return <ArrowDown className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-50 transition-opacity" />;
  };

  if (isError) {
    return <ErrorStateBlock message="Failed to load rankings. Please try again later." />;
  }

  const columns: ColumnDef<ModelRanking>[] = [
    {
      key: 'rank',
      header: <span className="text-subtle">#</span>,
      cell: (_row) => (
        <span className="text-subtle font-mono text-body-sm">-</span>
      )
    },
    {
      key: 'name',
      header: 'Model',
      cell: (row) => (
        <div className="flex flex-col">
          <span className="text-body-md font-medium text-ink">{row.name}</span>
          <span className="text-caption text-subtle">{row.provider}</span>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Category',
      cell: (row) => <BadgeCategory label={row.category.toUpperCase()} variant="secondary" />
    },
    {
      key: 'eloScore',
      header: (
        <button 
          onClick={() => handleSort('elo')}
          className="flex items-center text-label hover:text-ink group transition-colors focus-ring outline-none"
        >
          ELO RATING
          {getSortIcon('elo')}
        </button>
      ),
      cell: (row) => (
        <Badge variant="status-live" label={row.eloScore.toString()} className="font-mono font-bold tracking-tight" />
      )
    },
    {
      key: 'parameters',
      header: 'Params',
      cell: (row) => (
        <span className="font-mono text-body-sm text-subtle">
          {row.parameters || 'N/A'}
        </span>
      )
    },
    {
      key: 'price',
      header: (
        <button 
          onClick={() => handleSort('price')}
          className="flex items-center text-label hover:text-ink group transition-colors focus-ring outline-none"
        >
          PRICE (1M TOKENS)
          {getSortIcon('price')}
        </button>
      ),
      cell: (row) => (
        <div className="flex flex-col font-mono text-caption text-subtle">
          <span>In: ${row.inputPrice.toFixed(2)}</span>
          <span>Out: ${row.outputPrice.toFixed(2)}</span>
        </div>
      )
    }
  ];

  return (
    <DataTable 
      data={data} 
      columns={columns} 
      isLoading={isLoading}
      pageSize={15}
    />
  );
}
