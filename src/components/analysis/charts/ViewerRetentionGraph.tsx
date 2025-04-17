
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface RetentionPoint {
  point: number;
  value: number;
}

interface DropOffPoint {
  timestamp: string;
  reason: string;
}

interface ViewerRetentionGraphProps {
  retentionData: RetentionPoint[];
  dropOffPoints: DropOffPoint[];
  duration: string;
}

export function ViewerRetentionGraph({ 
  retentionData, 
  dropOffPoints, 
  duration 
}: ViewerRetentionGraphProps) {
  // Process drop-off points to align with the retention data
  const getTimePercentage = (timestamp: string) => {
    const [minutes, seconds] = timestamp.split(':').map(Number);
    const timeInSeconds = minutes * 60 + seconds;
    
    const [durationMinutes, durationSeconds] = duration.split(':').map(Number);
    const durationInSeconds = durationMinutes * 60 + durationSeconds;
    
    return (timeInSeconds / durationInSeconds) * 100;
  };
  
  // Format the drop-off points for reference lines
  const formattedDropOffPoints = dropOffPoints.map(point => ({
    position: getTimePercentage(point.timestamp),
    timestamp: point.timestamp,
    reason: point.reason
  }));
  
  // Create a benchmark line (typical retention for similar content)
  const benchmarkData = retentionData.map(point => ({
    point: point.point,
    benchmark: point.point === 0 ? 100 : Math.max(100 - (point.point * 0.7), 30) // Simplified benchmark curve
  }));
  
  // Combine the actual data with the benchmark
  const combinedData = retentionData.map((point, index) => ({
    ...point,
    benchmark: benchmarkData[index].benchmark
  }));
  
  // Custom tooltip to display more information
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="text-sm font-medium">{`${label}% of video`}</p>
          <p className="text-xs text-primary">
            <span className="font-semibold">Your retention:</span> {` ${payload[0].value}%`}
          </p>
          <p className="text-xs text-gray-500">
            <span className="font-semibold">Typical:</span> {` ${payload[1].value}%`}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {label === 100 ? 'Video end' : `Timestamp: ~${formatTimestamp(label, duration)}`}
          </p>
        </div>
      );
    }
    return null;
  };
  
  // Helper to format percentage of video to timestamp
  const formatTimestamp = (percentage: number, duration: string) => {
    const [minutes, seconds] = duration.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    const secondsAtPercentage = Math.floor((percentage / 100) * totalSeconds);
    
    const resultMinutes = Math.floor(secondsAtPercentage / 60);
    const resultSeconds = secondsAtPercentage % 60;
    
    return `${resultMinutes}:${resultSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={combinedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
        <XAxis 
          dataKey="point" 
          tickFormatter={(value) => `${value}%`}
          label={{ value: 'Video Progress', position: 'insideBottom', offset: -5 }}
        />
        <YAxis 
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
          label={{ value: 'Viewers Retained', angle: -90, position: 'insideLeft', offset: 10 }}
        />
        <Tooltip content={<CustomTooltip />} />
        
        {/* Benchmark area */}
        <Area 
          type="monotone" 
          dataKey="benchmark" 
          stroke="#d1d5db" 
          fill="#f3f4f6" 
          strokeWidth={1.5}
          fillOpacity={0.4}
          name="Typical Retention"
        />
        
        {/* Actual retention area */}
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="#2563eb" 
          fill="#3b82f6" 
          strokeWidth={2}
          fillOpacity={0.6}
          name="Your Retention"
        />
        
        {/* Add reference lines for drop-off points */}
        {formattedDropOffPoints.map((point, index) => (
          <ReferenceLine 
            key={index}
            x={point.position} 
            stroke="#f59e0b" 
            strokeDasharray="3 3"
            strokeWidth={2}
            label={{ 
              value: point.timestamp, 
              position: 'top',
              fill: '#f59e0b',
              fontSize: 10
            }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
