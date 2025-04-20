
import { AnalysisDataType } from "@/types/analysisTypes";

export function generateRecommendations(analysisData?: AnalysisDataType) {
  const recommendations = [];
  
  // Add recommendations from viralityScore
  if (analysisData?.viralityScore?.improvements) {
    recommendations.push({
      title: "Virality Improvements",
      description: "Changes to increase viral potential",
      actionItems: analysisData.viralityScore.improvements
    });
  }
  
  // Extract recommendations from technicalAnalysis
  if (analysisData?.technicalAnalysis?.recommendations) {
    recommendations.push({
      title: "Technical Improvements",
      description: "Enhance technical quality",
      actionItems: analysisData.technicalAnalysis.recommendations
    });
  }
  
  // Extract recommendations from similarContent
  if (analysisData?.similarContent?.recommendations) {
    recommendations.push({
      title: "Content Strategy",
      description: "Based on similar top-performing content",
      actionItems: analysisData.similarContent.recommendations
    });
  }
  
  return recommendations.length > 0 ? recommendations : [
    {
      title: "Series Potential",
      description: "Build on the 'mall approach' concept",
      actionItems: [
        "Create a series of 'random mall approaches' with different kids and parents",
        "Show a compilation of parent reactions to your surprise approaches",
        "Make a behind-the-scenes video explaining how you set up these pranks safely"
      ]
    },
    {
      title: "Expert Positioning",
      description: "Establish yourself as a specialist in mixed-race kids' hair",
      actionItems: [
        "Create short tutorial clips for parents of biracial children",
        "Showcase before/after transformations focusing on textured/curly hair",
        "Partner with mixed-race family influencers for content collaborations"
      ]
    },
    {
      title: "Technical Enhancements",
      description: "Improve production quality for even better engagement",
      actionItems: [
        "Add custom sound effects during the dad's reaction moment", 
        "Include salon branding elements during the transformation sequence",
        "Create a signature transition effect when moving from mall to salon"
      ]
    }
  ];
}
