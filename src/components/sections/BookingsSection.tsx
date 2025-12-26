import { useAppStore } from '@/store/useAppStore';
import { Calendar, Clock, Users, MapPin, MoreVertical, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BookingsSection = () => {
  const { bookings } = useAppStore();

  const upcomingBookings = bookings.filter(
    (b) => b.status === 'confirmed' || b.status === 'pending'
  );
  const pastBookings = bookings.filter(
    (b) => b.status === 'completed' || b.status === 'cancelled'
  );

  const statusConfig = {
    confirmed: { bg: 'bg-success/20', text: 'text-success', label: 'Confirmed' },
    pending: { bg: 'bg-warning/20', text: 'text-warning', label: 'Pending' },
    completed: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Completed' },
    cancelled: { bg: 'bg-destructive/20', text: 'text-destructive', label: 'Cancelled' },
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="relative overflow-hidden px-4 py-6">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
        
        <h1 className="text-2xl font-bold">
          Your <span className="gradient-text">Bookings</span>
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your table reservations
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-3 px-4">
        <div className="rounded-xl bg-secondary/50 p-3 text-center">
          <span className="text-2xl font-bold text-primary">{upcomingBookings.length}</span>
          <p className="text-xs text-muted-foreground">Upcoming</p>
        </div>
        <div className="rounded-xl bg-secondary/50 p-3 text-center">
          <span className="text-2xl font-bold text-success">12</span>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
        <div className="rounded-xl bg-secondary/50 p-3 text-center">
          <span className="text-2xl font-bold text-foreground">98</span>
          <p className="text-xs text-muted-foreground">Honor Score</p>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="px-4">
        <h2 className="mb-4 flex items-center gap-2 font-semibold">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming
        </h2>

        {upcomingBookings.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/50 p-8 text-center">
            <span className="text-4xl">🍽️</span>
            <p className="mt-2 font-medium">No upcoming bookings</p>
            <p className="text-sm text-muted-foreground">Book a table to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingBookings.map((booking, index) => {
              const status = statusConfig[booking.status];
              return (
                <div
                  key={booking.id}
                  className="group relative overflow-hidden rounded-2xl glass animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-4 p-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                      <img
                        src={booking.restaurantImage}
                        alt={booking.restaurantName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{booking.restaurantName}</h3>
                          <span className={cn('mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium', status.bg, status.text)}>
                            {status.label}
                          </span>
                        </div>
                        <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary">
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          <span>{booking.guests} guests</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex border-t border-border/30">
                    <button className="flex flex-1 items-center justify-center gap-2 py-3 text-sm text-muted-foreground hover:bg-secondary/30 hover:text-foreground transition-colors">
                      <MapPin className="h-4 w-4" />
                      Directions
                    </button>
                    <div className="w-px bg-border/30" />
                    <button className="flex flex-1 items-center justify-center gap-2 py-3 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
