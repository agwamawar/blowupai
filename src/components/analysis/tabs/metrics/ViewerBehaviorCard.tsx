
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BarChart } from "lucide-react";

interface ViewerBehaviorProps {
  behaviorData: {
    watchTime: {
      expected: string;
      platformAverage: string;
      percentile: number;
    };
    engagement: {
      likeRate: number;
      commentRate: number;
      shareRate: number;
      saveRate: number;
    };
  };
  platform: string;
}

export function ViewerBehaviorCard({ behaviorData, platform }: ViewerBehaviorProps) {
  // Get platform display name
  const getPlatformName = (platform: string) => {
    const platforms: Record<string, string> = {
      'tiktok': 'TikTok',
      'youtube': 'YouTube',
      'instagram': 'Instagram',
      'facebook': 'Facebook'
    };
    return platforms[platform.toLowerCase()] || platform;
  };
  
  // Calculate total engagement rate
  const totalEngagementRate = 
    behaviorData.engagement.likeRate + 
    behaviorData.engagement.commentRate + 
    behaviorData.engagement.shareRate + 
    behaviorData.engagement.saveRate;
  
  // Get engagement rating
  const getEngagementRating = (rate: number) => {
    if (rate >= 15) return { text: "Outstanding", color: "text-green-600" };
    if (rate >= 10) return { text: "Excellent", color: "text-green-500" };
    if (rate >= 7) return { text: "Good", color: "text-blue-500" };
    if (rate >= 5) return { text: "Average", color: "text-amber-500" };
    return { text: "Below Average", color: "text-red-500" };
  };
  
  const engagementRating = getEngagementRating(totalEngagementRate);
  
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary text-lg flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Viewer Behavior Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium flex items-center">
              <BarChart className="h-4 w-4 mr-1" />
              Benchmarking Insights
            </h3>
            <div className="p-3 bg-primary/5 rounded-lg text-sm">
              <p>Your expected engagement is <strong className="text-primary">{Math.round((totalEngagementRate / 5.8) * 100)}%</strong> of the average for similar content on {getPlatformName(platform)}.</p>
              <p className="mt-2">Videos with this engagement profile tend to reach <strong>1.4-2.8x</strong> more viewers than average when promoted by the algorithm.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
