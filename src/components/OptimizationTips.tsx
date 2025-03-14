
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface OptimizationTipsProps {
  optimizations: string[];
}

export function OptimizationTips({ optimizations }: OptimizationTipsProps) {
  return (
    <Card className="border border-green-200 bg-green-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-green-700 text-lg flex items-center">
          <Trophy className="h-5 w-5 text-green-600 mr-2" />
          Quick Ways to Improve Your Video
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {optimizations.map((optimization, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <span className="text-green-700 text-xs font-bold">{idx + 1}</span>
              </div>
              <p className="text-gray-700">{optimization}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
