import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/cn';
import { SidebarNavItemProps } from '../../types';

export function SidebarNavItem({ icon: Icon, label, href, isActive: propIsActive, section }: SidebarNavItemProps) {
  const location = useLocation();
  const isActive = propIsActive !== undefined ? propIsActive : location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        'flex items-center gap-[12px] h-[40px] px-sm rounded-sm transition-fast text-body-sm group focus-ring',
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
