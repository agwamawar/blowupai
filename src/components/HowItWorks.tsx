
import { Brain, LineChart, Rocket, Share2, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HowItWorks() {
  const steps = [
    {
      icon: Brain,
      title: "Content Breakdown",
      description: "Extracts frames, audio, and pacing to map structure. Detects key moments and emotional triggers.",
      result: "Identifies high-impact sections"
    },
    {
      icon: Zap,
      title: "Visual & Emotional Impact",
      description: "Analyzes gestures, expressions, and movement for engagement potential. Measures storytelling flow and retention factors.",
      result: "Evaluates viewer engagement likelihood"
    },
    {
      icon: LineChart,
      title: "Hook & Narrative Strength",
      description: "Assesses opening hook strength and pacing. Scores suspense, humor, and curiosity effects.",
      result: "Predicts attention retention"
    },
    {
      icon: Share2,
      title: "Trend & Platform Fit",
      description: "Compares content with real-time trends. Checks format relevance for TikTok, Reels, or YouTube.",
      result: "Trend alignment score"
    },
    {
      icon: Rocket,
      title: "Engagement Prediction (GPT-4o Mini)",
      description: "Estimates likes, shares, and retention probability. Benchmarks against past viral content.",
      result: "Engagement score & optimization insights"
    }
  ];

  return (
    <div className="py-12 md:py-20" id="learn">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">How It Works</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.title} className="transition-all hover:shadow-lg">
              <CardHeader>
                <step.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="text-sm bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center text-primary">
                    {index + 1}
                  </span> 
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <div className="text-sm font-medium text-primary">
                  <span className="text-primary">📌 Results:</span> {step.result}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
