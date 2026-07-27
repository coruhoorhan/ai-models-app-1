import React from 'react';
import { Zap, Shield, Lock, Search, BookOpen } from 'lucide-react';
import { DocCategory } from '../../../types';

interface DocsSidebarProps {
  categories: DocCategory[];
  activeArticleId: string;
  onSelectArticle: (articleId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function DocsSidebar({
  categories,
  activeArticleId,
  onSelectArticle,
  searchQuery,
  onSearchChange,
}: DocsSidebarProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap': return <Zap className="w-4 h-4 text-chart-teal" />;
      case 'Shield': return <Shield className="w-4 h-4 text-chart-blue" />;
      case 'Lock': return <Lock className="w-4 h-4 text-chart-pink" />;
      default: return <BookOpen className="w-4 h-4 text-ink" />;
    }
  };

  return (
    <aside className="w-full lg:w-[280px] bg-canvas border border-hairline rounded-md p-md flex flex-col gap-md shrink-0">
      {/* Search Input */}
      <div className="bg-surface-sunken border border-hairline rounded-sm h-[36px] flex items-center px-sm gap-xs">
        <Search className="w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Filter documentation..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-body-sm text-ink placeholder:text-muted font-sans"
        />
      </div>

      {/* Categories List */}
      <div className="flex flex-col gap-md">
        {categories.map((cat) => {
          const filteredArticles = cat.articles.filter((art) =>
            art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            art.content.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (searchQuery && filteredArticles.length === 0) return null;

          return (
            <div key={cat.id} className="flex flex-col gap-xs">
              <div className="flex items-center gap-xs px-xs py-xxs font-bold text-body-sm text-ink border-b border-hairline pb-xs">
                {getIcon(cat.iconName)}
                <span>{cat.title}</span>
              </div>

              <div className="flex flex-col gap-xxs pl-xs">
                {filteredArticles.map((art) => {
                  const isActive = art.id === activeArticleId;
                  return (
                    <button
                      key={art.id}
                      onClick={() => onSelectArticle(art.id)}
                      className={`text-left text-body-sm px-sm py-xs rounded-xs transition-colors ${
                        isActive
                          ? 'bg-ink text-canvas font-bold shadow-xs'
                          : 'text-muted hover:text-ink hover:bg-surface'
                      }`}
                    >
                      {art.title}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
