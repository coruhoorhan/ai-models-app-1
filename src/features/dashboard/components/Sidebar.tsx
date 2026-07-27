import React from 'react';
import { LayoutGrid, Key, List, CreditCard, Gift, Settings, Activity, Box, MessageSquare, BookOpen, ExternalLink, Menu } from 'lucide-react';
import { cn } from '../../../shared/lib/cn';
import { SidebarNavItem } from '../../../shared/ui/SidebarNavItem';

export function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-index-overlay lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "w-[260px] h-full bg-sidebar flex flex-col flex-shrink-0 z-index-overlay transition-transform duration-200",
        "fixed lg:static top-0 left-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Top: Logo */}
        <div className="h-[64px] flex items-center px-lg border-b border-white/10">
        <div className="flex items-center gap-sm">
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
            <Menu className="w-5 h-5 text-sidebar" />
          </div>
          <span className="text-heading-sm tracking-tight text-white">UnoRouter</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-md px-md flex flex-col">
        {/* Primary Group */}
        <div className="flex flex-col gap-1">
          <span className="text-label text-subtle mt-md mb-xs px-sm">MENU</span>
          <SidebarNavItem icon={LayoutGrid} label="Dashboard" href="/dashboard" section="primary" />
          <SidebarNavItem icon={Key} label="API Keys" href="/keys" section="primary" />
          <SidebarNavItem icon={List} label="Usage Logs" href="/logs" section="primary" />
          <SidebarNavItem icon={CreditCard} label="Billing" href="/billing" section="primary" />
          <SidebarNavItem icon={Gift} label="Affiliate" href="/affiliate" section="primary" />
          <SidebarNavItem icon={Settings} label="Settings" href="/settings" section="primary" />
        </div>

        <div className="h-px bg-white/10 my-md mx-sm" />

        {/* Secondary Group */}
        <div className="flex flex-col gap-1">
          <span className="text-label text-subtle mt-sm mb-xs px-sm">NAVIGATE</span>
          <SidebarNavItem icon={Box} label="Models" href="/models" section="secondary" />
          <SidebarNavItem icon={Activity} label="Rankings" href="/rankings" section="secondary" />
          <SidebarNavItem icon={LayoutGrid} label="Inspector" href="/inspector" section="secondary" />
          <SidebarNavItem icon={CreditCard} label="Pricing" href="/pricing" section="secondary" />
          <SidebarNavItem icon={MessageSquare} label="Chat" href="/chat" section="secondary" />
          <SidebarNavItem icon={BookOpen} label="Docs" href="/docs" section="secondary" />
        </div>
      </div>

      {/* Bottom */}
      <div className="p-md border-t border-white/10">
        <div className="flex items-center justify-between px-sm py-xs rounded-sm hover:bg-white/5 cursor-pointer transition-fast focus-ring" tabIndex={0} role="button">
          <div className="flex items-center gap-xs">
            <span className="w-2 h-2 rounded-full bg-live" />
            <span className="text-body-sm text-subtle">Status</span>
          </div>
          <ExternalLink className="w-4 h-4 text-subtle" />
        </div>
      </div>
    </aside>
    </>
  );
}
