import { BarChart, Sigma, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HashtagList } from "./trends/HashtagList";
import { OpportunityList } from "./trends/OpportunityList";
import { TrendingVideos } from "./trends/TrendingVideos";

interface TrendAnalysisProps {
  trendScore: number;
  hashtags: string[];
  opportunities: string[];
  trendingVideos?: Array<{
    title: string;
    views: number;
    engagement: number;
  }>;
}

export function TrendAnalysis({ 
  trendScore, 
  hashtags, 
  opportunities,
  trendingVideos = []
}: TrendAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-primary" />
          Trend Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Trend Score</h4>
            <div className="text-2xl font-bold text-primary">
              {trendScore}%
            </div>
          </div>
        </div>

        <HashtagList hashtags={hashtags} />
        <OpportunityList opportunities={opportunities} />
        {trendingVideos.length > 0 && <TrendingVideos videos={trendingVideos} />}
      </CardContent>
    </Card>
  );
}