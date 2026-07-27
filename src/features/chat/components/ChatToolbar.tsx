import React from 'react';
import { Layers, BookOpen, Download, Trash2, Sliders } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';

interface ChatToolbarProps {
  availableModels: { id: string; name: string }[];
  selectedModel: { id: string; name: string };
  setSelectedModel: (m: { id: string; name: string }) => void;
  isMultiModel: boolean;
  setIsMultiModel: (v: boolean) => void;
  setShowPromptLibrary: (v: boolean) => void;
  handleExportJSON: () => void;
  copiedExport: boolean;
  setMessages: (m: any[]) => void;
  showParamsSidebar: boolean;
  setShowParamsSidebar: (v: boolean) => void;
}

export function ChatToolbar({
  availableModels,
  selectedModel,
  setSelectedModel,
  isMultiModel,
  setIsMultiModel,
  setShowPromptLibrary,
  handleExportJSON,
  copiedExport,
  setMessages,
  showParamsSidebar,
  setShowParamsSidebar
}: ChatToolbarProps) {
  return (
    <div className="h-[56px] border-b border-hairline bg-surface px-md flex items-center justify-between shrink-0 gap-sm flex-wrap">
      {/* Model Selector & Multi-Model Toggle */}
      <div className="flex items-center gap-sm">
        <div className="flex items-center gap-xs">
          <span className="text-body-sm font-bold text-ink">Primary Model:</span>
          <select
            value={selectedModel.id}
            onChange={(e) => {
              const found = availableModels.find(m => m.id === e.target.value);
              if (found) setSelectedModel(found);
            }}
            className="bg-canvas border border-hairline rounded-sm p-xs text-body-sm font-bold text-ink cursor-pointer outline-none focus:border-ink"
          >
            {availableModels.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setIsMultiModel(!isMultiModel)}
          className={`px-sm py-xs text-body-sm rounded-sm border font-medium flex items-center gap-xs transition-colors ${
            isMultiModel ? 'bg-ink text-canvas border-ink' : 'bg-canvas border-hairline text-ink hover:bg-surface-sunken'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          {isMultiModel ? 'Dual Arena Stream ON' : 'Dual Compare Arena'}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-xs">
        <Button 
          variant="secondary" 
          icon={BookOpen} 
          size="sm"
          onClick={() => setShowPromptLibrary(true)}
        >
          Presets
        </Button>
        <Button
          variant="secondary"
          icon={Download}
          size="sm"
          onClick={handleExportJSON}
        >
          {copiedExport ? 'Exported!' : 'Export JSON'}
        </Button>
        <Button
          variant="secondary"
          icon={Trash2}
          size="sm"
          onClick={() => setMessages([])}
        >
          Clear
        </Button>
        <button
          onClick={() => setShowParamsSidebar(!showParamsSidebar)}
          className={`p-xs rounded-sm border ${
            showParamsSidebar ? 'bg-surface-sunken border-ink text-ink' : 'bg-canvas border-hairline text-muted hover:text-ink'
          }`}
          title="Toggle Parameters Sidebar"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
