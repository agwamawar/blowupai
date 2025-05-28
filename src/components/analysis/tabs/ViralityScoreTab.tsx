import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock, Heart, Eye, MessageCircle, Share } from "lucide-react";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface ViralityScoreTabProps {
  viralityData: {
    engagementScore: number;
    viralityScore: number;
    predictions: any;
  };
  recommendations: Array<{
    title: string;
    description: string;
    actionItems?: string[];
  }>;
  videoMetadata: {
    platform: string;
    contentType: string;
    duration: string;
  };
}

export function ViralityScoreTab({
  viralityData,
  recommendations,
  videoMetadata
}: ViralityScoreTabProps) {
  // Simulation parameters
  const [followerCount, setFollowerCount] = useState([50000]);
  const [viewerInterest, setViewerInterest] = useState([75]);
  const [hoursAfterPosting, setHoursAfterPosting] = useState([24]);

  // Calculate projected engagement metrics
  const calculateEngagement = () => {
    const baseViews = followerCount[0] * 0.3; // 30% reach rate
    const interestMultiplier = viewerInterest[0] / 100;
    const timeDecay = Math.max(0.3, 1 - (hoursAfterPosting[0] - 1) * 0.05);
    // Using fixed values for removed variables
    const qualityBoost = 1.275; // equivalent to 85% quality
    const trendBoost = 1.02; // equivalent to 85% trend alignment
    
    const projectedViews = Math.round(baseViews * interestMultiplier * timeDecay * qualityBoost * trendBoost);
    const likeRate = 0.08 + (85 / 1000); // using fixed 85% quality
    const commentRate = 0.02 + (viewerInterest[0] / 5000);
    const shareRate = 0.015 + (85 / 6667); // using fixed 85% trend alignment
    
    return {
      views: projectedViews,
      likes: Math.round(projectedViews * likeRate),
      comments: Math.round(projectedViews * commentRate),
      shares: Math.round(projectedViews * shareRate),
      engagementRate: ((likeRate + commentRate + shareRate) * 100).toFixed(1)
    };
  };

  // Generate timeline data for the chart
  const generateTimelineData = () => {
    const data = [];
    for (let hour = 1; hour <= 72; hour++) {
      const timeDecay = Math.max(0.1, 1 - (hour - 1) * 0.02);
      const baseViews = followerCount[0] * 0.3;
      const views = Math.round(baseViews * (viewerInterest[0] / 100) * timeDecay * 1.275);
      data.push({
        hour: `${hour}h`,
        views: views,
        engagement: Math.round(views * 0.12)
      });
    }
    return data;
  };

  const currentMetrics = calculateEngagement();
  const timelineData = generateTimelineData();

  return (
    <div className="space-y-6">
      {/* Simulation Controls */}
      <Card className="border border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Engagement Simulation Environment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Follower Count */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Follower Count
                </label>
                <Badge variant="outline">{followerCount[0].toLocaleString()}</Badge>
              </div>
              <Slider
                value={followerCount}
                onValueChange={setFollowerCount}
                max={1000000}
                min={1000}
                step={1000}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground">1K - 1M followers</div>
            </div>

            {/* Viewer Interest */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Viewer Interest
                </label>
                <Badge variant="outline">{viewerInterest[0]}%</Badge>
              </div>
              <Slider
                value={viewerInterest}
                onValueChange={setViewerInterest}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground">How much your audience cares about this topic</div>
            </div>

            {/* Hours After Posting */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Hours Since Posted
                </label>
                <Badge variant="outline">{hoursAfterPosting[0]}h</Badge>
              </div>
              <Slider
                value={hoursAfterPosting}
                onValueChange={setHoursAfterPosting}
                max={72}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground">Algorithm boost decreases over time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projected Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Eye className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-sm font-medium">Views</h3>
          </div>
          <div className="text-2xl font-bold text-blue-500">{currentMetrics.views.toLocaleString()}</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Heart className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-sm font-medium">Likes</h3>
          </div>
          <div className="text-2xl font-bold text-red-500">{currentMetrics.likes.toLocaleString()}</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <MessageCircle className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="text-sm font-medium">Comments</h3>
          </div>
          <div className="text-2xl font-bold text-green-500">{currentMetrics.comments.toLocaleString()}</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Share className="h-5 w-5 text-purple-500 mr-2" />
            <h3 className="text-sm font-medium">Shares</h3>
          </div>
          <div className="text-2xl font-bold text-purple-500">{currentMetrics.shares.toLocaleString()}</div>
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
              <span className="font-medium">Engagement Rate:</span> {currentMetrics.engagementRate}%
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
            {hoursAfterPosting[0] > 12 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
                <strong>⚠️ Time Decay Alert:</strong> Content performance drops significantly after 12 hours. Consider reposting or boosting.
              </div>
            )}
            
            {followerCount[0] < 10000 && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                <strong>📈 Growth Tip:</strong> With fewer followers, focus on higher engagement rates to boost algorithmic reach.
              </div>
            )}
            
            {viewerInterest[0] < 60 && (
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm">
                <strong>🎯 Content Tip:</strong> Low viewer interest suggests this topic may not resonate with your audience. Consider pivoting.
              </div>
            )}
            
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
              <strong>🚀 Viral Potential:</strong> Content quality and trend alignment are optimized for maximum reach!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
