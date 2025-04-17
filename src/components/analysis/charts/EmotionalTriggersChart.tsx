
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface EmotionData {
  timestamp: string;
  emotion: string;
  strength: number;
  description: string;
}

interface EmotionalTriggersChartProps {
  data: EmotionData[];
  duration: string;
}

export function EmotionalTriggersChart({ data, duration }: EmotionalTriggersChartProps) {
  // Process data for visualization
  const emotions = [...new Set(data.map(item => item.emotion))];
  const colors = {
    curiosity: '#8884d8',
    humor: '#82ca9d',
    empathy: '#ffc658',
    shock: '#ff8042',
    surprise: '#0088FE',
    joy: '#00C49F',
    sadness: '#8884d8',
    anger: '#FF0000'
  };
  
  // Convert timestamp to seconds for positioning
  const getTimeInSeconds = (timestamp: string) => {
    const parts = timestamp.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  };
  
  // Calculate total duration in seconds
  const getTotalDuration = () => {
    const parts = duration.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  };
  
  // Process data for chart
  const chartData = data.map(item => {
    const timeSeconds = getTimeInSeconds(item.timestamp);
    const totalDuration = getTotalDuration();
    const position = (timeSeconds / totalDuration) * 100;
    
    return {
      position,
      timestamp: item.timestamp,
      [item.emotion]: item.strength,
    };
  });
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        barGap={0}
      >
        <XAxis 
          dataKey="timestamp" 
          label={{ value: 'Video Timeline', position: 'insideBottomRight', offset: -10 }} 
        />
        <YAxis 
          label={{ value: 'Emotional Impact', angle: -90, position: 'insideLeft' }}
          domain={[0, 100]}
        />
        <Tooltip 
          formatter={(value, name) => [`${value}% Strength`, name.charAt(0).toUpperCase() + name.slice(1)]}
          labelFormatter={(value) => `Timestamp: ${value}`}
        />
        <Legend />
        {emotions.map((emotion) => (
          <Bar 
            key={emotion} 
            dataKey={emotion} 
            fill={colors[emotion as keyof typeof colors] || '#8884d8'} 
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
