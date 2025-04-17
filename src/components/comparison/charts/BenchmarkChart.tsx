
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  LabelList,
  ResponsiveContainer,
  Cell
} from "recharts";
import { CompetitorBenchmarkInsight } from "@/types/comparisonTypes";

interface BenchmarkChartProps {
  insights: CompetitorBenchmarkInsight[];
}

export function BenchmarkChart({ insights }: BenchmarkChartProps) {
  const chartData = insights.map(insight => ({
    name: insight.label,
    yours: insight.value,
    topPerformers: insight.benchmarkValue,
  }));

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Comparison between your content metrics and top performers in your category
      </p>
    </div>
  );
}
