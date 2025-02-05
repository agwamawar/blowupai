import { useState } from "react";
import { Header } from "@/components/Header";
import { Features } from "@/components/Features";
import { UploadSection } from "@/components/UploadSection";
import { AnalysisResults } from "@/components/AnalysisResults";

const mockHeatmapData = [
  { time: "0s", engagement: 30 },
  { time: "5s", engagement: 45 },
  { time: "10s", engagement: 80 },
  { time: "15s", engagement: 60 },
  { time: "20s", engagement: 40 },
  { time: "25s", engagement: 70 },
  { time: "30s", engagement: 50 },
];

const Index = () => {
  const [showResults, setShowResults] = useState(false);
  const [engagementScore] = useState(78);

  return (
    <div className="min-h-screen bg-[#222222]">
      <div className="container mx-auto px-4 py-24">
        <div className="space-y-20 animate-fade-in">
          {/* Glassmorphic Hero Section */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg">
            <div className="space-y-12">
              <Header />
              <UploadSection onAnalyze={() => setShowResults(true)} />
            </div>
          </div>
          
          <Features />
          {showResults && (
            <AnalysisResults
              engagementScore={engagementScore}
              mockHeatmapData={mockHeatmapData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;