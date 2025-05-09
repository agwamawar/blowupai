import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { CompetitorBenchmark } from "@/components/CompetitorBenchmark";
import { BarChart2 } from "lucide-react";
import { CompetitorBenchmarkInsight } from "@/types/comparisonTypes";

interface BenchmarkAnalysisCardProps {
  contentInsights: CompetitorBenchmarkInsight[];
}

export function BenchmarkAnalysisCard({ contentInsights }: BenchmarkAnalysisCardProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary text-lg flex items-center">
          <BarChart2 className="h-5 w-5 mr-2" />
          Benchmark Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CompetitorBenchmark insights={contentInsights} />
      </CardContent>
    </Card>
  );
}
