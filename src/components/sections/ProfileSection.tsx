import { useAppStore } from '@/store/useAppStore';
import { 
  Settings, ChevronRight, Award, MapPin, Utensils, 
  MessageSquare, HelpCircle, LogOut, Star, TrendingUp,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const ProfileSection = () => {
  const { user, chats } = useAppStore();

  const menuItems = [
    { icon: Award, label: 'My Badges', value: `${user.badges.length} earned`, color: 'text-warning' },
    { icon: MapPin, label: 'Saved Places', value: '12 places', color: 'text-primary' },
    { icon: Utensils, label: 'Food Preferences', value: 'Edit', color: 'text-success' },
    { icon: MessageSquare, label: 'Messages', value: `${chats.reduce((sum, c) => sum + c.unread, 0)} unread`, color: 'text-accent' },
    { icon: HelpCircle, label: 'Help & Support', color: 'text-muted-foreground' },
    { icon: Settings, label: 'Settings', color: 'text-muted-foreground' },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Profile Header */}
      <div className="relative overflow-hidden px-4 py-8">
        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-20 top-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
        
        <div className="relative flex flex-col items-center">
          {/* Avatar */}
          <div className="relative">
            <div className="h-28 w-28 overflow-hidden rounded-full p-1" style={{ background: 'var(--gradient-primary)' }}>
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-success shadow-lg">
              <Shield className="h-5 w-5 text-success-foreground" />
            </div>
          </div>

          <h1 className="mt-4 text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">Elite Food Explorer</p>

          {/* Honor Score */}
          <div className="mt-4 flex items-center gap-2 rounded-full bg-success/20 px-4 py-2">
            <Star className="h-5 w-5 text-success" />
            <span className="font-semibold text-success">Honor Score: {user.honorScore}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-4 grid grid-cols-3 gap-3 rounded-2xl glass p-4">
        <div className="text-center">
          <span className="text-2xl font-bold gradient-text">{user.totalVisits}</span>
          <p className="text-xs text-muted-foreground">Total Visits</p>
        </div>
        <div className="text-center border-x border-border/30">
          <span className="text-2xl font-bold gradient-text">{user.badges.length}</span>
          <p className="text-xs text-muted-foreground">Badges</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold gradient-text">156</span>
          <p className="text-xs text-muted-foreground">Snaps</p>
        </div>
      </div>

      {/* Badges Preview */}
      <div className="mx-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold flex items-center gap-2">
            <Award className="h-5 w-5 text-warning" />
            My Badges
          </h2>
          <button className="text-sm text-primary">View all</button>
        </div>

        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {user.badges.map((badge, index) => (
            <div
              key={badge.id}
              className="flex-shrink-0 flex flex-col items-center gap-2 rounded-xl glass p-4 min-w-[100px] animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-3xl">{badge.icon}</span>
              <span className="text-xs font-medium text-center">{badge.name}</span>
            </div>
          ))}
          
          {/* Locked Badge */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2 rounded-xl bg-muted/30 p-4 min-w-[100px] opacity-50">
            <span className="text-3xl">🔒</span>
            <span className="text-xs font-medium text-center">Snap Star</span>
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="mx-4 mt-6 rounded-2xl glass p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            This Month
          </h2>
        </div>

        <div className="flex items-end justify-between h-24 gap-1">
          {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={cn(
                  'w-full rounded-t-md transition-all',
                  i === 5 ? 'bg-primary' : 'bg-primary/30'
                )}
                style={{ height: `${height}%` }}
              />
              <span className="text-[10px] text-muted-foreground">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="mx-4 mt-6 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-4 rounded-xl glass p-4 transition-all hover:bg-secondary/50 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={cn('flex h-10 w-10 items-center justify-center rounded-full bg-secondary', item.color)}>
              <item.icon className="h-5 w-5" />
            </div>
            <span className="flex-1 text-left font-medium">{item.label}</span>
            {item.value && (
              <span className="text-sm text-muted-foreground">{item.value}</span>
            )}
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        ))}

        {/* Logout */}
        <button className="flex w-full items-center gap-4 rounded-xl glass p-4 text-destructive hover:bg-destructive/10 transition-all">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/20">
            <LogOut className="h-5 w-5" />
          </div>
          <span className="flex-1 text-left font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
};
