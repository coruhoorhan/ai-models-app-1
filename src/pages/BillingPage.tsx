import React from 'react';
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout';
import { BillingOverview } from '../features/billing/components/BillingOverview';
import { PaymentMethods } from '../features/billing/components/PaymentMethods';
import { InvoiceHistory } from '../features/billing/components/InvoiceHistory';
import { SubscriptionPlan } from '../features/billing/components/SubscriptionPlan';
import { BillingDetailsForm } from '../features/billing/components/BillingDetailsForm';
import { Card } from '../shared/ui/Card';
import { CreditCard } from 'lucide-react';

export function BillingPage() {
  return (
    <DashboardLayout>
      <div className="w-full flex flex-col items-start">
        <div className="w-full max-w-[1200px] flex flex-col p-md lg:p-xl gap-xl">
          {/* Page Header */}
        <div className="flex flex-col gap-xs border-b border-hairline pb-md">
          <div className="flex items-center gap-xs mb-xs">
            <span className="w-2 h-2 rounded-full bg-live" />
            <span className="text-label text-subtle uppercase tracking-widest">FINANCIAL PROTOCOL</span>
          </div>
          <h1 className="text-heading-md text-ink">Billing & Invoices</h1>
          <p className="text-body-sm text-subtle max-w-[65ch] mt-xs">
            Manage your payment methods, monitor usage caps, and download past invoices. All transactions are securely processed.
          </p>
        </div>

        {/* Overview Row */}
        <BillingOverview />

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          <div className="lg:col-span-5 flex flex-col gap-xl">
            <SubscriptionPlan />
            
            <Card className="p-lg flex flex-col gap-md border-hairline bg-surface">
              <BillingDetailsForm />
            </Card>

            <Card className="p-lg flex flex-col gap-xl border-hairline bg-surface">
              <div className="flex items-center gap-md border-b border-hairline pb-md">
                <div className="w-10 h-10 rounded-sm border border-hairline bg-canvas text-ink flex items-center justify-center transition-transform hover:scale-105 duration-300">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-xs">
                  <h3 className="text-heading-sm text-ink">Payment Configuration</h3>
                  <p className="text-body-sm text-subtle">Update your billing details and active cards.</p>
                </div>
              </div>
              <PaymentMethods />
            </Card>
          </div>
          
          <div className="lg:col-span-7">
            <Card className="p-lg flex flex-col gap-md border-hairline bg-surface h-full">
              <InvoiceHistory />
            </Card>
          </div>
        </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
