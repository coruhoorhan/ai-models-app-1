import { StatCard } from '../../../shared/ui/StatCard';
import { DollarSign, Users, Target, Activity } from 'lucide-react';

export function AffiliateStatsRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-hairline rounded-md overflow-hidden bg-canvas">
      <div className="border-b md:border-b-0 md:border-r border-hairline">
        <StatCard
          className="border-none rounded-none shadow-none"
          icon={DollarSign}
          iconColor="live"
          label="TOTAL EARNINGS"
          value="$1,248.50"
          description="Lifetime commission earned"
        />
      </div>
      
      <div className="border-b lg:border-b-0 lg:border-r border-hairline">
        <StatCard
          className="border-none rounded-none shadow-none"
          icon={Activity}
          iconColor="chart-orange"
          label="PENDING PAYOUT"
          value="$342.00"
          description="To be paid next cycle"
        />
      </div>
      
      <div className="border-b md:border-b-0 md:border-r border-hairline">
        <StatCard
          className="border-none rounded-none shadow-none"
          icon={Users}
          iconColor="chart-blue"
          label="ACTIVE REFERRALS"
          value="128"
          description="Users currently billed"
        />
      </div>
      
      <div>
        <StatCard
          className="border-none rounded-none shadow-none"
          icon={Target}
          iconColor="chart-purple"
          label="CONVERSION RATE"
          value="14.2%"
          description="Visits to signups"
        />
      </div>
    </div>
  );
}
