
// Utility functions for engagement simulation

export interface DemographicMultipliers {
  gender: number;
  age: number;
  location: number;
  niche: number;
}

export interface EngagementMetrics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  engagementRate: string;
  demographicBoost: string;
}

export interface SimulationInsight {
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  bgColor: string;
  borderColor: string;
}

export function getDemographicMultipliers(
  femalePercentage: number,
  primaryAgeGroup: string,
  primaryLocation: string,
  contentNiche: string
): DemographicMultipliers {
  // Gender engagement patterns (based on platform averages)
  const femaleEngagementBoost = femalePercentage > 60 ? 1.15 : femalePercentage < 40 ? 0.95 : 1.0;
  
  // Age group engagement patterns
  const ageMultipliers = {
    "13-17": 1.25, // Highest engagement
    "18-24": 1.20,
    "25-34": 1.10,
    "35-44": 1.05,
    "45-54": 0.95,
    "55+": 0.85
  };
  
  // Location engagement patterns (time zone and cultural factors)
  const locationMultipliers = {
    "US": 1.20,
    "UK": 1.15,
    "Canada": 1.10,
    "Australia": 1.08,
    "Germany": 1.05,
    "France": 1.05,
    "Other": 1.00
  };
  
  // Niche engagement patterns
  const nicheMultipliers = {
    "lifestyle": 1.10,
    "beauty": 1.25,
    "fitness": 1.15,
    "comedy": 1.30,
    "education": 0.95,
    "tech": 0.90,
    "gaming": 1.20,
    "food": 1.15,
    "travel": 1.05,
    "parenting": 1.18
  };
  
  return {
    gender: femaleEngagementBoost,
    age: ageMultipliers[primaryAgeGroup as keyof typeof ageMultipliers] || 1.0,
    location: locationMultipliers[primaryLocation as keyof typeof locationMultipliers] || 1.0,
    niche: nicheMultipliers[contentNiche as keyof typeof nicheMultipliers] || 1.0
  };
}

export function calculateEngagement(
  followerCount: number,
  averageViews: number,
  hoursAfterPosting: number,
  femalePercentage: number,
  primaryAgeGroup: string,
  demographics: DemographicMultipliers
): EngagementMetrics {
  const baseViews = followerCount * 0.3; // 30% reach rate
  const viewsMultiplier = averageViews / 100;
  const timeDecay = Math.max(0.3, 1 - (hoursAfterPosting - 1) * 0.05);
  const qualityBoost = 1.275; // equivalent to 85% quality
  const trendBoost = 1.02; // equivalent to 85% trend alignment
  
  // Apply demographic multipliers
  const demographicBoost = demographics.gender * demographics.age * demographics.location * demographics.niche;
  
  const projectedViews = Math.round(baseViews * viewsMultiplier * timeDecay * qualityBoost * trendBoost * demographicBoost);
  
  // Adjust engagement rates based on demographics
  const baseLikeRate = 0.08;
  const baseCommentRate = 0.02;
  const baseShareRate = 0.015;
  
  // Female audiences tend to engage more with likes and comments
  const genderLikeBoost = femalePercentage > 60 ? 1.2 : 1.0;
  const genderCommentBoost = femalePercentage > 60 ? 1.3 : 1.0;
  
  // Younger audiences share more
  const ageShareBoost = primaryAgeGroup === "13-17" || primaryAgeGroup === "18-24" ? 1.4 : 1.0;
  
  const likeRate = baseLikeRate * genderLikeBoost * demographics.niche;
  const commentRate = baseCommentRate * genderCommentBoost * (averageViews / 5000);
  const shareRate = baseShareRate * ageShareBoost * demographics.niche;
  
  return {
    views: projectedViews,
    likes: Math.round(projectedViews * likeRate),
    comments: Math.round(projectedViews * commentRate),
    shares: Math.round(projectedViews * shareRate),
    engagementRate: ((likeRate + commentRate + shareRate) * 100).toFixed(1),
    demographicBoost: ((demographicBoost - 1) * 100).toFixed(1)
  };
}

export function generateTimelineData(
  followerCount: number,
  averageViews: number,
  demographics: DemographicMultipliers
): Array<{ hour: string; views: number; engagement: number }> {
  const data = [];
  const demographicBoost = demographics.gender * demographics.age * demographics.location * demographics.niche;
  
  for (let hour = 1; hour <= 72; hour++) {
    const timeDecay = Math.max(0.1, 1 - (hour - 1) * 0.02);
    const baseViews = followerCount * 0.3;
    const views = Math.round(baseViews * (averageViews / 100) * timeDecay * 1.275 * demographicBoost);
    data.push({
      hour: `${hour}h`,
      views: views,
      engagement: Math.round(views * 0.12)
    });
  }
  return data;
}

export function generateInsights(
  hoursAfterPosting: number,
  followerCount: number,
  averageViews: number,
  femalePercentage: number,
  primaryAgeGroup: string,
  primaryLocation: string,
  contentNiche: string,
  demographicBoost: string
): SimulationInsight[] {
  const insights: SimulationInsight[] = [];

  if (hoursAfterPosting > 12) {
    insights.push({
      type: 'warning',
      title: '⚠️ Time Decay Alert',
      message: 'Content performance drops significantly after 12 hours. Consider reposting or boosting.',
      bgColor: 'bg-amber-50',
      borderColor: 'border border-amber-200'
    });
  }
  
  if (followerCount < 10000) {
    insights.push({
      type: 'info',
      title: '📈 Growth Tip',
      message: 'With fewer followers, focus on higher engagement rates to boost algorithmic reach.',
      bgColor: 'bg-blue-50',
      borderColor: 'border border-blue-200'
    });
  }
  
  if (averageViews < 60) {
    insights.push({
      type: 'info',
      title: '🎯 Content Tip',
      message: 'Low average views suggests your content may not be reaching your full audience. Consider optimizing posting times.',
      bgColor: 'bg-purple-50',
      borderColor: 'border border-purple-200'
    });
  }

  if (femalePercentage > 70 && contentNiche === "beauty") {
    insights.push({
      type: 'success',
      title: '💄 Audience Match',
      message: 'Your female-dominant audience aligns perfectly with beauty content - expect higher engagement!',
      bgColor: 'bg-pink-50',
      borderColor: 'border border-pink-200'
    });
  }

  if (primaryAgeGroup === "13-17" || primaryAgeGroup === "18-24") {
    insights.push({
      type: 'success',
      title: '🚀 Youth Boost',
      message: 'Younger audiences engage 20-25% more and share content frequently!',
      bgColor: 'bg-green-50',
      borderColor: 'border border-green-200'
    });
  }
  
  insights.push({
    type: 'info',
    title: '🎯 Demographic Insight',
    message: `Your ${primaryLocation} audience in the ${contentNiche} niche with ${femalePercentage}% female viewers provides a ${parseFloat(demographicBoost) > 0 ? 'positive' : 'neutral'} engagement boost.`,
    bgColor: 'bg-green-50',
    borderColor: 'border border-green-200'
  });

  return insights;
}
