import React, { useState } from 'react';
import { Key } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { BadgeCategory } from '../../../shared/ui/BadgeCategory';
import { ApiKeyCreateForm } from './ApiKeyCreateForm';
import { ApiKeyList } from './ApiKeyList';

export interface ApiKeyItem {
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
      id: '1', name: 'Production Edge Gateway', keyMasked: 'sk-or-v1-8f92...3a9c',
      monthlyLimit: 250, spent: 84.20, rpm: 1200, status: 'active', createdAt: '2026-07-01'
    },
    {
      id: '2', name: 'Staging Auto-Eval Bot', keyMasked: 'sk-or-v1-1d4e...9f22',
      monthlyLimit: 50, spent: 12.10, rpm: 300, status: 'active', createdAt: '2026-07-15'
    }
  ]);
  const [createdKeySecret, setCreatedKeySecret] = useState<string | null>(null);

  const handleKeyCreated = (name: string, limit: number, rpm: number) => {
    const rawSecret = `sk-or-v1-${Math.random().toString(36).substring(2, 12)}${Math.random().toString(36).substring(2, 12)}`;
    const masked = `${rawSecret.slice(0, 12)}...${rawSecret.slice(-4)}`;
    
    const newKey: ApiKeyItem = {
      id: Date.now().toString(),
      name,
      keyMasked: masked,
      monthlyLimit: limit,
      spent: 0,
      rpm,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setKeys([newKey, ...keys]);
    setCreatedKeySecret(rawSecret);
  };

  return (
    <Card className="w-full p-lg flex flex-col gap-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md border-b border-hairline pb-md">
        <div className="flex items-center gap-md">
          <div className="w-10 h-10 rounded-sm border border-hairline bg-canvas text-ink flex items-center justify-center transition-transform hover:scale-105 duration-300">
            <Key className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-xs">
            <h3 className="text-heading-sm text-ink">API Key & Quota Management</h3>
            <p className="text-body-sm text-subtle">Create scoped keys, set monthly spending limits, and configure rate caps.</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md border-b border-hairline pb-md">
        <div className="flex flex-col gap-xs p-md bg-canvas border border-hairline rounded-sm transition-colors hover:border-ink/30 duration-300">
          <span className="text-label text-subtle flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-live" />
            ACTIVE KEYS
          </span>
          <span className="text-heading-md text-ink">{keys.filter(k => k.status === 'active').length}</span>
        </div>
        <div className="flex flex-col gap-xs p-md bg-canvas border border-hairline rounded-sm transition-colors hover:border-ink/30 duration-300">
          <span className="text-label text-subtle">TOTAL USAGE (MONTH)</span>
          <span className="text-heading-md text-ink">${keys.reduce((acc, k) => acc + k.spent, 0).toFixed(2)}</span>
        </div>
        <div className="flex flex-col gap-xs p-md bg-canvas border border-hairline rounded-sm transition-colors hover:border-ink/30 duration-300">
          <span className="text-label text-subtle">TOTAL ALLOCATED CAP</span>
          <span className="text-heading-md text-ink">${keys.reduce((acc, k) => acc + k.monthlyLimit, 0).toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl pt-md">
        <div className="lg:col-span-5">
          <ApiKeyCreateForm onKeyCreated={handleKeyCreated} createdKeySecret={createdKeySecret} />
        </div>
        <div className="lg:col-span-7">
          <ApiKeyList keys={keys} />
        </div>
      </div>
    </Card>
  );
}
