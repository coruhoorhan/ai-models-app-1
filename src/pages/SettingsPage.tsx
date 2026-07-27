import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout';
import { SegmentedTab } from '../shared/ui/SegmentedTab';
import { ProfileSettings } from '../features/settings/components/ProfileSettings';
import { PreferenceSettings } from '../features/settings/components/PreferenceSettings';
import { SecuritySettings } from '../features/settings/components/SecuritySettings';
import { Settings } from 'lucide-react';

const TABS = [
  { id: 'profile', label: 'Profile' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'security', label: 'Security' },
];

export function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'profile';

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  return (
    <DashboardLayout>
      <div className="w-full flex flex-col items-start">
        <div className="w-full max-w-[1200px] flex flex-col p-md lg:p-xl gap-xl">
          {/* Page Header */}
          <div className="flex flex-col gap-xs border-b border-hairline pb-md">
            <div className="flex items-center gap-xs mb-xs">
              <Settings className="w-4 h-4 text-muted" />
              <span className="text-label text-subtle uppercase tracking-widest">ACCOUNT</span>
            </div>
            <h1 className="text-heading-md text-ink">Settings</h1>
            <p className="text-body-sm text-subtle max-w-[65ch] mt-xs">
              Manage your personal information, adjust interface preferences, and enhance your account security.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="w-full flex justify-start">
            <SegmentedTab 
              tabs={TABS} 
              activeTab={currentTab} 
              onChange={handleTabChange} 
            />
          </div>

          {/* Content Area */}
          <div className="w-full mt-sm">
            {currentTab === 'profile' && <ProfileSettings />}
            {currentTab === 'preferences' && <PreferenceSettings />}
            {currentTab === 'security' && <SecuritySettings />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
