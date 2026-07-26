import React from 'react';
import { LayoutGrid, Key, List, CreditCard, Gift, Settings, Activity, Box, MessageSquare, BookOpen, ExternalLink, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../../shared/lib/cn';

interface SidebarNavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
}

function SidebarNavItem({ icon: Icon, label, href }: SidebarNavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        'flex items-center gap-[12px] h-[40px] px-sm rounded-sm transition-colors text-body-sm group',
        isActive
          ? 'bg-white/10 text-white'
          : 'text-subtle hover:text-white hover:bg-white/5'
      )}
    >
      <Icon className={cn('w-4 h-4', isActive ? 'text-chart-teal' : 'text-subtle group-hover:text-white')} />
      <span>{label}</span>
    </Link>
  );
}

export function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "w-[260px] h-full bg-sidebar flex flex-col flex-shrink-0 z-50 transition-transform duration-200",
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
          <SidebarNavItem icon={LayoutGrid} label="Dashboard" href="/dashboard" />
          <SidebarNavItem icon={Key} label="API Keys" href="/keys" />
          <SidebarNavItem icon={List} label="Usage Logs" href="/logs" />
          <SidebarNavItem icon={CreditCard} label="Billing" href="/billing" />
          <SidebarNavItem icon={Gift} label="Affiliate" href="/affiliate" />
          <SidebarNavItem icon={Settings} label="Settings" href="/settings" />
        </div>

        <div className="h-px bg-white/10 my-md mx-sm" />

        {/* Secondary Group */}
        <div className="flex flex-col gap-1">
          <span className="text-label text-subtle mt-sm mb-xs px-sm">NAVIGATE</span>
          <SidebarNavItem icon={Box} label="Models" href="/models" />
          <SidebarNavItem icon={Activity} label="Rankings" href="/rankings" />
          <SidebarNavItem icon={LayoutGrid} label="Inspector" href="/inspector" />
          <SidebarNavItem icon={CreditCard} label="Pricing" href="/pricing" />
          <SidebarNavItem icon={MessageSquare} label="Chat" href="/chat" />
          <SidebarNavItem icon={BookOpen} label="Docs" href="/docs" />
        </div>
      </div>

      {/* Bottom */}
      <div className="p-md border-t border-white/10">
        <div className="flex items-center justify-between px-sm py-xs rounded-sm hover:bg-white/5 cursor-pointer">
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
