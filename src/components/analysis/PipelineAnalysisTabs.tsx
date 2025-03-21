
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
  
  return (
    <Tabs defaultValue="concept" onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-between items-center mb-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="concept" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Concept Analysis</span>
            <span className="sm:hidden">Concept</span>
            <span className="ml-1 text-xs opacity-75">(70%)</span>
          </TabsTrigger>
          <TabsTrigger value="execution" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Execution</span>
            <span className="sm:hidden">Execution</span>
            <span className="ml-1 text-xs opacity-75">(30%)</span>
          </TabsTrigger>
          <TabsTrigger value="virality" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Virality Score</span>
            <span className="sm:hidden">Virality</span>
          </TabsTrigger>
          <TabsTrigger value="comparison" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Comparison</span>
            <span className="sm:hidden">Compare</span>
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
        />
      </TabsContent>
      
      <TabsContent value="execution" className="space-y-6 mt-0">
        <ExecutionBreakdownTab 
          executionData={executionData}
          finalOptimizations={finalOptimizations}
          followerCount={followerCount}
        />
      </TabsContent>
      
      <TabsContent value="virality" className="space-y-6 mt-0">
        <ViralityScoreTab
          viralityData={viralityData}
          recommendations={recommendations}
        />
      </TabsContent>
      
      <TabsContent value="comparison" className="space-y-6 mt-0">
        <ComparativeAnalysisTab
          comparativeData={comparativeData}
          followerCount={followerCount}
        />
      </TabsContent>
    </Tabs>
  );
}
