import { create } from 'zustand';
import { NavigationTab, OrderItem, Restaurant, Booking, Snap } from '@/types';
import { mockRestaurants, mockBookings, mockSnaps, mockUser, mockChats, mockMenuItems } from '@/data/mockData';

interface AppState {
  // Navigation
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;

  // User
  user: typeof mockUser;
  
  // Location
  userLocation: string;
  
  // Restaurants
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;
  
  // Bookings
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  
  // Orders
  cart: OrderItem[];
  addToCart: (item: OrderItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Snaps
  snaps: Snap[];
  toggleSnapLike: (snapId: string) => void;
  
  // Chats
  chats: typeof mockChats;
  
  // QR Scanning
  isQrScanning: boolean;
  setQrScanning: (scanning: boolean) => void;
  scannedRestaurant: Restaurant | null;
  setScannedRestaurant: (restaurant: Restaurant | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Navigation
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // User
  user: mockUser,
  
  // Location
  userLocation: 'Koramangala, Bangalore',
  
  // Restaurants
  restaurants: mockRestaurants,
  selectedRestaurant: null,
  setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
  
  // Bookings
  bookings: mockBookings,
  addBooking: (booking) => set((state) => ({ bookings: [booking, ...state.bookings] })),
  
  // Orders
  cart: [],
  addToCart: (item) => set((state) => {
    const existingItem = state.cart.find((i) => i.id === item.id);
    if (existingItem) {
      return {
        cart: state.cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    return { cart: [...state.cart, { ...item, quantity: 1 }] };
  }),
  removeFromCart: (itemId) => set((state) => ({
    cart: state.cart.filter((i) => i.id !== itemId),
  })),
  updateCartItemQuantity: (itemId, quantity) => set((state) => ({
    cart: quantity === 0
      ? state.cart.filter((i) => i.id !== itemId)
      : state.cart.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
  })),
  clearCart: () => set({ cart: [] }),
  
  // Snaps
  snaps: mockSnaps,
  toggleSnapLike: (snapId) => set((state) => ({
    snaps: state.snaps.map((snap) =>
      snap.id === snapId
        ? { ...snap, isLiked: !snap.isLiked, likes: snap.isLiked ? snap.likes - 1 : snap.likes + 1 }
        : snap
    ),
  })),
  
  // Chats
  chats: mockChats,
  
  // QR Scanning
  isQrScanning: false,
  setQrScanning: (scanning) => set({ isQrScanning: scanning }),
  scannedRestaurant: null,
  setScannedRestaurant: (restaurant) => set({ scannedRestaurant: restaurant }),
}));
