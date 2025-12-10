'use client';

import { useAuth } from '@/lib/auth';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import type { UserProfile } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UserProfilePage() {
  const { getUser } = useAuth();
  const params = useParams();
  const username = params.username as string;
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const profile = await getUser(username);
      setUser(profile);
      setLoading(false);
    };

    fetchUser();
  }, [username, getUser]);

  useEffect(() => {
    if (user?.animatedTitle) {
      let i = 0;
      const text = `${user.username} | pistol.lol`;
      const interval = setInterval(() => {
        document.title = text.substring(i) + text.substring(0, i);
        i = (i + 1) % text.length;
      }, 300);
      return () => clearInterval(interval);
    } else if (user) {
      document.title = `${user.username} | pistol.lol`;
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">User not found</div>
      </div>
    );
  }

  const profileStyle = {
    backgroundColor: user.backgroundColor,
    color: user.textColor,
    backgroundImage: user.backgroundImage ? `url(${user.backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    cursor: user.customCursor ? `url(${user.customCursor}), auto` : 'auto',
  };

  const cardStyle = {
    backgroundColor: user.swapBoxColors ? user.textColor : user.accentColor,
    color: user.swapBoxColors ? user.accentColor : user.textColor,
    opacity: user.profileOpacity / 100,
    backdropFilter: `blur(${user.profileBlur}px)`,
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={profileStyle}>
      {/* Background Effects */}
      {user.backgroundEffect === 'snow' && <SnowEffect />}
      {user.backgroundEffect === 'rain' && <RainEffect />}
      {user.backgroundEffect === 'stars' && <StarsEffect />}
      {user.backgroundEffect === 'particles' && <ParticlesEffect />}

      {/* Audio */}
      {user.audioUrl && (
        <audio ref={audioRef} src={user.audioUrl} autoPlay loop={user.volumeControl}>
          {user.volumeControl && <div className="audio-controls" />}
        </audio>
      )}

      {/* Profile Card */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          className="w-full max-w-md rounded-2xl p-8 shadow-2xl border"
          style={{
            ...cardStyle,
            borderColor: user.iconColor + '40',
          }}
        >
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <Avatar className="w-32 h-32 border-4" style={{ borderColor: user.iconColor }}>
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback className="text-4xl" style={{ backgroundColor: user.accentColor }}>
                {user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Username */}
          <h1
            className="text-3xl font-bold text-center mb-2"
            style={{
              textShadow: '0 0 20px currentColor',
              animation: user.usernameEffect ? 'pulse 2s infinite' : undefined,
            }}
          >
            {user.username}
          </h1>

          {/* Location */}
          {user.location && (
            <div className="text-center text-sm mb-4 opacity-75">
              📍 {user.location}
            </div>
          )}

          {/* Description */}
          {user.description && (
            <p className="text-center mb-6 opacity-90">{user.description}</p>
          )}

          {/* Social Links */}
          {user.links.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {user.links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-110"
                  style={{
                    backgroundColor: user.swapBoxColors ? user.accentColor : user.textColor,
                    color: user.swapBoxColors ? user.textColor : user.accentColor,
                    filter: user.monochromeIcons ? 'grayscale(100%)' : undefined,
                  }}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="text-sm font-medium">{link.platform}</span>
                </a>
              ))}
            </div>
          )}

          {/* UID */}
          <div className="text-center text-xs opacity-50">
            UID {user.uid.toLocaleString()}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

function SnowEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 100}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
          }}
        >
          ❄️
        </div>
      ))}
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
}

function RainEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute w-px bg-blue-400 animate-rain"
          style={{
            left: `${Math.random() * 100}%`,
            height: `${20 + Math.random() * 30}px`,
            top: `-${Math.random() * 100}px`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.5 + Math.random()}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes rain {
          to {
            transform: translateY(100vh);
          }
        }
        .animate-rain {
          animation: rain linear infinite;
        }
      `}</style>
    </div>
  );
}

function StarsEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 3}px`,
            height: `${1 + Math.random() * 3}px`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function ParticlesEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-purple-500 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(5px);
          }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
