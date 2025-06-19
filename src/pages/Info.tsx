
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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100 relative">
        {/* Navbar */}
        <InfoNavbar />

        {/* Main content container */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-32 pb-16 px-8">
          {/* Container for upload section and BLOWUP text */}
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Classic BLOWUP heading */}
            <div className="text-center mb-12">
              <h1 className="font-serif font-bold text-6xl md:text-8xl text-slate-800 tracking-wide mb-4">
                BLOWUP
              </h1>
              <div className="w-24 h-1 bg-slate-600 mx-auto"></div>
            </div>

            {/* Upload section */}
            <div className="mb-12">
              <InfoUploadSection />
            </div>

            {/* Action buttons below upload */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white transition-all duration-300 px-8 py-4 font-medium"
                onClick={() => navigate('/')}
              >
                Meet Other Creators
              </Button>
              
              <Button
                size="lg"
                className="bg-slate-700 border-2 border-slate-700 text-white hover:bg-white hover:text-slate-700 transition-all duration-300 px-8 py-4 font-medium"
                onClick={() => navigate('/terms')}
              >
                Book a Call
              </Button>
            </div>
          </div>
        </div>

        {/* AI for Content Section */}
        <section className="bg-white border-t-2 border-slate-200 py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                AI for Content
              </h2>
              <div className="w-16 h-1 bg-slate-600 mx-auto mb-8"></div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Transform your content strategy with intelligent analysis and optimization
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Feature 1 */}
              <div className="text-center p-8 border border-slate-200 bg-slate-50">
                <div className="w-16 h-16 bg-slate-700 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">01</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-slate-800 mb-4">
                  Instant Analysis
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Upload your content and receive comprehensive analysis within seconds, 
                  identifying key opportunities for viral growth.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center p-8 border border-slate-200 bg-slate-50">
                <div className="w-16 h-16 bg-slate-700 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">02</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-slate-800 mb-4">
                  Platform Optimization
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Tailored recommendations for Facebook, Twitter, TikTok, and other 
                  platforms to maximize your reach and engagement.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center p-8 border border-slate-200 bg-slate-50">
                <div className="w-16 h-16 bg-slate-700 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">03</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-slate-800 mb-4">
                  Trend Intelligence
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Stay ahead of the curve with AI-powered trend analysis that identifies 
                  emerging opportunities in your niche.
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="border-t border-slate-200 pt-16">
              <h3 className="font-serif text-3xl font-bold text-slate-800 text-center mb-12">
                How It Works
              </h3>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-slate-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    1
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Upload</h4>
                  <p className="text-sm text-slate-600">Share your video content with our platform</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-slate-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    2
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Analyze</h4>
                  <p className="text-sm text-slate-600">AI examines content structure and trends</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-slate-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    3
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Optimize</h4>
                  <p className="text-sm text-slate-600">Receive tailored improvement suggestions</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-slate-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    4
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Publish</h4>
                  <p className="text-sm text-slate-600">Deploy optimized content across platforms</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16 p-12 border-2 border-slate-300 bg-slate-50">
              <h3 className="font-serif text-2xl font-bold text-slate-800 mb-4">
                Ready to Make Your Content BlowUp?
              </h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Join thousands of creators who have transformed their content strategy 
                with our AI-powered analysis and optimization tools.
              </p>
              <Button
                size="lg"
                className="bg-slate-700 hover:bg-slate-800 text-white px-12 py-4 font-medium"
                onClick={() => navigate('/')}
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}
