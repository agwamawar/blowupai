
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";

interface ThemeAnalysisCardProps {
  primary: string;
  secondary: string[];
  storyStructure: string;
  emotionalTone: string;
}

export function ThemeAnalysisCard({
  primary,
  secondary,
  storyStructure,
  emotionalTone
}: ThemeAnalysisCardProps) {
  return (
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
                {primary}
              </Badge>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Supporting Themes</h3>
              <div className="flex flex-wrap gap-2">
                {secondary.map((theme, i) => (
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
                {storyStructure}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Emotional Tone</h3>
              <p className="text-sm text-muted-foreground">
                {emotionalTone}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
