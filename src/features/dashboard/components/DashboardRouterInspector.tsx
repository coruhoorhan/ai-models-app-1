import React, { useState } from 'react';
import { Play, Layers } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { BadgeCategory } from '../../../shared/ui/BadgeCategory';
import { RouterConfigPanel } from './RouterConfigPanel';
import { IntegrationCodePanel } from './IntegrationCodePanel';

export function DashboardRouterInspector() {
  const [primaryModel, setPrimaryModel] = useState('anthropic/claude-3.5-sonnet');
  const [fallbackModel, setFallbackModel] = useState('openai/gpt-4o');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    primaryLatency: number;
    fallbackLatency: number;
    totalMs: number;
    status: string;
    tokensServed: number;
  } | null>(null);

  const handleRunRouteTest = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setTestResult({
        primaryLatency: Math.floor(Math.random() * 30) + 110,
        fallbackLatency: Math.floor(Math.random() * 20) + 90,
        totalMs: Math.floor(Math.random() * 40) + 130,
        status: 'Optimal Route Resolved',
        tokensServed: Math.floor(Math.random() * 120) + 80,
      });
      setIsTesting(false);
    }, 1200);
  };

  return (
    <Card className="w-full p-lg border-hairline bg-surface flex flex-col gap-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md border-b border-hairline-soft pb-md">
        <div className="flex items-center gap-sm">
          <div className="w-8 h-8 rounded-sm bg-ink text-canvas flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-xs">
              <h3 className="text-body font-bold text-ink">Smart Router & Code Generator</h3>
              <BadgeCategory variant="status-live" label="Live Inspector" />
            </div>
            <p className="text-body-sm text-subtle">Configure fallback chains and generate ready-to-paste SDK code.</p>
          </div>
        </div>
        
        <Button 
          variant="secondary" 
          icon={Play} 
          disabled={isTesting}
          onClick={handleRunRouteTest}
          className="shrink-0"
        >
          {isTesting ? 'Simulating Route...' : 'Simulate Route Request'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-md">
        <RouterConfigPanel
          primaryModel={primaryModel}
          setPrimaryModel={setPrimaryModel}
          fallbackModel={fallbackModel}
          setFallbackModel={setFallbackModel}
          testResult={testResult}
        />
        <IntegrationCodePanel primaryModel={primaryModel} fallbackModel={fallbackModel} />
      </div>
    </Card>
  );
}
