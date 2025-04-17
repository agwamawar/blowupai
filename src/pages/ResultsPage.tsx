
import React from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PipelineAnalysisTabs } from "@/components/analysis/PipelineAnalysisTabs";
import { ViralMetrics } from "@/components/ViralMetrics";
import { BarChart, Brain, Lightbulb, TrendingUp } from "lucide-react";
import { InsightsPanel } from "@/components/InsightsPanel";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {analysisData ? (
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-left flex items-center gap-2">
              <BarChart className="h-8 w-8 text-primary" />
              📊 Your Analysis Results
            </h1>
            <p className="text-muted-foreground text-left">
              Here's how your content performed across key dimensions.
            </p>
          </div>
          
          {/* Overall Metrics Summary */}
          <ViralMetrics 
            trendScore={trendScore}
            projectedReachBoost={37}
            targetAudienceMatch={91}
          />
          
          {/* Tabbed Analysis Section */}
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
            <Tabs defaultValue="concept" className="w-full">
              <TabsList className="grid grid-cols-4 w-full mb-6">
                <TabsTrigger value="concept" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span>Concept</span>
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  <span>Content</span>
                </TabsTrigger>
                <TabsTrigger value="engagement" className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  <span>Engagement</span>
                </TabsTrigger>
                <TabsTrigger value="trends" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Top Content</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="concept" className="space-y-6">
                <PipelineAnalysisTabs
                  viralityScore={viralityScore}
                  engagementScore={engagementScore}
                  trendScore={trendScore}
                  trendingHashtags={trendingHashtags}
                  trendOpportunities={trendOpportunities}
                  recommendations={recommendations}
                  highlightMoments={highlightMoments}
                  finalOptimizations={finalOptimizations}
                  contentInsights={contentInsights}
                  followerCount={followerCount}
                  analysisData={analysisData}
                />
              </TabsContent>
              
              <TabsContent value="content" className="space-y-6">
                <InsightsPanel 
                  contentInsights={contentInsights}
                  trendingHashtags={trendingHashtags}
                  trendOpportunities={trendOpportunities}
                  recommendations={recommendations}
                  followerCount={followerCount}
                />
              </TabsContent>
              
              <TabsContent value="engagement" className="space-y-6">
                <div className="grid gap-4">
                  <h3 className="text-xl font-semibold">Engagement Insights</h3>
                  <p>Based on our analysis, your content has an engagement score of {engagementScore}/100.</p>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-medium mb-2">Key Moments for Engagement</h4>
                    <ul className="space-y-2">
                      {analysisData?.engagement_prediction?.best_segments?.map((segment: any, i: number) => (
                        <li key={i} className="flex justify-between">
                          <span className="font-medium">{segment.timestamp}</span>
                          <span>{segment.reason}</span>
                        </li>
                      )) || (
                        <li>No key moments identified in this video.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="trends" className="space-y-6">
                <div className="grid gap-4">
                  <h3 className="text-xl font-semibold">Trending Content Analysis</h3>
                  <p>See how your content aligns with current trends.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h4 className="font-medium mb-2">Trending Hashtags to Use</h4>
                      <div className="flex flex-wrap gap-2">
                        {trendingHashtags.map((tag: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-primary/20 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h4 className="font-medium mb-2">Trend Opportunities</h4>
                      <ul className="space-y-1">
                        {trendOpportunities.map((opp: string, i: number) => (
                          <li key={i} className="text-sm">• {opp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
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
