import { useState } from "react";
import { Header } from "@/components/Header";
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-6xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <Header />
            <UploadSection onAnalyze={() => setShowResults(true)} />
          </div>
        </div>
      </div>
      {showResults && (
        <div className="container mx-auto px-4 py-12">
          <AnalysisResults
            engagementScore={engagementScore}
            mockHeatmapData={mockHeatmapData}
          />
        </div>
      )}
    </div>
  );
};

export default Index;