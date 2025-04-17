
import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SimilarityExplanationProps {
  userVideoTitle: string;
  similarityMethod: string;
  matchCount: number;
}

export function SimilarityExplanation({ 
  userVideoTitle, 
  similarityMethod, 
  matchCount 
}: SimilarityExplanationProps) {
  return (
    <Card className="bg-primary/5 mb-6">
      <CardContent className="p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-sm text-primary">Similarity Matching</h3>
          <p className="text-sm text-muted-foreground mt-1">
            We found <span className="font-medium text-foreground">{matchCount} videos</span> that 
            are similar to "<span className="font-medium text-foreground">{userVideoTitle}</span>" based on 
            {similarityMethod}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
