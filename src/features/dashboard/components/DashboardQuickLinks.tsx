import React from 'react';
import { Bell, HelpCircle, Signal, ExternalLink } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';

export function DashboardQuickLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
      <Card className="p-md flex items-center gap-sm cursor-pointer hover:bg-surface transition-colors">
        <div className="w-8 h-8 rounded-full bg-surface-sunken flex items-center justify-center">
          <Bell className="w-4 h-4 text-ink" />
        </div>
        <span className="text-body font-medium text-ink">System Notice</span>
      </Card>
      
      <Card className="p-md flex items-center gap-sm cursor-pointer hover:bg-surface transition-colors">
        <div className="w-8 h-8 rounded-full bg-surface-sunken flex items-center justify-center">
          <HelpCircle className="w-4 h-4 text-ink" />
        </div>
        <span className="text-body font-medium text-ink">FAQ</span>
      </Card>

      <Card className="p-md flex items-center justify-between cursor-pointer hover:bg-surface transition-colors">
        <div className="flex items-center gap-sm">
          <div className="w-8 h-8 rounded-full bg-live-bg flex items-center justify-center">
            <Signal className="w-4 h-4 text-live" />
          </div>
          <span className="text-body font-medium text-ink">Service Status</span>
        </div>
        <ExternalLink className="w-4 h-4 text-subtle" />
      </Card>
    </div>
  );
}
