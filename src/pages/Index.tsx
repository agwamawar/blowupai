import { useState } from "react";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { AnalysisResults } from "@/components/AnalysisResults";

const Index = () => {
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleAnalysisComplete = (data: any) => {
    setAnalysisData(data);
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
        </div>
      </div>
    </div>
  );
};

export default Index;