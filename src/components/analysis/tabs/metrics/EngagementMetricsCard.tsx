
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, ThumbsUp, MessageCircle, Share, Bookmark } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface EngagementMetricsProps {
  projectedData: {
    estimatedViews: string;
    projectedLikes: string;
    commentSharePrediction: {
      comments: number;
      shares: number;
    };
    watchThroughRate: number;
    saveRate: number;
    avgViewDuration?: string;
  };
  platform: string;
}

export function EngagementMetricsCard({ projectedData, platform }: EngagementMetricsProps) {
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
  
  // Engagement metrics with descriptions
  const metrics = [
    {
      label: "Likes",
      value: projectedData.projectedLikes,
      icon: <ThumbsUp className="h-5 w-5 text-blue-500" />,
      description: "Estimated likes based on content appeal and hook strength"
    },
    {
      label: "Comments",
      value: projectedData.commentSharePrediction.comments,
      icon: <MessageCircle className="h-5 w-5 text-green-500" />,
      description: "Expected comments based on content relatability and question hooks"
    },
    {
      label: "Shares",
      value: projectedData.commentSharePrediction.shares,
      icon: <Share className="h-5 w-5 text-purple-500" />,
      description: "Projected shares based on content value and emotional impact"
    },
    {
      label: "Saves",
      value: `${projectedData.saveRate}%`,
      icon: <Bookmark className="h-5 w-5 text-amber-500" />,
      description: "Save rate based on content utility and evergreen value"
    }
  ];
  
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary text-lg flex items-center">
          <BarChart2 className="h-5 w-5 mr-2" />
          Engagement Performance Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-sm font-medium">Estimated Reach</h3>
              <div className="text-2xl font-bold text-primary">{projectedData.estimatedViews}</div>
              <p className="text-xs text-muted-foreground">Projected views on {getPlatformName(platform)}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium">Completion Rate</h3>
              <div className="text-2xl font-bold text-primary">{projectedData.watchThroughRate}%</div>
              <p className="text-xs text-muted-foreground">Of viewers will watch to completion</p>
            </div>
            
            {projectedData.avgViewDuration && (
              <div>
                <h3 className="text-sm font-medium">Avg. View Duration</h3>
                <div className="text-2xl font-bold text-primary">{projectedData.avgViewDuration}</div>
                <p className="text-xs text-muted-foreground">Average watch time per viewer</p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric, i) => (
              <div key={i} className="p-4 bg-muted/50 rounded-lg border border-muted">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-muted">
                    {metric.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{metric.label}</div>
                    <div className="text-2xl font-bold text-primary">{metric.value}</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Comparative Performance</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Compared to your average content</span>
                  <span className="font-medium text-green-600">+35%</span>
                </div>
                <Progress value={35} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Compared to similar creators</span>
                  <span className="font-medium text-green-600">+28%</span>
                </div>
                <Progress value={28} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Compared to top 10% in your niche</span>
                  <span className="font-medium text-amber-600">-15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
