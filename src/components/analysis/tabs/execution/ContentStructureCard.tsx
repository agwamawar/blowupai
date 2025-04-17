
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ContentStructureProps {
  structureData: {
    hookStrength: number;
    buildup: number;
    payoff: number;
    keyMoments: { timestamp: string; description: string }[];
  };
  contentType: string;
  platform: string;
}

export function ContentStructureCard({ 
  structureData,
  contentType,
  platform
}: ContentStructureProps) {
  // Get content-specific advice based on content type
  const getContentTypeAdvice = () => {
    const contentTypeLower = contentType.toLowerCase();
    
    if (contentTypeLower.includes('tutorial') || contentTypeLower.includes('how-to')) {
      return "Tutorials should follow a clear step-by-step structure with strong information hierarchy.";
    } else if (contentTypeLower.includes('vlog') || contentTypeLower.includes('lifestyle')) {
      return "Lifestyle content should balance personal moments with engaging visual sequences.";
    } else if (contentTypeLower.includes('review')) {
      return "Reviews need a clear introduction, demonstration, and final verdict structure.";
    } else if (contentTypeLower.includes('gaming')) {
      return "Gaming content should highlight key gameplay moments with clear commentary.";
    } else {
      return "Strong content structure balances setup, development, and resolution.";
    }
  };

  // Platform-specific advice
  const getPlatformAdvice = () => {
    const platformLower = platform.toLowerCase();
    
    if (platformLower.includes('tiktok')) {
      return "TikTok favors hooks within the first 1-2 seconds and a strong resolution.";
    } else if (platformLower.includes('youtube')) {
      return "YouTube rewards videos with clear chapters and strong hook-to-resolution structure.";
    } else if (platformLower.includes('instagram')) {
      return "Instagram Reels should lead with visual interest and end with a clear call to action.";
    } else {
      return "Balance your hook, development, and conclusion for optimal audience retention.";
    }
  };

  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Content Structure Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Hook Strength</span>
                <span className="text-sm font-medium">{structureData.hookStrength}/10</span>
              </div>
              <Progress value={structureData.hookStrength * 10} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {structureData.hookStrength >= 8 
                  ? "Excellent opening that immediately grabs attention" 
                  : structureData.hookStrength >= 6 
                  ? "Good opening, but could be more compelling" 
                  : "Consider a stronger opening to hook viewers faster"}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Content Buildup</span>
                <span className="text-sm font-medium">{structureData.buildup}/10</span>
              </div>
              <Progress value={structureData.buildup * 10} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {structureData.buildup >= 8 
                  ? "Excellent progression that maintains interest" 
                  : structureData.buildup >= 6 
                  ? "Good progression with minor pacing issues" 
                  : "Consider improving the flow between key points"}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Payoff/Resolution</span>
                <span className="text-sm font-medium">{structureData.payoff}/10</span>
              </div>
              <Progress value={structureData.payoff * 10} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {structureData.payoff >= 8 
                  ? "Strong conclusion that delivers on expectations" 
                  : structureData.payoff >= 6 
                  ? "Satisfactory conclusion but could be stronger" 
                  : "Work on a more impactful conclusion to leave a lasting impression"}
              </p>
            </div>
          </div>
          
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-medium">Key Structural Moments</h4>
            <div className="space-y-3">
              {structureData.keyMoments.map((moment, i) => (
                <div key={i} className="flex items-start gap-3 bg-muted/30 p-3 rounded-md">
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary/70" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs font-medium bg-background">
                        {moment.timestamp}
                      </Badge>
                    </div>
                    <p className="text-sm mt-1">{moment.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2 border-t pt-4">
            <h4 className="text-sm font-medium">Structure Insights</h4>
            <div className="space-y-2">
              <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-md">
                <p className="text-sm font-medium text-amber-800">Content Format Insight</p>
                <p className="text-sm text-amber-700 mt-1">{getContentTypeAdvice()}</p>
              </div>
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-md">
                <p className="text-sm font-medium text-blue-800">Platform Recommendation</p>
                <p className="text-sm text-blue-700 mt-1">{getPlatformAdvice()}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
