import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConceptAnalysisTab } from "./tabs/ConceptAnalysisTab";
import { ExecutionBreakdownTab } from "./tabs/ExecutionBreakdownTab";
import { ViralityScoreTab } from "./tabs/ViralityScoreTab";
import { ComparativeAnalysisTab } from "./tabs/ComparativeAnalysisTab";
import { HighlightMoment, InsightItem } from "@/types/insightTypes";
import { AnalysisDataType } from "@/types/analysisTypes";
import { conceptAnalysisMockData } from "@/mocks/conceptMocks";
import { executionAnalysisMockData } from "@/mocks/executionMocks";
import { viralityPredictionMockData, comparativeAnalysisMockData } from "@/mocks/viralityMocks";

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
  
  const conceptData = analysisData?.conceptAnalysis || conceptAnalysisMockData;
  const executionData = analysisData?.technicalAnalysis || executionAnalysisMockData;
  const viralityData = {
    engagementScore,
    viralityScore,
    predictions: analysisData?.viralityScore || viralityPredictionMockData
  };
  const comparativeData = analysisData?.similarContent || comparativeAnalysisMockData;
  
  const contentType = analysisData?.video_details?.contentType || "Video";
  
  const videoMetadata = {
    platform: analysisData?.video_metadata?.platform || "TikTok",
    contentType: contentType,
    duration: analysisData?.video_metadata?.duration || "0:45"
  };
  
  const contentRecommendations = analysisData?.contentRecommendations || {
    editing: [
      "Use more dynamic transitions between key points",
      "Add subtle zoom effects to emphasize important moments",
      "Consider more frequent cuts to maintain viewer interest"
    ],
    style: [
      "Maintain consistent color grading throughout the video",
      "Use consistent text styling for all on-screen elements",
      "Align visual elements with your overall brand aesthetic"
    ],
    narrative: [
      "Structure content with a clear beginning, middle, and end",
      "Use stronger pattern interrupts at retention drop points",
      "Create more emotional contrast throughout the video"
    ],
    audio: [
      "Improve audio balance between voice and background elements",
      "Add subtle sound effects to emphasize key points",
      "Consider background music that better matches the content tone"
    ],
    structure: [
      "Start with a stronger hook in the first 3 seconds",
      "Add clearer call-to-action in the final segment",
      "Break complex information into more digestible chunks"
    ]
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
          contentRecommendations={contentRecommendations}
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
