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
import { ArenaBattleSimulator } from '../features/rankings/components/ArenaBattleSimulator';
import { useRankings } from '../features/rankings/hooks/useRankings';
import { RankingsFilterBar } from '../features/rankings/components/RankingsFilterBar';
import { useSearchParams } from 'react-router-dom';
import { CategoryOption, SortOption } from '../features/rankings/types';

const MOCK_SCATTER_DATA = [
  { id: '1', name: 'GPT-4o', x: 5, y: 300, color: 'var(--color-chart-teal)' },
  { id: '2', name: 'Claude 3.5 Sonnet', x: 3, y: 49, color: 'var(--color-chart-blue)' },
  { id: '3', name: 'Gemini 1.5 Pro', x: 3.5, y: 44, color: 'var(--color-chart-pink)' },
  { id: '4', name: 'Llama 3.1 405B', x: 0.9, y: 28, color: 'var(--color-chart-orange)' },
  { id: '5', name: 'Claude 3 Haiku', x: 0.25, y: 200, color: 'var(--color-chart-purple)' },
];

export function RankingsPage() {
  const [searchParams] = useSearchParams();
  const category = (searchParams.get('category') as CategoryOption) || 'all';
  const sort = (searchParams.get('sort') as SortOption) || 'elo_desc';
  
  const { rankings, isLoading, isError } = useRankings(category, sort);

  const top3 = rankings.slice(0, 3).map((r, i) => ({
    id: r.id,
    rank: i + 1,
    name: r.name,
    developer: r.provider,
    score: r.eloScore
  }));

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
          
          {/* Filter Bar */}
          <RankingsFilterBar />

          {/* Podium */}
          <RankingsPodium topModels={top3} />

          {/* Interactive Arena Battle Simulator */}
          <ArenaBattleSimulator />

          <div className="w-full flex flex-col lg:flex-row items-start gap-xl">
            {/* Left Column: Data Table */}
            <div className="w-full lg:w-2/3 overflow-x-auto">
              <RankingsTable data={rankings} isLoading={isLoading} isError={isError} />
            </div>

            {/* Right Column: Cards Stack */}
            <div className="w-full lg:w-1/3 flex flex-col gap-lg sticky top-[100px]">
              <ChartCardScatter 
                title="Intelligence Hub 2030"
                subtitle="AKILLI ANALİZ & KIYAS"
                isLive={true}
                data={MOCK_SCATTER_DATA}
              />
              
              <Card className="w-full p-lg flex flex-col">
                <div className="flex flex-col gap-xs mb-sm">
                  <span className="text-label text-ink">EN ÇOK YÜKSELEN VE DÜŞEN MODELLER</span>
                  <h3 className="text-heading-sm text-ink">Haftalık Yükseklikler</h3>
                </div>
                <HighlightListItem 
                  modelName="Gemini 1.5 Flash"
                  developerInfo="Google · 1M Context"
                  delta={24}
                  price="$0.35 /1M"
                />
                <HighlightListItem 
                  modelName="Mistral Large 2"
                  developerInfo="Mistral · 128k Context"
                  delta={11}
                  price="$3.00 /1M"
                />
                <HighlightListItem 
                  modelName="Claude 3 Opus"
                  developerInfo="Anthropic · 200k Context"
                  delta={-4}
                  price="$15.00 /1M"
                />
              </Card>

              <CostSimulatorCard />
            </div>
          </div>
        </div>

        {/* Bottom Section: Methodology */}
        <div className="w-full border-t border-hairline bg-surface flex justify-center mt-xl">
          <div className="w-full max-w-[1440px] px-md lg:px-xl py-xl flex flex-col lg:flex-row gap-xl justify-between">
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
