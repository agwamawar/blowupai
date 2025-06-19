
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InfoUploadSection } from "@/components/InfoUploadSection";
import { useNavigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Info() {
  const navigate = useNavigate();

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0">
          {/* Deep purple to soft blue gradient on the right */}
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-900/20 via-purple-900/30 to-transparent opacity-70"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"></div>
        </div>

        {/* Giant BLOWUP text behind everything - positioned to not interfere with upload block */}
        <div className="absolute inset-0 flex items-center justify-center z-0" style={{ transform: 'translateY(-15vh)' }}>
          <h1 className="font-orbitron font-black text-[8vw] leading-none text-white/8 select-none pointer-events-none relative">
            BLOWUP
            {/* Primary internal glow - soft bluish-white */}
            <div className="absolute inset-0 font-orbitron font-black text-[8vw] leading-none text-blue-100/15 blur-sm"></div>
            {/* Secondary softer glow */}
            <div className="absolute inset-0 font-orbitron font-black text-[8vw] leading-none text-blue-200/10 blur-md"></div>
            {/* Subtle outer luminescence */}
            <div className="absolute inset-0 font-orbitron font-black text-[8vw] leading-none text-blue-300/5 blur-lg"></div>
          </h1>
        </div>

        {/* Main content - positioned lower than center */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-32 pb-16 px-8" style={{ transform: 'translateY(10vh)' }}>
          {/* Upload section with no width constraints */}
          <div className="w-full animate-fade-in" style={{ filter: 'drop-shadow(0 0 30px rgba(147, 51, 234, 0.25))' }}>
            <InfoUploadSection />
          </div>

          {/* Action buttons below upload */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Button
              size="lg"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105"
              onClick={() => navigate('/')}
            >
              Build with BlowUp
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              onClick={() => navigate('/terms')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
