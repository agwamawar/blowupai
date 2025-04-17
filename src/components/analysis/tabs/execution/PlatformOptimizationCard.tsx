
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PlatformOptimizationProps {
  platformOptimization: {
    correctAspectRatio: boolean;
    suggestedHashtags: string[];
  };
  finalOptimizations: string[];
}

export function PlatformOptimizationCard({
  platformOptimization,
  finalOptimizations
}: PlatformOptimizationProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-primary" />
          Platform Optimization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Aspect Ratio</span>
            {platformOptimization.correctAspectRatio ? (
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                Optimized
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                Needs Adjustment
              </Badge>
            )}
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Suggested Hashtags</h4>
            <div className="flex flex-wrap gap-2">
              {platformOptimization.suggestedHashtags.map((tag: string, i: number) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2 pt-2">
            <h4 className="text-sm font-medium">Critical Optimizations</h4>
            <div className="space-y-2">
              {finalOptimizations.map((opt, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-white font-bold">{i+1}</span>
                  </div>
                  <p className="text-sm">{opt}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="w-full">
              Apply AI Fixes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
