import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';

interface ApiKey {
  id: string;
  name: string;
  created_at: string;
  raw_key?: string; // Sadece oluşturulduğunda gelir
}

export function DashboardApiInfoCard() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const fetchKeys = async () => {
    try {
      const res = await fetch('/api/keys');
      const data = await res.json();
      setKeys(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const createKey = async () => {
    try {
      const res = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `Key ${keys.length + 1}` })
      });
      const newKey = await res.json();
      setKeys(prev => [newKey, ...prev]);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteKey = async (id: string) => {
    try {
      await fetch(`/api/keys/${id}`, { method: 'DELETE' });
      setKeys(prev => prev.filter(k => k.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="w-full xl:w-80 flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between p-md border-b border-hairline">
        <div className="flex items-center gap-sm text-ink">
          <span className="font-mono font-bold">&lt;&gt;</span>
          <h2 className="text-heading-sm">API Information</h2>
        </div>
        <div className="flex items-center gap-sm">
          <Button variant="icon-circular" icon={ChevronLeft} size="sm" />
          <Button variant="icon-circular" icon={ChevronRight} size="sm" />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <span className="text-body-sm text-muted">Yükleniyor...</span>
          </div>
        ) : keys.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-md text-center gap-md">
            <div className="w-12 h-12 rounded-full bg-surface-sunken flex items-center justify-center mb-sm">
              <span className="font-mono font-bold text-subtle text-lg">&lt;&gt;</span>
            </div>
            <p className="text-label text-subtle tracking-widest">NO API INFORMATION</p>
            <Button variant="primary" onClick={createKey}>Create API Key</Button>
          </div>
        ) : (
          <div className="p-md flex flex-col gap-md">
            <div className="flex justify-between items-center mb-sm">
              <span className="text-label text-subtle tracking-widest">ACTIVE KEYS</span>
              <Button variant="tertiary" size="sm" onClick={createKey}>New Key</Button>
            </div>

            {keys.map((k) => (
              <div key={k.id} className="flex flex-col gap-2 p-sm border border-hairline rounded-sm bg-surface-sunken relative group">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-body-sm">{k.name}</span>
                  <button onClick={() => deleteKey(k.id)} className="text-[11px] text-error opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
                </div>
                <div className="flex items-center justify-between bg-canvas border border-hairline rounded-[4px] p-2">
                  <span className="font-mono text-[11px] text-muted truncate max-w-[180px]">
                    {k.raw_key || 'sk-••••••••••••••••••••••••'}
                  </span>
                  <button
                    onClick={() => handleCopy(k.raw_key || k.id)}
                    className="p-1 hover:bg-surface rounded-xs transition-colors"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-live" /> : <Copy className="w-3.5 h-3.5 text-muted" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
