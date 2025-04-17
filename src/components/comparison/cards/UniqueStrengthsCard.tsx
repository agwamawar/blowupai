
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface UniqueStrengthsCardProps {
  uniqueStrengths: string[];
}

export function UniqueStrengthsCard({ uniqueStrengths }: UniqueStrengthsCardProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary text-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          What's Unique
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {uniqueStrengths.map((strength, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
              <div className="mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 border border-green-200">
                <CheckCircle className="h-3 w-3 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">{strength}</p>
                <p className="text-xs text-green-600">
                  {i === 0 ? "Your unique style stands out from 87% of similar content" : 
                   i === 1 ? "High-value content increases saves by 52%" :
                   "Professional look builds audience trust and credibility"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
