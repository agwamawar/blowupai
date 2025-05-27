
import { TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface EditingData {
  pacingScore: number;
}

interface AudioData {
  clarity: number;
  balance: number;
}

interface AnalyticsTabProps {
  editingData: EditingData;
  audioData: AudioData;
  viralityScore: number;
}

export function AnalyticsTab({ editingData, audioData, viralityScore }: AnalyticsTabProps) {
  return (
    <div className="space-y-4">
      {/* Virality Prediction Dashboard */}
      <div className="p-4 bg-gradient-to-r from-primary/5 to-blue-50 border border-primary/20 rounded-lg">
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Virality Prediction Dashboard
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{viralityScore}%</div>
            <div className="text-xs text-muted-foreground">Overall Score</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{Math.round(viralityScore * 1.5)}K</div>
            <div className="text-xs text-muted-foreground">Projected Views</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{Math.round(viralityScore * 0.8)}%</div>
            <div className="text-xs text-muted-foreground">Engagement Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{Math.round(viralityScore * 0.3)}%</div>
            <div className="text-xs text-muted-foreground">Share Rate</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
          <h4 className="text-sm font-medium">Current Quality Metrics</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Editing Quality:</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{editingData.pacingScore}/10</span>
                <Progress value={editingData.pacingScore * 10} className="w-16 h-2" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Audio Clarity:</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{audioData.clarity}/10</span>
                <Progress value={audioData.clarity * 10} className="w-16 h-2" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Audio Balance:</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{audioData.balance}/10</span>
                <Progress value={audioData.balance * 10} className="w-16 h-2" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
          <h4 className="text-sm font-medium">Platform Export & Algorithm Optimization</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-background rounded border">
              <Button variant="outline" size="sm" className="flex-1 justify-start">
                Export for TikTok (1080x1920)
              </Button>
              <span className="text-xs text-green-600 ml-2">+25% reach</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-background rounded border">
              <Button variant="outline" size="sm" className="flex-1 justify-start">
                Export for Instagram (1080x1080)
              </Button>
              <span className="text-xs text-blue-600 ml-2">+20% engagement</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-background rounded border">
              <Button variant="outline" size="sm" className="flex-1 justify-start">
                Export for YouTube Shorts
              </Button>
              <span className="text-xs text-purple-600 ml-2">+30% discovery</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Optimization Suggestions with Virality Impact */}
      <div className="p-3 border border-primary/20 rounded-lg">
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          AI Virality Optimization Suggestions
        </h4>
        <ul className="text-sm space-y-3">
          {editingData.pacingScore < 8 && (
            <li className="flex items-start justify-between gap-2 p-2 bg-amber-50 rounded border border-amber-200">
              <div className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span className="text-amber-800">Increase cut frequency to improve pacing (current: {editingData.pacingScore}/10)</span>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">+15% retention</Badge>
            </li>
          )}
          {audioData.clarity < 8 && (
            <li className="flex items-start justify-between gap-2 p-2 bg-blue-50 rounded border border-blue-200">
              <div className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span className="text-blue-800">Apply noise reduction to improve voice clarity</span>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">+20% clarity</Badge>
            </li>
          )}
          {audioData.balance < 8 && (
            <li className="flex items-start justify-between gap-2 p-2 bg-purple-50 rounded border border-purple-200">
              <div className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span className="text-purple-800">Adjust music volume to 20-25% for better voice balance</span>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">+12% engagement</Badge>
            </li>
          )}
          <li className="flex items-start justify-between gap-2 p-2 bg-green-50 rounded border border-green-200">
            <div className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              <span className="text-green-800">Add pattern interrupts every 7-10 seconds for retention</span>
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">+25% virality</Badge>
          </li>
          <li className="flex items-start justify-between gap-2 p-2 bg-primary/5 rounded border border-primary/20">
            <div className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span className="text-primary">Use trending hashtags in text overlays for algorithm boost</span>
            </div>
            <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300">+40% discovery</Badge>
          </li>
        </ul>
      </div>
    </div>
  );
}
