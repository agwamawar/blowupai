
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock, Heart, Eye, MessageCircle, Share, MapPin, UserCheck, Play, Loader2 } from "lucide-react";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [averageViews, setAverageViews] = useState([75]);
  const [hoursAfterPosting, setHoursAfterPosting] = useState([24]);
  
  // Audience demographics
  const [femalePercentage, setFemalePercentage] = useState([70]);
  const [primaryAgeGroup, setPrimaryAgeGroup] = useState("25-34");
  const [primaryLocation, setPrimaryLocation] = useState("UK");
  const [contentNiche, setContentNiche] = useState("lifestyle");

  // Simulation state
  const [isRunning, setIsRunning] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  // Calculate demographic multipliers
  const getDemographicMultipliers = () => {
    // Gender engagement patterns (based on platform averages)
    const femaleEngagementBoost = femalePercentage[0] > 60 ? 1.15 : femalePercentage[0] < 40 ? 0.95 : 1.0;
    
    // Age group engagement patterns
    const ageMultipliers = {
      "13-17": 1.25, // Highest engagement
      "18-24": 1.20,
      "25-34": 1.10,
      "35-44": 1.05,
      "45-54": 0.95,
      "55+": 0.85
    };
    
    // Location engagement patterns (time zone and cultural factors)
    const locationMultipliers = {
      "US": 1.20,
      "UK": 1.15,
      "Canada": 1.10,
      "Australia": 1.08,
      "Germany": 1.05,
      "France": 1.05,
      "Other": 1.00
    };
    
    // Niche engagement patterns
    const nicheMultipliers = {
      "lifestyle": 1.10,
      "beauty": 1.25,
      "fitness": 1.15,
      "comedy": 1.30,
      "education": 0.95,
      "tech": 0.90,
      "gaming": 1.20,
      "food": 1.15,
      "travel": 1.05,
      "parenting": 1.18
    };
    
    return {
      gender: femaleEngagementBoost,
      age: ageMultipliers[primaryAgeGroup as keyof typeof ageMultipliers] || 1.0,
      location: locationMultipliers[primaryLocation as keyof typeof locationMultipliers] || 1.0,
      niche: nicheMultipliers[contentNiche as keyof typeof nicheMultipliers] || 1.0
    };
  };

  // Calculate projected engagement metrics
  const calculateEngagement = () => {
    const baseViews = followerCount[0] * 0.3; // 30% reach rate
    const viewsMultiplier = averageViews[0] / 100;
    const timeDecay = Math.max(0.3, 1 - (hoursAfterPosting[0] - 1) * 0.05);
    const qualityBoost = 1.275; // equivalent to 85% quality
    const trendBoost = 1.02; // equivalent to 85% trend alignment
    
    // Apply demographic multipliers
    const demographics = getDemographicMultipliers();
    const demographicBoost = demographics.gender * demographics.age * demographics.location * demographics.niche;
    
    const projectedViews = Math.round(baseViews * viewsMultiplier * timeDecay * qualityBoost * trendBoost * demographicBoost);
    
    // Adjust engagement rates based on demographics
    const baseLikeRate = 0.08;
    const baseCommentRate = 0.02;
    const baseShareRate = 0.015;
    
    // Female audiences tend to engage more with likes and comments
    const genderLikeBoost = femalePercentage[0] > 60 ? 1.2 : 1.0;
    const genderCommentBoost = femalePercentage[0] > 60 ? 1.3 : 1.0;
    
    // Younger audiences share more
    const ageShareBoost = primaryAgeGroup === "13-17" || primaryAgeGroup === "18-24" ? 1.4 : 1.0;
    
    const likeRate = baseLikeRate * genderLikeBoost * demographics.niche;
    const commentRate = baseCommentRate * genderCommentBoost * (averageViews[0] / 5000);
    const shareRate = baseShareRate * ageShareBoost * demographics.niche;
    
    return {
      views: projectedViews,
      likes: Math.round(projectedViews * likeRate),
      comments: Math.round(projectedViews * commentRate),
      shares: Math.round(projectedViews * shareRate),
      engagementRate: ((likeRate + commentRate + shareRate) * 100).toFixed(1),
      demographicBoost: ((demographicBoost - 1) * 100).toFixed(1)
    };
  };

  // Generate timeline data for the chart
  const generateTimelineData = () => {
    const data = [];
    const demographics = getDemographicMultipliers();
    const demographicBoost = demographics.gender * demographics.age * demographics.location * demographics.niche;
    
    for (let hour = 1; hour <= 72; hour++) {
      const timeDecay = Math.max(0.1, 1 - (hour - 1) * 0.02);
      const baseViews = followerCount[0] * 0.3;
      const views = Math.round(baseViews * (averageViews[0] / 100) * timeDecay * 1.275 * demographicBoost);
      data.push({
        hour: `${hour}h`,
        views: views,
        engagement: Math.round(views * 0.12)
      });
    }
    return data;
  };

  const handleRunSimulation = async () => {
    setIsRunning(true);
    setHasResults(false);
    
    // Simulate AI reasoning delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsRunning(false);
    setHasResults(true);
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
          <div className="space-y-6">
            {/* Creator Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Average Views
                  </label>
                  <Badge variant="outline">{averageViews[0]}%</Badge>
                </div>
                <Slider
                  value={averageViews}
                  onValueChange={setAverageViews}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground">Percentage of followers who typically view your content</div>
              </div>

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

            {/* Audience Demographics */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                Audience Demographics
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Female Audience</label>
                    <Badge variant="outline">{femalePercentage[0]}%</Badge>
                  </div>
                  <Slider
                    value={femalePercentage}
                    onValueChange={setFemalePercentage}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground">Female vs male audience split</div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Primary Age Group</label>
                  <Select value={primaryAgeGroup} onValueChange={setPrimaryAgeGroup}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="13-17">13-17 years</SelectItem>
                      <SelectItem value="18-24">18-24 years</SelectItem>
                      <SelectItem value="25-34">25-34 years</SelectItem>
                      <SelectItem value="35-44">35-44 years</SelectItem>
                      <SelectItem value="45-54">45-54 years</SelectItem>
                      <SelectItem value="55+">55+ years</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-muted-foreground">Largest age demographic</div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Primary Location
                  </label>
                  <Select value={primaryLocation} onValueChange={setPrimaryLocation}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-muted-foreground">Main geographic audience</div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Content Niche</label>
                  <Select value={contentNiche} onValueChange={setContentNiche}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="beauty">Beauty</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="comedy">Comedy</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="parenting">Parenting</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-muted-foreground">Your content category</div>
                </div>
              </div>
            </div>

            {/* Run Button */}
            <div className="border-t pt-6 flex justify-center">
              <Button 
                onClick={handleRunSimulation}
                disabled={isRunning}
                size="lg"
                className="px-8"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Simulation
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results - Only show after running simulation */}
      {hasResults && (
        <>
          {/* Projected Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Eye className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-sm font-medium">Views</h3>
              </div>
              <div className="text-2xl font-bold text-blue-500">{currentMetrics.views.toLocaleString()}</div>
              {parseFloat(currentMetrics.demographicBoost) !== 0 && (
                <div className="text-xs text-muted-foreground mt-1">
                  {parseFloat(currentMetrics.demographicBoost) > 0 ? '+' : ''}{currentMetrics.demographicBoost}% from demographics
                </div>
              )}
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
                
                {averageViews[0] < 60 && (
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm">
                    <strong>🎯 Content Tip:</strong> Low average views suggests your content may not be reaching your full audience. Consider optimizing posting times.
                  </div>
                )}

                {femalePercentage[0] > 70 && contentNiche === "beauty" && (
                  <div className="p-3 bg-pink-50 border border-pink-200 rounded-lg text-sm">
                    <strong>💄 Audience Match:</strong> Your female-dominant audience aligns perfectly with beauty content - expect higher engagement!
                  </div>
                )}

                {(primaryAgeGroup === "13-17" || primaryAgeGroup === "18-24") && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                    <strong>🚀 Youth Boost:</strong> Younger audiences engage 20-25% more and share content frequently!
                  </div>
                )}
                
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                  <strong>🎯 Demographic Insight:</strong> Your {primaryLocation} audience in the {contentNiche} niche with {femalePercentage[0]}% female viewers provides a {parseFloat(currentMetrics.demographicBoost) > 0 ? 'positive' : 'neutral'} engagement boost.
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
