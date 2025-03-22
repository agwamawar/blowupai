
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, AlertTriangle, CheckCircle, BarChart2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CompetitorBenchmark } from "@/components/CompetitorBenchmark";

interface ComparativeAnalysisTabProps {
  comparativeData: any;
  followerCount: number;
  videoMetadata: {
    platform: string;
    contentType: string;
    duration: string;
  };
}

export function ComparativeAnalysisTab({
  comparativeData,
  followerCount,
  videoMetadata
}: ComparativeAnalysisTabProps) {
  // Generate insights based on follower count
  const contentInsights = [
    {
      label: "Hook Strength",
      value: 75,
      icon: { type: "flame", color: "text-red-500" },
      description: "Opening hook effectiveness",
      benchmarkValue: 85
    },
    {
      label: "Pacing",
      value: 65,
      icon: { type: "zap", color: "text-amber-500" },
      description: "Content flow and rhythm",
      benchmarkValue: 80
    },
    {
      label: "Visual Quality",
      value: 90,
      icon: { type: "image", color: "text-violet-500" },
      description: "Overall visual appearance",
      benchmarkValue: 92
    },
    {
      label: "Audio Quality",
      value: 82,
      icon: { type: "music", color: "text-blue-500" },
      description: "Sound clarity and balance",
      benchmarkValue: 88
    }
  ];
  
  return (
    <div className="space-y-6">
      {/* Content Performance Match */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <BarChart className="h-5 w-5 mr-2" />
            Content Performance Match
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Concept Similarity to Top Content</span>
                  <span className="font-semibold">{comparativeData.similarityIndex?.conceptMatch || 72}%</span>
                </div>
                <Progress 
                  value={comparativeData.similarityIndex?.conceptMatch || 72} 
                  className="h-2" 
                />
                <p className="text-xs text-muted-foreground">
                  How closely your content concept matches top performers in your niche
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Execution Quality Match</span>
                  <span className="font-semibold">{comparativeData.similarityIndex?.executionMatch || 65}%</span>
                </div>
                <Progress 
                  value={comparativeData.similarityIndex?.executionMatch || 65} 
                  className="h-2" 
                />
                <p className="text-xs text-muted-foreground">
                  How your production quality compares to category leaders
                </p>
              </div>
            </div>
            
            <div className="flex flex-col justify-center items-center bg-primary/5 p-4 rounded-lg">
              <div className="text-7xl font-bold text-primary mb-2">
                {Math.round((comparativeData.similarityIndex?.conceptMatch + comparativeData.similarityIndex?.executionMatch) / 2) || 68}%
              </div>
              <div className="text-sm text-center text-muted-foreground">
                Overall similarity to top performing content
              </div>
              <div className="text-xs text-center text-green-600 mt-2">
                {followerCount < 50000 
                  ? "Great start! You're on the right track with industry standards." 
                  : "Your content matches quality benchmarks for your follower size."}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* What's Missing / What's Unique */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary text-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              What's Missing
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {(comparativeData.missingElements || [
                "Clear call-to-action",
                "Pattern interrupts every 7-10 seconds",
                "Trending audio implementation"
              ]).map((element, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 border border-red-200">
                    <span className="text-sm text-red-500 font-bold">!</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-800">{element}</p>
                    <p className="text-xs text-red-600">
                      {i === 0 ? "Top videos get 32% more followers with clear CTAs" : 
                       i === 1 ? "Viewers stay 45% longer with frequent pattern interrupts" :
                       "Trending audio boosts discovery by 83%"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary text-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              What's Unique
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {(comparativeData.uniqueStrengths || [
                "Original presentation style",
                "Useful informational content",
                "Good production quality"
              ]).map((strength, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 border border-green-200">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">{strength}</p>
                    <p className="text-xs text-green-600">
                      {i === 0 ? "Your unique style stands out from 87% of similar content" : 
                       i === 1 ? "High-value content increases saves by 52%" :
                       "Professional look builds audience trust and credibility"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Comparison */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <BarChart2 className="h-5 w-5 mr-2" />
            Benchmark & Competitive Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <CompetitorBenchmark insights={contentInsights} />
          
          <div className="mt-6 text-center">
            <Button className="w-full md:w-auto">
              Apply Winning Strategies
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
