import React from "react";
import { Share2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { VideoSidebar } from "@/components/results/VideoSidebar";
import { AnalysisContent } from "@/components/results/AnalysisContent";
import { SummaryOverview } from "@/components/results/sections/SummaryOverview";
import { NoDataDisplay } from "@/components/results/NoDataDisplay";

export default function ResultsPage() {
  const location = useLocation();
  const { toast } = useToast();
  const [analysisData, setAnalysisData] = React.useState<any>(null);
  const [seekToTimestampFn, setSeekToTimestampFn] = React.useState<((timestamp: string) => void) | null>(null);

  React.useEffect(() => {
    console.log("ResultsPage mounted, location state:", location.state);
    
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

  // Use fallback data if no analysis data is available
  const engagementScore = analysisData?.engagement_score || 75;
  const viralityScore = analysisData?.virality_score || 82;
  const trendScore = analysisData?.trend_score || 79;
  
  // Extract trending data with fallbacks
  const trendingHashtags = analysisData?.trend_analysis?.hashtags || ["#trending", "#viral", "#content"];
  const trendOpportunities = analysisData?.trend_analysis?.opportunities || [
    "Use trending audio",
    "Add popular transitions",
    "Include relevant hashtags"
  ];
  
  // Extract recommendations with fallback
  const recommendations = analysisData?.recommendations || [
    {
      title: "Enhance Hook",
      description: "Your opening could be more captivating",
      actionItems: ["Add a question", "Start with a surprising fact"]
    }
  ];
  
  // Extract content insights
  const contentInsights = analysisData?.content_insights || [];
  
  // Extract highlight moments
  const highlightMoments = analysisData?.highlight_moments || [];
  
  // Extract final optimizations
  const finalOptimizations = analysisData?.final_optimizations || [];
  
  // Get follower count
  const followerCount = analysisData?.follower_count || 10000;

  // Handle the seek function from VideoSection
  const handleSeekToTimestamp = React.useCallback((seekFn: (timestamp: string) => void) => {
    setSeekToTimestampFn(() => seekFn);
  }, []);

  // Handle timestamp click in the analysis tabs
  const handleTimestampClick = React.useCallback((timestamp: string) => {
    if (seekToTimestampFn) {
      seekToTimestampFn(timestamp);
    }
  }, [seekToTimestampFn]);

  console.log("Rendering ResultsPage with analysisData:", !!analysisData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-10 border-b">
        <div className="flex items-center justify-between px-6 py-4 ml-[320px]">
          <h1 className="text-2xl font-bold">Analysis Report</h1>
          <Button size="sm" variant="secondary" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
      {analysisData ? (
        <div className="flex flex-col">
          {/* Fixed Video Sidebar */}
          <VideoSidebar 
            videoUrl={analysisData.video_url}
            onSeekToTimestamp={handleSeekToTimestamp}
          />
          
          {/* Main Analysis Area with left margin to accommodate fixed sidebar */}
          <div className="ml-[320px] min-h-screen">
            <div className="p-4 md:p-6">
              {/* Summary Overview Section */}
              <div className="mb-8">
                <SummaryOverview analysisData={analysisData} />
              </div>
              
              {/* Rest of the analysis content */}
              <AnalysisContent
                engagementScore={engagementScore}
                viralityScore={viralityScore}
                trendScore={analysisData?.trend_score || 79}
                trendingHashtags={trendingHashtags}
                trendOpportunities={trendOpportunities}
                recommendations={recommendations}
                highlightMoments={highlightMoments}
                finalOptimizations={finalOptimizations}
                contentInsights={contentInsights}
                followerCount={followerCount}
                analysisData={analysisData}
                onTimestampClick={handleTimestampClick}
              />
            </div>
          </div>
        </div>
      ) : (
        <NoDataDisplay />
      )}
    </div>
  );
}
