import { DataTable } from '../../../shared/ui/DataTable';
import { Badge } from '../../../shared/ui/Badge';

interface ReferralRecord {
  id: string;
  user: string;
  joinDate: string;
  status: 'active' | 'pending';
  revenue: string;
}

const mockReferrals: ReferralRecord[] = [
  { id: '1', user: 'a***@gmail.com', joinDate: '2023-10-12', status: 'active', revenue: '$345.00' },
  { id: '2', user: 'c***@company.io', joinDate: '2023-10-15', status: 'active', revenue: '$1,204.50' },
  { id: '3', user: 'm***@startup.co', joinDate: '2023-10-21', status: 'pending', revenue: '$0.00' },
  { id: '4', user: 'd***@dev.net', joinDate: '2023-10-28', status: 'active', revenue: '$42.00' },
  { id: '5', user: 's***@enterprise.com', joinDate: '2023-11-02', status: 'pending', revenue: '$0.00' },
];

export function ReferralsTable() {
  const columns = [
    { key: 'user', header: 'USER', cell: (row: any) => row.user },
    { key: 'joinDate', header: 'JOIN DATE', cell: (row: any) => row.joinDate },
    { key: 'status', header: 'STATUS', cell: (row: any) => row.status },
    { key: 'revenue', header: 'REVENUE GENERATED', cell: (row: any) => row.revenue },
  ];

  // We map the raw data into formatted React nodes for the table
  const formattedRows = mockReferrals.map((row) => ({
    ...row,
    user: <span className="font-medium text-ink">{row.user}</span>,
    joinDate: <span className="text-body-sm text-muted">{row.joinDate}</span>,
    status: row.status === 'active' 
      ? <Badge variant="status-live" label="ACTIVE" showDot={true} /> 
      : <Badge variant="category" label="PENDING" />,
    revenue: <span className="text-mono-inline text-ink">{row.revenue}</span>,
  }));

  return (
    <div className="flex flex-col gap-sm">
      <h3 className="text-heading-sm text-ink m-0">Recent Referrals</h3>
      <div className="w-full">
        <DataTable columns={columns} data={formattedRows} />
      </div>
    </div>
  );
}
