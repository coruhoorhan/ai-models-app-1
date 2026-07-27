import React, { useState } from 'react';
import { Card } from '../../../shared/ui/Card';
import { Toggle } from '../../../shared/ui/Toggle';
import { Select } from '../../../shared/ui/Select';
import { Radio } from '../../../shared/ui/Radio';

export function PreferenceSettings() {
  const [theme, setTheme] = useState('system');
  const [marketing, setMarketing] = useState(false);
  const [updates, setUpdates] = useState(true);

  return (
    <Card className="p-xl w-full">
      <div className="flex flex-col gap-xl">
        <div>
          <h2 className="text-heading-sm text-ink mb-xs">Preferences</h2>
          <p className="text-body-sm text-muted">Manage your theme and notification settings.</p>
        </div>

        <div className="flex flex-col gap-xl">
          {/* THEME SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg border-t border-hairline pt-lg">
            <div className="md:col-span-1">
              <h3 className="text-label text-ink uppercase tracking-widest">THEME</h3>
              <p className="text-caption text-muted mt-xs">Customize the appearance of the interface across all your devices.</p>
            </div>
            <div className="md:col-span-2 flex flex-col gap-sm">
              <Radio 
                name="theme" 
                label="Light Mode" 
                checked={theme === 'light'} 
                onChange={() => setTheme('light')} 
              />
              <Radio 
                name="theme" 
                label="Dark Mode" 
                checked={theme === 'dark'} 
                onChange={() => setTheme('dark')} 
              />
              <Radio 
                name="theme" 
                label="System Default" 
                checked={theme === 'system'} 
                onChange={() => setTheme('system')} 
              />
            </div>
          </div>

          {/* AI MODEL SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg border-t border-hairline pt-lg">
            <div className="md:col-span-1">
              <h3 className="text-label text-ink uppercase tracking-widest">DEFAULT AI MODEL</h3>
              <p className="text-caption text-muted mt-xs">Select the primary model used for new chat sessions.</p>
            </div>
            <div className="md:col-span-2 flex flex-col gap-sm">
              <Select 
                value="gemini-1.5-pro"
                onChange={() => {}}
                options={[
                  { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
                  { value: 'gpt-4o', label: 'GPT-4o' },
                  { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' }
                ]}
              />
            </div>
          </div>

          {/* NOTIFICATIONS SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg border-t border-hairline pt-lg">
            <div className="md:col-span-1">
              <h3 className="text-label text-ink uppercase tracking-widest">NOTIFICATIONS</h3>
              <p className="text-caption text-muted mt-xs">Manage how we communicate with you via email.</p>
            </div>
            <div className="md:col-span-2 flex flex-col gap-sm">
              <div className="flex items-center justify-between py-xs border-b border-hairline-soft">
                <div>
                  <div className="text-body font-bold text-ink">Product Updates</div>
                  <div className="text-caption text-muted">Receive updates about new features and improvements.</div>
                </div>
                <Toggle checked={updates} onChange={(e) => setUpdates(e.target.checked)} />
              </div>
              <div className="flex items-center justify-between py-xs">
                <div>
                  <div className="text-body font-bold text-ink">Marketing Emails</div>
                  <div className="text-caption text-muted">Receive special offers and promotional materials.</div>
                </div>
                <Toggle checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
