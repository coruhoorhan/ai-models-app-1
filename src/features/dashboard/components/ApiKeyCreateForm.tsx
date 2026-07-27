import React, { useState } from 'react';
import { Copy, Check, ShieldAlert, Plus } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';

export interface ApiKeyCreateFormProps {
  onKeyCreated: (name: string, limit: number, rpm: number) => void;
  createdKeySecret: string | null;
}

export function ApiKeyCreateForm({ onKeyCreated, createdKeySecret }: ApiKeyCreateFormProps) {
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyLimit, setNewKeyLimit] = useState(250);
  const [newKeyRpm, setNewKeyRpm] = useState(1200);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    onKeyCreated(newKeyName, newKeyLimit, newKeyRpm);
    setNewKeyName('');
    setCopiedKey(false);
  };

  const handleCopySecret = () => {
    if (createdKeySecret) {
      navigator.clipboard.writeText(createdKeySecret);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  return (
    <form onSubmit={handleCreateKey} className="flex flex-col gap-lg h-full">
      
      <div className="flex flex-col gap-xs border-b border-hairline pb-xs mb-sm">
        <span className="text-label text-subtle">NEW CREDENTIAL</span>
      </div>

      <div className="flex flex-col gap-sm">
        <label className="text-body-sm text-ink font-bold">Key Label / Name</label>
        <input
          type="text"
          required
          placeholder="e.g. Mobile App Backend"
          value={newKeyName}
          onChange={(e) => setNewKeyName(e.target.value)}
          className="bg-canvas border border-hairline rounded-sm px-md h-[40px] text-body-sm text-ink outline-none focus:border-ink transition-colors"
        />
      </div>

      <div className="flex flex-col gap-sm">
        <div className="flex justify-between items-center">
          <label className="text-body-sm text-ink font-bold">Monthly Spend Cap ($)</label>
          <span className="text-mono-inline text-ink font-bold bg-surface-sunken px-sm py-[2px] rounded-xs border border-hairline">
            ${newKeyLimit}
          </span>
        </div>
        <input
          type="range"
          min={10} max={1000} step={10}
          value={newKeyLimit}
          onChange={(e) => setNewKeyLimit(Number(e.target.value))}
          className="w-full accent-ink"
        />
      </div>

      <div className="flex flex-col gap-sm">
        <div className="flex justify-between items-center">
          <label className="text-body-sm text-ink font-bold">Rate Limit (RPM)</label>
          <span className="text-mono-inline text-ink font-bold bg-surface-sunken px-sm py-[2px] rounded-xs border border-hairline">
            {newKeyRpm} RPM
          </span>
        </div>
        <input
          type="range"
          min={60} max={6000} step={60}
          value={newKeyRpm}
          onChange={(e) => setNewKeyRpm(Number(e.target.value))}
          className="w-full accent-ink"
        />
      </div>

      <div className="pt-sm border-t border-hairline mt-auto">
        <Button 
          type="submit" 
          variant="primary" 
          icon={Plus} 
          className="w-full"
        >
          GENERATE KEY
        </Button>
      </div>

      {createdKeySecret && (
        <div className="p-sm bg-surface-sunken border border-hairline rounded-sm flex flex-col gap-sm mt-md">
          <div className="flex items-center gap-xs text-chart-teal">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-body-sm font-bold">Secret Key Generated</span>
          </div>
          <p className="text-body-sm text-subtle">This key will only be shown once. Please copy and store it securely.</p>
          <div className="flex items-center gap-sm">
            <div className="flex-1 bg-canvas border border-hairline rounded-sm p-sm text-mono-inline text-ink overflow-x-auto truncate">
              {createdKeySecret}
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCopySecret}
              icon={copiedKey ? Check : Copy}
            >
              {copiedKey ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
