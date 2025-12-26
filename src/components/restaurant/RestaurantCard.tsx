import { Star, MapPin, Clock, Users } from 'lucide-react';
import { Restaurant } from '@/types';
import { cn } from '@/lib/utils';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
  index: number;
}

export const RestaurantCard = ({ restaurant, onClick, index }: RestaurantCardProps) => {
  const statusConfig = {
    open: { color: 'bg-success', text: 'Open', glow: 'shadow-[0_0_10px_hsl(var(--success)/0.5)]' },
    busy: { color: 'bg-warning', text: 'Busy', glow: 'shadow-[0_0_10px_hsl(var(--warning)/0.5)]' },
    closed: { color: 'bg-muted-foreground', text: 'Closed', glow: '' },
  };

  const typeConfig = {
    stall: { emoji: '🍜', label: 'Street Stall' },
    cafe: { emoji: '☕', label: 'Café' },
    restaurant: { emoji: '🍽️', label: 'Restaurant' },
  };

  const status = statusConfig[restaurant.status];
  const type = typeConfig[restaurant.type];
  const isClosed = restaurant.status === 'closed';

  return (
    <button
      onClick={onClick}
      disabled={isClosed}
      className={cn(
        'group relative w-full overflow-hidden rounded-2xl glass transition-all duration-500 animate-slide-up',
        isClosed ? 'opacity-50 grayscale' : 'hover:scale-[1.02] hover:shadow-glow active:scale-[0.98]'
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className={cn(
            'h-full w-full object-cover transition-transform duration-500',
            !isClosed && 'group-hover:scale-110'
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-card/80 px-2 py-1 backdrop-blur-sm">
          <span className={cn('h-2 w-2 rounded-full', status.color, status.glow)} />
          <span className="text-xs font-medium">{status.text}</span>
        </div>

        {/* Type Badge */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-card/80 px-2 py-1 backdrop-blur-sm">
          <span className="text-sm">{type.emoji}</span>
          <span className="text-xs font-medium">{type.label}</span>
        </div>

        {/* Popular Badge */}
        {restaurant.rating >= 4.7 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1">
            <span className="text-xs font-semibold text-primary-foreground">🔥 Popular</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="text-left">
            <h3 className="font-semibold text-foreground">{restaurant.name}</h3>
            <p className="text-sm text-muted-foreground">{restaurant.cuisine} • {restaurant.priceRange}</p>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-1">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="text-sm font-semibold text-primary">{restaurant.rating}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{restaurant.distance}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{restaurant.timing}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{restaurant.reviewCount} reviews</span>
          </div>
        </div>
      </div>
    </button>
  );
};
