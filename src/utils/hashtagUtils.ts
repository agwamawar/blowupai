
/**
 * Utility functions for generating hashtags
 */

/**
 * Generates personalized content-based hashtags based on analysis data and follower count
 */
export const generatePersonalizedHashtags = (analysisData: any, followerCount: number = 0) => {
  const baseHashtags = ["#contentcreator", "#socialmedia"];
  const detectedObjects = analysisData?.content_analysis?.objects || [];
  
  // Add hashtags based on detected objects
  const objectHashtags = detectedObjects
    .slice(0, 3)
    .map((obj: string) => `#${obj.toLowerCase().replace(/\s+/g, '')}`);
  
  // Add platform-specific hashtag
  const platformHashtag = analysisData?.video_metadata?.platform 
    ? [`#${analysisData.video_metadata.platform.toLowerCase()}`]
    : ["#trending"];
    
  // Add follower count based hashtags
  const followerTierHashtag = followerCount < 10000 
    ? ["#smallcreator", "#growingcommunity"] 
    : followerCount < 50000 
      ? ["#midtier", "#influencer"] 
      : ["#contentcreator", "#influencermarketing"];
  
  return [...baseHashtags, ...objectHashtags, ...platformHashtag, ...followerTierHashtag.slice(0, 1)];
};
