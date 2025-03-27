
import { Card, CardContent } from "@/components/ui/card";

interface TrendScoreProps {
  trendScore: number;
}

export function TrendScore({ trendScore }: TrendScoreProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-700">Trend Match Score</span>
        <span className="font-bold text-primary">{trendScore}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div 
          className="bg-primary h-full rounded-full" 
          style={{ width: `${trendScore}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Your content matches {trendScore}% of what's trending right now
      </p>
    </div>
  );
}
