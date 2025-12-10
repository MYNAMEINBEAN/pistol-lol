'use client';

import { useAuth } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CustomizePage() {
  const { currentUser, updateProfile } = useAuth();

  if (!currentUser) return null;

  const handleFileChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Customize</h1>

      {/* Assets Uploader */}
      <Card className="bg-zinc-950 border-zinc-800 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Assets Uploader</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="background" className="text-white">Background</Label>
            <Input
              id="background"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('backgroundImage', e)}
              className="bg-zinc-900 border-zinc-800 text-white mt-2"
            />
          </div>
          <div>
            <Label htmlFor="audio" className="text-white">Audio</Label>
            <Input
              id="audio"
              type="file"
              accept="audio/*"
              onChange={(e) => handleFileChange('audioUrl', e)}
              className="bg-zinc-900 border-zinc-800 text-white mt-2"
            />
          </div>
          <div>
            <Label htmlFor="avatar" className="text-white">Profile Avatar</Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('avatarUrl', e)}
              className="bg-zinc-900 border-zinc-800 text-white mt-2"
            />
          </div>
          <div>
            <Label htmlFor="cursor" className="text-white">Custom Cursor</Label>
            <Input
              id="cursor"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('customCursor', e)}
              className="bg-zinc-900 border-zinc-800 text-white mt-2"
            />
          </div>
          <div className="text-xs text-zinc-500 italic">
            Want exclusive features? Unlock more with Premium
          </div>
        </CardContent>
      </Card>

      {/* General Customization */}
      <Card className="bg-zinc-950 border-zinc-800 mb-6">
        <CardHeader>
          <CardTitle className="text-white">General Customization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description" className="text-white">Description</Label>
            <Input
              id="description"
              value={currentUser.description}
              onChange={(e) => updateProfile({ description: e.target.value })}
              className="bg-zinc-900 border-zinc-800 text-white mt-2"
              placeholder="Enter description"
            />
          </div>
          <div>
            <Label className="text-white">Discord Presence</Label>
            <Button variant="outline" className="w-full mt-2 bg-zinc-900 border-zinc-800 text-zinc-400">
              Click here to connect your Discord and unlock this feature.
            </Button>
          </div>
          <div>
            <Label htmlFor="bg-effect" className="text-white">Background Effects</Label>
            <Select
              value={currentUser.backgroundEffect}
              onValueChange={(value) => updateProfile({ backgroundEffect: value })}
            >
              <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white mt-2">
                <SelectValue placeholder="Choose an option" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="snow">Snow</SelectItem>
                <SelectItem value="rain">Rain</SelectItem>
                <SelectItem value="stars">Stars</SelectItem>
                <SelectItem value="particles">Particles</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="username-effect" className="text-white">Username Effects</Label>
            <Input
              id="username-effect"
              value={currentUser.usernameEffect}
              onChange={(e) => updateProfile({ usernameEffect: e.target.value })}
              className="bg-zinc-900 border-zinc-800 text-white mt-2"
              placeholder="Username Effects"
            />
          </div>
        </CardContent>
      </Card>

      {/* Profile Opacity & Blur */}
      <Card className="bg-zinc-950 border-zinc-800 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Profile Opacity</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            value={[currentUser.profileOpacity]}
            onValueChange={(value) => updateProfile({ profileOpacity: value[0] })}
            max={100}
            min={0}
            step={1}
            className="mt-2"
          />
          <div className="text-sm text-zinc-400 mt-2">{currentUser.profileOpacity}%</div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-950 border-zinc-800 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Profile Blur</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            value={[currentUser.profileBlur]}
            onValueChange={(value) => updateProfile({ profileBlur: value[0] })}
            max={100}
            min={0}
            step={1}
            className="mt-2"
          />
          <div className="text-sm text-zinc-400 mt-2">{currentUser.profileBlur}px</div>
        </CardContent>
      </Card>

      {/* Location and Glow Settings */}
      <Card className="bg-zinc-950 border-zinc-800 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Location</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={currentUser.location}
            onChange={(e) => updateProfile({ location: e.target.value })}
            className="bg-zinc-900 border-zinc-800 text-white"
            placeholder="Enter location"
          />
        </CardContent>
      </Card>

      <Card className="bg-zinc-950 border-zinc-800 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Glow Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-white">Username</Label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-white">Socials</Label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-white">Badges</Label>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Color Customization */}
      <Card className="bg-zinc-950 border-zinc-800 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Color Customization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="accent" className="text-white">Accent Color</Label>
            <Input
              id="accent"
              type="color"
              value={currentUser.accentColor}
              onChange={(e) => updateProfile({ accentColor: e.target.value })}
              className="w-20 h-10 bg-zinc-900 border-zinc-800"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="text" className="text-white">Text Color</Label>
            <Input
              id="text"
              type="color"
              value={currentUser.textColor}
              onChange={(e) => updateProfile({ textColor: e.target.value })}
              className="w-20 h-10 bg-zinc-900 border-zinc-800"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="bg" className="text-white">Background Color</Label>
            <Input
              id="bg"
              type="color"
              value={currentUser.backgroundColor}
              onChange={(e) => updateProfile({ backgroundColor: e.target.value })}
              className="w-20 h-10 bg-zinc-900 border-zinc-800"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="icon" className="text-white">Icon Color</Label>
            <Input
              id="icon"
              type="color"
              value={currentUser.iconColor}
              onChange={(e) => updateProfile({ iconColor: e.target.value })}
              className="w-20 h-10 bg-zinc-900 border-zinc-800"
            />
          </div>
        </CardContent>
      </Card>

      {/* Other Customization */}
      <Card className="bg-zinc-950 border-zinc-800 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Other Customization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-white">Monochrome Icons</Label>
            <Switch
              checked={currentUser.monochromeIcons}
              onCheckedChange={(checked) => updateProfile({ monochromeIcons: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-white">Animated Title</Label>
            <Switch
              checked={currentUser.animatedTitle}
              onCheckedChange={(checked) => updateProfile({ animatedTitle: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-white">Swap Box Colors</Label>
            <Switch
              checked={currentUser.swapBoxColors}
              onCheckedChange={(checked) => updateProfile({ swapBoxColors: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-white">Volume Control</Label>
            <Switch
              checked={currentUser.volumeControl}
              onCheckedChange={(checked) => updateProfile({ volumeControl: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-white">Use Discord Avatar</Label>
            <Switch
              checked={currentUser.useDiscordAvatar}
              onCheckedChange={(checked) => updateProfile({ useDiscordAvatar: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-white">Discord Avatar Decoration</Label>
            <Switch
              checked={currentUser.discordAvatarDecoration}
              onCheckedChange={(checked) => updateProfile({ discordAvatarDecoration: checked })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
