import React from 'react';
import { Search } from 'lucide-react';

import { useModels } from '../hooks/useModels';

interface ModelsFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  providerFilter: string;
  setProviderFilter: (provider: string) => void;
  tierFilter: string;
  setTierFilter: (tier: string) => void;
  sortFilter: string;
  setSortFilter: (sort: string) => void;
}

export function ModelsFilterBar({
  searchQuery,
  setSearchQuery,
  providerFilter,
  setProviderFilter,
  tierFilter,
  setTierFilter,
  sortFilter,
  setSortFilter
}: ModelsFilterBarProps) {
  const { providers } = useModels();

  return (
    <div className="flex flex-col md:flex-row items-center gap-md">
      <div className="relative flex-1 w-full">
        <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-muted" />
        </div>
        <input
          type="text"
          className="w-full bg-surface-sunken border border-hairline rounded-sm py-[6px] pl-[32px] pr-sm text-body-sm text-ink outline-none focus:border-chart-teal transition-colors"
          placeholder="Search models..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-sm w-full md:w-auto">
        <select 
          className="bg-surface-sunken border border-hairline rounded-sm py-[6px] px-sm text-body-sm text-ink outline-none"
          value={providerFilter}
          onChange={(e) => setProviderFilter(e.target.value)}
        >
          <option value="All">All Providers</option>
          {providers.map(provider => (
            <option key={provider} value={provider}>{provider}</option>
          ))}
        </select>
        <select 
          className="bg-surface-sunken border border-hairline rounded-sm py-[6px] px-sm text-body-sm text-ink outline-none"
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
        >
          <option value="All">All Tiers</option>
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>
        <select
          className="bg-surface-sunken border border-hairline rounded-sm py-[6px] px-sm text-body-sm text-ink outline-none"
          value={sortFilter}
          onChange={(e) => setSortFilter(e.target.value)}
        >
          <option value="popular">Popular</option>
          <option value="newest">Newest</option>
          <option value="price">Price</option>
        </select>
      </div>
    </div>
  );
}
