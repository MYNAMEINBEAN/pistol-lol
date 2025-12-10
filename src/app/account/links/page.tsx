'use client';

import { useAuth } from '@/lib/auth';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SOCIAL_PLATFORMS } from '@/lib/types';
import type { SocialLink } from '@/lib/types';

export default function LinksPage() {
  const { currentUser, updateProfile } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [customIcon, setCustomIcon] = useState('');
  const [url, setUrl] = useState('');

  if (!currentUser) return null;

  const addLink = (platform: string, icon: string) => {
    setSelectedPlatform(platform);
    setCustomIcon(icon);
    setIsDialogOpen(true);
  };

  const saveLink = () => {
    if (!url) return;

    const newLink: SocialLink = {
      id: Math.random().toString(36).substr(2, 9),
      platform: selectedPlatform,
      url,
      icon: customIcon,
    };

    const updatedLinks = [...currentUser.links, newLink];
    updateProfile({ links: updatedLinks });

    setIsDialogOpen(false);
    setUrl('');
    setSelectedPlatform('');
    setCustomIcon('');
  };

  const removeLink = (id: string) => {
    const updatedLinks = currentUser.links.filter(link => link.id !== id);
    updateProfile({ links: updatedLinks });
  };

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Links</h1>
      <p className="text-zinc-400 mb-8">Link your social media profiles.</p>

      {/* Existing Links */}
      {currentUser.links.length > 0 && (
        <Card className="bg-zinc-950 border-zinc-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Your Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {currentUser.links.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between p-3 bg-zinc-900 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{link.icon}</span>
                    <div>
                      <div className="text-white font-medium">{link.platform}</div>
                      <div className="text-xs text-zinc-400 truncate max-w-xs">{link.url}</div>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeLink(link.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Social Platforms Grid */}
      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Pick a social media to add to your profile.</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {SOCIAL_PLATFORMS.map((platform) => (
              <button
                key={platform.name}
                onClick={() => addLink(platform.name, platform.icon)}
                className="flex flex-col items-center justify-center p-4 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <span className="text-3xl mb-2">{platform.icon}</span>
                <span className="text-xs text-white text-center">{platform.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Link Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-white">
              Add {selectedPlatform} Link
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="url" className="text-white">URL</Label>
              <Input
                id="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-white mt-2"
                placeholder={`Enter your ${selectedPlatform} URL`}
              />
            </div>
            {selectedPlatform === 'Custom URL' && (
              <div>
                <Label htmlFor="icon" className="text-white">Custom Icon (emoji)</Label>
                <Input
                  id="icon"
                  type="text"
                  value={customIcon}
                  onChange={(e) => setCustomIcon(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white mt-2"
                  placeholder="Enter an emoji"
                />
              </div>
            )}
            <Button onClick={saveLink} className="w-full">
              Add Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
