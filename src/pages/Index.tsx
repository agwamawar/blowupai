
import { useState } from "react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { AnalysisResults } from "@/components/AnalysisResults";
import { KeyFeatures } from "@/components/KeyFeatures";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleAnalysisComplete = (data: any) => {
    // Create enhanced mock heatmap data
    const mockHeatmapData = [];
    
    // Add best segments with higher engagement
    data.engagement_prediction?.best_segments?.forEach((segment: any) => {
      const [min, sec] = segment.timestamp.split(':').map(Number);
      mockHeatmapData.push({
        time: segment.timestamp,
        engagement: Math.floor(Math.random() * 15) + 85, // High engagement 85-100
      });
    });
    
    // Add some additional points for smoother visualization
    const videoDuration = 45; // Assuming 45 second video from metadata
    const totalPoints = 15; // Number of data points to generate
    
    for (let i = 0; i < totalPoints; i++) {
      const seconds = Math.floor((i * videoDuration) / totalPoints);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const timeString = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
      
      // Skip if this time is already in the heatmap data
      if (!mockHeatmapData.some(point => point.time === timeString)) {
        // More realistic engagement curve - higher at beginning, dips in middle, rises again
        let engagement;
        if (i < totalPoints * 0.2) {
          // First 20% - starts high and begins to drop
          engagement = Math.floor(Math.random() * 10) + 80;
        } else if (i < totalPoints * 0.6) {
          // Middle 40% - lower engagement
          engagement = Math.floor(Math.random() * 20) + 50;
        } else {
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

    setAnalysisData({
      ...data,
      heatmap_data: mockHeatmapData,
    });
    setShowResults(true);
  };

  if (showResults && analysisData) {
    return (
      <AnalysisResults
        engagementScore={analysisData.engagement_score || 0}
        mockHeatmapData={analysisData.heatmap_data || []}
        analysisData={analysisData}
      />
    );
  }

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
          
          <CountdownTimer />
          
          <section className="py-20">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
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
