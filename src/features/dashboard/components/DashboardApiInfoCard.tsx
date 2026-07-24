import React from 'react';
import { Code } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';

export function DashboardApiInfoCard() {
  return (
    <Card className="w-full xl:w-[320px] p-lg flex flex-col">
      <div className="flex items-center gap-sm mb-lg">
        <Code className="w-5 h-5 text-ink" />
        <h2 className="text-heading-sm text-ink">API Information</h2>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center text-center p-md">
        <div className="w-12 h-12 rounded-full bg-surface-sunken flex items-center justify-center mb-md">
          <Code className="w-6 h-6 text-subtle" />
        </div>
        <span className="text-label text-subtle mb-sm">NO API INFORMATION</span>
        <Button variant="tertiary" size="sm">Create Key</Button>
      </div>
    </Card>
  );
}
