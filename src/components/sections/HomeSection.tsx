import { useAppStore } from '@/store/useAppStore';
import { RestaurantCard } from '@/components/restaurant/RestaurantCard';
import { RestaurantDetail } from '@/components/restaurant/RestaurantDetail';
import { Sparkles, TrendingUp, Utensils } from 'lucide-react';

export const HomeSection = () => {
  const { restaurants, selectedRestaurant, setSelectedRestaurant } = useAppStore();

  const openRestaurants = restaurants.filter((r) => r.status !== 'closed');
  const closedRestaurants = restaurants.filter((r) => r.status === 'closed');

  if (selectedRestaurant) {
    return (
      <RestaurantDetail
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-4 py-6">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -left-20 top-10 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
        
        <div className="relative">
          <h1 className="text-2xl font-bold">
            What's for <span className="gradient-text">dinner</span> today?
          </h1>
          <p className="mt-1 text-muted-foreground">
            Discover amazing places near you
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 flex gap-3">
          <div className="flex items-center gap-2 rounded-full bg-secondary/50 px-3 py-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{openRestaurants.length} Open</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-secondary/50 px-3 py-1.5">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">Trending</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-secondary/50 px-3 py-1.5">
            <Utensils className="h-4 w-4 text-success" />
            <span className="text-sm font-medium">All Types</span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {['All', '🍜 Stalls', '☕ Cafés', '🍽️ Restaurants', '🔥 Popular', '💰 Budget'].map((cat, i) => (
            <button
              key={cat}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                i === 0
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/50 text-foreground hover:bg-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurant List */}
      <div className="space-y-4 px-4">
        <h2 className="flex items-center gap-2 font-semibold">
          <span className="text-lg">🔥</span>
          Nearby & Open
        </h2>
        
        <div className="grid gap-4">
          {openRestaurants.map((restaurant, index) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => setSelectedRestaurant(restaurant)}
              index={index}
            />
          ))}
        </div>

        {closedRestaurants.length > 0 && (
          <>
            <h2 className="mt-6 flex items-center gap-2 font-semibold text-muted-foreground">
              <span className="text-lg">😴</span>
              Currently Closed
            </h2>
            
            <div className="grid gap-4">
              {closedRestaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => {}}
                  index={index + openRestaurants.length}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
