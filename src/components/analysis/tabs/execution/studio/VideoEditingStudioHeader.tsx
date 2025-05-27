
import { Video, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VideoEditingStudioHeaderProps {
  viralityScore: number;
}

export function VideoEditingStudioHeader({ viralityScore }: VideoEditingStudioHeaderProps) {
  return (
    <div className="text-lg flex items-center gap-2">
      <Video className="h-5 w-5 text-primary" />
      Video Editing Studio
      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Virality Impact:</span>
        <Badge variant="outline" className="bg-primary/10">
          <TrendingUp className="h-3 w-3 mr-1" />
          {viralityScore}%
        </Badge>
      </div>
    </div>
  );
}
