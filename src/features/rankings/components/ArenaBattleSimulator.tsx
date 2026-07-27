import React, { useState } from 'react';
import { Swords, RotateCcw, Trophy } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';
import { ModelArenaCard } from './ModelArenaCard';

export function ArenaBattleSimulator() {
  const [prompt, setPrompt] = useState('Write a concise Python function to calculate the Fibonacci sequence with memoization.');
  const [isBattling, setIsBattling] = useState(false);
  const [outputA, setOutputA] = useState('');
  const [outputB, setOutputB] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [userVote, setUserVote] = useState<'A' | 'B' | 'Tie' | null>(null);

  const samplePrompts = [
    'Write a concise Python function to calculate Fibonacci.',
    'Explain quantum entanglement in 2 sentences.',
    'Compare PostgreSQL vs MongoDB for high-write workloads.'
  ];

  const handleStartBattle = () => {
    if (!prompt.trim() || isBattling) return;
    setIsBattling(true);
    setOutputA('');
    setOutputB('');
    setIsRevealed(false);
    setUserVote(null);

    const fullA = `def fib(n, memo={}):\n    if n in memo: return memo[n]\n    if n <= 1: return n\n    memo[n] = fib(n-1, memo) + fib(n-2, memo)\n    return memo[n]`;
    const fullB = `from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fibonacci(n: int) -> int:\n    return n if n < 2 else fibonacci(n - 1) + fibonacci(n - 2)`;
    
    let indexA = 0;
    let indexB = 0;
    const interval = setInterval(() => {
      indexA += 4;
      indexB += 3;
      if (indexA <= fullA.length) setOutputA(fullA.slice(0, indexA));
      if (indexB <= fullB.length) setOutputB(fullB.slice(0, indexB));
      
      if (indexA >= fullA.length && indexB >= fullB.length) {
        clearInterval(interval);
        setIsBattling(false);
      }
    }, 35);
  };

  const handleVote = (choice: 'A' | 'B' | 'Tie') => {
    setUserVote(choice);
    setIsRevealed(true);
  };

  return (
    <Card className="w-full p-xl border-hairline bg-surface/50 flex flex-col gap-lg my-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md border-b border-hairline pb-md">
        <div className="flex items-center gap-sm">
          <div className="p-sm rounded-sm bg-ink text-canvas">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-xs">
              <h3 className="text-heading-sm text-ink">Blind Arena Battle Simulator</h3>
              <Badge variant="status-live" label="Interactive" />
            </div>
            <p className="text-body-sm text-muted">Test 2 anonymous models side-by-side and vote on response quality.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-xs flex-wrap">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setPrompt(p)}
              className="text-label font-medium px-sm py-xs rounded-full border border-hairline bg-canvas hover:bg-surface-sunken text-ink transition-colors truncate max-w-[180px]"
            >
              Prompt #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Input & Action */}
      <div className="flex flex-col sm:flex-row items-stretch gap-sm">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt to pit models against each other..."
          className="flex-1 bg-canvas border border-hairline rounded-sm px-md py-sm text-body-sm text-ink outline-none focus:border-ink"
        />
        <Button 
          variant="primary" 
          icon={Swords} 
          disabled={isBattling || !prompt.trim()} 
          onClick={handleStartBattle}
          className="shrink-0"
        >
          {isBattling ? 'Battling Models...' : 'Run Arena Battle'}
        </Button>
      </div>

      {/* Outputs Side-by-Side */}
      {(outputA || outputB || isBattling) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md animate-in fade-in duration-200">
          <ModelArenaCard
            labelUnrevealed="MODEL A (Anonymous)"
            labelRevealed="Claude 3.5 Sonnet (Elo: 1279)"
            output={outputA}
            isRevealed={isRevealed}
            isBattling={isBattling}
            isSelected={userVote === 'A'}
            speed="112 tok/s"
            speedColorClass="text-chart-teal"
            onVote={() => handleVote('A')}
          />
          <ModelArenaCard
            labelUnrevealed="MODEL B (Anonymous)"
            labelRevealed="GPT-4o (Elo: 1287)"
            output={outputB}
            isRevealed={isRevealed}
            isBattling={isBattling}
            isSelected={userVote === 'B'}
            speed="135 tok/s"
            speedColorClass="text-chart-blue"
            onVote={() => handleVote('B')}
          />
        </div>
      )}

      {/* Reveal Banner */}
      {isRevealed && (
        <div className="p-md rounded-sm bg-live/10 border border-live/30 flex items-center justify-between gap-md animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-sm">
            <Trophy className="w-5 h-5 text-live shrink-0" />
            <div>
              <span className="text-body-sm font-bold text-ink">
                Identity Revealed! You voted: {userVote === 'A' ? 'Model A (Claude 3.5 Sonnet)' : userVote === 'B' ? 'Model B (GPT-4o)' : 'Tie'}
              </span>
              <p className="text-body-sm text-muted">Your vote was aggregated into our global blind arena Elo ratings.</p>
            </div>
          </div>
          <Button variant="secondary" icon={RotateCcw} onClick={handleStartBattle}>
            Next Round
          </Button>
        </div>
      )}
    </Card>
  );
}
