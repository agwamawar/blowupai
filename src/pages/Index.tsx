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

const mockAnalysisData = {
  visual_quality: {
    lighting: "Good",
    stability: "Average",
    clarity: "Good",
  },
  audio_analysis: {
    clarity: "Good",
    background_noise: "Low",
    emotion: "Positive",
  },
  content_analysis: {
    objects: ["Person", "Phone", "Desk", "Computer"],
    text_detected: ["Subscribe", "Follow"],
    scene_transitions: "Smooth transitions with appropriate pacing",
  },
  engagement_prediction: {
    estimated_likes: 1500,
    estimated_shares: 250,
    watch_time: "1:45",
    best_segments: [
      { timestamp: "0:15", reason: "High energy introduction" },
      { timestamp: "0:45", reason: "Engaging demonstration" },
      { timestamp: "1:30", reason: "Strong call to action" },
    ],
  },
};

const Index = () => {
  const [showResults, setShowResults] = useState(false);
  const [engagementScore] = useState(78);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4">
        <div className="space-y-20">
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 mt-8">
            <div className="max-w-5xl mx-auto space-y-12">
              <Header />
              <UploadSection onAnalyze={() => setShowResults(true)} />
            </div>
          </div>
          {showResults && (
            <AnalysisResults
              engagementScore={engagementScore}
              mockHeatmapData={mockHeatmapData}
              analysisData={mockAnalysisData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;