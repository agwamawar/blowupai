
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Eye, Check, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { EmotionalTriggersChart } from "../charts/EmotionalTriggersChart";
import { ViewerRetentionGraph } from "../charts/ViewerRetentionGraph";
import { EngagementMetricsCard } from "./metrics/EngagementMetricsCard";
import { PlatformReadinessCard } from "./metrics/PlatformReadinessCard";
import { ViewerBehaviorCard } from "./metrics/ViewerBehaviorCard";

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
  const emotionalTriggers = viralityData.predictions?.emotionalTriggers || [
    { timestamp: "0:07", emotion: "curiosity", strength: 85, description: "Unexpected reveal creates strong curiosity" },
    { timestamp: "0:22", emotion: "humor", strength: 78, description: "Comedic timing on visual punchline" },
    { timestamp: "0:35", emotion: "empathy", strength: 92, description: "Relatable moment resonates strongly" }
  ];
  
  const platformAlgorithmFit = viralityData.predictions?.platformAlgorithmFit || {
    overallScore: 82,
    factors: [
      { name: "Length", score: 95, description: "Optimal duration for platform" },
      { name: "Pacing", score: 78, description: "Good pacing but could be more dynamic" },
      { name: "Format", score: 88, description: "Format aligns well with trending content" },
      { name: "Audio", score: 76, description: "Voice clarity good, music could be better optimized" }
    ]
  };
  
  return (
    <div className="space-y-6">
      {/* Overall Virality Score */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Virality Prediction
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="space-y-6 w-full">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Key Virality Factors</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-rose-500" />
                      Emotional Impact
                    </span>
                    <span className="font-medium">{viralityData.predictions?.emotionalImpact || 85}%</span>
                  </div>
                  <Progress value={viralityData.predictions?.emotionalImpact || 85} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-2 text-blue-500" />
                      Retention Potential
                    </span>
                    <span className="font-medium">{viralityData.predictions?.retentionPotential || 72}%</span>
                  </div>
                  <Progress value={viralityData.predictions?.retentionPotential || 72} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Emotional Triggers Section */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            Emotional Triggers
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your video has {emotionalTriggers.length} significant emotional moments that could drive engagement.
            </p>
            
            <div className="space-y-3">
              {emotionalTriggers.map((trigger, i) => (
                <div key={i} className="p-3 bg-muted/50 rounded-lg border border-muted">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 min-w-10 text-center">
                      <span className="text-sm font-medium">{trigger.timestamp}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-semibold capitalize">{trigger.emotion}</span>
                        <span className="text-xs font-medium px-2 py-0.5 bg-primary/10 rounded-full">
                          {trigger.strength}% Strength
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{trigger.description}</p>
                      <div className="mt-2">
                        <Progress value={trigger.strength} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Platform Algorithm Readiness */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Algorithm Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Algorithm Factors</h4>
              <div className="space-y-3">
                {platformAlgorithmFit.factors.map((factor, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center">
                        {factor.score >= 80 ? (
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        )}
                        {factor.name}
                      </span>
                      <span className="font-medium">{factor.score}%</span>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                    <p className="text-xs text-muted-foreground">{factor.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

