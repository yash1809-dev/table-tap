export type NavigationTab = 'home' | 'bookings' | 'orders' | 'snaps' | 'profile';

export type RestaurantStatus = 'open' | 'busy' | 'closed';
export type RestaurantType = 'stall' | 'cafe' | 'restaurant';

export interface Restaurant {
  id: string;
  name: string;
  type: RestaurantType;
  image: string;
  rating: number;
  distance: string;
  status: RestaurantStatus;
  timing: string;
  cuisine: string;
  priceRange: string;
  reviewCount: number;
}

export interface Booking {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  date: string;
  time: string;
  guests: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isPopular?: boolean;
}

export interface OrderItem extends MenuItem {
  quantity: number;
  notes?: string;
}

export interface Snap {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  image: string;
  restaurantName: string;
  dishName?: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  honorScore: number;
  badges: Badge[];
  totalVisits: number;
  favoriteCuisine: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'seen';
}

export interface Chat {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}
