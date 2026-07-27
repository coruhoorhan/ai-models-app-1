import { DashboardLayout } from '../features/dashboard/components/DashboardLayout';
import { AffiliateStatsRow } from '../features/affiliate/components/AffiliateStatsRow';
import { ReferralLinkCard } from '../features/affiliate/components/ReferralLinkCard';
import { ReferralsTable } from '../features/affiliate/components/ReferralsTable';
import { Badge } from '../shared/ui/Badge';

export function AffiliatePage() {
  return (
    <DashboardLayout>
      <div className="w-full flex flex-col items-start">
        <div className="w-full max-w-[1200px] flex flex-col p-md lg:p-xl gap-xl">
          {/* Page Header */}
          <div className="flex flex-col gap-xs border-b border-hairline pb-md">
            <div className="flex items-center gap-sm">
              <Badge variant="status-live" label="PARTNERSHIP PROTOCOL" showDot={true} />
            </div>
            <h1 className="text-heading-md text-ink mt-sm m-0">Affiliate Program</h1>
            <p className="text-body text-muted m-0">
              Invite developers to UnoRouter and earn a percentage of their API usage for the first year.
            </p>
          </div>

          <AffiliateStatsRow />
          
          <ReferralLinkCard />
          
          <ReferralsTable />
          
        </div>
      </div>
    </DashboardLayout>
  );
}
