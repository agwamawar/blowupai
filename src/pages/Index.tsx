import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { CountdownTimer } from "@/components/CountdownTimer";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { KeyFeatures } from "@/components/KeyFeatures";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // This function will be called when the analysis is complete
  const handleAnalysisComplete = (data: any) => {
    console.log("Analysis complete, data received:", data);

    // Process the data to extract engagement segments for heatmap visualization
    const heatmapData = data.engagement_prediction?.segments?.map((segment: any) => ({
      time: segment.timestamp,
      engagement: segment.engagement_score
    })) || [];

    // Store the analysis data
    setAnalysisData(data);
    setIsAnalyzing(false);

    // Navigate to the dashboard with the analysis data
    navigate('/dashboard', { 
      state: { analysisData: data },
      replace: true 
    });
  };

  // Check for pending analysis after login
  useEffect(() => {
    const pendingAction = sessionStorage.getItem('pendingAction');
    if (pendingAction === 'analyze') {
      const storedData = sessionStorage.getItem('analysisData');
      if (storedData) {
        const analysisData = JSON.parse(storedData);
        handleAnalysisComplete(analysisData);
        sessionStorage.removeItem('pendingAction');
        sessionStorage.removeItem('analysisData');
      }
    }
  }, [location]); // Run this effect when location changes (after login redirect)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="space-y-12 md:space-y-20">
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/20 mt-8">
            <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
              <Header />
              <UploadSection />
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
