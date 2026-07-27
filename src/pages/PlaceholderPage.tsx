import React from 'react';
import { Construction } from 'lucide-react';
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout';

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <DashboardLayout>
      <div className="w-full flex flex-col items-start">
        <div className="w-full max-w-[1200px] flex flex-col p-md lg:p-xl gap-xl items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center gap-md text-center">
            <div className="w-16 h-16 rounded-sm bg-surface flex items-center justify-center border border-hairline">
              <Construction className="w-8 h-8 text-subtle" />
            </div>
            <div className="flex flex-col gap-xs">
              <h1 className="text-heading-md text-ink uppercase">{title}</h1>
              <p className="text-body text-muted max-w-md">
                This section is currently under construction. Check back later for updates as we roll out new features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
