import { useState } from 'react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Copy, Link as LinkIcon, Check } from 'lucide-react';
import { cn } from '../../../shared/lib/cn';

export function ReferralLinkCard() {
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://unorouter.dev/ref/user_9a7b8c6';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-xl bg-canvas border border-hairline flex flex-col md:flex-row gap-xl items-start md:items-center justify-between">
      <div className="flex flex-col gap-sm flex-1">
        <div className="flex items-center gap-xs text-live">
          <LinkIcon className="w-5 h-5" />
          <h2 className="text-heading-sm text-ink m-0">Your Referral Link</h2>
        </div>
        <p className="text-body text-muted m-0 max-w-[600px]">
          Share this link to earn a <strong className="text-ink font-bold">20% recurring commission</strong> on all API usage for the first 12 months of every new user you refer.
        </p>
      </div>

      <div className="w-full md:w-auto flex flex-col gap-xs shrink-0">
        <span className="text-label text-subtle uppercase">Unique Tracking URL</span>
        <div className="flex items-center w-full md:w-[400px]">
          <div className="flex-1 bg-surface-sunken border border-hairline rounded-l-sm px-md py-sm overflow-hidden whitespace-nowrap">
            <span className="text-mono-inline text-ink">{referralLink}</span>
          </div>
          <Button 
            variant="secondary"
            className={cn(
              "rounded-l-none border-l-0 h-[42px] px-lg min-w-[100px]",
              copied ? "text-live border-live bg-live-bg" : ""
            )}
            onClick={handleCopy}
            icon={copied ? Check : Copy}
            iconPosition="leading"
          >
            {copied ? 'COPIED' : 'COPY'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
