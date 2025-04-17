
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertTriangle, Sparkles } from "lucide-react";

interface ContentExecutionGuidesProps {
  contentType: string;
  guides: {
    bestPractices: string[];
    commonMistakes: string[];
    trendingElements: string[];
  };
}

export function ContentExecutionGuides({ contentType, guides }: ContentExecutionGuidesProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Content Execution Guide: {contentType}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-green-500" />
              Best Practices
            </h4>
            <ul className="space-y-2">
              {guides.bestPractices.map((practice, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  {practice}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Common Mistakes to Avoid
            </h4>
            <ul className="space-y-2">
              {guides.commonMistakes.map((mistake, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                  {mistake}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Trending Elements
            </h4>
            <ul className="space-y-2">
              {guides.trendingElements.map((element, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  {element}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
