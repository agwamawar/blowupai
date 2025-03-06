
import { BarChart, Sigma, Trophy, ExternalLink } from "lucide-react";
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
import { InsightItem } from "@/types/insightTypes";
import { topPerformingContent } from "@/mocks/insightsMockData";
import { toast } from "sonner";

interface CompetitorBenchmarkProps {
  insights: InsightItem[];
}

export function CompetitorBenchmark({ insights }: CompetitorBenchmarkProps) {
  // Format data for the comparison chart
  const chartData = insights.map(insight => ({
    name: insight.label,
    yours: insight.value,
    topPerformers: insight.benchmarkValue,
  }));
  
  const handleVideoClick = (url: string, title: string) => {
    // Open the video in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Show a toast notification
    toast.success(`Opening "${title}"`, {
      description: "External video opened in a new tab"
    });
  };

  return (
    <Card className="border border-primary/20">
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
              {topPerformingContent.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex justify-between items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                  onClick={() => handleVideoClick(item.videoUrl, item.title)}
                >
                  <div className="space-y-1">
                    <h5 className="font-medium text-gray-800 text-sm flex items-center">
                      {item.title}
                      <ExternalLink className="h-3 w-3 ml-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h5>
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
