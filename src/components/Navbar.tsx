
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function Navbar() {
  const navigate = useNavigate();

  const handleWaitingList = async () => {
    navigate("/auth");
  };

  return (
    <div className="w-full fixed top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div>
          <span className="text-2xl font-bold text-primary">
            BlowUp AI
          </span>
        </div>

        {/* Glassmorphic Navigation Bar */}
        <div className="px-6 py-2 rounded-full">
          <nav className="flex gap-8">
            <a href="#features" className="text-gray-700 hover:text-primary transition-colors">
              Features
            </a>
            <a href="#blog" className="text-gray-700 hover:text-primary transition-colors">
              Blog
            </a>
            <a href="#learn" className="text-gray-700 hover:text-primary transition-colors">
              Learn
            </a>
          </nav>
        </div>

        {/* Join Waiting List Button */}
        <Button 
          variant="outline" 
          className="hover:bg-primary hover:text-white transition-colors"
          onClick={handleWaitingList}
        >
          Join Waiting List
        </Button>
      </div>
    </div>
  );
}
