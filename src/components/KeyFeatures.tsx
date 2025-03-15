
import { Brain, Video, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KeyFeatures() {
  const features = [
    {
      icon: Brain,
      title: "Engagement Prediction",
      description: "Platform-specific predictive scoring analyzing hook strength, retention rate, and interactivity potential",
      demo: "85% engagement probability",
    },
    {
      icon: Video,
      title: "Content Quality Analysis",
      description: "Evaluates storytelling, emotional impact, pacing, and clarity for maximum audience engagement",
      demo: "Strong emotional impact",
    },
    {
      icon: TrendingUp,
      title: "Trend Matching",
      description: "Analyzes current trends in music, themes, and challenges while benchmarking against viral content",
      demo: "3 trending elements found",
    },
    {
      icon: Zap,
      title: "Virality Insights",
      description: "Deep analysis of format effectiveness, psychological triggers, and shareability factors",
      demo: "High viral potential",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {features.map((feature) => (
        <Card key={feature.title} className="transition-all hover:shadow-lg">
          <CardHeader>
            <feature.icon className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-xl">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{feature.description}</p>
            <div className="text-sm font-medium text-primary">{feature.demo}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
