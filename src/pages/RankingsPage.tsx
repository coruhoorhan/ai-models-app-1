import React, { useMemo } from 'react';
import { TopNav } from '../features/landing/components/TopNav';
import { DataTable, ColumnDef } from '../shared/ui/DataTable';
import { Footer } from '../shared/ui/Footer';
import { BackgroundGrid } from '../shared/ui/BackgroundGrid';
import { Badge } from '../shared/ui/Badge';
import { ChevronRight, BarChart3, FlaskConical, Zap, Settings2, BarChart2 } from 'lucide-react';
import { ChartCardScatter } from '../features/rankings/components/ChartCardScatter';
import { HighlightListItem } from '../features/rankings/components/HighlightListItem';
import { CostSimulatorCard } from '../features/rankings/components/CostSimulatorCard';
import { MethodologyTile } from '../features/rankings/components/MethodologyTile';
import { useRankings, RankingData } from '../features/rankings/hooks/useRankings';
import { Card } from '../shared/ui/Card';
import { RankingsTable, RankingEntry } from '../features/rankings/components/RankingsTable';
import { RankingsPodium } from '../features/rankings/components/RankingsPodium';

export function RankingsPage() {
  const { rankings, highlights, isLoading } = useRankings();

  // Transform backend API data to what the existing UI components expect
  const topModels = useMemo(() => {
    return rankings.slice(0, 3).map(r => ({
      id: r.id,
      rank: r.rank,
      name: r.model.name,
      developer: r.model.provider.name,
      context: `${r.model.context_size >= 1000 ? r.model.context_size / 1000 + 'k' : r.model.context_size} Context`,
      score: r.score,
      speed: r.speed_viz,
      releaseTag: r.model.category === 'Chat' ? 'Release' : undefined
    }));
  }, [rankings]);

  const tableData = useMemo(() => {
    return rankings.map(r => ({
      id: r.id,
      rank: r.rank,
      name: r.model.name,
      developer: r.model.provider.name,
      context: `${r.model.context_size >= 1000 ? r.model.context_size / 1000 + 'k' : r.model.context_size} Context`,
      score: r.score,
      speed: r.speed_viz,
      releaseTag: r.model.category === 'Chat' ? 'Release' : undefined
    }));
  }, [rankings]);

  const scatterData = useMemo(() => {
    return rankings.map(r => ({
      id: r.id,
      name: r.model.name,
      x: r.model.price_per_1m,
      y: r.speed_viz,
      color: r.model.category === 'Chat' ? 'var(--color-chart-blue)' :
             r.model.category === 'Coding' ? 'var(--color-chart-teal)' : 'var(--color-chart-pink)'
    }));
  }, [rankings]);

  return (
    <div className="w-full flex flex-col items-center bg-canvas min-h-screen relative overflow-hidden">
      <BackgroundGrid />
      <div className="relative z-10 w-full flex flex-col items-center flex-1">
        <TopNav />
        <main className="w-full flex flex-col flex-1 items-center">
        
        {/* Header Section */}
        <div className="w-full relative border-b border-hairline bg-surface/30 backdrop-blur-sm flex justify-center">
          <div className="w-full max-w-[1440px] px-md lg:px-xl py-xl relative z-10 flex flex-col gap-sm">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-xs">
                <div className="w-2 h-2 rounded-full bg-live" />
                <span className="text-label text-ink">RANKINGS</span>
              </div>
              <div className="flex items-center gap-xs bg-live-bg px-2 py-1 rounded-sm border border-live/20">
                <div className="w-1.5 h-1.5 rounded-full bg-live animate-pulse" />
                <span className="text-label text-live">LIVE</span>
              </div>
            </div>
            <h1 className="text-heading-md text-ink">Model Leaderboard</h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full max-w-[1440px] px-md lg:px-xl py-xl flex flex-col items-start gap-xl flex-1">
          
          {/* Podium */}
          {isLoading && topModels.length === 0 ? (
            <div className="w-full flex justify-center gap-4 h-64 items-end">
               <div className="w-1/3 max-w-sm h-48 bg-surface-sunken animate-pulse rounded-md"></div>
               <div className="w-1/3 max-w-sm h-64 bg-surface-sunken animate-pulse rounded-md"></div>
               <div className="w-1/3 max-w-sm h-40 bg-surface-sunken animate-pulse rounded-md"></div>
            </div>
          ) : (
            <RankingsPodium topModels={topModels} />
          )}

          <div className="w-full flex flex-col md:flex-row items-start gap-xl">
            {/* Left Column: Data Table */}
            <div className="w-full md:w-2/3">
              {isLoading && tableData.length === 0 ? (
                <div className="w-full h-96 bg-surface-sunken animate-pulse rounded-md"></div>
              ) : (
                <RankingsTable data={tableData} />
              )}
            </div>

            {/* Right Column: Cards Stack */}
            <div className="w-full md:w-1/3 flex flex-col gap-lg sticky top-[100px]">
              <ChartCardScatter 
                title="Intelligence Hub 2030"
                subtitle="AKILLI ANALİZ & KIYAS"
                isLive={true}
                data={scatterData.length > 0 ? scatterData : []}
              />
              
              <Card className="w-full p-lg flex flex-col">
                <div className="flex flex-col gap-xs mb-sm">
                  <span className="text-label text-ink">EN ÇOK YÜKSELEN VE DÜŞEN MODELLER</span>
                  <h3 className="text-heading-sm text-ink">Haftalık Yükseklikler</h3>
                </div>
                {isLoading && highlights.length === 0 ? (
                  <div className="p-4 text-center text-body-sm text-muted">Yükleniyor...</div>
                ) : (
                  highlights.map(h => (
                    <HighlightListItem
                      key={h.id}
                      modelName={h.model.name}
                      developerInfo={`${h.model.provider.name} · ${h.model.context_size >= 1000 ? h.model.context_size / 1000 + 'k' : h.model.context_size} Context`}
                      delta={h.weekly_change}
                      price={`$${h.model.price_per_1m} /1M`}
                    />
                  ))
                )}
              </Card>

              <CostSimulatorCard />
            </div>
          </div>
        </div>

        {/* Bottom Section: Methodology */}
        <div className="w-full border-t border-hairline bg-surface flex justify-center mt-xl">
          <div className="w-full max-w-[1440px] px-md lg:px-xl py-xl flex flex-col md:flex-row gap-xl justify-between">
            <MethodologyTile 
              icon={BarChart2}
              title="QA Kör Arena Testleri"
              description="Kullanıcıların hangi modeli tercih ettiğini kör testlerle (blind test) ölçen kalibre edilmiş metodoloji ile insan tercihlerine göre ağırlıklandırılmış skorlar."
              className="flex-1"
            />
            <MethodologyTile 
              icon={Settings2}
              title="Otomatik Benchmark Koşuları"
              description="Standart benchmark setleriyle periyodik otomatik puanlama süreci (MMLU, HumanEval, MATH) sonuçlarının günlük senkronizasyonu."
              className="flex-1"
            />
            <MethodologyTile 
              icon={Zap}
              title="Hız ve Gecikme Metrikleri"
              description="Saniye başına token üretimi (tok/s) ve ilk-token gecikmesi (TTFT) gibi performans ölçümleri küresel endpoint'lerden test edilir."
              className="flex-1"
            />
          </div>
        </div>

      </main>
      <Footer />
      </div>
    </div>
  );
}
