
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConceptAnalysisTab } from "./tabs/ConceptAnalysisTab";
import { ExecutionBreakdownTab } from "./tabs/ExecutionBreakdownTab";
import { ViralityScoreTab } from "./tabs/ViralityScoreTab";
import { ComparativeAnalysisTab } from "./tabs/ComparativeAnalysisTab";
import { HighlightMoment, InsightItem } from "@/types/insightTypes";
import { AnalysisDataType } from "@/types/analysisTypes";
import { conceptAnalysisMockData, executionAnalysisMockData, viralityPredictionMockData, comparativeAnalysisMockData } from "@/mocks/insightsMockData";

interface PipelineAnalysisTabsProps {
  viralityScore: number;
  engagementScore: number;
  trendScore: number;
  trendingHashtags: string[];
  trendOpportunities: string[];
  recommendations: Array<{
    title: string;
    description: string;
    actionItems?: string[];
  }>;
  highlightMoments: HighlightMoment[];
  finalOptimizations: string[];
  contentInsights: InsightItem[];
  followerCount: number;
  onTimestampClick?: (timestamp: string) => void;
  analysisData?: AnalysisDataType;
}

export function PipelineAnalysisTabs({
  viralityScore,
  engagementScore,
  trendScore,
  trendingHashtags,
  trendOpportunities,
  recommendations,
  highlightMoments,
  finalOptimizations,
  contentInsights,
  followerCount,
  onTimestampClick,
  analysisData
}: PipelineAnalysisTabsProps) {
  const [activeTab, setActiveTab] = useState("concept");
  
  // Extract data from analysis or use fallbacks
  const conceptData = analysisData?.conceptAnalysis || conceptAnalysisMockData;
  const executionData = analysisData?.technicalAnalysis || executionAnalysisMockData;
  const viralityData = {
    engagementScore,
    viralityScore,
    predictions: analysisData?.viralityScore || viralityPredictionMockData
  };
  const comparativeData = analysisData?.similarContent || comparativeAnalysisMockData;
  
  // Extract video metadata for more specific insights
  const videoMetadata = {
    platform: analysisData?.video_metadata?.platform || "TikTok",
    contentType: analysisData?.video_details?.contentType || "Video",
    duration: analysisData?.video_metadata?.duration || "0:45"
  };
  
  return (
    <Tabs defaultValue="concept" onValueChange={setActiveTab} className="w-full">
      <div className="mb-6">
        <TabsList className="w-full flex justify-between items-center bg-transparent h-12 p-0 border-b border-border">
          <TabsTrigger 
            value="concept" 
            className="flex-1 text-base font-semibold h-full rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary transition-colors hover:text-primary/80"
          >
            Concept
          </TabsTrigger>
          <TabsTrigger 
            value="execution" 
            className="flex-1 text-base font-semibold h-full rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary transition-colors hover:text-primary/80"
          >
            Content
          </TabsTrigger>
          <TabsTrigger 
            value="virality" 
            className="flex-1 text-base font-semibold h-full rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary transition-colors hover:text-primary/80"
          >
            Metrics
          </TabsTrigger>
          <TabsTrigger 
            value="comparison" 
            className="flex-1 text-base font-semibold h-full rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary transition-colors hover:text-primary/80"
          >
            Comparison
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="concept" className="space-y-6 mt-0">
        <ConceptAnalysisTab 
          trendScore={trendScore}
          trendingHashtags={trendingHashtags}
          trendOpportunities={trendOpportunities}
          highlightMoments={highlightMoments}
          onTimestampClick={onTimestampClick}
          contentInsights={contentInsights}
          conceptData={conceptData}
          videoMetadata={videoMetadata}
        />
      </TabsContent>
      
      <TabsContent value="execution" className="space-y-6 mt-0">
        <ExecutionBreakdownTab 
          executionData={executionData}
          finalOptimizations={finalOptimizations}
          followerCount={followerCount}
          videoMetadata={videoMetadata}
          videoDetails={analysisData?.video_details}
        />
      </TabsContent>
      
      <TabsContent value="virality" className="space-y-6 mt-0">
        <ViralityScoreTab
          viralityData={viralityData}
          recommendations={recommendations}
          videoMetadata={videoMetadata}
        />
      </TabsContent>
      
      <TabsContent value="comparison" className="space-y-6 mt-0">
        <ComparativeAnalysisTab
          comparativeData={comparativeData}
          followerCount={followerCount}
          videoMetadata={videoMetadata}
        />
      </TabsContent>
    </Tabs>
  );
}
