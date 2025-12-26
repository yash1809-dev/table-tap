import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { QrCode, Scan, Plus, Minus, ChefHat, ShoppingCart, X, Send } from 'lucide-react';
import { mockMenuItems } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const OrdersSection = () => {
  const { cart, addToCart, removeFromCart, updateCartItemQuantity, clearCart, isQrScanning, setQrScanning } = useAppStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);

  const categories = ['All', 'Pizza', 'Main Course', 'Starters', 'Salads', 'Desserts'];
  
  const filteredItems = activeCategory === 'All' 
    ? mockMenuItems 
    : mockMenuItems.filter(item => item.category === activeCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (item: typeof mockMenuItems[0]) => {
    addToCart({ ...item, quantity: 1 });
    toast.success(`${item.name} added`, {
      description: `₹${item.price} • Tap cart to view`,
    });
  };

  const handlePlaceOrder = () => {
    toast.success('Order Placed! 🎉', {
      description: 'Kitchen has received your order',
    });
    clearCart();
    setShowCart(false);
  };

  // QR Scanner View
  if (isQrScanning) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
        <button
          onClick={() => setQrScanning(false)}
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full glass"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative">
          <div className="h-64 w-64 rounded-3xl border-4 border-primary/50 p-4">
            <div className="h-full w-full rounded-2xl border-2 border-dashed border-primary/30 flex items-center justify-center">
              <Scan className="h-16 w-16 text-primary animate-pulse" />
            </div>
          </div>
          
          {/* Scanning corners */}
          <div className="absolute -left-1 -top-1 h-8 w-8 border-l-4 border-t-4 border-primary rounded-tl-lg" />
          <div className="absolute -right-1 -top-1 h-8 w-8 border-r-4 border-t-4 border-primary rounded-tr-lg" />
          <div className="absolute -bottom-1 -left-1 h-8 w-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
          <div className="absolute -bottom-1 -right-1 h-8 w-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
        </div>

        <p className="mt-8 text-lg font-medium">Scan Table QR Code</p>
        <p className="text-muted-foreground">Point camera at the QR code on your table</p>

        {/* Demo: Auto-open menu */}
        <button
          onClick={() => {
            setQrScanning(false);
            toast.success('Table #12 Connected', {
              description: 'The Golden Spoon menu loaded',
            });
          }}
          className="mt-8 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
        >
          Demo: Open Menu
        </button>
      </div>
    );
  }

  // Cart Sheet
  if (showCart) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-background animate-slide-up">
        <div className="flex items-center justify-between border-b border-border/30 p-4">
          <h2 className="text-xl font-bold">Your Order</h2>
          <button
            onClick={() => setShowCart(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <ShoppingCart className="h-16 w-16 text-muted-foreground/30" />
              <p className="mt-4 font-medium">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add items from the menu</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-xl glass p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">₹{item.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Chef Notes */}
              <div className="rounded-xl glass p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ChefHat className="h-5 w-5 text-primary" />
                  <span className="font-medium">Notes for Chef</span>
                </div>
                <textarea
                  placeholder="Any special instructions? (allergies, spice level...)"
                  className="w-full bg-transparent text-sm outline-none resize-none"
                  rows={2}
                />
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        {cart.length > 0 && (
          <div className="border-t border-border/30 p-4 glass-strong">
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxes</span>
                <span>₹{Math.round(cartTotal * 0.05)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="gradient-text">₹{Math.round(cartTotal * 1.05)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full rounded-xl py-4 font-semibold text-primary-foreground"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <span className="flex items-center justify-center gap-2">
                <Send className="h-5 w-5" />
                Place Order
              </span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="relative overflow-hidden px-4 py-6">
        <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        
        <h1 className="text-2xl font-bold">
          <span className="gradient-text">QR</span> Order
        </h1>
        <p className="mt-1 text-muted-foreground">
          Scan & order from your table
        </p>

        {/* Scan Button */}
        <button
          onClick={() => setQrScanning(true)}
          className="mt-4 flex items-center gap-3 rounded-2xl bg-primary/10 p-4 w-full border border-primary/20 hover:bg-primary/20 transition-colors"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
            <QrCode className="h-6 w-6 text-primary" />
          </div>
          <div className="text-left">
            <p className="font-semibold">Scan Table QR</p>
            <p className="text-sm text-muted-foreground">Start ordering instantly</p>
          </div>
        </button>
      </div>

      {/* Demo Menu */}
      <div className="px-4">
        <h2 className="mb-3 font-semibold">Demo Menu • The Golden Spoon</h2>

        {/* Categories */}
        <div className="mb-4 flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all',
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/50 text-foreground hover:bg-secondary'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {filteredItems.map((item, index) => {
            const inCart = cart.find((c) => c.id === item.id);
            
            return (
              <div
                key={item.id}
                className="flex gap-3 rounded-xl glass p-3 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                  {item.isPopular && (
                    <span className="absolute left-1 top-1 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-accent-foreground">
                      🔥
                    </span>
                  )}
                  <span className={cn(
                    'absolute bottom-1 right-1 h-4 w-4 rounded border-2 border-white flex items-center justify-center text-[8px]',
                    item.isVeg ? 'bg-success' : 'bg-destructive'
                  )}>
                    {item.isVeg ? '●' : '●'}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold text-primary">₹{item.price}</span>
                    
                    {inCart ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartItemQuantity(item.id, inCart.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center font-medium">{inCart.quantity}</span>
                        <button
                          onClick={() => updateCartItemQuantity(item.id, inCart.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Cart */}
      {cartItemCount > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-20 left-4 right-4 mx-auto max-w-lg rounded-2xl p-4 shadow-elevated animate-bounce-in"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <div className="flex items-center justify-between text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-semibold">{cartItemCount} items</p>
                <p className="text-sm opacity-80">View cart</p>
              </div>
            </div>
            <span className="text-lg font-bold">₹{Math.round(cartTotal * 1.05)}</span>
          </div>
        </button>
      )}
    </div>
  );
};
