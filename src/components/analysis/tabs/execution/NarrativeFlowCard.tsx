
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Layout } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface NarrativeFlowProps {
  narrativeData: {
    pacing: number;
    storyProgression: number;
    transitions: number;
    engagementCurve: { point: number; value: number }[];
  };
  contentType: string;
}

export function NarrativeFlowCard({ 
  narrativeData,
  contentType 
}: NarrativeFlowProps) {
  // Content-type specific narrative advice
  const getNarrativeAdvice = () => {
    const contentTypeLower = contentType.toLowerCase();
    
    if (contentTypeLower.includes('tutorial') || contentTypeLower.includes('how-to')) {
      return "Tutorials benefit from a linear, step-by-step narrative flow with clear progression markers.";
    } else if (contentTypeLower.includes('vlog') || contentTypeLower.includes('lifestyle')) {
      return "Lifestyle content should balance personal storytelling with visual interest.";
    } else if (contentTypeLower.includes('comedy') || contentTypeLower.includes('skit')) {
      return "Comedy benefits from unexpected timing and well-timed visual/audio punchlines.";
    } else if (contentTypeLower.includes('gaming')) {
      return "Gaming content should highlight key moments with clear buildup and payoff.";
    } else {
      return "Strong narrative flow keeps viewers engaged throughout the entire video.";
    }
  };

  // Format the engagement curve data for the chart
  const chartData = narrativeData.engagementCurve.map(point => ({
    time: `${point.point * 10}%`,
    value: point.value
  }));

  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Layout className="h-5 w-5 text-primary" />
          Narrative Flow & Pacing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pacing</span>
                <span className="text-sm font-medium">{narrativeData.pacing}/10</span>
              </div>
              <Progress value={narrativeData.pacing * 10} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {narrativeData.pacing >= 8 
                  ? "Excellent pacing that maintains viewer interest" 
                  : narrativeData.pacing >= 6 
                  ? "Good pacing with minor inconsistencies" 
                  : "Pacing could be improved for better viewer retention"}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Story Progression</span>
                <span className="text-sm font-medium">{narrativeData.storyProgression}/10</span>
              </div>
              <Progress value={narrativeData.storyProgression * 10} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {narrativeData.storyProgression >= 8 
                  ? "Excellent progression with clear narrative arc" 
                  : narrativeData.storyProgression >= 6 
                  ? "Good progression with room for clearer structure" 
                  : "Story development needs more coherent structure"}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Transitions</span>
                <span className="text-sm font-medium">{narrativeData.transitions}/10</span>
              </div>
              <Progress value={narrativeData.transitions * 10} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {narrativeData.transitions >= 8 
                  ? "Smooth transitions that enhance the narrative flow" 
                  : narrativeData.transitions >= 6 
                  ? "Effective transitions with occasional abruptness" 
                  : "Transitions could be smoother between segments"}
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
              <BarChart className="h-4 w-4 text-primary/70" />
              Predicted Engagement Curve
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
                  <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" opacity={0.3} />
                  <XAxis 
                    dataKey="time" 
                    label={{ 
                      value: 'Video Timeline', 
                      position: 'bottom', 
                      offset: 0,
                      fontSize: 12
                    }} 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    label={{ 
                      value: 'Engagement', 
                      angle: -90, 
                      position: 'insideLeft',
                      fontSize: 12
                    }} 
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}% Engagement`, 'Audience Retention']} 
                    labelFormatter={(label) => `At ${label} of video`}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="pt-3 border-t">
            <div className="p-3 bg-primary/5 rounded-md">
              <h4 className="text-sm font-medium">Narrative Flow Insight</h4>
              <p className="text-sm mt-1">{getNarrativeAdvice()}</p>
              <p className="text-sm mt-2">
                {narrativeData.pacing < 7 
                  ? "Consider varying your pacing more dynamically to maintain viewer interest." 
                  : "Your pacing effectively maintains viewer interest throughout."}
                {narrativeData.transitions < 7 
                  ? " Work on smoother transitions between key sections." 
                  : " Your transitions effectively guide viewers through the content."}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
