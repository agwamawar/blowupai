
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  
  // Only show navbar on homepage and auth page
  const shouldShowNavbar = () => {
    // Always hide navbar on dashboard route
    if (location.pathname.startsWith('/dashboard')) {
      return false;
    }
    
    // Show navbar on these paths
    return ["/", "/auth", "/projects"].includes(location.pathname);
  };
  
  const showNavbar = shouldShowNavbar();
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-background/95">
      {showNavbar && <Navbar />}
      <main className={showNavbar ? "pt-20" : ""}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/projects" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
