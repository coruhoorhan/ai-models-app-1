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
  const { data, isLoading } = useModels();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const providerFilter = searchParams.get('provider') || 'All';
  const tierFilter = searchParams.get('tier') || 'All';
  const searchQuery = searchParams.get('q') || '';
  
  const setProviderFilter = (val: string) => {
    setSearchParams(prev => {
      if (val && val !== 'All') prev.set('provider', val);
      else prev.delete('provider');
      return prev;
    }, { replace: true });
  };
  
  const setTierFilter = (val: string) => {
    setSearchParams(prev => {
      if (val && val !== 'All') prev.set('tier', val);
      else prev.delete('tier');
      return prev;
    }, { replace: true });
  };
  
  const setSearchQuery = (val: string) => {
    setSearchParams(prev => {
      if (val) prev.set('q', val);
      else prev.delete('q');
      return prev;
    }, { replace: true });
  };

  const [selectedModel, setSelectedModel] = useState<ModelConfig | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const filteredData = useMemo(() => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    const isAllProviders = providerFilter === 'All';
    const isAllTiers = tierFilter === 'All';
    const isTierFree = tierFilter === 'Free';

    return data.filter(model => {
      // Hızlı kontroller (cheap checks)
      if (!isAllProviders && model.provider !== providerFilter) return false;
      if (!isAllTiers && model.isFree !== isTierFree) return false;

      // Daha yavaş olan string kontrolü, eğer query boşsa direkt true dön.
      if (!lowerSearchQuery) return true;

      return model.name.toLowerCase().includes(lowerSearchQuery) ||
             model.provider.toLowerCase().includes(lowerSearchQuery);
    });
  }, [data, searchQuery, providerFilter, tierFilter]);

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
