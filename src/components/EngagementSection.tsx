
import { ChartBar } from "lucide-react";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { EngagementScoreDisplay } from "./EngagementScoreDisplay";

interface EngagementSectionProps {
  engagementScore: number;
  compareScore?: number;
  heatmapData: Array<{ time: string; engagement: number }>;
  bestSegments?: Array<{ timestamp: string; reason: string }>;
}

export function EngagementSection({ 
  engagementScore, 
  compareScore = 75,
  heatmapData,
  bestSegments = []
}: EngagementSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="md:col-span-1">
        <EngagementScoreDisplay score={engagementScore} compareScore={compareScore} />
      </div>
      <div className="md:col-span-2">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 h-full">
          <div className="flex items-center mb-4">
            <ChartBar className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-semibold text-lg text-white">Engagement Heatmap</h3>
          </div>
          
          <div className="h-[160px] w-full">
            <ChartContainer 
              className="h-full w-full"
              config={{
                line: {
                  color: "hsl(var(--primary))",
                },
              }}
            >
              <AreaChart data={heatmapData}>
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
          
          <div className="mt-2 grid grid-cols-3 gap-2">
            {bestSegments.slice(0, 3).map((segment, idx) => (
              <div key={idx} className="bg-slate-700/50 p-2 rounded-md flex items-start gap-2 text-xs">
                <div className="min-w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-medium text-primary text-xs">{segment.timestamp}</span>
                </div>
                <span className="text-slate-300">{segment.reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
