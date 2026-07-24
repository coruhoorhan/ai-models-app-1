import React from 'react';
import { TopNav } from '../features/landing/components/TopNav';
import { Footer } from '../shared/ui/Footer';
import { BackgroundGrid } from '../shared/ui/BackgroundGrid';
import { BarChart2, Zap, Settings2 } from 'lucide-react';
import { MethodologyTile } from '../features/rankings/components/MethodologyTile';
import { ChartCardScatter } from '../features/rankings/components/ChartCardScatter';
import { HighlightListItem } from '../features/rankings/components/HighlightListItem';
import { CostSimulatorCard } from '../features/rankings/components/CostSimulatorCard';
import { Card } from '../shared/ui/Card';
import { RankingsTable } from '../features/rankings/components/RankingsTable';
import { RankingsPodium } from '../features/rankings/components/RankingsPodium';
import { useFetchRankings, useFetchHighlights } from '../features/rankings/hooks/useFetchRankings';

export function RankingsPage() {
  const { data: rankingsData, loading: rankingsLoading } = useFetchRankings();
  const { highlights, loadingHighlights } = useFetchHighlights();

  const mapRanking = (r: any) => ({
    id: r.id,
    rank: r.rank,
    name: r.model.name,
    developer: r.model.provider.name,
    context: `${r.model.context_size >= 1000 ? r.model.context_size / 1000 + 'k' : r.model.context_size} Context`,
    score: r.score,
    speed: r.speed_viz,
    releaseTag: r.model.release_tag
  });

  const top3 = rankingsData.slice(0, 3).map(mapRanking);
  const mappedRankings = rankingsData.map(mapRanking);
  const scatterData = rankingsData.map(r => ({
    x: Number(r.model.price_per_1m),
    y: r.speed_viz,
    z: r.model.context_size,
    name: r.model.name,
    category: r.model.category || 'default'
  }));
  const costSimulatorModels = rankingsData.slice(0, 5).map(r => ({
    name: r.model.name,
    pricePer1M: Number(r.model.price_per_1m)
  }));

  return (
    <div className="w-full flex flex-col items-center bg-canvas min-h-screen relative overflow-hidden">
      <BackgroundGrid />
      <div className="relative z-10 w-full flex flex-col items-center flex-1">
        <TopNav />
        <main className="w-full flex flex-col flex-1 items-center">
        
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

        <div className="w-full max-w-[1440px] px-md lg:px-xl py-xl flex flex-col items-start gap-xl flex-1">
          {!rankingsLoading && <RankingsPodium topModels={top3} />}

          <div className="w-full flex flex-col md:flex-row items-start gap-xl">
            <div className="w-full md:w-2/3">
              {rankingsLoading ? (
                 <div className="w-full flex flex-col gap-2">
                   <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
                   <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
                   <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
                 </div>
              ) : (
                <RankingsTable data={mappedRankings} />
              )}
            </div>

            <div className="w-full md:w-1/3 flex flex-col gap-lg sticky top-[100px]">
              {!rankingsLoading && <ChartCardScatter data={scatterData} />}
              
              <Card className="w-full p-md flex flex-col border border-hairline bg-surface">
                <div className="flex flex-col gap-xs mb-sm">
                  <span className="text-label text-subtle">EN ÇOK YÜKSELEN VE DÜŞEN MODELLER</span>
                  <h3 className="text-body-md-bold text-ink">Haftalık Yükseklikler</h3>
                </div>

                {loadingHighlights ? (
                  <div className="w-full h-[150px] bg-surface-sunken rounded-sm animate-pulse" />
                ) : (
                  highlights.map((h, i) => (
                    <HighlightListItem
                      key={i}
                      name={h.model.name}
                      provider={h.model.provider.name}
                      contextLength={h.model.context_size}
                      weeklyChange={h.weekly_change}
                      pricePer1M={h.model.price_per_1m}
                    />
                  ))
                )}
              </Card>

              {!rankingsLoading && <CostSimulatorCard models={costSimulatorModels} />}
            </div>
          </div>
        </div>

        <div className="w-full border-t border-hairline bg-surface flex justify-center mt-xl">
          <div className="w-full max-w-[1440px] px-md lg:px-xl py-xl flex flex-col md:flex-row gap-xl justify-between">
            <MethodologyTile 
              icon={BarChart2}
              title="QA Kör Arena Testleri"
              description="Kullanıcıların hangi modeli tercih ettiğini kör testlerle ölçen metodoloji."
            />
            <MethodologyTile 
              icon={Settings2}
              title="Otomatik Benchmark Koşuları"
              description="Standart benchmark setleriyle periyodik otomatik puanlama."
            />
            <MethodologyTile 
              icon={Zap}
              title="Hız ve Gecikme Metrikleri"
              description="Saniye başına token üretimi ve ilk-token gecikmesi gibi performans ölçümleri."
            />
          </div>
        </div>

      </main>
      <Footer />
      </div>
    </div>
  );
}
