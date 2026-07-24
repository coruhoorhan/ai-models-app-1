import React from 'react';
import { Zap, ChevronRight, MessageSquare, Activity } from 'lucide-react';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';
import { cn } from '../../../shared/lib/cn';

export function HeroSection() {
  return (
    <section className="w-full flex flex-col xl:flex-row gap-xl pt-section pb-xl px-lg lg:px-xl">
      {/* Left Column */}
      <div className="flex-1 flex flex-col items-start gap-lg">
        <Badge variant="status-live" label="ROUTER ONLINE" />
        
        <h1 className="text-hero text-ink tracking-tighter">
          One API.<br/>
          Infinite models<span className="text-ink">.</span>
        </h1>
        
        <p className="text-body text-muted max-w-[480px]">
          A developer-first infrastructure platform routing 200+ AI models through a single, unified API. High throughput, low latency, zero configuration.
        </p>
        
        <div className="flex flex-wrap items-center gap-md">
          <Button variant="primary" icon={Zap}>
            GET STARTED
          </Button>
          <Button variant="secondary" icon={ChevronRight} iconPosition="trailing">
            VIEW MODELS
          </Button>
          <Button variant="secondary" icon={MessageSquare}>
            OPEN CHAT
          </Button>
        </div>
        
        {/* Stat Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-hairline rounded-md mt-lg bg-canvas">
          <div className="p-md flex flex-col border-r border-b md:border-b-0 border-hairline">
            <span className="text-label text-subtle mb-xs">MODELS</span>
            <span className="text-stat-number text-ink mb-1">217</span>
            <span className="text-body-sm text-muted">Routable</span>
          </div>
          <div className="p-md flex flex-col border-r md:border-b-0 border-b border-hairline">
            <span className="text-label text-subtle mb-xs">PROVIDERS</span>
            <span className="text-stat-number text-ink mb-1">36+</span>
            <span className="text-body-sm text-muted">Upstreams</span>
          </div>
          <div className="p-md flex flex-col border-r border-hairline">
            <span className="text-label text-subtle mb-xs">FREE</span>
            <span className="text-stat-number text-ink mb-1">122</span>
            <span className="text-body-sm text-muted">No cost</span>
          </div>
          <div className="p-md flex flex-col">
            <span className="text-label text-subtle mb-xs">PAID</span>
            <span className="text-stat-number text-ink mb-1">95</span>
            <span className="text-body-sm text-muted">Pay per use</span>
          </div>
        </div>
      </div>

      {/* Right Column (Live Stats Card) */}
      <div className="flex-1 relative flex items-center justify-center min-h-[400px]">
        {/* Floating icon badges (simplified) */}
        <div className="absolute inset-0 hidden md:block">
           <div className="absolute top-[10%] left-[10%] w-10 h-10 rounded-full bg-surface border border-hairline shadow-[0_2px_8px_rgba(0,0,0,0.04)]" />
           <div className="absolute top-[20%] right-[15%] w-12 h-12 rounded-full bg-surface border border-hairline shadow-[0_2px_8px_rgba(0,0,0,0.04)]" />
           <div className="absolute bottom-[15%] left-[20%] w-8 h-8 rounded-full bg-surface border border-hairline shadow-[0_2px_8px_rgba(0,0,0,0.04)]" />
           <div className="absolute bottom-[25%] right-[10%] w-10 h-10 rounded-full bg-surface border border-hairline shadow-[0_2px_8px_rgba(0,0,0,0.04)]" />
        </div>

        <Card className="relative z-10 w-full max-w-[420px] min-w-[280px] sm:min-w-[360px] p-lg shadow-sm">
          <div className="flex items-center justify-between mb-md">
            <div className="flex items-center gap-sm whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-live shrink-0" />
              <span className="text-label text-subtle">TOKENS SERVED</span>
            </div>
            <Activity className="w-5 h-5 text-live shrink-0" />
          </div>
          
          <div className="text-display text-ink mb-md whitespace-nowrap tracking-tight">
            33,548,373,527
          </div>
          
          <div className="h-px w-full bg-hairline my-md" />
          
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-md sm:gap-0 sm:divide-x divide-hairline">
            <div className="flex flex-col sm:pr-md">
              <span className="text-label text-subtle mb-xs whitespace-nowrap">REQUESTS</span>
              <span className="text-stat-number text-ink whitespace-nowrap">1,204,591</span>
            </div>
            <div className="flex flex-col sm:pl-md">
              <span className="text-label text-subtle mb-xs whitespace-nowrap">TOKENS / MIN</span>
              <div className="flex items-center gap-sm whitespace-nowrap">
                <span className="text-stat-number text-ink">24,500</span>
                <Badge variant="status-live" label="Live" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
