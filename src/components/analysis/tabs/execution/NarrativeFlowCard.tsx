
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
  narrativeData = {
    pacing: 8.5,
    storyProgression: 9,
    transitions: 7.5,
    engagementCurve: [
      { point: 0, value: 90 },  // Opening with scissors
      { point: 1, value: 95 },  // Dad's reaction peak
      { point: 2, value: 85 },  // Deescalation moment
      { point: 3, value: 80 },  // Transition to salon
      { point: 4, value: 85 },  // Hair cutting process
      { point: 5, value: 90 },  // Before/after reveal
      { point: 6, value: 95 },  // Final reveal with message
      { point: 7, value: 90 },  // End of video
      { point: 8, value: 85 },
      { point: 9, value: 80 }
    ]
  },
  contentType = "Transformation Prank"
}: NarrativeFlowProps) {
  // Content-type specific narrative advice
  const getNarrativeAdvice = () => {
    const contentTypeLower = contentType.toLowerCase();
    
    if (contentTypeLower.includes('prank') || contentTypeLower.includes('surprise')) {
      return "Your tension-to-resolution narrative with the dad's reaction creates strong emotional investment in the outcome.";
    } else if (contentTypeLower.includes('transformation') || contentTypeLower.includes('reveal')) {
      return "The clear before/after structure with the biracial child's hair transformation delivers satisfying payoff.";
    } else if (contentTypeLower.includes('tutorial') || contentTypeLower.includes('how-to')) {
      return "Consider adding more educational elements about mixed-race hair care techniques during the salon sequence.";
    } else {
      return "The narrative progression from mall tension to salon resolution creates a complete story arc.";
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
                  ? "Excellent pacing - quick tension at mall, smooth transition to salon, satisfying reveal" 
                  : narrativeData.pacing >= 6 
                  ? "Good pacing with minor inconsistencies in salon section" 
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
                  ? "Strong narrative arc from tension to resolution, with clear transformation payoff" 
                  : narrativeData.storyProgression >= 6 
                  ? "Good progression with room for clearer structure in the middle section" 
                  : "Story development needs more coherent structure between scenes"}
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
                  ? "Excellent whip-pan transition from mall to salon enhances the narrative" 
                  : narrativeData.transitions >= 6 
                  ? "Good mall-to-salon transition, but could be enhanced with audio cue" 
                  : "The scene transition between mall and salon needs smoother execution"}
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
                Your peak engagement points (dad's initial reaction and final transformation reveal) create an effective 
                emotional bookend for your narrative. The biracial child's hair transformation provides unique appeal 
                to parents looking for specialized haircare services.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
