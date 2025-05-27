
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LightbulbIcon, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Recommendation {
  title: string;
  description: string;
  actionItems?: string[];
}

interface ImprovementSuggestionsCardProps {
  improvementSuggestions: string[];
  recommendations: Recommendation[];
}

export function ImprovementSuggestionsCard({ 
  improvementSuggestions, 
  recommendations 
}: ImprovementSuggestionsCardProps) {
  return (
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
  );
}
