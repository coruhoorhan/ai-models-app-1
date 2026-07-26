import React from 'react';
import { Zap, Github, MessageSquare, Mail, Key, Copy } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { KeyDisplayField } from '../../../shared/ui/KeyDisplayField';

export function ThreeSteps() {
  return (
    <section className="w-full flex flex-col items-center gap-xl py-xl px-md lg:px-xl max-w-[1440px] mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-xs px-sm py-[4px] bg-canvas border border-chart-purple text-chart-purple rounded-full mb-md">
          <Zap className="w-3 h-3" />
          <span className="text-label text-chart-purple">GET STARTED</span>
        </div>
        <h2 className="text-heading-lg mb-xs">
          <span className="text-ink">Three steps. </span>
          <span className="text-muted">From zero to first request.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md w-full max-w-[1200px]">
        {/* Step 1 */}
        <Card className="p-xl flex flex-col">
          <h3 className="text-heading-sm text-ink mb-md">Sign up</h3>
          <div className="flex flex-col gap-sm mt-auto">
            <Button variant="secondary" icon={Github}>
              Continue with GitHub
            </Button>
            <Button variant="secondary" icon={MessageSquare}>
              Continue with Discord
            </Button>
            <Button variant="secondary" icon={Mail}>
              Continue with Email
            </Button>
          </div>
        </Card>

        {/* Step 2 */}
        <Card className="p-xl flex flex-col">
          <h3 className="text-heading-sm text-ink mb-lg">Top up or subscribe</h3>
          <div className="flex flex-col gap-md mt-auto">
            {[
              { date: 'Free', amount: '$0', percent: 5 },
              { date: 'May 02', amount: '$50', percent: 100 },
              { date: 'Apr 18', amount: '$20', percent: 40 },
              { date: 'Apr 04', amount: '$10', percent: 20 },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-md">
                <span className="w-[45px] text-body-sm text-muted text-right">{row.date}</span>
                <div className="flex-1 h-[6px] bg-surface-sunken rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-chart-purple to-chart-green" 
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
                <span className="w-[30px] text-body-sm font-bold text-ink">{row.amount}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Step 3 */}
        <Card className="p-xl flex flex-col">
          <div className="flex items-center gap-sm mb-md">
            <Key className="w-6 h-6 text-ink" />
            <h3 className="text-heading-sm text-ink">Get your API key</h3>
          </div>
          <p className="text-body text-muted mb-lg">
            Create an API key and drop it into any OpenAI-compatible client.
          </p>
          <div className="mt-auto flex flex-col gap-sm">
            <KeyDisplayField value="sk-unorouter-8f92j..." />
            <span className="text-body-sm text-muted">Fully OpenAI compatible</span>
          </div>
        </Card>
      </div>

      <div className="flex items-center gap-md mt-md">
        <Button variant="primary">GET STARTED</Button>
        <Button variant="secondary">VIEW PRICING</Button>
      </div>
    </section>
  );
}
