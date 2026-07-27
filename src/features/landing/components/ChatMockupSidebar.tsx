import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';

interface ChatMockupSidebarProps {
  onReset: () => void;
}

export function ChatMockupSidebar({ onReset }: ChatMockupSidebarProps) {
  return (
    <div className="hidden sm:flex w-48 border-r border-hairline bg-surface flex-col">
      <div className="p-md border-b border-hairline flex items-center gap-sm">
        <div className="w-6 h-6 bg-ink rounded-sm flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-canvas" />
        </div>
        <span className="text-body font-bold text-ink tracking-tight">Chat Sandbox</span>
      </div>
      <div className="p-sm">
        <Button 
          variant="secondary" 
          className="w-full justify-start text-body-sm h-8 px-sm"
          onClick={onReset}
        >
          + Reset Chat
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto px-sm py-xs flex flex-col gap-xxs">
        {[
          { name: 'Throttle request', active: true, color: 'bg-chart-teal' },
          { name: 'Model benchmarking', active: false, color: 'bg-chart-purple' },
          { name: 'Code optimization', active: false, color: 'bg-chart-pink' }
        ].map((chat, i) => (
          <div key={i} className={`flex items-center gap-xs px-sm py-xs rounded-sm cursor-pointer transition-colors ${chat.active ? 'bg-surface-sunken' : 'hover:bg-surface-sunken'}`}>
            <span className={`w-2 h-2 rounded-full ${chat.color}`} />
            <span className="text-body-sm text-ink truncate">{chat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
