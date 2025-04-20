
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";

interface TargetAudienceCardProps {
  targetAudience: string[];
}

export function TargetAudienceCard({
  targetAudience = [
    "Parents of young children",
    "Mixed-race families",
    "Textured hair care seekers",
    "Comedy/prank content viewers",
    "Professional service providers"
  ]
}: TargetAudienceCardProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Target Audience
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {targetAudience.map((audience, i) => (
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
  );
}
