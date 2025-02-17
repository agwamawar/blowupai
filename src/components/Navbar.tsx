
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function Navbar() {
  const navigate = useNavigate();

  const handleWaitingList = async () => {
    navigate("/auth");
  };

  return (
    <div className="w-full fixed top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center">
        {/* Logo - Fixed */}
        <div className="flex-shrink-0">
          <span className="text-2xl font-bold text-primary">
            BlowUp AI
          </span>
        </div>

        {/* Glassmorphic Navigation Bar - Scrollable */}
        <div className="flex-grow overflow-x-auto mx-4">
          <div className="bg-white/70 backdrop-blur-md px-6 py-2 rounded-full shadow-lg inline-block min-w-max">
            <nav className="flex gap-8">
              <a href="#features" className="text-gray-700 hover:text-primary transition-colors whitespace-nowrap">
                Features
              </a>
              <a href="#blog" className="text-gray-700 hover:text-primary transition-colors whitespace-nowrap">
                Blog
              </a>
              <a href="#learn" className="text-gray-700 hover:text-primary transition-colors whitespace-nowrap">
                Learn
              </a>
            </nav>
          </div>
        </div>

        {/* Join Waiting List Button - Fixed */}
        <div className="flex-shrink-0">
          <Button 
            variant="outline" 
            className="hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
            onClick={handleWaitingList}
          >
            Join Waiting List
          </Button>
        </div>
      </div>
    </div>
  );
}
