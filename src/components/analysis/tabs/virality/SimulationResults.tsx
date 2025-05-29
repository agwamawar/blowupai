
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SimulationResultsProps {
  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    engagementRate: string;
    demographicBoost: string;
  };
  timelineData: Array<{
    hour: string;
    views: number;
    engagement: number;
  }>;
  insights: Array<{
    type: 'warning' | 'info' | 'success';
    title: string;
    message: string;
    bgColor: string;
    borderColor: string;
  }>;
}

export function SimulationResults({ metrics, timelineData, insights }: SimulationResultsProps) {
  const saveToLikeRatio = metrics.likes > 0 ? (metrics.shares / metrics.likes).toFixed(2) : "0.00";
  const dropOffRate = Math.max(15, Math.min(65, 40 + Math.random() * 20)).toFixed(0);
  const peakEngagementTime = "1.5 hrs";
  const nicheTrendFit = Math.max(75, Math.min(95, 87 + Math.random() * 10)).toFixed(0);

  const metricsData = [
    {
      metric: "Projected Views",
      value: metrics.views.toLocaleString(),
      suggestion: metrics.views < 50000 ? "Good, but can 2x with trend-aligned sound" : "Excellent reach! Consider cross-platform posting"
    },
    {
      metric: "Peak Engagement Time",
      value: peakEngagementTime,
      suggestion: "Post during 6–9 PM local time for maximum reach"
    },
    {
      metric: "Drop-Off Rate",
      value: `${dropOffRate}%`,
      suggestion: parseInt(dropOffRate) > 35 ? "Improve mid-video retention with pattern interrupts" : "Great retention! Maintain your pacing"
    },
    {
      metric: "Save-to-Like Ratio",
      value: saveToLikeRatio,
      suggestion: parseFloat(saveToLikeRatio) < 0.3 ? "Add \"Save this for later\" CTA" : "Strong save rate! Content is valuable to viewers"
    },
    {
      metric: "Niche Trend Fit",
      value: `${nicheTrendFit}%`,
      suggestion: parseInt(nicheTrendFit) > 85 ? "Riding a growing trend — good momentum!" : "Consider aligning with trending topics in your niche"
    }
  ];

  return (
    <>
      {/* Engagement Simulation Results Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Engagement Simulation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Metric</TableHead>
                <TableHead className="font-semibold">Value</TableHead>
                <TableHead className="font-semibold">Suggestion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metricsData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.metric}</TableCell>
                  <TableCell className="font-semibold text-primary">{row.value}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{row.suggestion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI Optimization Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">AI Optimization Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className={`p-3 ${insight.bgColor} ${insight.borderColor} rounded-lg text-sm`}>
                <strong>{insight.title}:</strong> {insight.message}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
