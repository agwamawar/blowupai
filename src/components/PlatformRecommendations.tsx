
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, AlertTriangle } from "lucide-react";

interface PlatformRecommendationsProps {
  platform?: string;
}

export function PlatformRecommendations({ platform = "tiktok" }: PlatformRecommendationsProps) {
  // Platform-specific recommendations
  const platformData = {
    tiktok: {
      title: "TikTok Recommendations",
      bestPractices: [
        "Keep videos between 15-60 seconds for optimal engagement",
        "Use trending sounds and hashtags to increase discoverability",
        "Post during peak hours (6-9 PM in your local time zone)",
        "Include on-screen text to improve retention",
        "Focus on a strong opening hook in the first 3 seconds"
      ],
      contentTypes: [
        "How-to tutorials",
        "Before and after transformations",
        "Day in the life",
        "Trending challenges",
        "Educational quick-tips"
      ],
      competition: "High",
      growthPotential: "Very High",
      postingFrequency: "1-3 times daily"
    },
    instagram: {
      title: "Instagram Reels Recommendations",
      bestPractices: [
        "Keep videos under 90 seconds for highest engagement",
        "Use 3-5 relevant hashtags for better reach",
        "Ensure content is high-quality and visually appealing",
        "Create square (1:1) or vertical (9:16) content",
        "Use Instagram's native effects and filters"
      ],
      contentTypes: [
        "Behind-the-scenes content",
        "Product showcases",
        "Lifestyle content",
        "Collaborations with other creators",
        "User-generated content reposts"
      ],
      competition: "High",
      growthPotential: "High",
      postingFrequency: "3-5 times per week"
    },
    youtube: {
      title: "YouTube Shorts Recommendations",
      bestPractices: [
        "Keep videos under 60 seconds for Shorts algorithm",
        "Focus on high-quality, engaging content",
        "Use descriptive titles with relevant keywords",
        "Include a clear call-to-action",
        "Post consistently to build an audience"
      ],
      contentTypes: [
        "Educational quick-tips",
        "Product reviews",
        "Reaction videos",
        "Tutorials and how-tos",
        "Teaser clips from longer content"
      ],
      competition: "Medium",
      growthPotential: "High",
      postingFrequency: "2-3 times per week"
    }
  };

  const currentPlatform = platform.toLowerCase() as keyof typeof platformData;
  const data = platformData[currentPlatform] || platformData.tiktok;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <img 
            src={`/${currentPlatform}.svg`} 
            alt={currentPlatform} 
            className="h-5 w-5" 
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-3">Platform Metrics</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Competition</span>
                <span>{data.competition}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Growth Potential</span>
                <span>{data.growthPotential}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Posting Frequency</span>
                <span>{data.postingFrequency}</span>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-medium mb-3">Best Practices</h3>
            <ul className="space-y-2">
              {data.bestPractices.map((practice, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1" />
                  <span>{practice}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Best Performing Content Types</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {data.contentTypes.map((type, idx) => (
              <div key={idx} className="flex items-center p-2 bg-primary/5 rounded-md">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">{type}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
          <div className="flex gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800">Content Advisory</h4>
              <p className="text-sm text-amber-700 mt-1">
                Based on your content analysis, we recommend adjusting your video format to better match {currentPlatform}'s algorithm preferences for maximum reach.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
