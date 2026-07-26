import React, { useState } from 'react';
import { Key, Plus, Copy, Check, ShieldAlert, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';

interface ApiKeyItem {
  id: string;
  name: string;
  keyMasked: string;
  monthlyLimit: number;
  spent: number;
  rpm: number;
  status: 'active' | 'revoked';
  createdAt: string;
}

export function ApiKeyQuotaManager() {
  const [keys, setKeys] = useState<ApiKeyItem[]>([
    {
      id: '1',
      name: 'Production Edge Gateway',
      keyMasked: 'sk-or-v1-8f92...3a9c',
      monthlyLimit: 250,
      spent: 84.20,
      rpm: 1200,
      status: 'active',
      createdAt: '2026-07-01'
    },
    {
      id: '2',
      name: 'Staging Auto-Eval Bot',
      keyMasked: 'sk-or-v1-1d4e...9f22',
      monthlyLimit: 50,
      spent: 12.10,
      rpm: 300,
      status: 'active',
      createdAt: '2026-07-15'
    }
  ]);

  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyLimit, setNewKeyLimit] = useState(100);
  const [newKeyRpm, setNewKeyRpm] = useState(500);
  const [createdKeySecret, setCreatedKeySecret] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const rawSecret = `sk-or-v1-${Math.random().toString(36).substring(2, 12)}${Math.random().toString(36).substring(2, 12)}`;
    const masked = `${rawSecret.slice(0, 12)}...${rawSecret.slice(-4)}`;

    const newKey: ApiKeyItem = {
      id: Date.now().toString(),
      name: newKeyName,
      keyMasked: masked,
      monthlyLimit: newKeyLimit,
      spent: 0,
      rpm: newKeyRpm,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setKeys([newKey, ...keys]);
    setCreatedKeySecret(rawSecret);
    setNewKeyName('');
  };

  const handleCopySecret = () => {
    if (!createdKeySecret) return;
    navigator.clipboard.writeText(createdKeySecret);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <Card className="w-full p-lg border-hairline bg-surface flex flex-col gap-md my-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md border-b border-hairline pb-md">
        <div className="flex items-center gap-sm">
          <div className="p-xs rounded-sm bg-ink text-canvas">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-xs">
              <h3 className="text-body font-bold text-ink">API Key & Quota Management</h3>
              <Badge variant="status-live" label="Live Control" />
            </div>
            <p className="text-body-sm text-muted">Create scoped keys, set monthly spending limits, and configure rate caps.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-md">
        {/* Create Key Form */}
        <form onSubmit={handleCreateKey} className="lg:col-span-5 bg-canvas p-md border border-hairline rounded-sm flex flex-col gap-sm">
          <span className="text-label text-subtle">GENERATE SCOPED KEY</span>

          <div className="flex flex-col gap-xs">
            <label className="text-body-sm text-ink font-medium">Key Label / Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Mobile App Backend"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="bg-surface border border-hairline rounded-sm p-sm text-body-sm text-ink outline-none focus:border-ink font-sans"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <div className="flex justify-between items-center">
              <label className="text-body-sm text-ink font-medium">Monthly Spend Cap ($)</label>
              <span className="text-body-sm font-mono text-ink font-bold">${newKeyLimit}</span>
            </div>
            <input
              type="range"
              min={10}
              max={1000}
              step={10}
              value={newKeyLimit}
              onChange={(e) => setNewKeyLimit(Number(e.target.value))}
              className="w-full accent-ink cursor-pointer h-2 bg-surface-sunken rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <div className="flex justify-between items-center">
              <label className="text-body-sm text-ink font-medium">Rate Limit (Req/Min)</label>
              <span className="text-body-sm font-mono text-ink font-bold">{newKeyRpm} RPM</span>
            </div>
            <input
              type="range"
              min={60}
              max={5000}
              step={60}
              value={newKeyRpm}
              onChange={(e) => setNewKeyRpm(Number(e.target.value))}
              className="w-full accent-ink cursor-pointer h-2 bg-surface-sunken rounded-lg"
            />
          </div>

          <Button type="submit" variant="primary" icon={Plus} className="w-full justify-center mt-xs">
            Generate Key
          </Button>

          {/* New Key Alert Banner */}
          {createdKeySecret && (
            <div className="p-sm bg-live/10 border border-live/30 rounded-sm flex flex-col gap-xs animate-in fade-in duration-200 mt-xs">
              <span className="text-label text-live font-bold flex items-center gap-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Key Created - Copy Secret Now
              </span>
              <div className="flex items-center justify-between bg-canvas p-xs border border-hairline rounded-sm">
                <code className="text-[11px] font-mono text-ink truncate flex-1">{createdKeySecret}</code>
                <button
                  type="button"
                  onClick={handleCopySecret}
                  className="p-xs hover:bg-surface text-muted hover:text-ink text-[11px] font-bold shrink-0 ml-xs"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-live" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Existing Keys Table */}
        <div className="lg:col-span-7 bg-canvas p-md border border-hairline rounded-sm flex flex-col gap-xs">
          <span className="text-label text-subtle mb-xs">ACTIVE KEYS ({keys.length})</span>

          <div className="flex flex-col gap-xs">
            {keys.map((k) => (
              <div key={k.id} className="p-sm bg-surface border border-hairline rounded-sm flex items-center justify-between gap-sm">
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-xs">
                    <span className="text-body-sm font-bold text-ink truncate">{k.name}</span>
                    <Badge variant="status-live" label="ACTIVE" />
                  </div>
                  <span className="text-label font-mono text-muted">{k.keyMasked}</span>
                </div>

                <div className="flex items-center gap-md shrink-0 font-mono text-body-sm">
                  <div className="flex flex-col items-end">
                    <span className="text-ink font-bold">${k.spent.toFixed(2)} / ${k.monthlyLimit}</span>
                    <span className="text-[11px] text-muted">{k.rpm} RPM</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
