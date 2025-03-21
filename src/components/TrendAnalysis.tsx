
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TrendAnalysisProps {
  trendScore?: number;
  opportunities?: string[];
  trendingTopics?: string[];
  trendingHashtags?: string[];
}

export function TrendAnalysis({ 
  trendScore = 0, 
  opportunities = [],
  trendingTopics = [],
  trendingHashtags = []
}: TrendAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
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

        {trendingTopics.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Trending Topics</h4>
            <div className="flex flex-wrap gap-2">
              {trendingTopics.map((topic, i) => (
                <Badge key={i} variant="secondary">{topic}</Badge>
              ))}
            </div>
          </div>
        )}

        {trendingHashtags && trendingHashtags.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Trending Hashtags</h4>
            <div className="flex flex-wrap gap-2">
              {trendingHashtags.map((hashtag, i) => (
                <Badge key={i} variant="outline" className="text-primary">{hashtag}</Badge>
              ))}
            </div>
          </div>
        )}

        {opportunities.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Growth Opportunities</h4>
            <div className="space-y-2">
              {opportunities.map((opportunity, i) => (
                <div key={i} className="p-3 bg-muted rounded-lg text-sm">
                  {opportunity}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
