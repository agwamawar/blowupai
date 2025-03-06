
import { Card, CardContent } from "@/components/ui/card";

interface ViralPerformanceMetricsProps {
  trendScore: number;
  projectedReachBoost?: number;
  targetAudienceMatch?: number;
}

export function ViralPerformanceMetrics({
  trendScore,
  projectedReachBoost = 37,
  targetAudienceMatch = 91
}: ViralPerformanceMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-primary/5 rounded-lg flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-primary mb-1">{trendScore}/100</div>
        <div className="text-sm text-gray-700 text-center">Virality Potential Score</div>
        <div className="text-xs text-green-600 mt-1">High probability of trending!</div>
      </div>
      <div className="p-4 bg-primary/5 rounded-lg flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-green-500 mb-1">+{projectedReachBoost}%</div>
        <div className="text-sm text-gray-700 text-center">Projected Reach Boost</div>
        <div className="text-xs text-green-600 mt-1">With the following optimizations!</div>
      </div>
      <div className="p-4 bg-primary/5 rounded-lg flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-primary mb-1">{targetAudienceMatch}%</div>
        <div className="text-sm text-gray-700 text-center">Target Audience Match</div>
        <div className="text-xs text-green-600 mt-1">Content aligns well with platform trends!</div>
      </div>
    </div>
  );
}
