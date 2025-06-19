
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function InfoNavbar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleTryBlowUp = () => {
    navigate("/");
  };

  return (
    <div className="w-full fixed top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left side - Logo and nav items */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/900faaa6-34de-4dc6-adbd-8739fc835550.png" 
              alt="BlowUp AI" 
              className="h-8 w-auto object-contain cursor-pointer" 
              onClick={handleLogoClick}
            />
          </div>

          {/* Navigation items */}
          <nav className="hidden md:flex space-x-6">
            <button className="text-white/80 hover:text-white transition-colors font-medium">
              BlowUp
            </button>
            <button className="text-white/80 hover:text-white transition-colors font-medium">
              About
            </button>
            <button className="text-white/80 hover:text-white transition-colors font-medium">
              Resources
            </button>
          </nav>
        </div>

        {/* Right side - CTA Button */}
        <Button
          onClick={handleTryBlowUp}
          className="bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-full px-6"
        >
          Try BlowUp AI
        </Button>
      </div>
    </div>
  );
}
