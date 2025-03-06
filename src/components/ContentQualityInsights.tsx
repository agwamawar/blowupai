
import { Flame, Zap, Music, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InsightItem, defaultContentInsights } from "@/mocks/insightsMockData";

interface ContentQualityInsightsProps {
  insights: InsightItem[];
}

export function ContentQualityInsights({ insights = defaultContentInsights }: ContentQualityInsightsProps) {
  const insightsToDisplay = insights?.length ? insights : defaultContentInsights;

  return (
    <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary text-lg flex items-center">
          <Flame className="h-5 w-5 text-primary mr-2" />
          Content Quality Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insightsToDisplay.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <span className="font-medium text-primary">{item.value}%</span>
              </div>
              <Progress value={item.value} className="h-2" />
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
