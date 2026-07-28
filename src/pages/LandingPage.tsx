import React from 'react';
import { TopNav } from '../features/landing/components/TopNav';
import { HeroSection } from '../features/landing/components/HeroSection';
import { PopularPaths } from '../features/landing/components/PopularPaths';
import { ThreeSteps } from '../features/landing/components/ThreeSteps';
import { ModelBenchmarkComparison } from '../features/landing/components/ModelBenchmarkComparison';
import { GlobalEdgeLatencyMap } from '../features/landing/components/GlobalEdgeLatencyMap';
import { Footer } from '../shared/ui/Footer';
import { BackgroundGrid } from '../shared/ui/BackgroundGrid';

export function LandingPage() {
  return (
    <div className="w-full flex flex-col items-center bg-canvas min-h-screen relative overflow-hidden">
      <BackgroundGrid />
      <div className="relative z-10 w-full flex flex-col items-center">
        <TopNav />
        <div className="w-full max-w-[1440px] flex flex-col">
          <HeroSection />
          <PopularPaths />
          <ModelBenchmarkComparison />
          <ThreeSteps />
          <GlobalEdgeLatencyMap />
        </div>
        <Footer />
      </div>
    </div>
  );
}

