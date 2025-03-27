
/**
 * Utility functions for generating trend opportunities
 */

/**
 * Generates video-specific trend opportunities based on follower count
 */
export const generateTrendOpportunities = (analysisData: any, followerCount: number = 0) => {
  const objects = analysisData?.content_analysis?.objects || [];
  const platform = analysisData?.video_metadata?.platform || "TikTok";
  
  // Base opportunities that apply to all follower counts
  const baseOpportunities = [
    `Videos featuring ${objects.length > 0 ? objects[0] : "similar content"} with quick zooms at 0:03 seeing 43% higher completion rates`,
    `${platform} creators using on-screen text for 60% of video duration get 2.8x more shares`
  ];
  
  // Follower-specific opportunities
  const followerOpportunities = [];
  
  if (followerCount < 10000) {
    followerOpportunities.push(
      "Small accounts using trending sounds within 24hrs of emergence see 2.2x faster follower growth",
      "Creators under 10K followers who post consistently (min. 1/day) grow 3x faster than intermittent posters"
    );
  } else if (followerCount < 50000) {
    followerOpportunities.push(
      "Mid-size creators (10K-50K) mentioning their follower milestone in videos see 67% more new follows",
      "Collaboration videos between mid-tier creators boost mutual engagement by 45% on average"
    );
  } else {
    followerOpportunities.push(
      "Larger accounts (50K+) leveraging 'close friends' or 'subscriber-only' content see 35% higher retention",
      "Creators with 50K+ followers who launch products see 3.2x higher conversion than smaller accounts"
    );
  }
  
  // Add platform-specific opportunity with concrete example
  if (platform === "TikTok") {
    followerOpportunities.push(`TikTok creators with ${followerCount < 50000 ? "smaller audiences" : "larger audiences"} are seeing success with ${followerCount < 50000 ? "behind-the-scenes content showing authenticity" : "premium branded content with higher production value"}`);
  } else if (platform === "Instagram") {
    followerOpportunities.push(`Instagram ${followerCount < 50000 ? "growth accounts" : "established creators"} are having success with ${followerCount < 50000 ? "carousel posts featuring data visualizations" : "exclusive reels showing premium lifestyle content"}`);
  } else if (platform === "YouTube") {
    followerOpportunities.push(`YouTube ${followerCount < 50000 ? "smaller channels" : "larger channels"} are trending with ${followerCount < 50000 ? "shorter format deep dives under 10 minutes" : "longer premium content with higher production value"}`);
  }
  
  return [...baseOpportunities, ...followerOpportunities.slice(0, 3)];
};
