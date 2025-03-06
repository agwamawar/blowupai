
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Zap, Music, Clock } from "lucide-react";
import { InsightItem } from "@/types/insightTypes";

interface ContentQualityInsightsProps {
  insights: InsightItem[];
}

export function ContentQualityInsights({ insights }: ContentQualityInsightsProps) {
  // Function to render the correct icon based on the icon type
  const renderIcon = (icon: { type: string; color: string }) => {
    const className = `h-4 w-4 ${icon.color}`;
    
    switch (icon.type) {
      case "flame":
        return <Flame className={className} />;
      case "zap":
        return <Zap className={className} />;
      case "music":
        return <Music className={className} />;
      case "clock":
        return <Clock className={className} />;
      default:
        return null;
    }
  };

  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary text-lg">Content Quality Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {insights.map((insight, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-2">
                {renderIcon(insight.icon)}
              </div>
              <h3 className="text-sm font-medium">{insight.label}</h3>
              <div className="text-2xl font-bold text-primary">{insight.value}%</div>
              <p className="text-xs text-gray-500 mt-1">{insight.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
