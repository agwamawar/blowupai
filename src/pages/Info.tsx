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

        {/* Hero Section - Main content container with relative positioning for BLOWUP text */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-48 pb-16 px-8" style={{ transform: 'translateY(10vh)' }}>
          {/* Container for upload section and BLOWUP text */}
          <div className="relative w-3/4 animate-fade-in scale-[0.75]" style={{ filter: 'drop-shadow(0 0 30px rgba(141, 76, 85, 0.25))' }}>
            {/* Giant BLOWUP text positioned to be 20% submerged in upload block from above */}
            <div className="absolute inset-0 flex items-center justify-center z-0" style={{ transform: 'translateY(-60%)' }}>
              <h1 className="font-orbitron font-black text-[12vw] leading-none text-white/60 select-none pointer-events-none relative flicker-text">
                BLOWUP
                {/* Primary glow - bright white */}
                <div className="absolute inset-0 font-orbitron font-black text-[12vw] leading-none text-white/40 blur-sm flicker-text"></div>
                {/* Secondary softer glow */}
                <div className="absolute inset-0 font-orbitron font-black text-[12vw] leading-none text-white/30 blur-md flicker-text"></div>
                {/* Outer luminescence */}
                <div className="absolute inset-0 font-orbitron font-black text-[12vw] leading-none text-white/20 blur-lg flicker-text"></div>
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

        {/* AI for Content Section - Clean, minimal style like Grok */}
        <section className="relative bg-black text-white py-32 px-6 md:px-12">
          <div className="relative z-10 max-w-7xl mx-auto">
            {/* 1. Main Value Proposition Block */}
            <div className="text-left mb-24">
              <h2 className="text-5xl md:text-6xl font-light mb-8 text-white tracking-tight">
                AI for Content
              </h2>
            </div>

            {/* 2. Key Features Block (Single Row with reduced spacing) */}
            <div className="mb-32">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 max-w-6xl">
                {/* Feature 1 */}
                <div className="text-left">
                  <h3 className="text-lg lg:text-2xl font-medium text-white mb-3 lg:mb-4">
                    Audience Intelligence
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm lg:text-lg font-light">
                    Real-time analysis of what your followers want — based on behavior, comments, and platform signals.
                  </p>
                </div>

                {/* Divider */}
                <div className="hidden lg:flex justify-center">
                  <div className="w-px h-full bg-gray-800"></div>
                </div>

                {/* Feature 2 */}
                <div className="text-left">
                  <h3 className="text-lg lg:text-2xl font-medium text-white mb-3 lg:mb-4">
                    AI Content Generation
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm lg:text-lg font-light">
                    Instantly generate content that aligns with audience desires and trending formats.
                  </p>
                </div>

                {/* Divider */}
                <div className="hidden lg:flex justify-center">
                  <div className="w-px h-full bg-gray-800"></div>
                </div>

                {/* Feature 3 */}
                <div className="text-left">
                  <h3 className="text-lg lg:text-2xl font-medium text-white mb-3 lg:mb-4">
                    Cross-Platform Optimization
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm lg:text-lg font-light">
                    Automatically adapts your content for TikTok, Instagram, YouTube, and more — no manual resizing or reformatting.
                  </p>
                </div>

                {/* Divider */}
                <div className="hidden lg:flex justify-center">
                  <div className="w-px h-full bg-gray-800"></div>
                </div>

                {/* Feature 4 */}
                <div className="text-left">
                  <h3 className="text-lg lg:text-2xl font-medium text-white mb-3 lg:mb-4">
                    Trend Prediction
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm lg:text-lg font-light">
                    Detect viral moments before they explode, so your content always rides the wave — not the aftermath.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. How It Works (3-Step Process) */}
            <div className="text-left">
              <h3 className="text-4xl md:text-5xl font-light text-white mb-20 tracking-tight">
                How It Works
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
                {/* Step 1 */}
                <div className="relative">
                  <div className="bg-gray-900/40 border border-gray-800/50 rounded-full w-20 h-20 flex items-center justify-center mb-8">
                    <span className="text-2xl font-light text-white">1</span>
                  </div>
                  <div className="text-4xl mb-6">📤</div>
                  <h4 className="text-2xl font-medium text-white mb-4">Upload or Describe</h4>
                  <p className="text-gray-400 leading-relaxed text-lg font-light">
                    Start with a rough idea, topic, or existing post.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="bg-gray-900/40 border border-gray-800/50 rounded-full w-20 h-20 flex items-center justify-center mb-8">
                    <span className="text-2xl font-light text-white">2</span>
                  </div>
                  <div className="text-4xl mb-6">🧠</div>
                  <h4 className="text-2xl font-medium text-white mb-4">AI Analyzes Signals</h4>
                  <p className="text-gray-400 leading-relaxed text-lg font-light">
                    BlowUp scans audience behavior and online trends across platforms.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="bg-gray-900/40 border border-gray-800/50 rounded-full w-20 h-20 flex items-center justify-center mb-8">
                    <span className="text-2xl font-light text-white">3</span>
                  </div>
                  <div className="text-4xl mb-6">🚀</div>
                  <h4 className="text-2xl font-medium text-white mb-4">Get Optimized Content</h4>
                  <p className="text-gray-400 leading-relaxed text-lg font-light">
                    Instantly receive tailored posts, captions, and creative suggestions that are built to perform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}
