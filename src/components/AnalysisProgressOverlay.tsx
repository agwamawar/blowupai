
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalysisProgressOverlayProps {
  isLoading: boolean;
  analysisProgress: number;
  analysisStage: string | null;
  platform: string;
}

export function AnalysisProgressOverlay({
  isLoading,
  analysisProgress,
  analysisStage,
  platform,
}: AnalysisProgressOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <Card className="w-[90%] max-w-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">Analyzing Video</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Analysis Progress</span>
              <span>{Math.round(analysisProgress)}%</span>
            </div>
            <Progress value={analysisProgress} className="h-2" />
          </div>
          
          {analysisStage && (
            <div className="bg-primary/10 text-primary p-4 rounded-md flex items-center justify-center">
              <span className="text-center font-medium">{analysisStage}</span>
            </div>
          )}
          
          <div className="text-sm text-muted-foreground text-center mt-4">
            This may take a moment. We're analyzing your video for the best performance on {platform}.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
