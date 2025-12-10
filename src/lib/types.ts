export interface UserProfile {
  uid: number;
  username: string;
  password: string;
  description: string;
  location: string;

  // Assets
  backgroundImage: string;
  audioUrl: string;
  avatarUrl: string;
  customCursor: string;

  // Effects
  backgroundEffect: string;
  usernameEffect: string;
  profileOpacity: number;
  profileBlur: number;

  // Colors
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  iconColor: string;

  // Toggles
  monochromeIcons: boolean;
  animatedTitle: boolean;
  swapBoxColors: boolean;
  volumeControl: boolean;
  useDiscordAvatar: boolean;
  discordAvatarDecoration: boolean;

  // Links
  links: SocialLink[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export const SOCIAL_PLATFORMS = [
  { name: 'Snapchat', icon: '👻' },
  { name: 'YouTube', icon: '▶️' },
  { name: 'Discord', icon: '💬' },
  { name: 'Spotify', icon: '🎵' },
  { name: 'Instagram', icon: '📷' },
  { name: 'X', icon: '𝕏' },
  { name: 'TikTok', icon: '🎬' },
  { name: 'Telegram', icon: '✈️' },
  { name: 'SoundCloud', icon: '☁️' },
  { name: 'PayPal', icon: '💳' },
  { name: 'GitHub', icon: '🐙' },
  { name: 'Roblox', icon: '🎮' },
  { name: 'CashApp', icon: '💵' },
  { name: 'Apple Music', icon: '🎧' },
  { name: 'GitLab', icon: '🦊' },
  { name: 'Twitch', icon: '📺' },
  { name: 'Reddit', icon: '🤖' },
  { name: 'VK', icon: 'VK' },
  { name: 'NameMC', icon: '⛏️' },
  { name: 'OnlyFans', icon: '🔞' },
  { name: 'LinkedIn', icon: '💼' },
  { name: 'Steam', icon: '🎮' },
  { name: 'Kick', icon: '⚽' },
  { name: 'Pinterest', icon: '📌' },
  { name: 'LastFM', icon: '🎼' },
  { name: 'Payhip', icon: '🛒' },
  { name: 'Buy Me a Coffee', icon: '☕' },
  { name: 'Ko-fi', icon: '💖' },
  { name: 'Facebook', icon: '👥' },
  { name: 'Threads', icon: '🧵' },
  { name: 'Patreon', icon: '🎨' },
  { name: 'Signal', icon: '🔒' },
  { name: 'Bitcoin', icon: '₿' },
  { name: 'Ethereum', icon: 'Ξ' },
  { name: 'Litecoin', icon: 'Ł' },
  { name: 'Solana', icon: '◎' },
  { name: 'XRP', icon: 'XRP' },
  { name: 'Monero', icon: 'ɱ' },
  { name: 'Email', icon: '📧' },
  { name: 'Custom URL', icon: '🔗' },
];

export const DEFAULT_USER: Omit<UserProfile, 'uid' | 'username' | 'password'> = {
  description: '',
  location: '',
  backgroundImage: '',
  audioUrl: '',
  avatarUrl: '',
  customCursor: '',
  backgroundEffect: 'none',
  usernameEffect: '',
  profileOpacity: 50,
  profileBlur: 0,
  accentColor: '#1b1b1b',
  textColor: '#ffffff',
  backgroundColor: '#080808',
  iconColor: '#ffffff',
  monochromeIcons: false,
  animatedTitle: false,
  swapBoxColors: false,
  volumeControl: false,
  useDiscordAvatar: false,
  discordAvatarDecoration: false,
  links: [],
};
