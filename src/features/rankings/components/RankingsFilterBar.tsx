import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SegmentedTab } from '../../../shared/ui/SegmentedTab';
import { CategoryOption } from '../types';

export function RankingsFilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = (searchParams.get('category') as CategoryOption) || 'all';

  const handleCategoryChange = (id: string) => {
    setSearchParams((prev) => {
      prev.set('category', id);
      return prev;
    });
  };

  const tabs = [
    { id: 'all', label: 'All Models' },
    { id: 'llm', label: 'LLMs (Text)' },
    { id: 'image', label: 'Vision / Image' },
    { id: 'audio', label: 'Audio / Voice' }
  ];

  return (
    <div className="w-full flex items-center justify-between mb-xl">
      <div>
        <h1 className="text-display-sm font-semibold tracking-tight text-ink mb-xxs">
          Global Leaderboard
        </h1>
        <p className="text-body-md text-subtle">
          Real-time ELO ratings based on millions of arena battles.
        </p>
      </div>
      
      <div className="hidden md:block">
        <SegmentedTab 
          tabs={tabs} 
          activeTab={currentCategory} 
          onChange={handleCategoryChange} 
        />
      </div>
      
      {/* Mobile filter view could go here, for now it's just horizontal scroll on segmented tab or similar if needed */}
      <div className="md:hidden w-full overflow-x-auto mt-md">
         <SegmentedTab 
          tabs={tabs} 
          activeTab={currentCategory} 
          onChange={handleCategoryChange} 
        />
      </div>
    </div>
  );
}
