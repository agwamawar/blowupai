
import { Card, CardContent } from "@/components/ui/card";

interface ViralMetricsProps {
  trendScore: number;
  projectedReachBoost?: number;
  targetAudienceMatch?: number;
}

export function ViralMetrics({
  trendScore,
  projectedReachBoost = 37,
  targetAudienceMatch = 91
}: ViralMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-primary/5 rounded-lg flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-primary mb-1">{trendScore}/100</div>
        <div className="text-sm text-gray-700 text-center">How Viral Your Video Could Be</div>
        <div className="text-xs text-green-600 mt-1">Your video has a good chance of trending!</div>
      </div>
      <div className="p-4 bg-primary/5 rounded-lg flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-green-500 mb-1">+{projectedReachBoost}%</div>
        <div className="text-sm text-gray-700 text-center">More Views You Could Get</div>
        <div className="text-xs text-green-600 mt-1">By making the suggested changes!</div>
      </div>
      <div className="p-4 bg-primary/5 rounded-lg flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-primary mb-1">{targetAudienceMatch}%</div>
        <div className="text-sm text-gray-700 text-center">Right Audience Match</div>
        <div className="text-xs text-green-600 mt-1">Your content fits what's trending now!</div>
      </div>
    </div>
  );
}
