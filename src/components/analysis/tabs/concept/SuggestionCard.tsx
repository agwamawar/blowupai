
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface SuggestionCardProps {
  suggestions: string[];
}

export function SuggestionCard({ suggestions }: SuggestionCardProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Content Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-primary font-medium">•</span>
              <span className="text-sm text-muted-foreground">{suggestion}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
