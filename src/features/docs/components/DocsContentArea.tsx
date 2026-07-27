import React from 'react';
import { DocArticle } from '../../../types';
import { DocsCodeBlock } from './DocsCodeBlock';
import { DocsApiExplorer } from './DocsApiExplorer';
import { DocsStatusCodeWidget } from './DocsStatusCodeWidget';
import { DocsHeaderInspector } from './DocsHeaderInspector';
import { Badge } from '../../../shared/ui/Badge';

interface DocsContentAreaProps {
  article: DocArticle;
}

export function DocsContentArea({ article }: DocsContentAreaProps) {
  return (
    <article className="flex-1 bg-canvas border border-hairline rounded-md p-xl flex flex-col gap-lg">
      {/* Title Header */}
      <div className="flex flex-col gap-xs border-b border-hairline pb-md">
        <div className="flex items-center gap-xs">
          <Badge variant="status-live" label="Production API" />
          <span className="text-label text-subtle uppercase font-mono">{article.categoryId}</span>
        </div>
        <h1 className="text-heading-md text-ink font-bold">{article.title}</h1>
        <p className="text-body text-muted">{article.subtitle}</p>
      </div>

      {/* Main Narrative Content */}
      <div className="text-body-sm text-ink leading-relaxed font-sans">
        {article.content}
      </div>

      {/* Code Snippets Section */}
      {article.codeSnippets && (
        <div className="flex flex-col gap-xs">
          <span className="text-heading-sm text-ink font-bold">SDK & cURL Implementation</span>
          <DocsCodeBlock snippets={article.codeSnippets} />
        </div>
      )}

      {/* Parameter Table if available */}
      {article.paramTable && article.paramTable.length > 0 && (
        <div className="flex flex-col gap-xs my-sm">
          <span className="text-heading-sm text-ink font-bold mb-xs">Request Body Parameters</span>
          <div className="border border-hairline rounded-sm overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-hairline text-label text-subtle font-mono">
                  <th className="p-sm">PARAMETER</th>
                  <th className="p-sm">TYPE</th>
                  <th className="p-sm">REQUIRED</th>
                  <th className="p-sm">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline text-body-sm">
                {article.paramTable.map((p) => (
                  <tr key={p.name} className="hover:bg-surface/50">
                    <td className="p-sm font-mono text-ink font-bold">{p.name}</td>
                    <td className="p-sm font-mono text-muted">{p.type}</td>
                    <td className="p-sm font-mono">
                      {p.required ? <span className="text-chart-pink font-bold">Yes</span> : <span className="text-subtle">Optional</span>}
                    </td>
                    <td className="p-sm text-muted">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* HTTP Status Code Matrix */}
      <DocsStatusCodeWidget />

      {/* Response Header Telemetry */}
      <DocsHeaderInspector />

      {/* Live Interactive Sandbox */}
      <DocsApiExplorer />
    </article>
  );
}
