
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Lightbulb, TrendingUp } from "lucide-react";

interface StoryTimelineCardProps {
  duration?: string;
  contentType?: string;
}

export function StoryTimelineCard({
  duration = "0:27",
  contentType = "Entertainment"
}: StoryTimelineCardProps) {
  const timelineSegments = [
    {
      timestamp: "0:00-0:03",
      phase: "Hook - Instant Chaos",
      description: "Quick shot approaching dad with daughter at mall, pretend trimming creates immediate tension",
      engagementLevel: "High",
      improvements: [
        "Add movement in first 2 seconds to increase hook strength",
        "Include quick zoom-in on dad's shocked expression",
        "Use dramatic heartbeat SFX for tension buildup"
      ]
    },
    {
      timestamp: "0:04-0:07", 
      phase: "Tension Flip",
      description: "Calm de-escalation with 'Your daughter's hair is royalty' line shifts mood",
      engagementLevel: "Medium-High",
      improvements: [
        "Enhance audio transition from suspense to melodic",
        "Add subtle text overlay for key dialogue",
        "Use trending audio remix for emotional shift"
      ]
    },
    {
      timestamp: "0:08-0:15",
      phase: "Transformation Setup", 
      description: "Seamless mall-to-salon transition, girl in chair ready for makeover",
      engagementLevel: "Medium",
      improvements: [
        "Use whip-pan transition with 'pop!' sound effect",
        "Add B-roll overlays of professional tools in slow-mo",
        "Include quick title overlays: 'Tangles? No Problem.'"
      ]
    },
    {
      timestamp: "0:16-0:22",
      phase: "The Glow Up Process",
      description: "Montage of haircut process with parent reactions and trending audio",
      engagementLevel: "High",
      improvements: [
        "Add more parent reaction shots in slow-mo",
        "Include 120fps hair falling dramatically",
        "Use trending glow-up audio like 'Made You Look'"
      ]
    },
    {
      timestamp: "0:23-0:27",
      phase: "The Big Reveal",
      description: "Before/After split-screen with sparkle effects and princess transformation",
      engagementLevel: "Very High",
      improvements: [
        "Enhance sparkle effects and 'heaven light' animation",
        "Add stronger call-to-action in caption",
        "Include hashtag strategy: #RoyalTrim #PrincessHair"
      ]
    }
  ];

  const narrativeStrengths = [
    "Clear 3-act structure with setup, conflict, and resolution",
    "Emotional arc from tension to satisfaction",
    "Unique hook with unexpected mall approach", 
    "Strong transformation payoff",
    "Relatable parent-child dynamic"
  ];

  const implementationSuggestions = [
    "Use trending audio that transitions from suspense to celebration",
    "Add text overlays in first 3 seconds for algorithm optimization",
    "Include more reaction shots from bystanders for social proof",
    "Use color grading to enhance before/after contrast",
    "Add subtitle overlays for key dialogue moments"
  ];

  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Story Timeline & Narrative Structure
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timeline Breakdown */}
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Timeline Breakdown ({duration})
          </h3>
          <div className="space-y-4">
            {timelineSegments.map((segment, i) => (
              <div key={i} className="border-l-2 border-primary/20 pl-4 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {segment.timestamp}
                  </Badge>
                  <Badge 
                    className={`text-xs ${
                      segment.engagementLevel === 'Very High' ? 'bg-green-100 text-green-800' :
                      segment.engagementLevel === 'High' ? 'bg-blue-100 text-blue-800' :
                      segment.engagementLevel === 'Medium-High' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {segment.engagementLevel} Engagement
                  </Badge>
                </div>
                <h4 className="font-medium text-sm mb-1">{segment.phase}</h4>
                <p className="text-sm text-muted-foreground mb-2">{segment.description}</p>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-primary">Implementation Ideas:</span>
                  {segment.improvements.map((improvement, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary/60 mt-2" />
                      <span className="text-xs text-muted-foreground">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative Strengths */}
        <div>
          <h3 className="text-sm font-medium mb-3">Narrative Strengths</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {narrativeStrengths.map((strength, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-green-50 rounded-md">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span className="text-sm">{strength}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Suggestions */}
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Better Implementation Strategies
          </h3>
          <div className="space-y-3">
            {implementationSuggestions.map((suggestion, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                <span className="text-sm">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
