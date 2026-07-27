import React from 'react';
import { Menu, Bell, Globe, User } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { ThemeToggle } from '../../../shared/ui/ThemeToggle';

export function DashboardTopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="h-[64px] border-b border-hairline bg-canvas flex items-center justify-between px-md lg:px-lg sticky top-0 z-index-sticky">
      <div className="flex items-center">
        <Button variant="tertiary" icon={Menu} onClick={onMenuClick} className="lg:hidden mr-md border-transparent hover:bg-surface w-10 h-10 px-0" />
      </div>

      <div className="flex items-center gap-md">
        <button className="text-muted hover:text-ink transition-fast focus-ring rounded-sm">
          <Bell className="w-5 h-5" />
        </button>
        <button className="text-muted hover:text-ink transition-fast focus-ring rounded-sm">
          <Globe className="w-5 h-5" />
        </button>
        <ThemeToggle />
        <div className="w-8 h-8 rounded-full bg-surface border border-hairline flex items-center justify-center text-ink cursor-pointer hover:bg-surface-sunken transition-fast focus-ring" tabIndex={0} role="button" aria-label="User profile">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
