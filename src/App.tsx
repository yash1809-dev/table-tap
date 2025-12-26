import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAppStore } from "@/store/useAppStore";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";
import { TopHeader } from "@/components/navigation/TopHeader";
import { HomeSection } from "@/components/sections/HomeSection";
import { BookingsSection } from "@/components/sections/BookingsSection";
import { OrdersSection } from "@/components/sections/OrdersSection";
import { SnapsSection } from "@/components/sections/SnapsSection";
import { ProfileSection } from "@/components/sections/ProfileSection";

const queryClient = new QueryClient();

const AppContent = () => {
  const { activeTab, selectedRestaurant, isQrScanning } = useAppStore();

  // Render active section
  const renderSection = () => {
    switch (activeTab) {
      case 'home':
        return <HomeSection />;
      case 'bookings':
        return <BookingsSection />;
      case 'orders':
        return <OrdersSection />;
      case 'snaps':
        return <SnapsSection />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <HomeSection />;
    }
  };

  // Hide header when in detail views
  const showHeader = !selectedRestaurant && !isQrScanning;

  return (
    <div className="min-h-screen bg-background">
      {showHeader && <TopHeader />}
      <main className="mx-auto max-w-lg">
        {renderSection()}
      </main>
      {!selectedRestaurant && !isQrScanning && <BottomNavigation />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner 
        position="top-center" 
        toastOptions={{
          style: {
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            color: 'hsl(var(--foreground))',
          },
        }}
      />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
