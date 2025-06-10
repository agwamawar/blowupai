
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Menu, X, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasLifetimeAccess, setHasLifetimeAccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has lifetime access
    const checkLifetimeAccess = () => {
      const lifetimeUser = localStorage.getItem('lifetimeAccessUser');
      setHasLifetimeAccess(!!lifetimeUser);
    };
    
    checkLifetimeAccess();
    
    // Add event listener for storage changes
    window.addEventListener('storage', checkLifetimeAccess);
    
    return () => {
      window.removeEventListener('storage', checkLifetimeAccess);
    };
  }, []);

  const handleGetAccess = async () => {
    navigate("/auth");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="w-full fixed top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200/30 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/900faaa6-34de-4dc6-adbd-8739fc835550.png" 
            alt="BlowUp AI" 
            className="h-8 w-auto object-contain" 
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block px-6 py-2 rounded-full">
          <nav className="flex gap-8">
            <a href="#features" className="text-gray-700 hover:text-primary transition-colors">
              Features
            </a>
            <a href="#blog" className="text-gray-700 hover:text-primary transition-colors">
              Learn
            </a>
            <a href="#learn" className="text-gray-700 hover:text-primary transition-colors">
              Blog
            </a>
          </nav>
        </div>

        {/* Desktop CTA Button */}
        {hasLifetimeAccess ? (
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <Star className="h-4 w-4 text-green-600" />
            <span className="text-green-700 font-medium text-sm">Lifetime Access</span>
          </div>
        ) : (
          <Button 
            variant="outline" 
            className="hidden md:inline-flex hover:bg-primary hover:text-white transition-colors px-8"
            onClick={handleGetAccess}
          >
            <Star className="h-4 w-4 mr-2" />
            Get Lifetime Access
          </Button>
        )}

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#blog" 
              className="text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Learn
            </a>
            <a 
              href="#learn" 
              className="text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </a>
            {hasLifetimeAccess ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                <Star className="h-4 w-4 text-green-600" />
                <span className="text-green-700 font-medium text-sm">Lifetime Access</span>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="w-full hover:bg-primary hover:text-white transition-colors"
                onClick={() => {
                  handleGetAccess();
                  setMobileMenuOpen(false);
                }}
              >
                <Star className="h-4 w-4 mr-2" />
                Get Lifetime Access
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
