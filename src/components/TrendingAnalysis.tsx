
import { TrendingUp, Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrendingAnalysisProps {
  trendScore: number;
  hashtags: string[];
  opportunities?: string[];
}

export function TrendingAnalysis({ trendScore, hashtags, opportunities }: TrendingAnalysisProps) {
  // Default values if none provided
  const defaultHashtags = [
    "#viralcontent", "#trending", "#foryoupage", 
    "#contentcreator", "#socialmedia"
  ];
  
  const defaultOpportunities = [
    "Dance challenge trend gaining momentum",
    "Product reveal format has 3x engagement",
    "Educational quick tips are trending in your niche"
  ];

  const hashtagsToDisplay = hashtags?.length ? hashtags : defaultHashtags;
  const opportunitiesToDisplay = opportunities?.length ? opportunities : defaultOpportunities;

  return (
    <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary text-lg flex items-center">
          <TrendingUp className="h-5 w-5 text-primary mr-2" />
          Trending Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700">Trend Match Score</span>
              <span className="font-bold text-primary">{trendScore}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div 
                className="bg-primary h-full rounded-full" 
                style={{ width: `${trendScore}%` }}
              />
            </div>
          </div>
          
          <div>
            <h4 className="text-gray-700 mb-2 flex items-center">
              <Hash className="h-4 w-4 mr-1" /> 
              Suggested Hashtags
            </h4>
            <div className="flex flex-wrap gap-2">
              {hashtagsToDisplay.map((tag, idx) => (
                <Badge 
                  key={idx} 
                  variant="secondary" 
                  className="bg-primary/10 hover:bg-primary/20 text-primary"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {opportunitiesToDisplay.length > 0 && (
            <div>
              <h4 className="text-gray-700 mb-2">Trend Opportunities</h4>
              <ul className="space-y-2">
                {opportunitiesToDisplay.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
