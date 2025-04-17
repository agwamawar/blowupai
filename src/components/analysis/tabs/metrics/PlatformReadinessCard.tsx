
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Check, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PlatformFactor {
  name: string;
  score: number;
  description: string;
}

interface PlatformReadinessProps {
  platformData: {
    overallScore: number;
    factors: PlatformFactor[];
    recommendations: string[];
  };
  platform: string;
}

export function PlatformReadinessCard({ platformData, platform }: PlatformReadinessProps) {
  // Get platform display name
  const getPlatformName = (platform: string) => {
    const platforms: Record<string, string> = {
      'tiktok': 'TikTok',
      'youtube': 'YouTube',
      'instagram': 'Instagram',
      'facebook': 'Facebook'
    };
    return platforms[platform.toLowerCase()] || platform;
  };
  
  // Get platform-specific message
  const getPlatformMessage = (platform: string, score: number) => {
    if (score >= 85) {
      return `Your content is highly optimized for ${getPlatformName(platform)}'s algorithm.`;
    } else if (score >= 70) {
      return `Your content aligns well with ${getPlatformName(platform)}'s algorithm, with room for improvement.`;
    } else {
      return `Your content may need significant adjustments to perform well on ${getPlatformName(platform)}.`;
    }
  };
  
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary text-lg flex items-center">
          <Monitor className="h-5 w-5 mr-2" />
          {getPlatformName(platform)} Algorithm Optimization
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Overall Platform Readiness</h3>
              <p className="text-sm text-muted-foreground">{getPlatformMessage(platform, platformData.overallScore)}</p>
            </div>
            <div className="text-2xl font-bold text-primary">{platformData.overallScore}%</div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Algorithm Factors</h4>
            <div className="space-y-3">
              {platformData.factors.map((factor, i) => (
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
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Platform-Specific Optimizations</h4>
            {platformData.recommendations.map((rec, i) => (
              <div key={i} className="p-3 bg-muted rounded-lg text-sm">
                {rec}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
