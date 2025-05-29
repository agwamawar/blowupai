
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
  const metricsData = [
    {
      metric: "Projected Views",
      value: "34,200",
      suggestion: "Based on a 28% average view rate from 122K followers"
    },
    {
      metric: "Likes",
      value: "3,100",
      suggestion: "Engagement driven by strong hook + niche fit"
    },
    {
      metric: "Comments",
      value: "280",
      suggestion: "Moderate — consider using a direct question CTA"
    },
    {
      metric: "Shares",
      value: "560",
      suggestion: "Boosted by relatability and remix potential"
    },
    {
      metric: "Saves",
      value: "710",
      suggestion: "High save-to-like ratio – leverage with \"Save for later\" cue"
    }
  ];

  const optimizationInsights = [
    {
      type: 'info' as const,
      title: 'Peak Engagement Time',
      message: '1.5 hrs — Post during 6–9 PM local time',
      bgColor: 'bg-blue-50 border-blue-200',
      borderColor: 'border-blue-200'
    },
    {
      type: 'warning' as const,
      title: 'Drop-Off Rate',
      message: '40% — Improve mid-video retention',
      bgColor: 'bg-yellow-50 border-yellow-200',
      borderColor: 'border-yellow-200'
    },
    {
      type: 'info' as const,
      title: 'Save-to-Like Ratio',
      message: '0.25 — Add "Save this for later" CTA',
      bgColor: 'bg-blue-50 border-blue-200',
      borderColor: 'border-blue-200'
    },
    {
      type: 'success' as const,
      title: 'Niche Trend Fit',
      message: '87% — Riding a growing trend — good momentum!',
      bgColor: 'bg-green-50 border-green-200',
      borderColor: 'border-green-200'
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
            {optimizationInsights.map((insight, index) => (
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
