
import { Lightbulb, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Recommendation {
  title: string;
  description: string;
}

interface RecommendationsPanelProps {
  recommendations: Recommendation[];
}

export function RecommendationsPanel({ 
  recommendations = [
    {
      title: "Optimize First 3 Seconds",
      description: "Add a stronger hook at the beginning to grab viewer attention immediately."
    },
    {
      title: "Add Text Overlays",
      description: "Include on-screen text to increase retention and highlight key points."
    },
    {
      title: "Use Trending Audio",
      description: "Incorporate popular sounds to boost discoverability on the platform."
    },
    {
      title: "Adjust Video Pacing",
      description: "Speed up transitions between 0:15-0:25 to maintain viewer engagement."
    }
  ]
}: RecommendationsPanelProps) {
  return (
    <Card className="bg-slate-800 border-slate-700 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg flex items-center">
          <Lightbulb className="h-5 w-5 text-primary mr-2" />
          Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <div 
              key={idx} 
              className="p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <span className="text-primary font-medium">{idx + 1}</span>
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm">{rec.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{rec.description}</p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-2">
            <a href="#" className="text-sm text-primary flex items-center hover:underline">
              View all recommendations
              <ArrowRight className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
