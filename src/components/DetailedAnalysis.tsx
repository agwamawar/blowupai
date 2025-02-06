import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Eye, Sun, Video, Speaker, ThumbsUp, Star } from "lucide-react";

interface DetailedAnalysisProps {
  analysis: {
    visual_quality?: {
      lighting: string;
      stability: string;
      clarity: string;
    };
    audio_analysis?: {
      clarity: string;
      background_noise: string;
      emotion: string;
    };
    content_analysis?: {
      objects: string[];
      text_detected: string[];
      scene_transitions: string;
    };
    engagement_prediction?: {
      estimated_likes: number;
      estimated_shares: number;
      watch_time: string;
      best_segments: Array<{ timestamp: string; reason: string }>;
    };
  };
}

export function DetailedAnalysis({ analysis }: DetailedAnalysisProps) {
  const getQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case "good":
        return "text-green-500";
      case "average":
        return "text-yellow-500";
      case "poor":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      {/* Visual Quality Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            Visual Quality Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <span>Lighting</span>
              </div>
              <span className={getQualityColor(analysis.visual_quality?.lighting || "")}>
                {analysis.visual_quality?.lighting || "N/A"}
              </span>
            </div>
            <Progress value={analysis.visual_quality?.lighting === "Good" ? 100 : 
                          analysis.visual_quality?.lighting === "Average" ? 60 : 30} />
          </div>
          {/* Similar sections for stability and clarity */}
        </CardContent>
      </Card>

      {/* Audio Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Speaker className="h-5 w-5 text-primary" />
            Audio Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {analysis.audio_analysis && (
            <>
              <div className="flex items-center justify-between">
                <span>Speech Clarity</span>
                <span className={getQualityColor(analysis.audio_analysis.clarity)}>
                  {analysis.audio_analysis.clarity}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Background Noise</span>
                <span>{analysis.audio_analysis.background_noise}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Emotion</span>
                <span>{analysis.audio_analysis.emotion}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Content Analysis */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Content Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {analysis.content_analysis && (
            <>
              <div className="space-y-2">
                <h4 className="font-medium">Detected Objects</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.content_analysis.objects.map((object, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {object}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Scene Transitions</h4>
                <p className="text-muted-foreground">
                  {analysis.content_analysis.scene_transitions}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Engagement Prediction */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ThumbsUp className="h-5 w-5 text-primary" />
            Engagement Prediction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {analysis.engagement_prediction && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Estimated Likes</h4>
                  <div className="text-2xl font-bold text-primary">
                    {analysis.engagement_prediction.estimated_likes.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Estimated Shares</h4>
                  <div className="text-2xl font-bold text-primary">
                    {analysis.engagement_prediction.estimated_shares.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Average Watch Time</h4>
                  <div className="text-2xl font-bold text-primary">
                    {analysis.engagement_prediction.watch_time}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Best Performing Segments</h4>
                <div className="space-y-2">
                  {analysis.engagement_prediction.best_segments.map((segment, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 rounded-lg bg-primary/5"
                    >
                      <Star className="h-4 w-4 text-primary" />
                      <span className="font-medium">{segment.timestamp}</span>
                      <span className="text-muted-foreground">- {segment.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}