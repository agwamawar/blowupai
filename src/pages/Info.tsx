
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadSection } from "@/components/UploadSection";
import { useNavigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Info() {
  const navigate = useNavigate();

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Background mist/nebula effect */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-purple-900/30 via-purple-800/20 to-transparent opacity-60 animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/15 rounded-full blur-2xl animate-bounce"></div>
          
          {/* Swirling mist animation */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-spin"></div>
            <div className="absolute top-2/3 right-1/2 w-24 h-24 bg-pink-400/10 rounded-full blur-lg animate-ping"></div>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
          {/* Hero title with glow effect */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 relative">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent animate-pulse">
                BlowUp AI
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent blur-sm opacity-50 animate-pulse"></div>
            </h1>
            
            {/* Glowing underline */}
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full shadow-lg shadow-purple-500/50 animate-pulse"></div>
          </div>

          {/* Upload section - dark mode styling */}
          <div className="w-full max-w-3xl mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Card className="bg-gray-900/80 border-purple-500/30 backdrop-blur-sm shadow-2xl shadow-purple-500/20">
              <CardContent className="p-0">
                <UploadSection />
              </CardContent>
            </Card>
          </div>

          {/* Headline */}
          <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '1s' }}>
            <h2 className="text-2xl md:text-3xl font-light text-gray-200 leading-relaxed">
              Unleash BlowUp AI — 
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-medium">
                {" "}Superintelligent performance
              </span>
              <br />
              for your data, content, and ideas.
            </h2>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 animate-fade-in" style={{ animationDelay: '1.5s' }}>
            <Button
              size="lg"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105"
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

          {/* Subtle particle effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-20"></div>
            <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-30"></div>
            <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce opacity-25"></div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
