import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <div className="w-full fixed top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-primary">
          Blowup AI
        </div>

        {/* Glassmorphic Navigation Bar */}
        <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-white/10">
          <nav className="flex gap-8">
            <a href="#features" className="text-white hover:text-primary transition-colors">
              Features
            </a>
            <a href="#blog" className="text-white hover:text-primary transition-colors">
              Blog
            </a>
            <a href="#learn" className="text-white hover:text-primary transition-colors">
              Learn
            </a>
          </nav>
        </div>

        {/* Create Account Button */}
        <Button variant="outline" className="hover:bg-primary hover:text-white transition-colors">
          Create Account
        </Button>
      </div>
    </div>
  );
}