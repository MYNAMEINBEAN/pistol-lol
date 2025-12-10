'use client';

import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AccountPage() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Account</h1>

      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-sm text-zinc-400">Username</div>
            <div className="text-lg text-white">{currentUser.username}</div>
          </div>
          <div>
            <div className="text-sm text-zinc-400">User ID</div>
            <div className="text-lg text-white">{currentUser.uid.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-zinc-400">Profile URL</div>
            <div className="text-lg text-white">
              {typeof window !== 'undefined' && window.location.origin}/{currentUser.username}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
