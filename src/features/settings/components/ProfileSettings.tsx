import React from 'react';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import { Card } from '../../../shared/ui/Card';
import { User, Mail, Building } from 'lucide-react';

export function ProfileSettings() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile saved");
  };

  return (
    <Card className="p-xl w-full">
      <div className="flex flex-col gap-xl">
        <div>
          <h2 className="text-heading-sm text-ink mb-xs">Profile Information</h2>
          <p className="text-body-sm text-muted">Update your account's profile information and email address.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg border-t border-hairline pt-lg">
          <div className="md:col-span-1">
            <h3 className="text-label text-ink uppercase tracking-widest">PERSONAL DETAILS</h3>
            <p className="text-caption text-muted mt-xs">These details will be displayed publicly and used for billing purposes.</p>
          </div>
          <div className="md:col-span-2">
            <form onSubmit={handleSave} className="flex flex-col gap-lg">
              <Input 
                label="Full Name" 
                defaultValue="Orhan Coruh" 
                leftIcon={<User className="w-4 h-4" />}
              />
              <Input 
                label="Email Address" 
                type="email" 
                defaultValue="coruhorhan@example.com" 
                leftIcon={<Mail className="w-4 h-4" />}
              />
              <Input 
                label="Organization" 
                defaultValue="Google" 
                leftIcon={<Building className="w-4 h-4" />}
              />

              <div className="flex justify-end pt-md border-t border-hairline">
                <Button type="submit" variant="primary">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Card>
  );
}
