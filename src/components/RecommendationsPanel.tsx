
import { Lightbulb, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecommendationsPanelProps {
  recommendations: Array<{
    title: string;
    description: string;
    actionItems?: string[];
  }>;
}

export function RecommendationsPanel({ recommendations }: RecommendationsPanelProps) {
  // Enhanced recommendations with specific actionable steps
  const enhancedRecommendations = [
    {
      title: "Optimize Your First 3 Seconds",
      description: "Your opening could be more attention-grabbing to reduce drop-off.",
      actionItems: [
        "Start with a surprising statistic or question",
        "Show the end result first, then explain how to get there",
        "Use motion right away (zoom, slide, or person movement)"
      ]
    },
    {
      title: "Improve Text Overlay Strategy",
      description: "Adding strategic text can increase retention by 38%.",
      actionItems: [
        "Use large, high-contrast text (Recommended: 14-18% screen height)",
        "Keep text on screen for at least 2.5 seconds",
        "Position key points at top of frame for better readability"
      ]
    },
    {
      title: "Enhance Audio Quality and Pacing",
      description: "Clear audio with strategic pacing keeps viewers engaged.",
      actionItems: [
        "Add background music at 20-30% volume level",
        "Speed up explanation segments by 10-15%",
        "Remove silent pauses exceeding 0.5 seconds"
      ]
    },
    {
      title: "Strengthen Your Call-to-Action",
      description: "A specific, action-oriented closing drives more engagement.",
      actionItems: [
        "Ask a direct question to encourage comments",
        "Use 'save this for later' to increase saves",
        "Create urgency with time-limited information"
      ]
    }
  ];

  // Use provided recommendations or fallback to enhanced ones
  const recommendationsToDisplay = recommendations.length > 0 
    ? recommendations 
    : enhancedRecommendations;

  return (
    <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary text-lg flex items-center">
          <Lightbulb className="h-5 w-5 text-primary mr-2" />
          Actionable Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendationsToDisplay.map((item, idx) => (
            <div 
              key={idx} 
              className="p-4 bg-primary/5 rounded-lg flex flex-col"
            >
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0 mb-2">
                <span className="text-primary text-xs font-bold">{idx + 1}</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                
                {item.actionItems && item.actionItems.length > 0 && (
                  <div className="space-y-1.5 mt-2">
                    <p className="text-xs font-medium text-gray-700">How to implement:</p>
                    {item.actionItems.map((action, actionIdx) => (
                      <div key={actionIdx} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-gray-600">{action}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-500 italic">
          These recommendations are customized based on your specific video content and platform requirements.
        </p>
      </CardContent>
    </Card>
  );
}
