
import React from "react";

interface EngagementInsightsProps {
  engagementScore: number;
  bestSegments: Array<{ timestamp: string; reason: string }>;
  onTimestampClick: (timestamp: string) => void;
}

export function EngagementInsights({ 
  engagementScore, 
  bestSegments, 
  onTimestampClick 
}: EngagementInsightsProps) {
  return (
    <div className="grid gap-4">
      <h3 className="text-xl font-semibold">Engagement Insights</h3>
      <p>Based on our analysis, your content has an engagement score of {engagementScore}/100.</p>
      <div className="p-4 bg-primary/5 rounded-lg">
        <h4 className="font-medium mb-2">Key Moments for Engagement</h4>
        <ul className="space-y-2">
          {bestSegments.length > 0 ? (
            bestSegments.map((segment, i) => (
              <li key={i} className="flex justify-between">
                <span className="font-medium cursor-pointer hover:text-primary" 
                  onClick={() => onTimestampClick(segment.timestamp)}>
                  {segment.timestamp}
                </span>
                <span>{segment.reason}</span>
              </li>
            ))
          ) : (
            <li>No key moments identified in this video.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
