
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InfoUploadSection } from "@/components/InfoUploadSection";
import { InfoNavbar } from "@/components/InfoNavbar";
import { useNavigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Info() {
  const navigate = useNavigate();

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Navbar */}
        <InfoNavbar />

        {/* Background gradient effects */}
        <div className="absolute inset-0">
          {/* Deep purple to soft blue gradient on the right */}
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-900/20 via-[#8d4c55]/30 to-transparent opacity-70"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#8d4c55]/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"></div>
        </div>

        {/* Giant BLOWUP text behind everything - positioned to overlap with upload block */}
        <div className="absolute inset-0 flex items-center justify-center z-0" style={{ transform: 'translateY(1vh)' }}>
          <h1 className="font-orbitron font-black text-[8vw] leading-none text-white/60 select-none pointer-events-none relative flicker-text">
            BLOWUP
            {/* Primary glow - bright white */}
            <div className="absolute inset-0 font-orbitron font-black text-[8vw] leading-none text-white/40 blur-sm flicker-text"></div>
            {/* Secondary softer glow */}
            <div className="absolute inset-0 font-orbitron font-black text-[8vw] leading-none text-white/30 blur-md flicker-text"></div>
            {/* Outer luminescence */}
            <div className="absolute inset-0 font-orbitron font-black text-[8vw] leading-none text-white/20 blur-lg flicker-text"></div>
          </h1>
        </div>

        {/* Main content - positioned lower than center with top padding for navbar */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-48 pb-16 px-8" style={{ transform: 'translateY(10vh)' }}>
          {/* Upload section with 75% scale */}
          <div className="w-3/4 animate-fade-in scale-[0.75]" style={{ filter: 'drop-shadow(0 0 30px rgba(141, 76, 85, 0.25))' }}>
            <InfoUploadSection />
          </div>

          {/* Action buttons below upload */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Button
              size="lg"
              className="bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-full px-8 py-4"
              onClick={() => navigate('/')}
            >
              Meet Other Creators
            </Button>
            
            <Button
              size="lg"
              className="bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-full px-8 py-4"
              onClick={() => navigate('/terms')}
            >
              Book a Call
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
