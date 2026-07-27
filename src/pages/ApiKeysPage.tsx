import React from 'react';
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout';
import { ApiKeyQuotaManager } from '../features/dashboard/components/ApiKeyQuotaManager';

export function ApiKeysPage() {
  return (
    <DashboardLayout>
      <div className="w-full h-full p-lg xl:p-xl flex flex-col gap-xl overflow-y-auto bg-canvas">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md border-b border-hairline pb-md">
          <div>
            <div className="flex items-center gap-xs mb-xs">
              <span className="w-2 h-2 rounded-full bg-live" />
              <span className="text-label text-subtle">SECURITY & ACCESS</span>
            </div>
            <h1 className="text-heading-md text-ink">API Keys</h1>
          </div>
        </div>

        {/* API Key Manager */}
        <ApiKeyQuotaManager />
      </div>
    </DashboardLayout>
  );
}
