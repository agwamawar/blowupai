
import { Brain, Video, LineChart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KeyFeatures() {
  const features = [
    {
      icon: Brain,
      title: "Engagement Prediction",
      description: "GPT-4o Mini powered engagement scoring and analysis",
      demo: "85% engagement score prediction",
    },
    {
      icon: Video,
      title: "Video Quality Analysis",
      description: "Advanced vision model for quality assessment",
      demo: "High quality (98/100)",
    },
    {
      icon: LineChart,
      title: "Content Insights",
      description: "Detailed analysis of objects, text, and motion",
      demo: "4 key objects detected",
    },
    {
      icon: TrendingUp,
      title: "Trending Analysis",
      description: "Real-time trend analysis and recommendations",
      demo: "Trending potential: High",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
