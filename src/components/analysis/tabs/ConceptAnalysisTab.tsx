
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, Sparkles, Target } from "lucide-react";

interface ConceptAnalysisTabProps {
  videoMetadata: {
    platform: string;
    contentType: string;
    duration: string;
  };
  conceptData: {
    theme: {
      primary: string;
      secondary: string[];
      storyStructure: string;
      emotionalTone: string;
      targetAudience: string[];
    };
    appeal: {
      uniquenessScore: number;
      clarity: number;
      relevance: number;
      memorability: number;
    };
    narrative: {
      hook: string;
      premise: string;
      keyElements: string[];
    };
  };
}

export function ConceptAnalysisTab({
  videoMetadata,
  conceptData
}: ConceptAnalysisTabProps) {
  return (
    <div className="space-y-8">
      {/* Theme Analysis */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Creative Theme Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Primary Theme</h3>
                <Badge className="text-sm bg-primary/10 text-primary hover:bg-primary/20">
                  {conceptData.theme.primary}
                </Badge>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Supporting Themes</h3>
                <div className="flex flex-wrap gap-2">
                  {conceptData.theme.secondary.map((theme, i) => (
                    <Badge 
                      key={i} 
                      variant="secondary"
                      className="text-xs"
                    >
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Story Structure</h3>
                <p className="text-sm text-muted-foreground">
                  {conceptData.theme.storyStructure}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Emotional Tone</h3>
                <p className="text-sm text-muted-foreground">
                  {conceptData.theme.emotionalTone}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conceptual Appeal */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Conceptual Appeal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Uniqueness</span>
                <span className="text-sm">{conceptData.appeal.uniquenessScore}/10</span>
              </div>
              <Progress value={conceptData.appeal.uniquenessScore * 10} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Concept Clarity</span>
                <span className="text-sm">{conceptData.appeal.clarity}/10</span>
              </div>
              <Progress value={conceptData.appeal.clarity * 10} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Audience Relevance</span>
                <span className="text-sm">{conceptData.appeal.relevance}/10</span>
              </div>
              <Progress value={conceptData.appeal.relevance * 10} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Memorability</span>
                <span className="text-sm">{conceptData.appeal.memorability}/10</span>
              </div>
              <Progress value={conceptData.appeal.memorability * 10} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Narrative Elements */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Narrative Elements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Core Hook</h3>
              <p className="text-sm text-muted-foreground">
                {conceptData.narrative.hook}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Main Premise</h3>
              <p className="text-sm text-muted-foreground">
                {conceptData.narrative.premise}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Key Story Elements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {conceptData.narrative.keyElements.map((element, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2 p-2 bg-muted/50 rounded-md"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                    <span className="text-sm">{element}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Target Audience */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Target Audience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {conceptData.theme.targetAudience.map((audience, i) => (
              <Badge 
                key={i}
                className="px-3 py-1"
                variant="secondary"
              >
                {audience}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
