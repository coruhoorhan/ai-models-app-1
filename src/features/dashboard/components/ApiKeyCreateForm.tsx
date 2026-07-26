import React, { useState } from 'react';
import { Plus, Check, Copy, ShieldAlert } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';

interface ApiKeyCreateFormProps {
  onKeyCreated: (name: string, limit: number, rpm: number) => void;
  createdKeySecret: string | null;
}

export function ApiKeyCreateForm({ onKeyCreated, createdKeySecret }: ApiKeyCreateFormProps) {
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyLimit, setNewKeyLimit] = useState(100);
  const [newKeyRpm, setNewKeyRpm] = useState(500);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    onKeyCreated(newKeyName, newKeyLimit, newKeyRpm);
    setNewKeyName('');
  };

  const handleCopySecret = () => {
    if (!createdKeySecret) return;
    navigator.clipboard.writeText(createdKeySecret);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
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
          min={10} max={1000} step={10}
          value={newKeyLimit}
          onChange={(e) => setNewKeyLimit(Number(e.target.value))}
          className="w-full accent-ink"
        />
      </div>

      <div className="flex flex-col gap-xs">
        <div className="flex justify-between items-center">
          <label className="text-body-sm text-ink font-medium">Rate Limit (RPM)</label>
          <span className="text-body-sm font-mono text-ink font-bold">{newKeyRpm} Req/min</span>
        </div>
        <input
          type="range"
          min={60} max={6000} step={60}
          value={newKeyRpm}
          onChange={(e) => setNewKeyRpm(Number(e.target.value))}
          className="w-full accent-ink"
        />
      </div>

      <Button type="submit" variant="primary" icon={Plus} className="w-full mt-xs">
        Generate New Key
      </Button>

      {createdKeySecret && (
        <div className="p-sm bg-surface-sunken border border-chart-teal rounded-sm mt-xs animate-in fade-in zoom-in duration-200">
          <div className="flex items-center gap-xs mb-xs text-chart-teal">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-body-sm font-bold">Copy your secret key</span>
          </div>
          <p className="text-body-sm text-muted mb-sm">This key will only be shown once. Please store it securely.</p>
          <div className="flex items-center gap-xs">
            <div className="flex-1 bg-surface border border-hairline rounded-sm p-xs text-mono-inline text-ink overflow-x-auto truncate">
              {createdKeySecret}
            </div>
            <button
              type="button"
              onClick={handleCopySecret}
              className="p-xs bg-ink text-canvas rounded-sm hover:opacity-80 transition-opacity flex items-center justify-center shrink-0"
            >
              {copiedKey ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
