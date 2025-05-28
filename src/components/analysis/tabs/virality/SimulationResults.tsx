
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Heart, MessageCircle, Share } from "lucide-react";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface SimulationResultsProps {
  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    engagementRate: string;
    demographicBoost: string;
  };
  timelineData: Array<{
    hour: string;
    views: number;
    engagement: number;
  }>;
  insights: Array<{
    type: 'warning' | 'info' | 'success';
    title: string;
    message: string;
    bgColor: string;
    borderColor: string;
  }>;
}

export function SimulationResults({ metrics, timelineData, insights }: SimulationResultsProps) {
  return (
    <>
      {/* Projected Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Eye className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-sm font-medium">Views</h3>
          </div>
          <div className="text-2xl font-bold text-blue-500">{metrics.views.toLocaleString()}</div>
          {parseFloat(metrics.demographicBoost) !== 0 && (
            <div className="text-xs text-muted-foreground mt-1">
              {parseFloat(metrics.demographicBoost) > 0 ? '+' : ''}{metrics.demographicBoost}% from demographics
            </div>
          )}
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Heart className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-sm font-medium">Likes</h3>
          </div>
          <div className="text-2xl font-bold text-red-500">{metrics.likes.toLocaleString()}</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <MessageCircle className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="text-sm font-medium">Comments</h3>
          </div>
          <div className="text-2xl font-bold text-green-500">{metrics.comments.toLocaleString()}</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Share className="h-5 w-5 text-purple-500 mr-2" />
            <h3 className="text-sm font-medium">Shares</h3>
          </div>
          <div className="text-2xl font-bold text-purple-500">{metrics.shares.toLocaleString()}</div>
        </Card>
      </div>

      {/* Performance Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">72-Hour Performance Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData.slice(0, 24)}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" />
                <YAxis />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#3b82f6"
                  fill="url(#viewsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-between items-center text-sm">
            <div>
              <span className="font-medium">Peak Performance:</span> Hours 1-6
            </div>
            <div>
              <span className="font-medium">Engagement Rate:</span> {metrics.engagementRate}%
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">AI Optimization Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className={`p-3 ${insight.bgColor} ${insight.borderColor} rounded-lg text-sm`}>
                <strong>{insight.title}:</strong> {insight.message}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
