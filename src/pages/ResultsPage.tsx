
import React from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AnalysisResults } from "@/components/AnalysisResults";

export default function ResultsPage() {
  const location = useLocation();
  const { toast } = useToast();
  const [analysisData, setAnalysisData] = React.useState<any>(null);

  React.useEffect(() => {
    // Handle state passed from navigate()
    if (location.state?.analysisData) {
      setAnalysisData(location.state.analysisData);
      
      // Show toast when data arrives via navigation
      toast({
        title: "Analysis complete",
        description: "Your video analysis is ready to explore",
      });
    }
  }, [location.state, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {analysisData ? (
        <AnalysisResults 
          engagementScore={analysisData.engagement_score || 75}
          viralityScore={analysisData.virality_score || 82}
          analysisData={analysisData}
        />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">No Analysis Data</h2>
            <p className="text-muted-foreground mb-6">
              Please upload a video to analyze first.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
