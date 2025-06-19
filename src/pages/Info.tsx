
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InfoUploadSection } from "@/components/InfoUploadSection";
import { InfoNavbar } from "@/components/InfoNavbar";
import { useNavigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Brain, Video, TrendingUp, Zap } from "lucide-react";

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

        {/* Hero Section */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-48 pb-16 px-8">
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
          <div className="relative z-10 flex flex-col items-center justify-center" style={{ transform: 'translateY(10vh)' }}>
            {/* Upload section with increased width to be slightly longer than BLOWUP text */}
            <div className="w-[85%] animate-fade-in" style={{ filter: 'drop-shadow(0 0 30px rgba(141, 76, 85, 0.25))' }}>
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

        {/* AI for Content Section */}
        <div className="relative z-10 py-20 px-8">
          <div className="container mx-auto max-w-6xl">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                AI for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Content</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Harness the power of artificial intelligence to predict, analyze, and optimize your content for maximum viral potential across all social platforms.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Engagement Prediction */}
              <div className="group">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                      <Brain className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Engagement Prediction</h3>
                    <p className="text-white/70 text-sm">
                      AI-powered scoring that predicts likes, shares, and comments before you post
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Content Analysis */}
              <div className="group">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                      <Video className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Content Analysis</h3>
                    <p className="text-white/70 text-sm">
                      Deep dive into hook strength, pacing, emotional triggers, and storytelling elements
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Trend Matching */}
              <div className="group">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Trend Matching</h3>
                    <p className="text-white/70 text-sm">
                      Compare your content against current viral trends and platform-specific algorithms
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Optimization Tips */}
              <div className="group">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                      <Zap className="h-8 w-8 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Optimization Tips</h3>
                    <p className="text-white/70 text-sm">
                      Get actionable insights to improve your content's viral potential and engagement rates
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <p className="text-lg text-white/80 mb-6">
                Join thousands of creators who've increased their engagement by 300% with BlowUp AI
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 rounded-full px-10 py-4 text-lg"
                onClick={() => navigate('/')}
              >
                Start Analyzing Your Content
              </Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
