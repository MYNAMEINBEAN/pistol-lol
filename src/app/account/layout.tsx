'use client';

import { useAuth } from '@/lib/auth';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/');
    }
  }, [currentUser, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  const navItems = [
    { name: 'Account', href: '/account' },
    { name: 'Customize', href: '/account/customize' },
    { name: 'Links', href: '/account/links' },
    { name: 'Premium', href: '/account/premium' },
    { name: 'Image Host', href: '/account/image-host' },
    { name: 'Templates', href: '/account/templates' },
    { name: 'Help Center', href: '/account/help' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-zinc-950 border-r border-zinc-800 p-6">
          <div className="mb-8">
            <div className="text-2xl font-bold mb-1">pistol.lol</div>
            <div className="text-xs text-zinc-500">pistol.lol Logo</div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                  pathname === item.href
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-8 space-y-2">
            <Link
              href={`/${currentUser.username}`}
              className="block px-3 py-2 rounded-md text-sm bg-zinc-800 text-white hover:bg-zinc-700 transition-colors text-center"
            >
              My Page
            </Link>
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 rounded-md text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors text-left"
            >
              Logout
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-800">
            <div className="text-xs text-zinc-500">Share Your Profile</div>
            <div className="mt-2 text-sm text-white break-all">
              {currentUser.username}
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              UID {currentUser.uid.toLocaleString()}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
