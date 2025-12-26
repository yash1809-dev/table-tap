import { useState } from 'react';
import { X, Star, MapPin, Clock, Users, ChevronRight, Calendar, Minus, Plus } from 'lucide-react';
import { Restaurant } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onClose: () => void;
}

export const RestaurantDetail = ({ restaurant, onClose }: RestaurantDetailProps) => {
  const { user, addBooking } = useAppStore();
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('7:30 PM');
  const [guests, setGuests] = useState(2);
  const [isBooking, setIsBooking] = useState(false);

  const dates = ['Today', 'Tomorrow', 'Dec 28', 'Dec 29', 'Dec 30'];
  const times = ['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'];

  const handleBook = () => {
    setIsBooking(true);
    
    // Optimistic update
    setTimeout(() => {
      addBooking({
        id: `b${Date.now()}`,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        restaurantImage: restaurant.image,
        date: selectedDate,
        time: selectedTime,
        guests,
        status: 'confirmed',
      });
      
      toast.success('Booking Confirmed!', {
        description: `${restaurant.name} • ${selectedDate} at ${selectedTime}`,
      });
      
      setIsBooking(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background animate-slide-up">
      {/* Header Image */}
      <div className="relative h-64 flex-shrink-0">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <button
          onClick={onClose}
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full glass"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
          <p className="text-muted-foreground">{restaurant.cuisine} • {restaurant.priceRange}</p>
          
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-semibold text-primary">{restaurant.rating}</span>
              <span className="text-xs text-muted-foreground">({restaurant.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{restaurant.distance}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{restaurant.timing}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="flex-1 overflow-y-auto p-4 pb-24 hide-scrollbar">
        {/* Honor Score Requirement */}
        <div className="mb-6 flex items-center justify-between rounded-xl bg-secondary/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
              <span className="text-xl">🏅</span>
            </div>
            <div>
              <p className="font-medium">Your Honor Score</p>
              <p className="text-sm text-muted-foreground">Required: 80+ for booking</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-success">{user.honorScore}</span>
            <p className="text-xs text-success">Eligible ✓</p>
          </div>
        </div>

        {/* Date Selection */}
        <div className="mb-6">
          <h3 className="mb-3 font-semibold">Select Date</h3>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={cn(
                  'flex-shrink-0 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                  selectedDate === date
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'bg-secondary/50 text-foreground hover:bg-secondary'
                )}
              >
                {date}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="mb-6">
          <h3 className="mb-3 font-semibold">Select Time</h3>
          <div className="grid grid-cols-4 gap-2">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  'rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                  selectedTime === time
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'bg-secondary/50 text-foreground hover:bg-secondary'
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Guest Count */}
        <div className="mb-6">
          <h3 className="mb-3 font-semibold">Number of Guests</h3>
          <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-card hover:bg-muted"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-semibold">{guests}</span>
              <button
                onClick={() => setGuests(Math.min(10, guests + 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-card hover:bg-muted"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Book Button */}
      <div className="fixed bottom-0 left-0 right-0 glass-strong border-t border-border/30 p-4">
        <button
          onClick={handleBook}
          disabled={isBooking}
          className={cn(
            'w-full rounded-xl py-4 font-semibold text-primary-foreground transition-all',
            isBooking
              ? 'bg-primary/50'
              : 'bg-primary hover:shadow-glow active:scale-[0.98]'
          )}
          style={{ background: 'var(--gradient-primary)' }}
        >
          {isBooking ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Confirming...
            </span>
          ) : (
            `Book Table • ${selectedTime}`
          )}
        </button>
      </div>
    </div>
  );
};
