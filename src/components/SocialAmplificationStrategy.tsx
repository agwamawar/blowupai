
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { StrategySection } from "@/types/insightTypes";

interface SocialAmplificationStrategyProps {
  strategies: StrategySection[];
}

export function SocialAmplificationStrategy({ strategies }: SocialAmplificationStrategyProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary text-lg flex items-center">
          <Share2 className="h-5 w-5 text-primary mr-2" />
          Social Amplification Strategy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {strategies.map((strategy, idx) => (
            <div key={idx}>
              <h4 className="text-sm font-medium mb-2">📌 {strategy.title}:</h4>
              <ul className="space-y-1.5">
                {strategy.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2 text-sm">
                    <span className="text-primary text-xs mt-1">🔹</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              {idx < strategies.length - 1 && <Separator className="my-3" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
