import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TopNav } from '../features/landing/components/TopNav';
import { DataTable } from '../shared/ui/DataTable';
import { useModels } from '../features/models/hooks/useModels';
import { ModelConfig } from '../shared/api/models.api';
import { ArrowRightLeft } from 'lucide-react';
import { Footer } from '../shared/ui/Footer';
import { BackgroundGrid } from '../shared/ui/BackgroundGrid';
import { ModelsStatsRow } from '../features/models/components/ModelsStatsRow';
import { ModelsFilterBar } from '../features/models/components/ModelsFilterBar';
import { ModelDetailDrawer } from '../features/models/components/ModelDetailDrawer';
import { ModelCompareModal } from '../features/models/components/ModelCompareModal';
import { Button } from '../shared/ui/Button';
import { getModelsColumns } from '../features/models/components/ModelsTableColumns';

export function ModelsPage() {
  const [providerFilter, setProviderFilter] = useState('All');
  const [tierFilter, setTierFilter] = useState('All');
  const [sortFilter, setSortFilter] = useState('Newest');
  const [searchQuery, setSearchQuery] = useState('');
  // API supports pagination, for now we will just request page 1.
  const [page] = useState(1);

  // useModels hooku artık parametreleri doğrudan alıp API'ye iletiyor
  // ve client tarafı filtreleme/arama işlemlerine gerek kalmıyor.
  const { data, isLoading } = useModels(searchQuery, providerFilter, tierFilter, sortFilter, page);

  const columns = useMemo(() => getModelsColumns(setSelectedModel), []);

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

            {isLoading ? (
              <div className="w-full flex flex-col gap-2">
                <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
                <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
                <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
                <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
                <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
              </div>
            ) : data.length === 0 ? (
              <div className="py-xl text-center border border-hairline rounded-sm bg-surface">
                <p className="text-body text-muted">No models match your filters</p>
              </div>
            ) : (
              <DataTable 
                data={data}
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
