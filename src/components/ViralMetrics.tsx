
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Zap, Users } from "lucide-react";

interface ViralMetricsProps {
  trendScore: number;
  projectedReachBoost?: number;
  targetAudienceMatch?: number;
  viralityPotential?: number;
  platformDistribution?: Record<string, number>;
}

export function ViralMetrics({
  trendScore,
  projectedReachBoost = 37,
  targetAudienceMatch = 91,
  viralityPotential,
  platformDistribution
}: ViralMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-primary/5 rounded-lg flex flex-col items-center justify-center">
        <div className="rounded-full bg-primary/10 p-2 mb-2">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div className="text-2xl font-bold text-primary mb-1">{trendScore}/100</div>
        <div className="text-sm text-gray-700 text-center">Trend Alignment Score</div>
        <div className="text-xs text-green-600 mt-1">Strong trend relevance detected!</div>
      </div>
      
      <div className="p-4 bg-primary/5 rounded-lg flex flex-col items-center justify-center">
        <div className="rounded-full bg-green-100 p-2 mb-2">
          <Zap className="h-5 w-5 text-green-500" />
        </div>
        <div className="text-2xl font-bold text-green-500 mb-1">+{projectedReachBoost}%</div>
        <div className="text-sm text-gray-700 text-center">Potential Reach Boost</div>
        <div className="text-xs text-green-600 mt-1">Above average for your content type!</div>
      </div>
      
      <div className="p-4 bg-primary/5 rounded-lg flex flex-col items-center justify-center">
        <div className="rounded-full bg-blue-100 p-2 mb-2">
          <Users className="h-5 w-5 text-blue-500" />
        </div>
        <div className="text-2xl font-bold text-primary mb-1">{targetAudienceMatch}%</div>
        <div className="text-sm text-gray-700 text-center">Audience Match Score</div>
        <div className="text-xs text-green-600 mt-1">High relevance to target demographic!</div>
      </div>
      
      {viralityPotential && (
        <div className="p-4 bg-primary/5 rounded-lg flex flex-col items-center justify-center">
          <div className="rounded-full bg-amber-100 p-2 mb-2">
            <TrendingUp className="h-5 w-5 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-500 mb-1">{viralityPotential}%</div>
          <div className="text-sm text-gray-700 text-center">Virality Potential</div>
          <div className="text-xs text-amber-600 mt-1">Good potential for viral spread!</div>
        </div>
      )}
      
      {platformDistribution && Object.keys(platformDistribution).length > 0 && (
        <div className="p-4 bg-primary/5 rounded-lg col-span-full">
          <div className="text-sm font-medium mb-2 text-center">Cross-Platform Performance Prediction</div>
          <div className="flex justify-center gap-4">
            {Object.entries(platformDistribution).map(([platform, score]) => (
              <div key={platform} className="text-center">
                <div className="text-lg font-bold text-primary mb-1">{score}%</div>
                <div className="text-xs text-gray-700">{platform}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
