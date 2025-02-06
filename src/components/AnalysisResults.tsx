import { ChartBar, Thermometer } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { DetailedAnalysis } from "./DetailedAnalysis";

interface AnalysisResultsProps {
  engagementScore: number;
  mockHeatmapData: Array<{ time: string; engagement: number }>;
  analysisData?: any; // We'll type this properly once we have the actual data structure
}

export function AnalysisResults({ engagementScore, mockHeatmapData, analysisData }: AnalysisResultsProps) {
  return (
    <div className="space-y-12 max-w-6xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-center">Analysis Results</h2>
      
      {/* Engagement Score */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Engagement Score</h3>
          </div>
          <span className="text-2xl font-bold">{engagementScore}/100</span>
        </div>
        <Progress value={engagementScore} className="h-3" />
      </div>

      {/* Heatmap Analysis */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ChartBar className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Engagement Heatmap</h3>
        </div>
        <div className="h-64 w-full">
          <ChartContainer
            className="h-full w-full"
            config={{
              line: {
                color: "hsl(var(--primary))",
              },
            }}
          >
            <AreaChart data={mockHeatmapData}>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip
                content={({ active, payload }) => (
                  <ChartTooltipContent
                    active={active}
                    payload={payload}
                    formatter={(value) => `${value}% engagement`}
                  />
                )}
              />
              <Area
                type="monotone"
                dataKey="engagement"
                stroke="hsl(var(--primary))"
                fill="url(#gradient)"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>

      {/* Detailed Analysis */}
      {analysisData && (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Detailed Analysis</h3>
          <DetailedAnalysis analysis={analysisData} />
        </div>
      )}
    </div>
  );
}