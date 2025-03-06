
import { Thermometer, TrendingUp, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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

  return (
    <div className="relative bg-white/80 backdrop-blur-md rounded-lg p-6 border border-white/20 shadow-md overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-x-8 -translate-y-8" />
      
      <div className="relative">
        <div className="flex items-center mb-2">
          <Thermometer className="h-5 w-5 text-primary mr-2" />
          <h3 className="font-semibold text-lg text-gray-800">Engagement Score</h3>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-center">
            <div className={`text-5xl font-bold animate-pulse ${getScoreColor(score)}`}>
              {score}
            </div>
            <p className="text-gray-500 mt-1 text-sm">Out of 100</p>
          </div>
          
          <div className="w-px h-16 bg-gray-200 mx-6" />
          
          <div className="flex-1 space-y-4">
            {isTrendingUp ? (
              <div className="flex items-center text-green-500">
                <TrendingUp size={18} className="mr-2" />
                <span className="font-medium">
                  {percentDiff ? `+${percentDiff}%` : "Trending Up"}
                </span>
              </div>
            ) : (
              <div className="flex items-center text-red-500">
                <TrendingDown size={18} className="mr-2" />
                <span className="font-medium">
                  {percentDiff ? `${percentDiff}%` : "Trending Down"}
                </span>
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
