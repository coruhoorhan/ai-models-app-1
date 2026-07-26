import React, { useMemo, useState } from 'react';
import { TopNav } from '../features/landing/components/TopNav';
import { DataTable, ColumnDef } from '../shared/ui/DataTable';
import { Badge } from '../shared/ui/Badge';
import { useModels } from '../features/models/hooks/useModels';
import { ModelConfig } from '../shared/api/models.api';
import { ChevronRight, Zap, ArrowRightLeft } from 'lucide-react';
import { Footer } from '../shared/ui/Footer';
import { BackgroundGrid } from '../shared/ui/BackgroundGrid';
import { ModelsStatsRow } from '../features/models/components/ModelsStatsRow';
import { ModelsFilterBar } from '../features/models/components/ModelsFilterBar';
import { ModelDetailDrawer } from '../features/models/components/ModelDetailDrawer';
import { ModelCompareModal } from '../features/models/components/ModelCompareModal';
import { Button } from '../shared/ui/Button';

export function ModelsPage() {
  const { data, isLoading } = useModels();

  const [providerFilter, setProviderFilter] = useState('All');
  const [tierFilter, setTierFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<ModelConfig | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const filteredData = useMemo(() => {
    return data.filter(model => {
      const matchSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          model.provider.toLowerCase().includes(searchQuery.toLowerCase());
      const matchProvider = providerFilter === 'All' || model.provider === providerFilter;
      const matchTier = tierFilter === 'All' || (tierFilter === 'Free' ? model.isFree : !model.isFree);
      return matchSearch && matchProvider && matchTier;
    });
  }, [data, searchQuery, providerFilter, tierFilter]);

  const columns = useMemo<ColumnDef<ModelConfig>[]>(() => [
    {
      key: 'model',
      header: 'MODEL',
      cell: (row) => (
        <div 
          onClick={() => setSelectedModel(row)}
          className="flex flex-col cursor-pointer group"
        >
          <div className="flex items-center gap-sm">
            <span className="font-bold text-ink group-hover:underline">{row.name}</span>
            {row.category.map(c => (
              <Badge 
                key={c} 
                variant="category" 
                label={c} 
                categoryColor={
                  c === 'Chat' ? 'chart-blue' : 
                  c === 'Coding' ? 'chart-teal' : 
                  c === 'Vision' ? 'chart-pink' : 'chart-orange'
                } 
              />
            ))}
          </div>
          <span className="text-body-sm text-subtle mt-1">{row.provider}</span>
        </div>
      )
    },
    {
      key: 'context',
      header: 'CONTEXT',
      cell: (row) => <span className="font-mono cursor-pointer" onClick={() => setSelectedModel(row)}>{row.context}</span>
    },
    {
      key: 'price',
      header: 'PRICE',
      cell: (row) => row.isFree ? <Badge variant="status-live" label="FREE" /> : <span className="font-mono cursor-pointer" onClick={() => setSelectedModel(row)}>{row.price}</span>
    },
    {
      key: 'speed',
      header: 'SPEED',
      cell: (row) => (
        <div className="flex items-center gap-xs font-mono cursor-pointer" onClick={() => setSelectedModel(row)}>
          <Zap className="w-3 h-3 text-chart-teal" />
          <span>{row.speed}</span>
        </div>
      )
    },
    {
      key: 'action',
      header: '',
      cell: (row) => (
        <button 
          onClick={() => setSelectedModel(row)}
          className="p-xs hover:bg-surface rounded-sm transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-muted hover:text-ink" />
        </button>
      )
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
                  217 models across 36+ providers, routed through one unified API key. 
                  Experience seamless integration and high-speed inference without the vendor lock-in.
                </p>
              </div>
              <ModelsStatsRow />
            </div>
          </div>

          <div className="w-full max-w-[1440px] px-md lg:px-xl py-xl flex flex-col gap-lg flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
              <div className="flex-1">
                <ModelsFilterBar 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  providerFilter={providerFilter}
                  setProviderFilter={setProviderFilter}
                  tierFilter={tierFilter}
                  setTierFilter={setTierFilter}
                />
              </div>
              <Button 
                variant="secondary" 
                icon={ArrowRightLeft}
                onClick={() => setIsCompareOpen(true)}
                className="shrink-0"
              >
                Compare Matrix
              </Button>
            </div>

            {isLoading ? (
              <div className="w-full flex flex-col gap-2">
                <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
                <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
                <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
                <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
                <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
              </div>
            ) : filteredData.length === 0 ? (
              <div className="py-xl text-center border border-hairline rounded-sm bg-surface">
                <p className="text-body text-muted">No models match your filters</p>
              </div>
            ) : (
              <DataTable 
                data={filteredData} 
                columns={columns} 
                pageSize={20} 
                hideSearch={true}
              />
            )}
          </div>
          <Footer />
        </main>
      </div>

      <ModelDetailDrawer 
        model={selectedModel} 
        onClose={() => setSelectedModel(null)} 
      />

      <ModelCompareModal
        models={data}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />
    </div>
  );
}
