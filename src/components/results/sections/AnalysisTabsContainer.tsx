
import React from "react";
import { Brain, Lightbulb, BarChart, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PipelineAnalysisTabs } from "@/components/analysis/PipelineAnalysisTabs";
import { InsightsPanel } from "@/components/InsightsPanel";
import { EngagementInsights } from "../EngagementInsights";
import { TrendingContentAnalysis } from "../TrendingContentAnalysis";

interface AnalysisTabsContainerProps {
  engagementScore: number;
  viralityScore: number;
  trendScore: number;
  trendingHashtags: string[];
  trendOpportunities: string[];
  recommendations: Array<{
    title: string;
    description: string;
    actionItems?: string[];
  }>;
  highlightMoments: any[];
  finalOptimizations: string[];
  contentInsights: any[];
  followerCount: number;
  analysisData: any;
  onTimestampClick: (timestamp: string) => void;
}

export function AnalysisTabsContainer({
  engagementScore,
  viralityScore,
  trendScore,
  trendingHashtags,
  trendOpportunities,
  recommendations,
  highlightMoments,
  finalOptimizations,
  contentInsights,
  followerCount,
  analysisData,
  onTimestampClick
}: AnalysisTabsContainerProps) {
  return (
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
            onTimestampClick={onTimestampClick}
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
          <EngagementInsights 
            engagementScore={engagementScore} 
            bestSegments={analysisData?.engagement_prediction?.best_segments || []} 
            onTimestampClick={onTimestampClick}
          />
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6">
          <TrendingContentAnalysis 
            trendScore={trendScore}
            trendingHashtags={trendingHashtags}
            trendOpportunities={trendOpportunities}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
