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
    <Card className="w-full p-lg border-hairline bg-surface flex flex-col gap-md my-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md border-b border-hairline-soft pb-md">
        <div className="flex items-center gap-sm">
          <div className="w-8 h-8 rounded-sm bg-ink text-canvas flex items-center justify-center">
            <Key className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-xs">
              <h3 className="text-body font-bold text-ink">API Key & Quota Management</h3>
              <BadgeCategory variant="status-live" label="Live Control" />
            </div>
            <p className="text-body-sm text-subtle">Create scoped keys, set monthly spending limits, and configure rate caps.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-md">
        <ApiKeyCreateForm onKeyCreated={handleKeyCreated} createdKeySecret={createdKeySecret} />
        <ApiKeyList keys={keys} />
      </div>
    </Card>
  );
}
