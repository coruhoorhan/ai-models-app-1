import React from 'react';
import { CreditCard, Plus } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';

export function PaymentMethods() {
  return (
    <div className="flex flex-col gap-md">
      <div className="flex items-center justify-between border-b border-hairline pb-xs mb-xs">
        <span className="text-label text-subtle">PAYMENT METHODS</span>
        <Button variant="secondary" size="sm" icon={Plus}>Add Method</Button>
      </div>

      <div className="flex flex-col gap-sm">
        {/* Default Card */}
        <div className="p-md bg-surface border border-hairline rounded-sm flex items-center justify-between group hover:border-ink/30 transition-colors">
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 bg-canvas border border-hairline rounded-sm flex items-center justify-center text-ink">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-xs">
              <div className="flex items-center gap-xs">
                <span className="text-body-sm font-bold text-ink">Mastercard ending in 4242</span>
                <span className="text-mono-inline bg-ink/5 px-xs py-[2px] rounded-xs text-subtle border border-hairline">DEFAULT</span>
              </div>
              <span className="text-body-sm text-subtle">Expires 12/28</span>
            </div>
          </div>
          <Button variant="secondary" size="sm">Edit</Button>
        </div>

        {/* Backup Card */}
        <div className="p-md bg-canvas border border-hairline rounded-sm flex items-center justify-between group hover:border-ink/30 transition-colors">
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 bg-canvas border border-hairline rounded-sm flex items-center justify-center text-subtle">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-xs">
              <span className="text-body-sm font-bold text-ink">Visa ending in 1234</span>
              <span className="text-body-sm text-subtle">Expires 09/27</span>
            </div>
          </div>
          <Button variant="secondary" size="sm">Make Default</Button>
        </div>
      </div>
    </div>
  );
}
