import Database from 'better-sqlite3';
import path from 'path';
import type { UserProfile } from './types';

const dbPath = path.join(process.cwd(), 'pistol.db');
const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    uid INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    description TEXT DEFAULT '',
    location TEXT DEFAULT '',
    backgroundImage TEXT DEFAULT '',
    audioUrl TEXT DEFAULT '',
    avatarUrl TEXT DEFAULT '',
    customCursor TEXT DEFAULT '',
    backgroundEffect TEXT DEFAULT 'none',
    usernameEffect TEXT DEFAULT '',
    profileOpacity INTEGER DEFAULT 50,
    profileBlur INTEGER DEFAULT 0,
    accentColor TEXT DEFAULT '#1b1b1b',
    textColor TEXT DEFAULT '#ffffff',
    backgroundColor TEXT DEFAULT '#080808',
    iconColor TEXT DEFAULT '#ffffff',
    monochromeIcons INTEGER DEFAULT 0,
    animatedTitle INTEGER DEFAULT 0,
    swapBoxColors INTEGER DEFAULT 0,
    volumeControl INTEGER DEFAULT 0,
    useDiscordAvatar INTEGER DEFAULT 0,
    discordAvatarDecoration INTEGER DEFAULT 0,
    links TEXT DEFAULT '[]',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// User operations
export const userDb = {
  create: (username: string, password: string) => {
    const stmt = db.prepare(`
      INSERT INTO users (username, password)
      VALUES (?, ?)
    `);
    const result = stmt.run(username, password);
    return result.lastInsertRowid as number;
  },

  findByUsername: (username: string): UserProfile | null => {
    const stmt = db.prepare('SELECT * FROM users WHERE LOWER(username) = LOWER(?)');
    const user = stmt.get(username) as any;
    if (!user) return null;

    return {
      ...user,
      monochromeIcons: Boolean(user.monochromeIcons),
      animatedTitle: Boolean(user.animatedTitle),
      swapBoxColors: Boolean(user.swapBoxColors),
      volumeControl: Boolean(user.volumeControl),
      useDiscordAvatar: Boolean(user.useDiscordAvatar),
      discordAvatarDecoration: Boolean(user.discordAvatarDecoration),
      links: JSON.parse(user.links || '[]'),
    };
  },

  findByUid: (uid: number): UserProfile | null => {
    const stmt = db.prepare('SELECT * FROM users WHERE uid = ?');
    const user = stmt.get(uid) as any;
    if (!user) return null;

    return {
      ...user,
      monochromeIcons: Boolean(user.monochromeIcons),
      animatedTitle: Boolean(user.animatedTitle),
      swapBoxColors: Boolean(user.swapBoxColors),
      volumeControl: Boolean(user.volumeControl),
      useDiscordAvatar: Boolean(user.useDiscordAvatar),
      discordAvatarDecoration: Boolean(user.discordAvatarDecoration),
      links: JSON.parse(user.links || '[]'),
    };
  },

  update: (uid: number, updates: Partial<UserProfile>) => {
    const allowedFields = [
      'description', 'location', 'backgroundImage', 'audioUrl', 'avatarUrl',
      'customCursor', 'backgroundEffect', 'usernameEffect', 'profileOpacity',
      'profileBlur', 'accentColor', 'textColor', 'backgroundColor', 'iconColor',
      'monochromeIcons', 'animatedTitle', 'swapBoxColors', 'volumeControl',
      'useDiscordAvatar', 'discordAvatarDecoration', 'links'
    ];

    const fields = Object.keys(updates).filter(key => allowedFields.includes(key));
    if (fields.length === 0) return false;

    const setClause = fields.map(field => {
      if (field === 'links') return `${field} = ?`;
      if (typeof updates[field as keyof UserProfile] === 'boolean') return `${field} = ?`;
      return `${field} = ?`;
    }).join(', ');

    const values = fields.map(field => {
      const value = updates[field as keyof UserProfile];
      if (field === 'links') return JSON.stringify(value);
      if (typeof value === 'boolean') return value ? 1 : 0;
      return value;
    });

    const stmt = db.prepare(`UPDATE users SET ${setClause} WHERE uid = ?`);
    stmt.run(...values, uid);
    return true;
  },

  authenticate: (username: string, password: string): UserProfile | null => {
    const stmt = db.prepare('SELECT * FROM users WHERE LOWER(username) = LOWER(?) AND password = ?');
    const user = stmt.get(username, password) as any;
    if (!user) return null;

    return {
      ...user,
      monochromeIcons: Boolean(user.monochromeIcons),
      animatedTitle: Boolean(user.animatedTitle),
      swapBoxColors: Boolean(user.swapBoxColors),
      volumeControl: Boolean(user.volumeControl),
      useDiscordAvatar: Boolean(user.useDiscordAvatar),
      discordAvatarDecoration: Boolean(user.discordAvatarDecoration),
      links: JSON.parse(user.links || '[]'),
    };
  },
};

export default db;
