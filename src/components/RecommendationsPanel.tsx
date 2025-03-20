import { Lightbulb, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Recommendation {
  title: string;
  description: string;
  actionItems?: string[];
}

export function RecommendationsPanel({ recommendations = [] }: { recommendations: Recommendation[] }) {
  if (!recommendations.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <div key={index} className="space-y-2">
            <h3 className="font-medium">{recommendation.title}</h3>
            <p className="text-muted-foreground">{recommendation.description}</p>
            {recommendation.actionItems && (
              <ul className="space-y-1">
                {recommendation.actionItems.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}