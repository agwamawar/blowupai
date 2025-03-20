
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { KeyFeatures } from "@/components/KeyFeatures";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  const handleAnalysisComplete = (data: any) => {
    console.log("Analysis complete, data received:", data);
    setAnalysisData(data);
    setIsAnalyzing(false);
    
    navigate('/dashboard', { 
      state: { analysisData: data },
      replace: true 
    });
  };
          // Last 40% - rises again
          engagement = Math.floor(Math.random() * 25) + 65;
        }
        
        mockHeatmapData.push({
          time: timeString,
          engagement,
        });
      }
    }

    // Sort by timestamp
    mockHeatmapData.sort((a, b) => {
      const [aMin, aSec] = a.time.split(':').map(Number);
      const [bMin, bSec] = b.time.split(':').map(Number);
      return (aMin * 60 + aSec) - (bMin * 60 + bSec);
    });

    const enhancedData = {
      ...data,
      heatmap_data: mockHeatmapData,
    };

    console.log("Navigating to dashboard with analysis data");
    
    // Navigate to dashboard with the analysis data
    navigate('/dashboard', { 
      state: { analysisData: enhancedData },
      replace: true 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="space-y-12 md:space-y-20">
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/20 mt-8">
            <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
              <Header />
              <UploadSection onAnalyze={handleAnalysisComplete} />
            </div>
          </div>
          
          <div className="px-2 sm:px-4">
            <CountdownTimer />
          </div>
          
          <section className="py-12 md:py-20" id="features">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Key Features</h2>
            <KeyFeatures />
          </section>

          <HowItWorks />
          
          <Testimonials />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
