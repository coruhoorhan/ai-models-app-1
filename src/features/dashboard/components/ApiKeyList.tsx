import React, { useState } from 'react';
import { Sliders, Search, Copy, Check, Power } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { ApiKeyItem } from './ApiKeyQuotaManager';

interface ApiKeyListProps {
  keys: ApiKeyItem[];
}

export function ApiKeyList({ keys }: ApiKeyListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredKeys = keys.filter(k => 
    k.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    k.keyMasked.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-md h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-sm border-b border-hairline mb-sm gap-md">
        <span className="text-label text-subtle">ACTIVE KEYS & USAGE</span>
        <div className="relative group">
          <Search className="w-3.5 h-3.5 text-subtle absolute left-sm top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-ink" />
          <input 
            type="text" 
            placeholder="Search keys..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-canvas border border-hairline rounded-sm pl-8 pr-sm py-[6px] text-body-sm w-full sm:w-[200px] outline-none transition-all duration-300 focus:border-ink focus:ring-1 focus:ring-ink"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-xs flex flex-col gap-md">
        {filteredKeys.length === 0 ? (
          <div className="p-xl text-center text-subtle text-body-sm border border-hairline border-dashed rounded-sm">
            No API keys found matching "{searchTerm}"
          </div>
        ) : (
          filteredKeys.map((k) => (
            <div 
              key={k.id} 
              className="p-md bg-canvas border border-hairline rounded-sm flex flex-col gap-md transition-all duration-300 hover:border-ink/40 hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)] group"
            >
            
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-xs">
                <div className="flex items-center gap-sm">
                  <h4 className="text-body font-bold text-ink">{k.name}</h4>
                  {k.status === 'active' && (
                    <span className="w-2 h-2 rounded-full bg-live shadow-[0_0_8px_rgba(var(--color-live),0.4)] animate-pulse" />
                  )}
                </div>
                <div className="flex items-center gap-xs">
                  <span className="text-mono-inline text-subtle bg-surface-sunken px-sm py-[2px] rounded-xs border border-hairline w-fit transition-colors group-hover:border-ink/20">
                    {k.keyMasked}
                  </span>
                  <button 
                    onClick={() => handleCopy(k.id, k.keyMasked)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 text-subtle hover:text-ink rounded-xs hover:bg-surface-sunken"
                    title="Copy Key ID"
                  >
                    {copiedId === k.id ? <Check className="w-3.5 h-3.5 text-chart-teal" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" icon={Power} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {k.status === 'active' ? 'Revoke' : 'Restore'}
                </Button>
                <Button variant="secondary" size="sm" icon={Sliders}>
                  Edit
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-sm pt-md border-t border-hairline">
              <div className="flex justify-between items-center text-mono-inline">
                <span className="text-subtle">Usage (${k.spent.toFixed(2)} / ${k.monthlyLimit})</span>
                <span className={(k.spent / k.monthlyLimit) > 0.8 ? 'text-chart-orange' : 'text-ink'}>
                  {((k.spent / k.monthlyLimit) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-[4px] bg-surface-sunken rounded-full overflow-hidden border border-hairline">
                <div 
                  className={`h-full transition-all duration-300 ${
                    (k.spent / k.monthlyLimit) > 0.8 ? 'bg-chart-orange' : 'bg-chart-blue'
                  }`}
                  style={{ width: `${Math.min((k.spent / k.monthlyLimit) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-label text-subtle pt-xs">
              <div className="flex items-center gap-md">
                <span className="bg-surface-sunken px-xs py-[2px] rounded-xs border border-hairline">{k.rpm} RPM</span>
                <span className="text-hairline">|</span>
                <span>CREATED: {k.createdAt}</span>
              </div>
            </div>
            
          </div>
        ))
        )}
      </div>
    </div>
  );
}
