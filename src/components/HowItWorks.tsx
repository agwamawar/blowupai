
import { Upload, Brain, BarChart } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Video",
      description: "Drop your file or paste a link",
    },
    {
      icon: Brain,
      title: "AI Analyzes Content",
      description: "Detects engagement, quality, and insights",
    },
    {
      icon: BarChart,
      title: "View Results & Optimize",
      description: "Get actionable recommendations",
    },
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={step.title} className="text-center">
            <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <step.icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
