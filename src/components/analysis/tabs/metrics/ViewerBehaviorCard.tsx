
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
    retention: Array<{ point: number; value: number }>;
    dropOffPoints: Array<{ timestamp: string; reason: string }>;
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Expected Engagement Rates</h3>
              <div className="p-4 bg-muted/50 rounded-lg border border-muted">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {behaviorData.engagement.likeRate}%
                    </div>
                    <div className="text-xs text-muted-foreground">Like Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {behaviorData.engagement.commentRate}%
                    </div>
                    <div className="text-xs text-muted-foreground">Comment Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {behaviorData.engagement.shareRate}%
                    </div>
                    <div className="text-xs text-muted-foreground">Share Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {behaviorData.engagement.saveRate}%
                    </div>
                    <div className="text-xs text-muted-foreground">Save Rate</div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-muted text-center">
                  <div className="text-sm font-medium mb-1">Overall Engagement: <span className={engagementRating.color}>{engagementRating.text}</span></div>
                  <div className="text-xs text-muted-foreground">
                    {totalEngagementRate}% total engagement compared to {getPlatformName(platform)} average of 5.8%
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Audience Retention Forecast</h3>
              <div className="p-4 bg-muted/50 rounded-lg border border-muted">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <div className="text-sm">Expected Watch Time</div>
                    <div className="text-2xl font-bold text-primary">{behaviorData.watchTime.expected}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">Platform Average</div>
                    <div className="text-lg text-muted-foreground">{behaviorData.watchTime.platformAverage}</div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-2">
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>25% Complete</span>
                    <span>50% Complete</span>
                    <span>75% Complete</span>
                    <span>Finished</span>
                  </div>
                  <div className="h-6 bg-muted rounded-full flex overflow-hidden">
                    {behaviorData.retention.slice(1).map((point, i) => {
                      const width = `${point.value}%`;
                      const bgClass = i === 0 ? "bg-green-500" : 
                                     i === 1 ? "bg-blue-500" : 
                                     i === 2 ? "bg-amber-500" : "bg-red-500";
                      return (
                        <div 
                          key={i} 
                          className={`h-full relative ${bgClass}`} 
                          style={{ width }}
                        >
                          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold">
                            {point.value}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-muted-foreground text-center">
                  {behaviorData.watchTime.percentile}% better than similar content on {getPlatformName(platform)}
                </div>
              </div>
            </div>
          </div>
          
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
