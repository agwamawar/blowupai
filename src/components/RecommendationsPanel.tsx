
import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecommendationsPanelProps {
  recommendations: Array<{
    title: string;
    description: string;
  }>;
}

export function RecommendationsPanel({ recommendations }: RecommendationsPanelProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary text-lg flex items-center">
          <Lightbulb className="h-5 w-5 text-primary mr-2" />
          Tailored Video Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((item, idx) => (
            <div 
              key={idx} 
              className="p-4 bg-primary/5 rounded-lg flex"
            >
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-primary text-xs font-bold">{idx + 1}</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
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
