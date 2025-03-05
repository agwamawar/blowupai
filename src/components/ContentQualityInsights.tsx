
import { Flame, Zap, Music, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InsightItem {
  label: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}

interface ContentQualityInsightsProps {
  insights: InsightItem[];
}

export function ContentQualityInsights({ 
  insights = [
    {
      label: "Hook Strength",
      value: 85,
      icon: <Flame className="h-4 w-4 text-red-400" />,
      description: "Strong opening captures attention"
    },
    {
      label: "Pacing",
      value: 72,
      icon: <Zap className="h-4 w-4 text-yellow-400" />,
      description: "Good rhythm with room to improve"
    },
    {
      label: "Audio Quality",
      value: 90,
      icon: <Music className="h-4 w-4 text-blue-400" />,
      description: "Excellent sound choice and quality"
    },
    {
      label: "Retention Factors",
      value: 78,
      icon: <Clock className="h-4 w-4 text-green-400" />,
      description: "Good viewer retention expected"
    }
  ]
}: ContentQualityInsightsProps) {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg flex items-center">
          <Flame className="h-5 w-5 text-primary mr-2" />
          Content Quality Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-200">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <span className="font-medium text-primary">{item.value}%</span>
              </div>
              <Progress value={item.value} className="h-2" />
              <p className="text-xs text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
