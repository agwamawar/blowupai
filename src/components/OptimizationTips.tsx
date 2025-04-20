import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface OptimizationTipsProps {
  optimizations: string[];
}

export function OptimizationTips({ optimizations = [
  "Add a freeze-frame with sound effect when the dad hands his daughter to mom and prepares to fight",
  "Include close-up shots of your techniques specifically for biracial/textured hair",
  "Add on-screen text explaining you specialize in kids with textured hair during the salon sequence",
  "Create a branded 'Royal Treatment' graphic during the before/after reveal",
  "Include your salon information and booking details in the final frames"
] }: OptimizationTipsProps) {
  return (
    <Card className="border border-green-200 bg-green-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-green-700 text-lg flex items-center">
          <Trophy className="h-5 w-5 text-green-600 mr-2" />
          Quick Ways to Improve Your Mall Prank to Salon Video
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
