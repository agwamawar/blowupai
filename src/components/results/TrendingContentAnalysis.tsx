
import React from "react";

interface TrendingContentAnalysisProps {
  trendScore: number;
  trendingHashtags: string[];
  trendOpportunities: string[];
}

export function TrendingContentAnalysis({ 
  trendScore, 
  trendingHashtags, 
  trendOpportunities 
}: TrendingContentAnalysisProps) {
  return (
    <div className="grid gap-4">
      <h3 className="text-xl font-semibold">Trending Content Analysis</h3>
      <p>See how your content aligns with current trends.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-primary/5 rounded-lg">
          <h4 className="font-medium mb-2">Trending Hashtags to Use</h4>
          <div className="flex flex-wrap gap-2">
            {trendingHashtags.map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-primary/20 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4 bg-primary/5 rounded-lg">
          <h4 className="font-medium mb-2">Trend Opportunities</h4>
          <ul className="space-y-1">
            {trendOpportunities.map((opp, i) => (
              <li key={i} className="text-sm">• {opp}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
