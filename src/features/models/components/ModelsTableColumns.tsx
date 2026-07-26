import React from 'react';
import { ColumnDef } from '../../../shared/ui/DataTable';
import { Badge } from '../../../shared/ui/Badge';
import { ModelConfig } from '../../../shared/api/models.api';
import { ChevronRight, Zap } from 'lucide-react';

export const getModelsColumns = (setSelectedModel: (model: ModelConfig) => void): ColumnDef<ModelConfig>[] => [
  {
    key: 'model',
    header: 'MODEL',
    cell: (row) => (
      <div 
        onClick={() => setSelectedModel(row)}
        className="flex flex-col cursor-pointer group"
      >
        <div className="flex items-center gap-sm">
          <span className="font-bold text-ink group-hover:underline">{row.name}</span>
          {row.category.map(c => (
            <Badge 
              key={c} 
              variant="category" 
              label={c} 
              categoryColor={
                c === 'Chat' ? 'chart-blue' : 
                c === 'Coding' ? 'chart-teal' : 
                c === 'Vision' ? 'chart-pink' : 'chart-orange'
              } 
            />
          ))}
        </div>
        <span className="text-body-sm text-subtle mt-1">{row.provider}</span>
      </div>
    )
  },
  {
    key: 'context',
    header: 'CONTEXT',
    cell: (row) => <span className="font-mono cursor-pointer" onClick={() => setSelectedModel(row)}>{row.context}</span>
  },
  {
    key: 'price',
    header: 'PRICE',
    cell: (row) => row.isFree ? <Badge variant="status-live" label="FREE" /> : <span className="font-mono cursor-pointer" onClick={() => setSelectedModel(row)}>{row.price}</span>
  },
  {
    key: 'speed',
    header: 'SPEED',
    cell: (row) => (
      <div className="flex items-center gap-xs font-mono cursor-pointer" onClick={() => setSelectedModel(row)}>
        <Zap className="w-3 h-3 text-chart-teal" />
        <span>{row.speed}</span>
      </div>
    )
  },
  {
    key: 'action',
    header: '',
    cell: (row) => (
      <button 
        onClick={() => setSelectedModel(row)}
        className="p-xs hover:bg-surface rounded-sm transition-colors"
      >
        <ChevronRight className="w-4 h-4 text-muted hover:text-ink" />
      </button>
    )
  }
];
