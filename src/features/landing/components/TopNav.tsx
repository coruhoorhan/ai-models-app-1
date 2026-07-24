import React from 'react';
import { Bell, Globe, User, Command } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../../shared/lib/cn';
import { Button } from '../../../shared/ui/Button';
import { ThemeToggle } from '../../../shared/ui/ThemeToggle';

import { NotificationBell } from '../../../shared/ui/NotificationBell';
import { AnimatedGithubIcon, AnimatedGlobeIcon, AnimatedUserIcon } from '../../../shared/ui/AnimatedIcons';

export function TopNav() {
  return (
    <nav className="w-full h-[64px] bg-canvas border-b border-hairline flex justify-center sticky top-0 z-50">
      <div className="w-full max-w-[1440px] h-full flex items-center justify-between px-md lg:px-xl">
        {/* Left: Logo + Wordmark */}
        <div className="flex items-center gap-sm">
        <div className="w-8 h-8 bg-ink rounded-sm flex items-center justify-center">
          <Command className="w-5 h-5 text-canvas" />
        </div>
        <span className="text-heading-sm tracking-tight text-ink">UnoRouter</span>
      </div>

      {/* Center: Links */}
      <div className="hidden md:flex items-center gap-lg">
        {['DASHBOARD', 'MODELS', 'RANKINGS', 'PRICING', 'CHAT', 'DOCS'].map((link) => (
          <Link
            key={link}
            to={link === 'DASHBOARD' ? '/dashboard' : `/${link.toLowerCase()}`}
            className="text-body-sm text-muted hover:text-ink tracking-[0.02em] font-medium transition-colors uppercase"
          >
            {link}
          </Link>
        ))}
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-sm">
        <AnimatedGithubIcon />
        <NotificationBell />
        <AnimatedGlobeIcon />
        <ThemeToggle />
        <AnimatedUserIcon />
      </div>
      </div>
    </nav>
  );
}
