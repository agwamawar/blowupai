
import { Lightbulb, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecommendationType, defaultRecommendations } from "@/mocks/insightsMockData";

interface RecommendationsPanelProps {
  recommendations: RecommendationType[];
}

export function RecommendationsPanel({ recommendations = defaultRecommendations }: RecommendationsPanelProps) {
  const recommendationsToDisplay = recommendations.length > 0 
    ? recommendations 
    : defaultRecommendations;

  return (
    <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary text-lg flex items-center">
          <Lightbulb className="h-5 w-5 text-primary mr-2" />
          Tips To Make Your Video Better
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
                    <p className="text-xs font-medium text-gray-700">How to do this:</p>
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
          These tips are customized for your specific video and platform.
        </p>
      </CardContent>
    </Card>
  );
}
