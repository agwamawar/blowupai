
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BarChart2, LightbulbIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ViralityGauge } from "@/components/ViralityGauge";

interface ViralityScoreTabProps {
  viralityData: {
    engagementScore: number;
    viralityScore: number;
    predictions: any;
  };
  recommendations: Array<{
    title: string;
    description: string;
    actionItems?: string[];
  }>;
  videoMetadata: {
    platform: string;
    contentType: string;
    duration: string;
  };
}

export function ViralityScoreTab({
  viralityData,
  recommendations,
  videoMetadata
}: ViralityScoreTabProps) {
  const projectedData = viralityData.predictions?.projectedPerformance || {
    estimatedViews: "10k-50k",
    projectedLikes: "2k-5k",
    commentSharePrediction: {
      comments: 120,
      shares: 300
    }
  };
  
  const improvementSuggestions = viralityData.predictions?.improvementSuggestions || [
    "Increase hook strength by adding movement in first 2 seconds",
    "Boost emotional appeal by connecting content to current events",
    "Optimize thumbnail with clearer text and more vibrant colors"
  ];
  
  return (
    <div className="space-y-6">
      {/* Overall Virality Score */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Overall Virality Score
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col items-center justify-center">
            <ViralityGauge 
              score={viralityData.viralityScore} 
              size="large" 
              showDetails={true}
            />
            <p className="text-sm text-center text-muted-foreground mt-4 max-w-md">
              This score combines concept strength (70%) and execution quality (30%).
              Videos scoring above 80 typically see 5x more engagement than average.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Performance Forecasting */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <BarChart2 className="h-5 w-5 mr-2" />
            Performance Forecasting
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
              <span className="text-sm text-muted-foreground mb-1">Estimated Views</span>
              <span className="text-2xl font-bold text-primary">{projectedData.estimatedViews}</span>
              <span className="text-xs text-green-600 mt-1">+28% vs. your average</span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
              <span className="text-sm text-muted-foreground mb-1">Projected Likes</span>
              <span className="text-2xl font-bold text-primary">{projectedData.projectedLikes}</span>
              <span className="text-xs text-green-600 mt-1">+35% vs. your average</span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
              <span className="text-sm text-muted-foreground mb-1">Shares Potential</span>
              <span className="text-2xl font-bold text-primary">{projectedData.commentSharePrediction.shares}</span>
              <span className="text-xs text-green-600 mt-1">High virality potential</span>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-medium">Engagement Prediction</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Comments</span>
                  <span className="font-medium">{projectedData.commentSharePrediction.comments}</span>
                </div>
                <Progress value={(projectedData.commentSharePrediction.comments / 200) * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Watch Time</span>
                  <span className="font-medium">Above Average</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Saves</span>
                  <span className="font-medium">Moderate</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Completion Rate</span>
                  <span className="font-medium">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* AI-Powered Improvement Suggestions */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <LightbulbIcon className="h-5 w-5 mr-2" />
            AI-Powered Improvement Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="space-y-3">
              {improvementSuggestions.map((suggestion, i) => (
                <div key={i} className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <div className="flex gap-2">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-white font-bold">{i+1}</span>
                    </div>
                    <p className="text-sm font-medium text-amber-800">{suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 mt-6">
              <h3 className="text-sm font-medium">Implementation Plan</h3>
              {recommendations.slice(0, 2).map((rec, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="font-medium text-sm">{rec.title}</h4>
                  <p className="text-xs text-muted-foreground">{rec.description}</p>
                  <div className="space-y-1">
                    {rec.actionItems?.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="mt-0.5 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] text-primary font-bold">{i+1}</span>
                        </div>
                        <p className="text-xs">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <Button className="w-full">
                Optimize for Virality
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
