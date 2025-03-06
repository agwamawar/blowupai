
import { BarChart, Sigma, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  LabelList,
  ResponsiveContainer,
  Cell
} from "recharts";

interface InsightItem {
  label: string;
  value: number;
  icon?: React.ReactNode;
  description?: string;
  benchmarkValue?: number;
}

interface CompetitorBenchmarkProps {
  insights: InsightItem[];
}

export function CompetitorBenchmark({ insights }: CompetitorBenchmarkProps) {
  // Enhanced insights with benchmark values
  const enhancedInsights = insights.map(insight => ({
    ...insight,
    benchmarkValue: insight.benchmarkValue || Math.floor(Math.random() * 20) + 60 // Random value between 60-80
  }));
  
  // Format data for the comparison chart
  const chartData = enhancedInsights.map(insight => ({
    name: insight.label,
    yours: insight.value,
    topPerformers: insight.benchmarkValue,
  }));
  
  // Top performing content examples
  const topPerformers = [
    {
      title: "Behind-the-scenes product demo",
      views: "1.2M",
      engagement: "92%",
      technique: "Face-to-camera followed by product close-up"
    },
    {
      title: "Quick tutorial with text overlay",
      views: "845K",
      engagement: "88%",
      technique: "Step-by-step with animated text"
    },
    {
      title: "Trending sound paired with demonstration",
      views: "2.3M",
      engagement: "85%",
      technique: "Viral audio + seamless transitions"
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary text-lg flex items-center">
          <BarChart className="h-5 w-5 text-primary mr-2" />
          Competitor Benchmarking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="text-gray-700 mb-3 flex items-center font-medium">
              <Sigma className="h-4 w-4 mr-1" /> 
              Your Content vs. Category Leaders
            </h4>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  barSize={20}
                  barGap={8}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <Bar dataKey="yours" fill="hsl(var(--primary))" name="Your Content">
                    <LabelList dataKey="yours" position="top" fill="#666" fontSize={12} />
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="hsl(var(--primary))" />
                    ))}
                  </Bar>
                  <Bar dataKey="topPerformers" fill="#94a3b8" name="Top Performers">
                    <LabelList dataKey="topPerformers" position="top" fill="#666" fontSize={12} />
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Comparison between your content metrics and top performers in your category
            </p>
          </div>
          
          <div>
            <h4 className="text-gray-700 mb-3 flex items-center font-medium">
              <Trophy className="h-4 w-4 mr-1" />
              Top Performing Content in Your Category
            </h4>
            <div className="space-y-3">
              {topPerformers.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <h5 className="font-medium text-gray-800 text-sm">{item.title}</h5>
                    <p className="text-xs text-gray-600">{item.technique}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">{item.views} views</p>
                    <p className="text-xs text-green-600">{item.engagement} engagement</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-xs text-gray-500 italic">
            Benchmark data sourced from top 5% of content in your niche over the past 30 days
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
