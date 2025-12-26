import { MapPin, Bell, Search } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const TopHeader = () => {
  const { userLocation, user } = useAppStore();

  return (
    <header className="sticky top-0 z-40 glass-strong border-b border-border/30">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground">Your Location</span>
            <span className="text-sm font-medium text-foreground">{userLocation}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-secondary/50 transition-all hover:bg-secondary">
            <Search className="h-4 w-4 text-foreground" />
          </button>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-secondary/50 transition-all hover:bg-secondary">
            <Bell className="h-4 w-4 text-foreground" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
          </button>
          <div className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-primary/30">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
