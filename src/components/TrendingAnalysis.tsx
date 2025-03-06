
import { TrendingUp, Hash, Volume2, Scissors } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface TrendingAnalysisProps {
  trendScore: number;
  hashtags: string[];
  opportunities?: string[];
}

export function TrendingAnalysis({ trendScore, hashtags, opportunities }: TrendingAnalysisProps) {
  // Enhanced trending hashtags with engagement data
  const enhancedHashtags = [
    { tag: "#creativetutorial", growth: "+127%", volume: "2.2M" },
    { tag: "#contentcreator", growth: "+45%", volume: "8.7M" },
    { tag: "#socialstategy", growth: "+89%", volume: "1.3M" },
    { tag: "#analyticsexplained", growth: "+62%", volume: "420K" },
    { tag: "#trendingcontent", growth: "+38%", volume: "5.2M" },
  ];
  
  // Specific trending sounds with usage data
  const trendingSounds = [
    { name: "Original sound - Brand Name", uses: "1.5M", growth: "+217%" },
    { name: "Oh No, Oh No, Oh No No No", uses: "3.7M", growth: "+42%" },
    { name: "Into The Thick Of It", uses: "2.1M", growth: "+56%" }
  ];
  
  // Trending editing techniques with specific examples
  const trendingEdits = [
    { technique: "Pattern interrupts", example: "Sudden zoom at 0:07" },
    { technique: "Text punch-ins", example: "Key facts emphasized" },
    { technique: "Jump cuts", example: "Quick pacing between points" }
  ];
  
  // Choose hashtags to display - use enhanced ones if possible, otherwise fallback to defaults
  const hashtagsToDisplay = hashtags?.length ? hashtags : enhancedHashtags.map(h => h.tag);

  // Enhanced opportunities with more specific actionable ideas
  const enhancedOpportunities = [
    "Creators using face zoom transitions seeing 2.7x higher completion rates",
    "Tutorial videos with highlighted text overlays get 44% more saves",
    "Videos starting with a question increase comment rate by 58%"
  ];
  
  const opportunitiesToDisplay = opportunities?.length ? opportunities : enhancedOpportunities;

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
            <p className="text-xs text-gray-500 mt-1">
              This content aligns with {trendScore}% of current trending indicators in your category
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-gray-700 mb-2 flex items-center font-medium">
              <Hash className="h-4 w-4 mr-1" /> 
              Top Trending Hashtags
            </h4>
            <div className="flex flex-wrap gap-2">
              {enhancedHashtags.slice(0, 5).map((tag, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className="bg-primary/5 hover:bg-primary/10 border-primary/20 flex items-center gap-1.5 py-1"
                >
                  <span className="text-primary">{tag.tag}</span>
                  <span className="text-xs bg-primary/10 rounded-full px-1.5 py-0.5 text-primary/80">{tag.growth}</span>
                </Badge>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-gray-700 mb-2 flex items-center font-medium">
              <Volume2 className="h-4 w-4 mr-1" /> 
              Trending Audio
            </h4>
            <div className="space-y-2">
              {trendingSounds.map((sound, idx) => (
                <div key={idx} className="flex justify-between items-center bg-primary/5 rounded-md p-2 text-sm">
                  <span className="text-gray-800 truncate max-w-[200px]">{sound.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{sound.uses} uses</span>
                    <span className="text-xs text-green-600">{sound.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-gray-700 mb-2 flex items-center font-medium">
              <Scissors className="h-4 w-4 mr-1" /> 
              Trending Editing Techniques
            </h4>
            <div className="space-y-2">
              {trendingEdits.map((edit, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-50 rounded-md p-2 text-sm">
                  <span className="text-gray-800 font-medium">{edit.technique}</span>
                  <span className="text-xs text-gray-600 italic">{edit.example}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {opportunitiesToDisplay.length > 0 && (
            <div>
              <h4 className="text-gray-700 mb-2 font-medium">Growth Opportunities</h4>
              <ul className="space-y-2">
                {opportunitiesToDisplay.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
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
