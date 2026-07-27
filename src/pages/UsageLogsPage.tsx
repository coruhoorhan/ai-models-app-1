import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout';
import { DataTable, ColumnDef } from '../shared/ui/DataTable';
import { Card } from '../shared/ui/Card';
import { Button } from '../shared/ui/Button';
import { Search, Download, Clock, Zap, Database, ArrowRight } from 'lucide-react';
import { useUsageLogs, UsageLog } from '../features/usage-logs/hooks/useUsageLogs';

export function UsageLogsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { logs, meta, isLoading } = useUsageLogs(page, 20);
  const [searchQuery, setSearchQuery] = useState('');

  // Sadece client tarafında bir arama da bırakıyoruz isme göre. (Gerçekte bu da server'a giderdi)
  const filteredLogs = useMemo(() => {
    if (!searchQuery) return logs;
    return logs.filter(log =>
      log.model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.model.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [logs, searchQuery]);

  const columns = useMemo<ColumnDef<UsageLog>[]>(() => [
    {
      key: 'time',
      header: 'TIME',
      cell: (row) => {
        const date = new Date(row.created_at);
        return (
          <div className="flex flex-col">
            <span className="text-body-sm text-ink font-mono">{date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
            <span className="text-body-sm text-subtle font-mono">{date.toLocaleTimeString('en-US', { hour12: false })}</span>
          </div>
        );
      }
    },
    {
      key: 'model',
      header: 'MODEL',
      cell: (row) => (
        <div className="flex flex-col">
          <span className="text-body-sm font-bold text-ink">{row.model.name}</span>
          <span className="text-[11px] text-muted">{row.model.provider.name}</span>
        </div>
      )
    },
    {
      key: 'tokens',
      header: 'TOKENS (IN/OUT)',
      cell: (row) => (
        <div className="flex items-center gap-2 font-mono text-body-sm">
          <span className="text-muted">{row.tokens_in}</span>
          <ArrowRight className="w-3 h-3 text-hairline" />
          <span className="text-chart-teal">{row.tokens_out}</span>
          <span className="text-subtle ml-2 text-[10px]">({row.tokens_in + row.tokens_out} total)</span>
        </div>
      )
    },
    {
      key: 'duration',
      header: 'LATENCY',
      cell: (row) => (
        <div className="flex items-center gap-xs font-mono text-body-sm">
          <Clock className="w-3 h-3 text-muted" />
          <span>{row.duration_ms}ms</span>
        </div>
      )
    },
    {
      key: 'cost',
      header: 'COST',
      cell: (row) => <span className="font-mono font-bold text-ink">${row.cost}</span>
    }
  ], []);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <DashboardLayout>
      <div className="w-full p-md 2xl:p-lg flex flex-col gap-lg">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md">
          <div>
            <div className="flex items-center gap-xs mb-xs">
              <span className="w-2 h-2 rounded-full bg-live" />
              <span className="text-label text-subtle">LOGS</span>
            </div>
            <h1 className="text-heading-md text-ink">Usage Logs</h1>
          </div>
          <Button variant="secondary" icon={Download}>Export CSV</Button>
        </div>

        <Card className="flex flex-col p-md gap-md">
          <div className="flex flex-col md:flex-row gap-sm md:items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-muted" />
              </div>
              <input
                type="text"
                className="w-full bg-canvas border border-hairline rounded-sm py-[6px] pl-[32px] pr-sm text-body-sm text-ink outline-none focus:border-chart-teal transition-colors"
                placeholder="Search by model or request ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-sm">
              <select className="bg-canvas border border-hairline rounded-sm py-[6px] px-sm text-body-sm text-ink outline-none">
                <option value="all">All Models</option>
                <option value="gpt-4o">gpt-4o</option>
                <option value="claude-3">claude-3-opus</option>
              </select>
              <select className="bg-canvas border border-hairline rounded-sm py-[6px] px-sm text-body-sm text-ink outline-none">
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
          </div>

          <div className="border border-hairline rounded-sm overflow-hidden">
            {isLoading ? (
              <div className="w-full flex flex-col gap-1 p-2 bg-canvas">
                <div className="h-10 bg-surface-sunken rounded-sm animate-pulse" />
                <div className="h-10 bg-surface-sunken rounded-sm animate-pulse" />
                <div className="h-10 bg-surface-sunken rounded-sm animate-pulse" />
                <div className="h-10 bg-surface-sunken rounded-sm animate-pulse" />
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="py-xl text-center bg-canvas">
                <Database className="w-8 h-8 text-subtle mx-auto mb-sm" />
                <p className="text-body text-muted">No usage logs found for this period</p>
              </div>
            ) : (
              <>
                <DataTable
                  data={filteredLogs}
                  columns={columns}
                  pageSize={20}
                  hideSearch={true}
                />
                {meta && meta.totalPages > 1 && (
                  <div className="flex justify-between items-center p-sm bg-surface-sunken border-t border-hairline">
                    <span className="text-body-sm text-muted">Showing {((page - 1) * 20) + 1} to {Math.min(page * 20, meta.total)} of {meta.total}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                      >
                        Prev
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={page === meta.totalPages}
                        onClick={() => handlePageChange(page + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
