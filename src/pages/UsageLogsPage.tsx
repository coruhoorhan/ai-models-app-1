import React, { useMemo, useState } from 'react';
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout';
import { DataTable, ColumnDef } from '../shared/ui/DataTable';
import { Badge } from '../shared/ui/Badge';
import { useUsageLogs, UsageLogType } from '../features/dashboard/hooks/useUsageLogs';

export function UsageLogsPage() {
  const [page, setPage] = useState(1);
  const { data, loading } = useUsageLogs(page);

  const columns = useMemo<ColumnDef<UsageLogType>[]>(() => [
    {
      key: 'id',
      header: 'REQUEST ID',
      cell: (row) => <span className="text-mono-inline text-subtle">{row.id.split('-')[0]}...</span>
    },
    {
      key: 'time',
      header: 'TIMESTAMP',
      cell: (row) => new Date(row.timestamp).toLocaleString()
    },
    {
      key: 'model',
      header: 'MODEL',
      cell: (row) => (
        <div className="flex items-center gap-xs">
          <div className={`w-2 h-2 rounded-xs ${
            row.model.toLowerCase().includes('gpt') ? 'bg-chart-teal' :
            row.model.toLowerCase().includes('claude') ? 'bg-chart-pink' : 'bg-chart-blue'
          }`} />
          <span className="font-medium">{row.model}</span>
        </div>
      )
    },
    {
      key: 'tokens',
      header: 'TOKENS',
      cell: (row) => `${row.tokens_in} / ${row.tokens_out}`
    },
    {
      key: 'duration',
      header: 'DURATION',
      cell: (row) => <span className="font-mono">{row.duration}</span>
    },
    {
      key: 'cost',
      header: 'COST',
      cell: (row) => <span className="font-mono">{row.cost}</span>
    }
  ], []);

  return (
    <DashboardLayout>
      <div className="w-full p-md 2xl:p-lg flex flex-col gap-lg">
        <div>
          <h1 className="text-heading-md text-ink">Usage Logs</h1>
          <p className="text-body-sm text-muted">View detailed request logs and usage.</p>
        </div>
        
        {loading ? (
           <div className="w-full flex flex-col gap-2">
             <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
             <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
             <div className="h-12 bg-surface-sunken rounded-sm animate-pulse" />
           </div>
        ) : (
          <DataTable data={data.data} columns={columns} pageSize={20} />
        )}
      </div>
    </DashboardLayout>
  );
}
