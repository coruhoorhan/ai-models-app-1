import React, { useMemo } from 'react';
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout';
import { DataTable, ColumnDef } from '../shared/ui/DataTable';
import { Badge } from '../shared/ui/Badge';

interface LogEntry {
  id: string;
  time: string;
  model: string;
  tokens: string;
  cost: string;
  status: 'success' | 'error';
}

const mockLogs: LogEntry[] = Array.from({ length: 45 }).map((_, i) => ({
  id: `req_${Math.random().toString(36).substring(7)}`,
  time: new Date(Date.now() - i * 60000 * 15).toLocaleString(),
  model: i % 3 === 0 ? 'gpt-4o' : i % 2 === 0 ? 'claude-3-opus' : 'gemini-1.5-pro',
  tokens: Math.floor(Math.random() * 5000 + 100).toLocaleString(),
  cost: `$${(Math.random() * 0.05).toFixed(4)}`,
  status: Math.random() > 0.1 ? 'success' : 'error',
}));

export function UsageLogsPage() {
  const columns = useMemo<ColumnDef<LogEntry>[]>(() => [
    {
      key: 'id',
      header: 'REQUEST ID',
      cell: (row) => <span className="text-mono-inline text-subtle">{row.id}</span>
    },
    {
      key: 'time',
      header: 'TIMESTAMP',
      cell: (row) => row.time
    },
    {
      key: 'model',
      header: 'MODEL',
      cell: (row) => (
        <div className="flex items-center gap-xs">
          <div className={`w-2 h-2 rounded-xs ${
            row.model.includes('gpt') ? 'bg-chart-teal' : 
            row.model.includes('claude') ? 'bg-chart-pink' : 'bg-chart-blue'
          }`} />
          <span className="font-medium">{row.model}</span>
        </div>
      )
    },
    {
      key: 'tokens',
      header: 'TOKENS',
      cell: (row) => row.tokens
    },
    {
      key: 'cost',
      header: 'COST',
      cell: (row) => <span className="font-mono">{row.cost}</span>
    },
    {
      key: 'status',
      header: 'STATUS',
      cell: (row) => (
        <Badge 
          variant={row.status === 'success' ? 'status-live' : 'error'} 
          label={row.status.toUpperCase()} 
        />
      )
    }
  ], []);

  return (
    <DashboardLayout>
      <div className="w-full flex flex-col items-start">
        <div className="w-full max-w-[1200px] flex flex-col p-md lg:p-xl gap-xl">
        <div>
          <h1 className="text-heading-md text-ink">Usage Logs</h1>
          <p className="text-body-sm text-muted">View detailed request logs and usage.</p>
        </div>
        
        <DataTable data={mockLogs} columns={columns} pageSize={15} />
        </div>
      </div>
    </DashboardLayout>
  );
}
