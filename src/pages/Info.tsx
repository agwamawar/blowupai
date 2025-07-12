
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InfoUploadSection } from "@/components/InfoUploadSection";
import { InfoNavbar } from "@/components/InfoNavbar";
import { DoodlePattern } from "@/components/DoodlePattern";
import ContentExploreSection from "@/components/ContentExploreSection";
import { HowItWorksHorizontal } from "@/components/HowItWorksHorizontal";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FAQSection } from "@/components/FAQSection";

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

        {/* Doodle Pattern Background */}
        <DoodlePattern />

        {/* Hero Section - Main content container with relative positioning for BLOWUP text */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-32 md:pt-48 pb-16 px-4 sm:px-6 md:px-8" style={{ transform: 'translateY(10vh)' }}>
          {/* Container for upload section and BLOWUP text */}
          <div className="relative w-full max-w-4xl mx-auto animate-fade-in scale-90 sm:scale-95 md:scale-100" style={{ filter: 'drop-shadow(0 0 30px rgba(141, 76, 85, 0.25))' }}>
            {/* Giant BLOWUP text positioned just above the upload component */}
            <div className="absolute -top-16 md:-top-20 lg:-top-24 left-0 right-0 flex items-center justify-center z-0">
              <h1 className="font-orbitron font-black text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] leading-none text-white/60 select-none pointer-events-none relative flicker-text">
                BLOWUP
                {/* Primary glow - bright white */}
                <div className="absolute inset-0 font-orbitron font-black text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] leading-none text-white/40 blur-sm flicker-text"></div>
                {/* Secondary softer glow */}
                <div className="absolute inset-0 font-orbitron font-black text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] leading-none text-white/30 blur-md flicker-text"></div>
                {/* Outer luminescence */}
                <div className="absolute inset-0 font-orbitron font-black text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] leading-none text-white/20 blur-lg flicker-text"></div>
              </h1>
            </div>

            {/* Upload section */}
            <div className="relative z-10">
              <InfoUploadSection />
            </div>
          </div>

          {/* Action buttons below upload */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Button
              size="lg"
              className="bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-full px-8 py-4"
              onClick={() => navigate('/app')}
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

        {/* Content Explore Section */}
        <ContentExploreSection />

        {/* How It Works Section - New Horizontal Design */}
        <HowItWorksHorizontal />

        {/* Pricing Section */}
        <PricingSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Footer */}
        <Footer />
      </div>
    </TooltipProvider>
  );
}
