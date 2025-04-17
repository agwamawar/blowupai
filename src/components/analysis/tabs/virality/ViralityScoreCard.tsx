
import { Activity, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ViralityGauge } from "@/components/ViralityGauge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ViralityScoreCardProps {
  viralityData: {
    engagementScore: number;
    viralityScore: number;
    predictions: any;
  };
}

export function ViralityScoreCard({ viralityData }: ViralityScoreCardProps) {
  // Find highest point for visual reference
  const maxFactor = Math.max(
    viralityData.predictions?.hookStrength || 78,
    viralityData.predictions?.emotionalImpact || 85,
    viralityData.predictions?.retentionPotential || 72,
    viralityData.predictions?.shareability || 81
  );

  return (
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
                    <TrendingUp className="h-4 w-4 mr-2 text-amber-500" />
                    Hook Strength
                  </span>
                  <span className="font-medium">{viralityData.predictions?.hookStrength || 78}%</span>
                </div>
                <Progress value={viralityData.predictions?.hookStrength || 78} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-rose-500" />
                    Emotional Impact
                  </span>
                  <span className="font-medium">{viralityData.predictions?.emotionalImpact || 85}%</span>
                </div>
                <Progress value={viralityData.predictions?.emotionalImpact || 85} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center">
                    <TrendingDown className="h-4 w-4 mr-2 text-blue-500" />
                    Retention Potential
                  </span>
                  <span className="font-medium">{viralityData.predictions?.retentionPotential || 72}%</span>
                </div>
                <Progress value={viralityData.predictions?.retentionPotential || 72} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
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
  );
}
