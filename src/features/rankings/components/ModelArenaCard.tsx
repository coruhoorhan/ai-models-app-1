import React from 'react';
import { Zap } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { cn } from '../../../shared/lib/cn';

interface ModelArenaCardProps {
  labelUnrevealed: string;
  labelRevealed: string;
  output: string;
  isRevealed: boolean;
  isBattling: boolean;
  isSelected: boolean;
  speed: string;
  speedColorClass: string;
  onVote: () => void;
}

export function ModelArenaCard({
  labelUnrevealed,
  labelRevealed,
  output,
  isRevealed,
  isBattling,
  isSelected,
  speed,
  speedColorClass,
  onVote
}: ModelArenaCardProps) {
  return (
    <div className={cn(
      "p-md rounded-sm border flex flex-col justify-between min-h-[160px]",
      isRevealed && isSelected ? 'border-live bg-live/5' : 'border-hairline bg-canvas'
    )}>
      <div>
        <div className="flex items-center justify-between mb-xs pb-xs border-b border-hairline">
          <span className="text-label text-subtle font-mono">
            {isRevealed ? labelRevealed : labelUnrevealed}
          </span>
          <span className={cn("text-label flex items-center gap-xs font-mono", speedColorClass)}>
            <Zap className="w-3 h-3" /> {speed}
          </span>
        </div>
        <pre className="text-body-sm font-mono text-ink whitespace-pre-wrap">{output}</pre>
      </div>
      
      {!isRevealed && !isBattling && output && (
        <Button 
          variant="secondary" 
          className="mt-md w-full justify-center text-body-sm"
          onClick={onVote}
        >
          Vote {labelUnrevealed.split(' ')[0]} {labelUnrevealed.split(' ')[1]} as Winner
        </Button>
      )}
    </div>
  );
}
