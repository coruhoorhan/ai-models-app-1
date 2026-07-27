import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { TopNav } from '../features/landing/components/TopNav';
import { Footer } from '../shared/ui/Footer';
import { BackgroundGrid } from '../shared/ui/BackgroundGrid';
import { DOCS_DATA } from '../features/docs/data/docsData';
import { DocsSidebar } from '../features/docs/components/DocsSidebar';
import { DocsContentArea } from '../features/docs/components/DocsContentArea';

export function DocsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeArticleId = searchParams.get('article') || 'overview';
  const searchQuery = searchParams.get('search') || '';

  const setSearchQuery = (query: string) => {
    setSearchParams(prev => {
      if (query) {
        prev.set('search', query);
      } else {
        prev.delete('search');
      }
      return prev;
    }, { replace: true });
  };

  // Find article by id, fallback to first article
  const allArticles = DOCS_DATA.flatMap((cat) => cat.articles);
  const currentArticle = allArticles.find((art) => art.id === activeArticleId) || allArticles[0];

  const handleSelectArticle = (articleId: string) => {
    setSearchParams({ article: articleId });
  };

  return (
    <div className="w-full flex flex-col items-center bg-canvas min-h-screen relative overflow-hidden text-ink">
      {/* Global Ambient Background Grid */}
      <BackgroundGrid />

      <div className="relative z-10 w-full flex flex-col items-center flex-1">
        <TopNav />

        <main className="w-full flex flex-col flex-1 items-center py-lg">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-[1440px] flex flex-col px-md lg:px-xl py-xl flex-1 gap-lg"
          >
            {/* Page Title & Intro */}
            <div className="flex flex-col gap-xs">
              <span className="text-label text-subtle font-mono uppercase">API Documentation & Developer Reference</span>
              <h1 className="text-heading-lg text-ink font-bold">OpenRouter Integration Guides</h1>
            </div>

            {/* Main Content Layout */}
            <div className="flex flex-col lg:flex-row gap-lg items-start">
              <DocsSidebar
                categories={DOCS_DATA}
                activeArticleId={currentArticle.id}
                onSelectArticle={handleSelectArticle}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              <DocsContentArea article={currentArticle} />
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
