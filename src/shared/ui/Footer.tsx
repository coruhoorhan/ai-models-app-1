import React from 'react';
import { cn } from '../lib/cn';

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("w-full border-t border-hairline bg-canvas flex flex-col items-center mt-auto", className)}>
      <div className="w-full max-w-[1440px] py-xl px-md lg:px-xl flex flex-col">
      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-xl">
        <div className="flex flex-col gap-md w-full max-w-[320px] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-ink rounded-sm flex items-center justify-center text-canvas font-bold text-lg">
              U
            </div>
            <span className="font-bold text-ink">UnoRouter</span>
          </div>
          <p className="text-body-sm text-subtle">
            217 models across 36+ providers, routed through one API key. High performance, zero hassle.
          </p>
        </div>
        
        <div className="flex gap-xl md:gap-xxl">
          <div className="flex flex-col gap-sm">
            <span className="text-label text-ink mb-2">PRODUCT</span>
            <a href="/models" className="text-body-sm text-subtle hover:text-ink transition-colors">Models</a>
            <a href="/pricing" className="text-body-sm text-subtle hover:text-ink transition-colors">Pricing</a>
            <a href="/rankings" className="text-body-sm text-subtle hover:text-ink transition-colors">Rankings</a>
            <a href="/dashboard" className="text-body-sm text-subtle hover:text-ink transition-colors">Dashboard</a>
          </div>
          
          <div className="flex flex-col gap-sm">
            <span className="text-label text-ink mb-2">DEVELOPERS</span>
            <a href="/docs" className="text-body-sm text-subtle hover:text-ink transition-colors">Documentation</a>
            <a href="/api" className="text-body-sm text-subtle hover:text-ink transition-colors">API Reference</a>
            <a href="/status" className="text-body-sm text-subtle hover:text-ink transition-colors">Service Status</a>
          </div>
          
          <div className="flex flex-col gap-sm">
            <span className="text-label text-ink mb-2">COMPANY</span>
            <a href="/about" className="text-body-sm text-subtle hover:text-ink transition-colors">About</a>
            <a href="/blog" className="text-body-sm text-subtle hover:text-ink transition-colors">Blog</a>
            <a href="/discord" className="text-body-sm text-subtle hover:text-ink transition-colors">Discord</a>
          </div>
        </div>
      </div>
      
      <div className="w-full mt-xl pt-lg border-t border-hairline flex flex-col md:flex-row items-center justify-between gap-md">
        <p className="text-body-sm text-subtle">© {new Date().getFullYear()} UnoRouter Inc. All rights reserved.</p>
        <div className="flex gap-md">
          <a href="/terms" className="text-body-sm text-subtle hover:text-ink transition-colors">Terms</a>
          <a href="/privacy" className="text-body-sm text-subtle hover:text-ink transition-colors">Privacy</a>
        </div>
      </div>
      </div>
    </footer>
  );
}
