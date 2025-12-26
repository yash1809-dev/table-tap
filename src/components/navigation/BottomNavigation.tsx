import { Home, CalendarCheck, QrCode, Camera, User } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { NavigationTab } from '@/types';
import { cn } from '@/lib/utils';

const navItems: { id: NavigationTab; icon: typeof Home; label: string }[] = [
  { id: 'home', icon: Home, label: 'Discover' },
  { id: 'bookings', icon: CalendarCheck, label: 'Bookings' },
  { id: 'orders', icon: QrCode, label: 'Orders' },
  { id: 'snaps', icon: Camera, label: 'Snaps' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export const BottomNavigation = () => {
  const { activeTab, setActiveTab, cart } = useAppStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/30">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {navItems.map(({ id, icon: Icon, label }) => {
          const isActive = activeTab === id;
          const hasCartItems = id === 'orders' && cart.length > 0;

          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                'relative flex flex-col items-center justify-center gap-0.5 px-4 py-2 rounded-xl transition-all duration-300',
                isActive
                  ? 'text-primary scale-105'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    'h-5 w-5 transition-all duration-300',
                    isActive && 'drop-shadow-[0_0_8px_hsl(var(--primary))]'
                  )}
                />
                {hasCartItems && (
                  <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground animate-bounce-in">
                    {cart.length}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium transition-all duration-300',
                  isActive && 'gradient-text font-semibold'
                )}
              >
                {label}
              </span>
              {isActive && (
                <span className="absolute -bottom-2 h-1 w-8 rounded-full bg-primary/80 blur-sm" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
