import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Heart, MessageCircle, MapPin, Camera, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const SnapsSection = () => {
  const { snaps, toggleSnapLike, user } = useAppStore();
  const [showCamera, setShowCamera] = useState(false);

  if (showCamera) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
        <button
          onClick={() => setShowCamera(false)}
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full glass"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative flex h-[70vh] w-full items-center justify-center bg-muted/20">
          <div className="text-center">
            <Camera className="mx-auto h-20 w-20 text-muted-foreground/30" />
            <p className="mt-4 font-medium">Camera Access</p>
            <p className="text-sm text-muted-foreground">
              Snap your food & share with friends
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 flex items-center gap-6">
          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <span className="text-2xl">🖼️</span>
          </button>
          <button
            onClick={() => {
              toast.success('Snap sent! 📸', {
                description: 'Your food snap is now live',
              });
              setShowCamera(false);
            }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg"
          >
            <div className="h-16 w-16 rounded-full border-4 border-background" />
          </button>
          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <span className="text-2xl">🔄</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="relative overflow-hidden px-4 py-6">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Food <span className="gradient-text">Snaps</span>
            </h1>
            <p className="mt-1 text-muted-foreground">
              Discover what others are eating
            </p>
          </div>
          <button
            onClick={() => setShowCamera(true)}
            className="flex h-12 w-12 items-center justify-center rounded-full shadow-glow"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Camera className="h-5 w-5 text-primary-foreground" />
          </button>
        </div>

        {/* Story Circles */}
        <div className="mt-4 flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {/* Add Story */}
          <button className="flex flex-col items-center gap-1">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full gradient-border">
              <img
                src={user.avatar}
                alt="Your story"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-lg">+</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">Add</span>
          </button>

          {snaps.map((snap) => (
            <button key={snap.id} className="flex flex-col items-center gap-1">
              <div className="flex h-16 w-16 items-center justify-center rounded-full p-0.5" 
                style={{ background: 'var(--gradient-primary)' }}>
                <img
                  src={snap.userAvatar}
                  alt={snap.userName}
                  className="h-14 w-14 rounded-full object-cover"
                />
              </div>
              <span className="text-xs text-muted-foreground line-clamp-1 w-16 text-center">
                {snap.userName.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Snaps Feed */}
      <div className="space-y-6 px-4">
        <h2 className="font-semibold flex items-center gap-2">
          <span className="text-lg">🔥</span>
          Trending Near You
        </h2>

        {snaps.map((snap, index) => (
          <div
            key={snap.id}
            className="overflow-hidden rounded-2xl glass animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* User Header */}
            <div className="flex items-center gap-3 p-3">
              <img
                src={snap.userAvatar}
                alt={snap.userName}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/30"
              />
              <div className="flex-1">
                <h3 className="font-medium">{snap.userName}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{snap.restaurantName}</span>
                  <span>•</span>
                  <span>{snap.timestamp}</span>
                </div>
              </div>
            </div>

            {/* Snap Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={snap.image}
                alt={snap.dishName || 'Food snap'}
                className="h-full w-full object-cover"
              />
              
              {snap.dishName && (
                <div className="absolute bottom-4 left-4 rounded-full bg-card/80 px-3 py-1.5 backdrop-blur-sm">
                  <span className="text-sm font-medium">{snap.dishName}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 p-3">
              <button
                onClick={() => toggleSnapLike(snap.id)}
                className="flex items-center gap-1.5 transition-transform active:scale-90"
              >
                <Heart
                  className={cn(
                    'h-6 w-6 transition-all',
                    snap.isLiked
                      ? 'fill-accent text-accent scale-110'
                      : 'text-foreground hover:text-accent'
                  )}
                />
                <span className={cn('text-sm font-medium', snap.isLiked && 'text-accent')}>
                  {snap.likes}
                </span>
              </button>

              <button className="flex items-center gap-1.5">
                <MessageCircle className="h-6 w-6" />
                <span className="text-sm font-medium">Reply</span>
              </button>

              <button className="ml-auto flex items-center gap-1.5">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
