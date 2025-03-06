
import { ChartBar, Info } from "lucide-react";
import { Area, AreaChart, XAxis, YAxis, ReferenceLine } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { EngagementScoreDisplay } from "./EngagementScoreDisplay";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  // Find the highest engagement point for reference line
  const maxEngagement = Math.max(...heatmapData.map(point => point.engagement));
  
  // Detailed explanations for each segment
  const getDetailedExplanation = (reason: string) => {
    const explanations: {[key: string]: string} = {
      "Strong opening hook": "The first 3 seconds feature movement and clear subject introduction, grabbing attention immediately",
      "High engagement segment": "Quick transitions and on-screen text overlay maintain viewer interest",
      "Effective closing": "Clear call-to-action and emotional resolution keeps viewers watching to completion"
    };
    return explanations[reason] || reason;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="md:col-span-1">
        <EngagementScoreDisplay score={engagementScore} compareScore={compareScore} />
      </div>
      <div className="md:col-span-2">
        <div className="bg-white/80 backdrop-blur-md rounded-lg p-6 border border-white/20 shadow-md h-full">
          <div className="flex items-center mb-4 justify-between">
            <div className="flex items-center">
              <ChartBar className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-semibold text-lg text-gray-800">Engagement Heatmap</h3>
            </div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-500 hover:text-gray-700">
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-white p-3 shadow-lg rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-1">Understanding the Heatmap</p>
                  <p className="text-xs text-gray-500">This shows viewer retention at each point in your video. Peaks indicate moments that captured attention, while drops show where viewers lost interest.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
                <ReferenceLine y={maxEngagement} stroke="#16a34a" strokeDasharray="3 3" />
                <ChartTooltip
                  content={({ active, payload }) => (
                    <ChartTooltipContent
                      active={active}
                      payload={payload}
                      formatter={(value) => {
                        // Find if this is a best segment
                        const bestSegment = bestSegments.find(seg => {
                          // Match the timestamp to the current tooltip point
                          const tooltipTime = payload?.[0]?.payload?.time;
                          return seg.timestamp === tooltipTime;
                        });
                        
                        return (
                          <div>
                            <div>{value}% engagement</div>
                            {bestSegment && (
                              <div className="text-xs text-green-600 mt-1 max-w-[180px]">
                                {getDetailedExplanation(bestSegment.reason)}
                              </div>
                            )}
                          </div>
                        );
                      }}
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
          
          <div className="mt-4 space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Key Engagement Drivers</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {bestSegments.slice(0, 3).map((segment, idx) => (
                <div key={idx} className="bg-gray-100 p-3 rounded-md flex flex-col gap-2 text-xs">
                  <div className="flex items-start gap-2">
                    <div className="min-w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium text-primary text-xs">{segment.timestamp}</span>
                    </div>
                    <span className="text-gray-900 font-medium">{segment.reason}</span>
                  </div>
                  <p className="text-gray-600 text-xs mt-1">{getDetailedExplanation(segment.reason)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
