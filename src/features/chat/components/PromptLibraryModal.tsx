import React, { useState } from 'react';
import { X, Sparkles, BookOpen, ArrowRight, Search } from 'lucide-react';
import { PROMPT_TEMPLATES } from '../data/promptTemplates';
import { PromptTemplate } from '../types';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';

interface PromptLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (promptText: string) => void;
}

export function PromptLibraryModal({ isOpen, onClose, onSelectPrompt }: PromptLibraryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories = ['All', 'Coding', 'Architecture', 'Refactoring', 'Analysis'];

  const filtered = PROMPT_TEMPLATES.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-ink/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-canvas border border-hairline rounded-lg w-full max-w-[680px] max-h-[85vh] overflow-y-auto p-xl shadow-2xl flex flex-col gap-lg relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-hairline pb-md">
          <div className="flex items-center gap-sm">
            <div className="p-sm rounded-sm bg-ink text-canvas">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-heading-sm text-ink">Prompt Preset Library</h2>
              <p className="text-body-sm text-muted">Select a pre-configured engineering prompt to inject into chat.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-sm hover:bg-surface flex items-center justify-center text-muted hover:text-ink"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories */}
        <div className="flex flex-col gap-sm">
          <div className="w-full bg-surface-sunken border border-hairline rounded-sm h-[38px] flex items-center px-sm gap-xs">
            <Search className="w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search prompt templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-body-sm text-ink placeholder:text-muted font-sans"
            />
          </div>

          <div className="flex items-center gap-xs flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-sm py-xs text-body-sm rounded-full transition-colors ${
                  selectedCategory === cat ? 'bg-ink text-canvas font-bold' : 'bg-surface border border-hairline text-muted hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt List */}
        <div className="flex flex-col gap-sm overflow-y-auto max-h-[400px]">
          {filtered.map((item) => (
            <div 
              key={item.id}
              onClick={() => {
                onSelectPrompt(item.prompt);
                onClose();
              }}
              className="p-md rounded-sm border border-hairline bg-surface hover:bg-canvas cursor-pointer transition-colors flex flex-col gap-xs group"
            >
              <div className="flex items-center justify-between">
                <span className="text-body font-bold text-ink group-hover:underline">{item.title}</span>
                <Badge variant="free" label={item.category} />
              </div>
              <p className="text-body-sm text-muted">{item.description}</p>
              <div className="p-xs bg-surface-sunken border border-hairline rounded-xs text-[11px] font-mono text-subtle truncate mt-xs">
                "{item.prompt}"
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-sm border-t border-hairline">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
