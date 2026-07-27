import React, { useState } from 'react';
import { Download, FileText, Search } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';

const INVOICES = [
  { id: 'INV-2026-007', date: 'Jul 1, 2026', amount: 450.20, status: 'paid' },
  { id: 'INV-2026-006', date: 'Jun 1, 2026', amount: 380.00, status: 'paid' },
  { id: 'INV-2026-005', date: 'May 1, 2026', amount: 410.50, status: 'paid' },
  { id: 'INV-2026-004', date: 'Apr 1, 2026', amount: 312.00, status: 'paid' },
];

export function InvoiceHistory() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = INVOICES.filter(i => i.id.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col gap-md">
      <div className="flex items-center justify-between border-b border-hairline pb-xs mb-xs">
        <span className="text-label text-subtle">INVOICE HISTORY</span>
        <div className="relative w-48">
          <Search className="w-3.5 h-3.5 text-subtle absolute left-sm top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-sunken border border-hairline rounded-sm pl-xl pr-xs py-xs text-body-sm text-ink outline-none focus:border-ink transition-colors"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-hairline">
              <th className="py-sm px-xs text-label text-subtle font-normal">INVOICE ID</th>
              <th className="py-sm px-xs text-label text-subtle font-normal">DATE</th>
              <th className="py-sm px-xs text-label text-subtle font-normal">AMOUNT</th>
              <th className="py-sm px-xs text-label text-subtle font-normal">STATUS</th>
              <th className="py-sm px-xs text-label text-subtle font-normal text-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-xl text-center text-body-sm text-subtle">
                  No invoices found matching "{searchTerm}"
                </td>
              </tr>
            ) : (
              filtered.map((inv) => (
              <tr key={inv.id} className="border-b border-hairline last:border-0 hover:bg-surface-sunken transition-colors group">
                <td className="py-md px-xs">
                  <div className="flex items-center gap-xs">
                    <FileText className="w-3.5 h-3.5 text-subtle group-hover:text-ink transition-colors" />
                    <span className="text-mono-inline text-ink">{inv.id}</span>
                  </div>
                </td>
                <td className="py-md px-xs text-body-sm text-subtle">{inv.date}</td>
                <td className="py-md px-xs text-mono-inline text-ink">${inv.amount.toFixed(2)}</td>
                <td className="py-md px-xs">
                  <span className="text-mono-inline bg-chart-teal/10 text-chart-teal border border-chart-teal/30 px-xs py-[2px] rounded-xs uppercase">
                    {inv.status}
                  </span>
                </td>
                <td className="py-md px-xs text-right">
                  <Button variant="secondary" size="sm" icon={Download} className="opacity-0 group-hover:opacity-100 transition-opacity">
                    PDF
                  </Button>
                </td>
              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
