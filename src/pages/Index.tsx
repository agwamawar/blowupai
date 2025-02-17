import { useState } from "react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { AnalysisResults } from "@/components/AnalysisResults";
import { KeyFeatures } from "@/components/KeyFeatures";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleAnalysisComplete = (data: any) => {
    // Create mock heatmap data based on best segments
    const mockHeatmapData = data.engagement_prediction?.best_segments?.map((segment: any) => ({
      time: segment.timestamp,
      engagement: Math.floor(Math.random() * 40) + 60, // Random value between 60-100
    })) || [];

    // Add some additional points for smoother visualization
    const additionalPoints = 10;
    for (let i = 0; i < additionalPoints; i++) {
      mockHeatmapData.push({
        time: `${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}`,
        engagement: Math.floor(Math.random() * 100),
      });
    }

    // Sort by timestamp
    mockHeatmapData.sort((a, b) => {
      const [aMin, aSec] = a.time.split(':').map(Number);
      const [bMin, bSec] = b.time.split(':').map(Number);
      return (aMin * 60 + aSec) - (bMin * 60 + bSec);
    });

    setAnalysisData({
      ...data,
      heatmap_data: mockHeatmapData,
    });
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4">
        <div className="space-y-20">
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 mt-8">
            <div className="max-w-5xl mx-auto space-y-12">
              <Header />
              <UploadSection onAnalyze={handleAnalysisComplete} />
            </div>
          </div>
          {showResults && analysisData && (
            <AnalysisResults
              engagementScore={analysisData.engagement_score || 0}
              mockHeatmapData={analysisData.heatmap_data || []}
              analysisData={analysisData}
            />
          )}

          <CountdownTimer />
          
          <section className="py-20">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <KeyFeatures />
          </section>

          <HowItWorks />
          
          <Testimonials />
          
          <section className="py-20">
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-12 shadow-xl border border-white/20 text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Boost Your Video Performance?</h2>
              <Button size="lg" className="mt-6">
                Get Started for Free
              </Button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;