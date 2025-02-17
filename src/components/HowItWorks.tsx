
import { Brain, LineChart, Rocket, Share2, Zap } from "lucide-react";

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
    <div className="py-16 bg-slate-50/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">How It Works: AI-Powered Video Breakdown</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Once you upload a video, our AI dissects it step by step to uncover what drives engagement.
        </p>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex gap-4">
                <div className="bg-primary/10 rounded-full p-3 h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl flex items-center gap-2">
                    <span>{index + 1}️⃣</span> {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                  <p className="text-sm font-medium">
                    <span className="text-primary">📌 Results:</span> {step.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center text-primary font-medium mt-8">
          💡 See exactly how your video stacks up and improve before publishing.
        </p>
      </div>
    </div>
  );
}
