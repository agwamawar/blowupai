import { ViralityGauge } from "@/components/ViralityGauge";
import { TrendingUp, Flame, Activity, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HighlightMoment, InsightItem } from "@/types/insightTypes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckIcon, XIcon } from "lucide-react";

interface ConceptAnalysisTabProps {
  trendScore: number;
  trendingHashtags: string[];
  trendOpportunities: string[];
  highlightMoments: HighlightMoment[];
  contentInsights: InsightItem[];
  onTimestampClick?: (timestamp: string) => void;
  conceptData: any;
  videoMetadata: {
    platform: string;
    contentType: string;
    duration: string;
  };
}

export function ConceptAnalysisTab({
  trendScore,
  trendingHashtags,
  trendOpportunities,
  highlightMoments,
  contentInsights,
  onTimestampClick,
  conceptData,
  videoMetadata
}: ConceptAnalysisTabProps) {
  return (
    <div className="space-y-6">
      {/* Virality Score Gauge */}
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1 border border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary text-lg flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Virality Score
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ViralityGauge 
              score={conceptData.viralityScore} 
              size="medium" 
              showDetails={true}
            />
            <p className="text-sm text-center text-muted-foreground mt-2">
              Overall concept strength based on trend alignment, emotional appeal, hook strength, and uniqueness.
            </p>
          </CardContent>
        </Card>
        
        {/* Trend Alignment Box */}
        <Card className="flex-1 border border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Trend Alignment
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Category Match</span>
                <Badge variant="outline" className="font-normal">
                  {conceptData.trendAlignment?.categoryMatch || "Tutorials"}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Trend Lifespan</span>
                <Badge 
                  className={`font-normal ${
                    conceptData.trendAlignment?.trendLifespan === "New" 
                      ? "bg-green-500" 
                      : conceptData.trendAlignment?.trendLifespan === "Growing" 
                        ? "bg-yellow-500" 
                        : "bg-red-500"
                  } text-white`}
                >
                  {conceptData.trendAlignment?.trendLifespan || "Growing"}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Remix Potential</span>
                <div className="flex items-center">
                  <span className="mr-2 font-semibold">{conceptData.trendAlignment?.remixPotential || 8}/10</span>
                  <Progress value={(conceptData.trendAlignment?.remixPotential || 8) * 10} className="w-20 h-2" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {trendingHashtags.slice(0, 5).map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Psychological & Emotional Appeal */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
              <Flame className="h-5 w-5 mr-2" />
            Psychological & Emotional Appeal
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Primary Emotion</span>
                <Badge variant="outline" className="font-normal">
                  {conceptData.emotionalAppeal?.primaryEmotion || "Curiosity"}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Emotional Intensity</span>
                  <span className="font-semibold">{conceptData.emotionalAppeal?.intensityRating || 7}/10</span>
                </div>
                <Progress 
                  value={(conceptData.emotionalAppeal?.intensityRating || 7) * 10} 
                  className="h-2" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm font-medium">Psychological Hooks Used</span>
              <div className="grid grid-cols-1 gap-2">
                {(conceptData.emotionalAppeal?.psychologicalHooks || ["Curiosity Gap", "Value Proposition", "Relatability"]).map((hook, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{hook}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Hook & Retention Power */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Hook & Retention Power
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">First 3 Seconds Hook</span>
                  <span className="font-semibold">{conceptData.hookRetention?.openingHookStrength || 8}/10</span>
                </div>
                <Progress 
                  value={(conceptData.hookRetention?.openingHookStrength || 8) * 10} 
                  className="h-2" 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pattern Interrupt</span>
                {conceptData.hookRetention?.hasPatternDisrupt ? (
                  <CheckIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <XIcon className="h-5 w-5 text-red-500" />
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Rewatchability</span>
                  <span className="font-semibold">{conceptData.hookRetention?.rewatchability || 7}/10</span>
                </div>
                <Progress 
                  value={(conceptData.hookRetention?.rewatchability || 7) * 10} 
                  className="h-2" 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <span className="text-sm font-medium">Key Moments & Predicted Drop-offs</span>
              {highlightMoments.map((moment, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2 p-2 bg-muted/50 rounded cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => onTimestampClick?.(moment.timestamp)}
                >
                  <span className="text-sm font-medium min-w-12 text-primary">{moment.timestamp}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{moment.title}</p>
                    <p className="text-xs text-muted-foreground">{moment.description}</p>
                  </div>
                </div>
              ))}
              
              {conceptData.hookRetention?.predictedDropoffs?.map((dropoff: any, idx: number) => (
                <div 
                  key={`dropoff-${idx}`} 
                  className="flex items-start gap-2 p-2 bg-red-50 rounded"
                  onClick={() => onTimestampClick?.(dropoff.timestamp)}
                >
                  <span className="text-sm font-medium min-w-12 text-red-600">{dropoff.timestamp}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Potential Drop-off</p>
                    <p className="text-xs text-red-600">{dropoff.percentage}% viewers may leave here</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Uniqueness & Shareability */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Uniqueness & Shareability
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Originality Score</span>
                  <span className="font-semibold">{conceptData.uniqueness?.originalityScore || 6}/10</span>
                </div>
                <Progress 
                  value={(conceptData.uniqueness?.originalityScore || 6) * 10} 
                  className="h-2" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Shareability Score</span>
                  <span className="font-semibold">{conceptData.uniqueness?.shareabilityScore || 8}/10</span>
                </div>
                <Progress 
                  value={(conceptData.uniqueness?.shareabilityScore || 8) * 10} 
                  className="h-2" 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <span className="text-sm font-medium">Engagement Predictors</span>
              <div className="grid grid-cols-2 gap-2">
                {(conceptData.uniqueness?.engagementPredictors || ["Comments", "Saves", "Shares", "Duets"]).map((predictor, i) => (
                  <Badge key={i} className="justify-center py-1 bg-primary/10 hover:bg-primary/20 text-primary border-none">
                    {predictor}
                  </Badge>
                ))}
              </div>
              
              <div className="pt-4">
                <Button className="w-full">
                  Optimize Concept
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
