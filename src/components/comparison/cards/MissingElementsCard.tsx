
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface MissingElementsCardProps {
  missingElements: string[];
}

export function MissingElementsCard({ missingElements }: MissingElementsCardProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary text-lg flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          What's Missing
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {missingElements.map((element, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
              <div className="mt-0.5 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 border border-red-200">
                <span className="text-sm text-red-500 font-bold">!</span>
              </div>
              <div>
                <p className="text-sm font-medium text-red-800">{element}</p>
                <p className="text-xs text-red-600">
                  {i === 0 ? "Top videos get 32% more followers with clear CTAs" : 
                   i === 1 ? "Viewers stay 45% longer with frequent pattern interrupts" :
                   "Trending audio boosts discovery by 83%"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
