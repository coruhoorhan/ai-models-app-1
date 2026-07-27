import React from 'react';
import { Card } from '../../../shared/ui/Card';
import { Copy, RefreshCw, Key } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';

export function DashboardApiInfoCard() {
  return (
    <Card className="w-full xl:w-[320px] shrink-0 p-lg flex flex-col gap-lg h-full">
      <div className="flex items-center gap-sm">
        <div className="p-xs bg-surface-sunken rounded-sm">
          <Key className="w-4 h-4 text-ink" />
        </div>
        <h2 className="text-body font-bold text-ink">API Key Access</h2>
      </div>

      <div className="flex flex-col gap-xs">
        <span className="text-label text-subtle">API URL</span>
        <div className="flex items-center bg-surface border border-hairline rounded-sm px-sm h-[36px] overflow-hidden">
          <span className="font-mono text-body-sm text-ink truncate w-full">https://api.unorouter.com/v1</span>
        </div>
      </div>

      <div className="flex flex-col gap-xs">
        <span className="text-label text-subtle">PRIMARY API KEY</span>
        <div className="flex items-center bg-surface border border-hairline rounded-sm px-sm h-[36px] overflow-hidden relative">
          <span className="font-mono text-body-sm text-ink truncate w-full select-all">sk-unorouter-********************</span>
          <div className="absolute right-xs top-1/2 -translate-y-1/2 flex items-center bg-surface pl-xs">
             <button className="text-subtle hover:text-ink transition-fast p-1 rounded-xs focus-ring">
               <Copy className="w-3.5 h-3.5" />
             </button>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-sm pt-md border-t border-hairline-soft">
        <Button variant="secondary" icon={RefreshCw} className="w-full justify-center">
          Rotate Key
        </Button>
      </div>
    </Card>
  );
}
