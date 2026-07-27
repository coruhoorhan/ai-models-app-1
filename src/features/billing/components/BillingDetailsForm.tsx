import React from 'react';
import { Building2, Save } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';

export function BillingDetailsForm() {
  return (
    <div className="flex flex-col gap-md">
      <div className="flex items-center justify-between border-b border-hairline pb-xs mb-xs">
        <span className="text-label text-subtle">COMPANY & TAX DETAILS</span>
        <Building2 className="w-4 h-4 text-subtle" />
      </div>

      <form className="flex flex-col gap-md flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="flex flex-col gap-sm">
            <label className="text-body-sm text-ink font-bold">Company Name</label>
            <input type="text" defaultValue="Acme Corp" className="bg-canvas border border-hairline rounded-sm px-md h-[40px] text-body-sm text-ink outline-none focus:border-ink transition-colors" />
          </div>
          <div className="flex flex-col gap-sm">
            <label className="text-body-sm text-ink font-bold">VAT / Tax ID</label>
            <input type="text" defaultValue="TR1234567890" className="bg-canvas border border-hairline rounded-sm px-md h-[40px] text-body-sm text-mono-inline text-ink outline-none focus:border-ink transition-colors" />
          </div>
        </div>
        
        <div className="flex flex-col gap-sm">
          <label className="text-body-sm text-ink font-bold">Billing Email</label>
          <input type="email" defaultValue="billing@acmecorp.com" className="bg-canvas border border-hairline rounded-sm px-md h-[40px] text-body-sm text-ink outline-none focus:border-ink transition-colors" />
        </div>

        <div className="flex flex-col gap-sm">
          <label className="text-body-sm text-ink font-bold">Billing Address</label>
          <textarea defaultValue="123 Innovation Dr.&#10;Suite 400&#10;San Francisco, CA 94103" rows={3} className="bg-canvas border border-hairline rounded-sm p-sm text-body-sm text-ink outline-none focus:border-ink transition-colors resize-none" />
        </div>

        <div className="pt-sm mt-auto border-t border-hairline flex justify-end">
          <Button type="button" variant="secondary" size="sm" icon={Save}>Save Details</Button>
        </div>
      </form>
    </div>
  );
}
