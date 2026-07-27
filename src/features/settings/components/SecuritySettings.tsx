import React from 'react';
import { Card } from '../../../shared/ui/Card';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import { Toggle } from '../../../shared/ui/Toggle';
import { Lock, Shield, Smartphone } from 'lucide-react';

export function SecuritySettings() {
  const [twoFactor, setTwoFactor] = React.useState(true);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password updated");
  };

  return (
    <div className="flex flex-col gap-lg w-full">
      {/* Password Change */}
      <Card className="p-xl w-full">
        <div className="flex flex-col gap-xl">
          <div>
            <h2 className="text-heading-sm text-ink mb-xs">Security Settings</h2>
            <p className="text-body-sm text-muted">Manage your passwords, two-factor authentication, and active sessions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg border-t border-hairline pt-lg">
            <div className="md:col-span-1">
              <h3 className="text-label text-ink uppercase tracking-widest">CHANGE PASSWORD</h3>
              <p className="text-caption text-muted mt-xs">Ensure your account is using a long, random password to stay secure.</p>
            </div>
            <div className="md:col-span-2">
              <form onSubmit={handlePasswordChange} className="flex flex-col gap-lg">
                <Input 
                  label="Current Password" 
                  type="password" 
                  leftIcon={<Lock className="w-4 h-4" />}
                />
                <Input 
                  label="New Password" 
                  type="password" 
                  leftIcon={<Lock className="w-4 h-4" />}
                />
                <Input 
                  label="Confirm New Password" 
                  type="password" 
                  leftIcon={<Lock className="w-4 h-4" />}
                />
                <div className="flex justify-end pt-md border-t border-hairline">
                  <Button type="submit" variant="primary">Update Password</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="p-xl w-full">
        <div className="flex flex-col gap-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
            <div>
              <h2 className="text-heading-sm text-ink mb-xs flex items-center gap-xs">
                <Shield className="w-5 h-5 text-live" />
                Two-Factor Authentication
              </h2>
              <p className="text-body-sm text-muted max-w-xl">
                Add additional security to your account using two-factor authentication.
              </p>
            </div>
            <Toggle checked={twoFactor} onChange={(e) => setTwoFactor(e.target.checked)} />
          </div>
        </div>
      </Card>

      {/* Active Sessions */}
      <Card className="p-xl w-full">
        <div className="flex flex-col gap-xl">
          <div>
            <h2 className="text-heading-sm text-ink mb-xs">Active Sessions</h2>
            <p className="text-body-sm text-muted">Manage and log out your active sessions on other browsers and devices.</p>
          </div>

          <div className="flex flex-col gap-0 border-t border-hairline">
            <div className="flex items-center gap-md py-md border-b border-hairline-soft">
              <div className="w-10 h-10 bg-surface flex items-center justify-center rounded-sm border border-hairline">
                <Smartphone className="w-5 h-5 text-ink" />
              </div>
              <div className="flex-1">
                <div className="text-body font-bold text-ink">iPhone 14 Pro - Safari</div>
                <div className="text-caption text-muted">Istanbul, TR • Last active 2 hours ago</div>
              </div>
              <Button variant="secondary" size="sm">Log Out</Button>
            </div>
            
            <div className="flex items-center gap-md py-md">
              <div className="w-10 h-10 bg-surface flex items-center justify-center rounded-sm border border-hairline">
                <Lock className="w-5 h-5 text-live" />
              </div>
              <div className="flex-1">
                <div className="text-body font-bold text-ink flex items-center gap-sm">
                  MacBook Pro - Chrome
                  <span className="text-live text-[10px] uppercase tracking-widest px-xs py-xxs bg-live/10 rounded-sm">Current</span>
                </div>
                <div className="text-caption text-muted">Istanbul, TR • Active now</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
