import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { SimilarityIndex } from "@/types/comparisonTypes";

interface ContentPerformanceCardProps {
  similarityIndex: SimilarityIndex;
}

export function ContentPerformanceCard({ similarityIndex }: ContentPerformanceCardProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary text-lg flex items-center">
          <BarChart className="h-5 w-5 mr-2" />
          Content Performance Match
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Concept Similarity to Top Content</span>
                <span className="font-semibold">{similarityIndex?.conceptMatch || 72}%</span>
              </div>
              <Progress 
                value={similarityIndex?.conceptMatch || 72} 
                className="h-2" 
              />
              <p className="text-xs text-muted-foreground">
                How closely your content concept matches top performers in your niche
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Execution Quality Match</span>
                <span className="font-semibold">{similarityIndex?.executionMatch || 65}%</span>
              </div>
              <Progress 
                value={similarityIndex?.executionMatch || 65} 
                className="h-2" 
              />
              <p className="text-xs text-muted-foreground">
                How your production quality compares to category leaders
              </p>
            </div>
          </div>
          
          <div className="flex flex-col justify-center items-center bg-primary/5 p-4 rounded-lg">
            <div className="text-7xl font-bold text-primary mb-2">
              {Math.round((similarityIndex?.conceptMatch + similarityIndex?.executionMatch) / 2) || 68}%
            </div>
            <div className="text-sm text-center text-muted-foreground">
              Overall similarity to top performing content
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
