import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink } from 'lucide-react';
import { ModelConfig } from '../../../shared/api/models.api';
import { Button } from '../../../shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ModelDetailSpecs } from './ModelDetailSpecs';
import { ModelDetailSandbox } from './ModelDetailSandbox';

interface ModelDetailDrawerProps {
  model: ModelConfig | null;
  onClose: () => void;
}

export function ModelDetailDrawer({ model, onClose }: ModelDetailDrawerProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (!model) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(`${model.provider.toLowerCase()}/${model.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/40 backdrop-blur-xs">
      <div className="bg-canvas border-l border-hairline w-full max-w-[560px] h-full flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-200">
        
        <div>
          {/* Header */}
          <div className="p-xl border-b border-hairline flex items-center justify-between sticky top-0 bg-canvas/90 backdrop-blur-md z-10">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-sm bg-surface border border-hairline flex items-center justify-center font-bold text-ink text-body-lg">
                {model.name[0]}
              </div>
              <div>
                <h2 className="text-heading-sm text-ink">{model.name}</h2>
                <span className="text-body-sm text-muted">{model.provider}</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-sm hover:bg-surface flex items-center justify-center text-muted hover:text-ink"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-xl flex flex-col gap-lg">
            
            {/* Quick API ID & Copy */}
            <div className="flex flex-col gap-xs">
              <span className="text-label text-subtle">MODEL ID FOR API / SDK</span>
              <div className="flex items-center gap-xs bg-surface-sunken border border-hairline rounded-sm p-sm">
                <code className="text-body-sm font-mono text-ink flex-1 truncate">
                  {model.provider.toLowerCase()}/{model.id}
                </code>
                <button
                  onClick={handleCopyId}
                  className="px-sm py-xs bg-surface border border-hairline rounded-sm hover:bg-canvas text-muted hover:text-ink flex items-center gap-xs text-body-sm font-medium transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-live" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy ID'}
                </button>
              </div>
            </div>

            {/* Spec Cards Grid */}
            <ModelDetailSpecs model={model} />

            {/* Interactive Test Sandbox */}
            <ModelDetailSandbox model={model} />

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-xl border-t border-hairline bg-surface flex items-center justify-between gap-md sticky bottom-0">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button 
            variant="primary" 
            icon={ExternalLink} 
            onClick={() => navigate('/dashboard')}
          >
            Open in Workspace
          </Button>
        </div>

      </div>
    </div>
  );
}
