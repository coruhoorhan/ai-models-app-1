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
import { useRankingsData, useRankingsHighlights, useScatterData } from '../features/rankings/hooks/useRankingsData';
import { SkeletonLoader } from '../shared/ui/SkeletonLoader';
import { ErrorStateBlock } from '../shared/ui/ErrorStateBlock';

export function RankingsPage() {
  const { data: rankingsData, isLoading: isRankingsLoading, error: rankingsError } = useRankingsData();
  const { data: highlightsData, isLoading: isHighlightsLoading, error: highlightsError } = useRankingsHighlights();
  const { data: scatterData, isLoading: isScatterLoading, error: scatterError } = useScatterData();

  const top3 = rankingsData.slice(0, 3);

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
          {isRankingsLoading ? (
             <div className="w-full flex justify-center py-xl"><SkeletonLoader className="w-full max-w-2xl h-[300px]" /></div>
          ) : rankingsError ? (
             <ErrorStateBlock message="Failed to load rankings podium" />
          ) : (
            <RankingsPodium topModels={top3} />
          )}

          <div className="w-full flex flex-col md:flex-row items-start gap-xl">
            {/* Left Column: Data Table */}
            <div className="w-full md:w-2/3">
              {isRankingsLoading ? (
                 <SkeletonLoader className="w-full h-[600px]" />
              ) : rankingsError ? (
                 <ErrorStateBlock message="Failed to load rankings table" />
              ) : (
                <RankingsTable data={rankingsData} />
              )}
            </div>

            {/* Right Column: Cards Stack */}
            <div className="w-full md:w-1/3 flex flex-col gap-lg sticky top-[100px]">
              {isScatterLoading ? (
                <SkeletonLoader className="w-full h-[350px]" />
              ) : scatterError ? (
                <ErrorStateBlock message="Failed to load scatter data" />
              ) : (
                <ChartCardScatter
                  title="Intelligence Hub 2030"
                  subtitle="AKILLI ANALİZ & KIYAS"
                  isLive={true}
                  data={scatterData}
                />
              )}
              
              <Card className="w-full p-lg flex flex-col">
                <div className="flex flex-col gap-xs mb-sm">
                  <span className="text-label text-ink">EN ÇOK YÜKSELEN VE DÜŞEN MODELLER</span>
                  <h3 className="text-heading-sm text-ink">Haftalık Yükseklikler</h3>
                </div>
                {isHighlightsLoading ? (
                  <SkeletonLoader className="w-full h-[200px]" />
                ) : highlightsError ? (
                  <ErrorStateBlock message="Failed to load highlights" />
                ) : highlightsData.length === 0 ? (
                  <div className="py-md text-center text-body-sm text-muted">Haftalık veri bulunamadı.</div>
                ) : (
                  highlightsData.map(highlight => (
                    <HighlightListItem
                      key={highlight.id}
                      modelName={highlight.modelName}
                      developerInfo={highlight.developerInfo}
                      delta={highlight.delta}
                      price={highlight.price}
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
