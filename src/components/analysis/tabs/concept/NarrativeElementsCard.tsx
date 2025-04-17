
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface NarrativeElementsCardProps {
  hook: string;
  premise: string;
  keyElements: string[];
}

export function NarrativeElementsCard({
  hook,
  premise,
  keyElements
}: NarrativeElementsCardProps) {
  return (
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
              {hook}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Main Premise</h3>
            <p className="text-sm text-muted-foreground">
              {premise}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Key Story Elements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {keyElements.map((element, i) => (
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
  );
}
