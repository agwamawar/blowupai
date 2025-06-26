import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InfoUploadSection } from "@/components/InfoUploadSection";
import { InfoNavbar } from "@/components/InfoNavbar";
import { DoodlePattern } from "@/components/DoodlePattern";
import ContentExploreSection from "@/components/ContentExploreSection";
import { useNavigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Check } from "lucide-react";

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

        {/* Content Explore Section */}
        <ContentExploreSection />

        {/* How It Works Section - Updated with BlowUp AI specific steps */}
        <section className="relative bg-black text-white py-32 px-6 md:px-12 border-t border-gray-800">
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-left mb-20">
              <h3 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-tight">
                How It Works
              </h3>
            </div>
            
            <div className="space-y-20">
              {/* Step 1 - Upload Your Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group cursor-pointer">
                <div className="order-2 lg:order-1 relative overflow-hidden rounded-xl">
                  <div className="w-full h-64 bg-gradient-to-br from-gray-800/30 to-gray-900/50 rounded-xl flex items-center justify-center transition-all duration-500 border border-gray-700/50 group-hover:border-[#8d4c55]/30">
                    <img 
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop" 
                      alt="Upload your video content" 
                      className="w-full h-64 object-cover rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 absolute inset-0 transform scale-95 group-hover:scale-100"
                    />
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="bg-gradient-to-br from-[#8d4c55]/20 to-blue-900/20 border border-[#8d4c55]/30 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                    <span className="text-xl font-medium text-white">1</span>
                  </div>
                  <h4 className="text-3xl font-medium text-white mb-4">Upload Your Content</h4>
                  <p className="text-gray-300 leading-relaxed text-xl font-light">
                    Drop your video or describe your content idea. BlowUp AI instantly begins processing your upload, extracting key elements and preparing for deep analysis.
                  </p>
                </div>
              </div>

              {/* Step 2 - AI Analysis Engine */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group cursor-pointer">
                <div className="order-2 relative overflow-hidden rounded-xl">
                  <div className="w-full h-64 bg-gradient-to-br from-blue-900/30 to-purple-900/50 rounded-xl flex items-center justify-center transition-all duration-500 border border-gray-700/50 group-hover:border-blue-500/30">
                    <img 
                      src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop" 
                      alt="AI analysis in progress" 
                      className="w-full h-64 object-cover rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 absolute inset-0 transform scale-95 group-hover:scale-100"
                    />
                  </div>
                </div>
                <div className="order-1">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                    <span className="text-xl font-medium text-white">2</span>
                  </div>
                  <h4 className="text-3xl font-medium text-white mb-4">AI Analysis Engine</h4>
                  <p className="text-gray-300 leading-relaxed text-xl font-light">
                    Our advanced AI scans your content across multiple dimensions - emotional triggers, trend alignment, audience engagement patterns, and viral potential scoring.
                  </p>
                </div>
              </div>

              {/* Step 3 - Get Actionable Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group cursor-pointer">
                <div className="order-2 lg:order-1 relative overflow-hidden rounded-xl">
                  <div className="w-full h-64 bg-gradient-to-br from-green-900/30 to-emerald-900/50 rounded-xl flex items-center justify-center transition-all duration-500 border border-gray-700/50 group-hover:border-green-500/30">
                    <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" 
                      alt="Actionable insights dashboard" 
                      className="w-full h-64 object-cover rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 absolute inset-0 transform scale-95 group-hover:scale-100"
                    />
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                    <span className="text-xl font-medium text-white">3</span>
                  </div>
                  <h4 className="text-3xl font-medium text-white mb-4">Get Actionable Insights</h4>
                  <p className="text-gray-300 leading-relaxed text-xl font-light">
                    Receive detailed optimization recommendations, viral score breakdowns, and platform-specific strategies to maximize your content's reach and engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="relative bg-black text-white py-32 px-6 md:px-12 border-t border-gray-800">
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h3 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-tight">
                Pricing
              </h3>
              <p className="text-gray-400 text-xl font-light max-w-3xl mx-auto">
                Take advantage of our early adopter pricing before we launch our tiered subscription model on July 28th.
              </p>
            </div>

            {/* Early Adopter Offer */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-[#8d4c55]/20 to-blue-900/20 border border-[#8d4c55]/30 rounded-xl p-8 max-w-2xl mx-auto text-center">
                <div className="bg-[#8d4c55]/20 text-[#8d4c55] text-sm font-medium px-4 py-2 rounded-full inline-block mb-4">
                  Early Adopter Special
                </div>
                <h4 className="text-3xl font-medium text-white mb-4">Lifetime Access</h4>
                <div className="text-5xl font-light text-white mb-4">
                  $99
                  <span className="text-lg text-gray-400 ml-2">one-time</span>
                </div>
                <p className="text-gray-400 mb-6">
                  Get lifetime access to BlowUp AI before our public launch. All features included, no monthly fees ever.
                </p>
                <Button
                  size="lg"
                  className="bg-[#8d4c55] hover:bg-[#8d4c55]/80 text-white rounded-full px-8 py-4"
                >
                  Claim Early Access
                </Button>
              </div>
            </div>

            {/* Future Pricing Plans */}
            <div className="mb-8">
              <h4 className="text-2xl font-medium text-white text-center mb-4">
                Post-Launch Pricing (Starting July 28th)
              </h4>
              <p className="text-gray-400 text-center mb-12">
                Our subscription plans will reflect added functionality and enhanced features.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <div className="bg-gray-900/40 border border-gray-800/50 rounded-xl p-8">
                <div className="text-center mb-6">
                  <h5 className="text-xl font-medium text-white mb-2">Starter</h5>
                  <div className="text-3xl font-light text-white mb-2">
                    $49
                    <span className="text-base text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-400 text-sm">Ideal for new creators</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#8d4c55]" />
                    <span className="text-gray-300">10 video analyses/month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#8d4c55]" />
                    <span className="text-gray-300">Basic trend insights</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#8d4c55]" />
                    <span className="text-gray-300">Platform optimization</span>
                  </li>
                </ul>
              </div>

              {/* Growth Plan */}
              <div className="bg-gray-900/40 border border-[#8d4c55]/30 rounded-xl p-8 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#8d4c55] text-white text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <h5 className="text-xl font-medium text-white mb-2">Growth</h5>
                  <div className="text-3xl font-light text-white mb-2">
                    $99
                    <span className="text-base text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-400 text-sm">Active content creators</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#8d4c55]" />
                    <span className="text-gray-300">30 video analyses/month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#8d4c55]" />
                    <span className="text-gray-300">Advanced engagement tools</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#8d4c55]" />
                    <span className="text-gray-300">Detailed analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#8d4c55]" />
                    <span className="text-gray-300">Priority support</span>
                  </li>
                </ul>
              </div>

              {/* Pro Plan */}
              <div className="bg-gray-900/40 border border-gray-800/50 rounded-xl p-8">
                <div className="text-center mb-6">
                  <h5 className="text-xl font-medium text-white mb-2">Pro</h5>
                  <div className="text-3xl font-light text-white mb-2">
                    $199
                    <span className="text-base text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-400 text-sm">Small teams/agencies</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#8d4c55]" />
                    <span className="text-gray-300">75 video analyses/month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#8d4c55]" />
                    <span className="text-gray-300">Multi-user access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#8d4c55]" />
                    <span className="text-gray-300">Team collaboration tools</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#8d4c55]" />
                    <span className="text-gray-300">Custom integrations</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-500 text-sm">
                All prices are in USD. Early adopter pricing ends July 28th, 2024.
              </p>
            </div>
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}
