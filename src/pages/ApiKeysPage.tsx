import React from 'react';
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout';
import { ApiKeyQuotaManager } from '../features/dashboard/components/ApiKeyQuotaManager';

export function ApiKeysPage() {
  return (
    <DashboardLayout>
      <div className="w-full flex flex-col items-start">
        <div className="w-full max-w-[1200px] flex flex-col p-md lg:p-xl gap-xl">
          {/* Page Header */}
          <div className="flex flex-col gap-xs border-b border-hairline pb-md">
            <div className="flex items-center gap-xs mb-xs">
              <span className="w-2 h-2 rounded-full bg-live" />
              <span className="text-label text-subtle uppercase tracking-widest">SECURITY PROTOCOL</span>
            </div>
            <h1 className="text-heading-md text-ink">API Access & Quotas</h1>
            <p className="text-body-sm text-subtle max-w-[65ch] mt-xs">
              Manage your scoped gateway keys, monitor live token consumption, and adjust hard limits to prevent unexpected overages.
            </p>
          </div>

          <div className="w-full mt-sm">
            <ApiKeyQuotaManager />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
