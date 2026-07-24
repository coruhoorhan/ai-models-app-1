import React, { useMemo, useState } from 'react';
import { TopNav } from '../features/landing/components/TopNav';
import { DataTable, ColumnDef } from '../shared/ui/DataTable';
import { Badge } from '../shared/ui/Badge';
import { useFetchModels, ModelType } from '../features/models/hooks/useFetchModels';
import { ChevronRight, Zap } from 'lucide-react';
import { Footer } from '../shared/ui/Footer';
import { BackgroundGrid } from '../shared/ui/BackgroundGrid';
import { ModelsStatsRow } from '../features/models/components/ModelsStatsRow';
import { ModelsFilterBar } from '../features/models/components/ModelsFilterBar';

export function ModelsPage() {
  const [providerFilter, setProviderFilter] = useState('All');
  const [tierFilter, setTierFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortFilter, setSortFilter] = useState('popular');
  const [page, setPage] = useState(1);

  const { data, loading } = useFetchModels({
    search: searchQuery,
    provider: providerFilter,
    tier: tierFilter,
    sort: sortFilter,
    page: page,
    pageSize: 20
  });

  const columns = useMemo<ColumnDef<ModelType>[]>(() => [
    {
      key: 'model',
      header: 'MODEL',
      cell: (row) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-sm">
            <span className="font-bold text-ink">{row.name}</span>
            {row.category && (
              <Badge 
                variant="category" 
                label={row.category}
                categoryColor={
                  row.category === 'Chat' ? 'chart-blue' :
                  row.category === 'Coding' ? 'chart-teal' : 'chart-orange'
                } 
              />
            )}
            {row.release_tag && (
              <Badge variant="status-live" label={row.release_tag} />
            )}
          </div>
          <span className="text-body-sm text-subtle mt-1">{row.provider}</span>
        </div>
      )
    },
    {
      key: 'context',
      header: 'CONTEXT',
      cell: (row) => <span className="font-mono">{row.context_length >= 1000 ? `${row.context_length / 1000}k` : row.context_length}</span>
    },
    {
      key: 'price',
      header: 'PRICE',
      cell: (row) => row.is_free ? <Badge variant="status-live" label="FREE" /> : <span className="font-mono">${row.price_per_1m.toFixed(2)} / 1M</span>
    },
    {
      key: 'speed',
      header: 'SPEED',
      cell: (row) => (
        <div className="flex items-center gap-xs font-mono">
          <Zap className="w-3 h-3 text-chart-teal" />
          <span>{row.speed} tok/s</span>
        </div>
      )
    },
    {
      key: 'action',
      header: '',
      cell: () => <ChevronRight className="w-4 h-4 text-muted hover:text-ink cursor-pointer transition-colors" />
    }
  ], []);

  return (
    <div className="w-full flex flex-col items-center bg-canvas min-h-screen relative overflow-hidden">
      <BackgroundGrid />
      <div className="relative z-10 w-full flex flex-col items-center flex-1">
        <TopNav />
        <main className="w-full flex flex-col flex-1 items-center">
          <div className="w-full relative border-b border-hairline bg-surface/20 backdrop-blur-sm flex justify-center">
            <div className="w-full max-w-[1440px] px-md lg:px-xl py-xl relative z-10 flex flex-col gap-lg">
              <div className="flex flex-col gap-sm">
                <div className="flex items-center gap-sm">
                  <span className="w-2 h-2 rounded-full bg-live animate-pulse" />
                  <span className="text-label text-subtle">MODELS</span>
                </div>
                <h1 className="text-hero text-ink tracking-tight">Browse all models</h1>
                <p className="text-body-lg text-muted max-w-2xl">
                  {data?.total || '...'} models across providers, routed through one unified API key.
                  Experience seamless integration and high-speed inference without the vendor lock-in.
                </p>
              </div>
              <ModelsStatsRow />
            </div>
          </div>

          <div className="w-full max-w-[1440px] px-md lg:px-xl py-xl flex flex-col gap-lg flex-1">
            <ModelsFilterBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              providerFilter={providerFilter}
              setProviderFilter={setProviderFilter}
              tierFilter={tierFilter}
              setTierFilter={setTierFilter}
              sortFilter={sortFilter}
              setSortFilter={setSortFilter}
            />

            {loading ? (
              <div className="w-full flex flex-col gap-2">
                <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
                <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
                <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
                <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
                <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
              </div>
            ) : !data || data.data.length === 0 ? (
              <div className="py-xl text-center border border-hairline rounded-sm bg-surface">
                <p className="text-body text-muted">No models match your filters</p>
              </div>
            ) : (
              <DataTable 
                data={data.data}
                columns={columns} 
                pageSize={20} 
                hideSearch={true}
              />
            )}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
