
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, LightbulbIcon, Heart, Share2, Clock, TrendingUp, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ViralityGauge } from "@/components/ViralityGauge";
import { EmotionalTriggersChart } from "../charts/EmotionalTriggersChart";
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
  
  const improvementSuggestions = viralityData.predictions?.improvementSuggestions || [
    "Increase hook strength by adding movement in first 2 seconds",
    "Boost emotional appeal by connecting content to current events",
    "Optimize thumbnail with clearer text and more vibrant colors"
  ];
  
  const platformAlgorithmFit = viralityData.predictions?.platformAlgorithmFit || {
    overallScore: 82,
    factors: [
      { name: "Length", score: 95, description: "Optimal duration for platform" },
      { name: "Pacing", score: 78, description: "Good pacing but could be more dynamic" },
      { name: "Format", score: 88, description: "Format aligns well with trending content" },
      { name: "Audio", score: 76, description: "Voice clarity good, music could be better optimized" }
    ],
    recommendations: [
      "Add trending sound to increase algorithm visibility",
      "Include text overlay in first 3 seconds",
      "Use more dynamic transitions between key moments"
    ]
  };
  
  const viewerBehavior = viralityData.predictions?.viewerBehavior || {
    watchTime: {
      expected: "0:32",
      platformAverage: "0:28",
      percentile: 70
    },
    engagement: {
      likeRate: 8.2,
      commentRate: 2.3,
      shareRate: 3.1,
      saveRate: 4.8
    },
    retention: [
      { point: 0, value: 100 },
      { point: 25, value: 92 },
      { point: 50, value: 78 },
      { point: 75, value: 66 },
      { point: 100, value: 52 }
    ],
    dropOffPoints: [
      { timestamp: "0:18", reason: "Pacing slows" },
      { timestamp: "0:42", reason: "Content repetition" }
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
            <div className="flex flex-col items-center justify-center mb-6 md:mb-0">
              <ViralityGauge 
                score={viralityData.viralityScore} 
                size="large" 
                showDetails={true}
              />
              <p className="text-sm text-center text-muted-foreground mt-4 max-w-md">
                This score combines concept strength (40%), execution quality (40%) and platform fit (20%).
                Videos scoring above 80 typically see 5x more engagement than average.
              </p>
            </div>
            
            <div className="space-y-6 w-full md:w-1/2">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Key Virality Factors</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-amber-500" />
                      Hook Strength
                    </span>
                    <span className="font-medium">{viralityData.predictions?.hookStrength || 78}%</span>
                  </div>
                  <Progress value={viralityData.predictions?.hookStrength || 78} className="h-2" />
                </div>
                
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
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      Retention Potential
                    </span>
                    <span className="font-medium">{viralityData.predictions?.retentionPotential || 72}%</span>
                  </div>
                  <Progress value={viralityData.predictions?.retentionPotential || 72} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center">
                      <Share2 className="h-4 w-4 mr-2 text-green-500" />
                      Shareability
                    </span>
                    <span className="font-medium">{viralityData.predictions?.shareability || 81}%</span>
                  </div>
                  <Progress value={viralityData.predictions?.shareability || 81} className="h-2" />
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
            
            <div className="pt-3">
              <h3 className="text-sm font-medium mb-3">Emotion Distribution</h3>
              <div className="h-64">
                <EmotionalTriggersChart 
                  data={emotionalTriggers} 
                  duration={videoMetadata.duration} 
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Platform Algorithm Readiness */}
      <PlatformReadinessCard 
        platformData={platformAlgorithmFit}
        platform={videoMetadata.platform}
      />
      
      {/* Viewer Behavior Forecast */}
      <ViewerBehaviorCard 
        behaviorData={viewerBehavior}
        platform={videoMetadata.platform}
      />
      
      {/* AI-Powered Improvement Suggestions */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <LightbulbIcon className="h-5 w-5 mr-2" />
            AI-Powered Virality Optimizations
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
                <TrendingUp className="h-4 w-4 mr-2" />
                Generate Optimization Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
