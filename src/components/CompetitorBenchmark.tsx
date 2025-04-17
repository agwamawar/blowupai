
import { BarChart, Sigma, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BenchmarkChart } from "./comparison/charts/BenchmarkChart";
import { TopPerformersList } from "./comparison/TopPerformersList";
import { CompetitorBenchmarkInsight } from "@/types/comparisonTypes";
import { topPerformingContent } from "@/mocks/insightsMockData";

interface CompetitorBenchmarkProps {
  insights: CompetitorBenchmarkInsight[];
}

export function CompetitorBenchmark({ insights }: CompetitorBenchmarkProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary text-lg flex items-center">
          <BarChart className="h-5 w-5 text-primary mr-2" />
          Competitor Benchmarking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="text-gray-700 mb-3 flex items-center font-medium">
              <Sigma className="h-4 w-4 mr-1" /> 
              Your Content vs. Category Leaders
            </h4>
            <BenchmarkChart insights={insights} />
          </div>
          
          <div>
            <h4 className="text-gray-700 mb-3 flex items-center font-medium">
              <Trophy className="h-4 w-4 mr-1" />
              Top Performing Content in Your Category
            </h4>
            <TopPerformersList performers={topPerformingContent} />
          </div>
          
          <p className="text-xs text-gray-500 italic">
            Benchmark data sourced from top 5% of content in your niche over the past 30 days
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
