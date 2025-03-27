
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, TrendingUp, Activity, Brain } from "lucide-react";
import { AnalysisDataType } from "@/types/analysisTypes";

interface ResultsPageProps {
  analysisData: AnalysisDataType;
}

export function ResultsPage({ analysisData }: ResultsPageProps) {
  useEffect(() => {
    console.log("Rendering results with analysis data:", analysisData);
  }, [analysisData]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Content Performance Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">
                {analysisData.engagement_score || 0}%
              </span>
              <Progress value={analysisData.engagement_score || 0} className="w-2/3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Concept Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Content Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {analysisData.content_analysis?.main_themes?.map((theme, i) => (
              <div key={i} className="flex items-center gap-2">
                <Badge variant="outline">{theme}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Trend Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysisData.trend_analysis?.opportunities?.map((opp, i) => (
              <div key={i} className="p-3 bg-muted rounded-lg">
                {opp}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Engagement Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Engagement Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysisData.engagement_prediction?.best_segments?.map((segment, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>{segment.timestamp}</span>
                <span>{segment.reason}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
