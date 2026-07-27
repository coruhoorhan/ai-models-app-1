import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { cn } from '../lib/cn';
import { Button } from './Button';

export interface ColumnDef<T> {
  key: keyof T | string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
  className?: string;
  hideSearch?: boolean;
}

export function DataTable<T>({ data, columns, pageSize = 10, className, hideSearch = false }: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    const safeData = Array.isArray(data) ? data : [];
    if (!searchTerm) return safeData;
    const lowerSearch = searchTerm.toLowerCase();
    return safeData.filter((item) => {
      // Basic text search across object values
      return Object.values(item as Record<string, unknown>).some(
        (val) => typeof val === 'string' && val.toLowerCase().includes(lowerSearch)
      );
    });
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  return (
    <div className={cn('w-full flex flex-col', className)}>
      {/* Table Header Controls */}
      {!hideSearch && (
        <div className="flex items-center justify-between mb-md">
          <div className="relative w-full max-w-[280px]">
            <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-muted" />
            </div>
            <input
              type="text"
              className="w-full bg-surface-sunken border border-hairline rounded-sm py-xs pl-[32px] pr-sm text-body-sm text-ink outline-none focus:border-chart-teal transition-colors"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="w-full overflow-x-auto border border-hairline rounded-sm bg-canvas">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-hairline bg-surface">
              {columns.map((col, index) => (
                <th key={String(col.key) + index} className="py-sm px-md text-label text-subtle font-medium whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-hairline last:border-b-0 hover:bg-surface-sunken transition-colors">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="py-sm px-md text-body-sm text-ink whitespace-nowrap">
                      {col.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-xl text-center text-body-sm text-muted">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-md gap-sm">
          <span className="text-body-sm text-muted">
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredData.length)} of {filteredData.length} entries
          </span>
          <div className="flex items-center gap-xs">
            <Button
              variant="tertiary"
              icon={ChevronLeft}
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 px-0 border border-hairline bg-surface"
            />
            <span className="text-body-sm text-ink px-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="tertiary"
              icon={ChevronRight}
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-8 h-8 px-0 border border-hairline bg-surface"
            />
          </div>
        </div>
      )}
    </div>
  );
}
