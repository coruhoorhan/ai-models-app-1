import React, { useState, useEffect } from 'react';
import { Globe, ShieldCheck, Activity, Cpu, Radio } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';

interface RegionStatus {
  name: string;
  code: string;
  latency: number;
  status: 'Optimal' | 'Active' | 'Rerouted';
  provider: string;
}

export function GlobalEdgeLatencyMap() {
  const [regions, setRegions] = useState<RegionStatus[]>([
    { name: 'US East (N. Virginia)', code: 'us-east-1', latency: 18, status: 'Optimal', provider: 'Groq / Scale' },
    { name: 'EU Central (Frankfurt)', code: 'eu-central-1', latency: 24, status: 'Optimal', provider: 'Together AI' },
    { name: 'Asia East (Tokyo)', code: 'ap-northeast-1', latency: 42, status: 'Active', provider: 'Fireworks AI' },
    { name: 'US West (Oregon)', code: 'us-west-2', latency: 21, status: 'Optimal', provider: 'Anyscale' },
  ]);

  const [lastLog, setLastLog] = useState("Fallback check passed: 100% provider availability verified.");

  useEffect(() => {
    const interval = setInterval(() => {
      setRegions(prev => prev.map(r => ({
        ...r,
        latency: Math.max(12, r.latency + Math.floor(Math.random() * 5) - 2)
      })));

      const logs = [
        "Auto-routed prompt to lowest latency node in Frankfurt (22ms).",
        "Provider failover simulated: Zero downtime fallback executed.",
        "Edge cache hit rate: 99.4% for frequent prompt embeddings.",
        "Rate limit quota balanced seamlessly across 4 upstream keys."
      ];
      setLastLog(logs[Math.floor(Math.random() * logs.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full flex flex-col gap-lg py-section px-lg lg:px-xl border-t border-hairline bg-surface">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <span className="text-label text-subtle mb-xs block">GLOBAL EDGE INFRASTRUCTURE</span>
          <h2 className="text-heading-lg text-ink">Ultra-low latency. Auto-fallback.</h2>
        </div>
        <div className="flex items-center gap-xs">
          <Badge variant="status-live" label="Global Edge Live" />
          <span className="text-body-sm font-mono text-muted">99.99% SLA Uptime</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
        {regions.map((reg) => (
          <Card key={reg.code} className="p-md border-hairline bg-canvas flex flex-col justify-between">
            <div className="flex items-start justify-between mb-sm">
              <div className="flex items-center gap-xs">
                <Radio className="w-3.5 h-3.5 text-live animate-pulse" />
                <span className="text-body-sm font-bold text-ink">{reg.name}</span>
              </div>
              <span className="text-label font-mono text-live">{reg.latency}ms</span>
            </div>

            <div className="flex items-center justify-between pt-sm border-t border-hairline text-label text-subtle">
              <span>{reg.provider}</span>
              <span className="text-ink font-mono">{reg.code}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Terminal Live Stream Footer */}
      <div className="p-md rounded-md bg-canvas border border-hairline flex items-center justify-between font-mono text-body-sm overflow-x-auto gap-md">
        <div className="flex items-center gap-sm shrink-0">
          <Activity className="w-4 h-4 text-chart-blue shrink-0" />
          <span className="text-label text-subtle">ROUTER LOGS:</span>
        </div>
        <span className="text-ink truncate">{lastLog}</span>
        <span className="text-label text-live shrink-0">ALL SYSTEMS OPERATIONAL</span>
      </div>
    </section>
  );
}
