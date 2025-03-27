import { Copy, Users, Zap } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    icon: Copy,
    title: "A/B Testing",
    description: "Upload multiple versions of your video to find the best performer",
  },
  {
    icon: Zap,
    title: "AI-Powered Analysis",
    description: "Compare your content against top-performing viral videos",
  },
  {
    icon: Users,
    title: "Cross-Platform Insights",
    description: "Predict performance across TikTok, Instagram, Facebook, and Snapchat",
  },
];

export function Features() {
  return (
    <div className="grid gap-6 md:grid-cols-3 animate-fade-in-up max-w-3xl mx-auto" style={{ "--stagger": 1 } as React.CSSProperties}>
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}