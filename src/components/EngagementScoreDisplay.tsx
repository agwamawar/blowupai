
import { Thermometer, TrendingUp, TrendingDown, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EngagementScoreDisplayProps {
  score: number;
  compareScore?: number;
}

export function EngagementScoreDisplay({ score, compareScore }: EngagementScoreDisplayProps) {
  // Get engagement score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  // Determine if trending up or down compared to benchmark
  const isTrendingUp = typeof compareScore === 'number' ? score > compareScore : true;
  
  // Calculate percentage difference if compareScore provided
  const percentDiff = typeof compareScore === 'number' 
    ? Math.round(((score - compareScore) / compareScore) * 100) 
    : null;

  // Score calculation explanation
  const scoreExplanation = "Score calculated based on: 40% retention metrics, 30% hook strength, 20% content uniqueness, 10% production quality";
  
  // Industry benchmarks by score range
  const getBenchmarkText = (score: number) => {
    if (score >= 85) return "Top 10% of creators in your category";
    if (score >= 75) return "Top 25% of creators in your category";
    if (score >= 65) return "Average performing content";
    return "Below average - needs improvement";
  };

  return (
    <div className="relative bg-white/80 backdrop-blur-md rounded-lg p-6 border border-white/20 shadow-md overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-x-8 -translate-y-8" />
      
      <div className="relative">
        <div className="flex items-center mb-2 justify-between">
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-semibold text-lg text-gray-800">Engagement Score</h3>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-gray-500 hover:text-gray-700">
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-white p-3 shadow-lg rounded-lg border border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-1">How is this calculated?</p>
                <p className="text-xs text-gray-500">{scoreExplanation}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-center">
            <div className={`text-5xl font-bold animate-pulse ${getScoreColor(score)}`}>
              {score}
            </div>
            <p className="text-gray-500 mt-1 text-sm">Out of 100</p>
            <p className="text-xs text-gray-600 mt-2 max-w-[150px]">{getBenchmarkText(score)}</p>
          </div>
          
          <div className="w-px h-16 bg-gray-200 mx-6" />
          
          <div className="flex-1 space-y-4">
            {isTrendingUp ? (
              <div className="flex items-center text-green-500">
                <TrendingUp size={18} className="mr-2" />
                <span className="font-medium">
                  {percentDiff ? `+${percentDiff}%` : "Trending Up"}
                </span>
                <span className="text-xs text-gray-500 ml-2">vs. category avg.</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500">
                <TrendingDown size={18} className="mr-2" />
                <span className="font-medium">
                  {percentDiff ? `${percentDiff}%` : "Trending Down"}
                </span>
                <span className="text-xs text-gray-500 ml-2">vs. category avg.</span>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Watch Time</span>
                <span className="font-medium text-gray-800">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
