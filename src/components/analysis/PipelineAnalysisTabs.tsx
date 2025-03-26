import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConceptAnalysisTab } from "./tabs/ConceptAnalysisTab";
import { ExecutionBreakdownTab } from "./tabs/ExecutionBreakdownTab";
import { ViralityScoreTab } from "./tabs/ViralityScoreTab";
import { ComparativeAnalysisTab } from "./tabs/ComparativeAnalysisTab";
import { HighlightMoment, InsightItem } from "@/types/insightTypes";
import { AnalysisDataType } from "@/types/analysisTypes";
import { 
  conceptAnalysisMockData, 
  executionAnalysisMockData, 
  viralityPredictionMockData, 
  comparativeAnalysisMockData 
} from "@/mocks/insightsMockData";

export function PipelineAnalysisTabs() {
  const [activeTab, setActiveTab] = useState("concept");
  const [analysisData, setAnalysisData] = useState<AnalysisDataType | null>(null);

  useEffect(() => {
    const loadTabData = () => {
      switch (activeTab) {
        case "concept":
          setAnalysisData(prev => ({...prev, ...conceptAnalysisMockData}));
          break;
        case "execution":
          setAnalysisData(prev => ({...prev, ...executionAnalysisMockData}));
          break;
        case "virality":
          setAnalysisData(prev => ({...prev, ...viralityPredictionMockData}));
          break;
        case "comparative":
          setAnalysisData(prev => ({...prev, ...comparativeAnalysisMockData}));
          break;
      }
    };

    loadTabData();
  }, [activeTab]);

  return (
    <Tabs defaultValue="concept" onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="concept">Concept</TabsTrigger>
        <TabsTrigger value="execution">Execution</TabsTrigger>
        <TabsTrigger value="virality">Virality</TabsTrigger>
        <TabsTrigger value="comparative">Comparative</TabsTrigger>
      </TabsList>

      <TabsContent value="concept">
        <ConceptAnalysisTab data={analysisData?.concept} />
      </TabsContent>

      <TabsContent value="execution">
        <ExecutionBreakdownTab data={analysisData?.execution} />
      </TabsContent>

      <TabsContent value="virality">
        <ViralityScoreTab data={analysisData?.virality} />
      </TabsContent>

      <TabsContent value="comparative">
        <ComparativeAnalysisTab data={analysisData?.comparative} />
      </TabsContent>
    </Tabs>
  );
}