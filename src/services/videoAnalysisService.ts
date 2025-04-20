
// Mock service for frontend-only functionality

export const analysisStages = [
  "Initializing analysis",
  "Processing video content",
  "Analyzing engagement patterns",
  "Extracting key moments",
  "Generating recommendations",
  "Finalizing report"
];

export const videoAnalysisService = {
  analyzeVideo: async (videoUrl: string, options: any) => {
    // This is a mock implementation for frontend-only functionality
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          video_url: videoUrl,
          engagement_score: 87,
          virality_score: 92,
          trend_score: 89,
          trending_hashtags: [
            "#KidsHaircut",
            "#BarberLife",
            "#MallPrank",
            "#BeforeAndAfter",
            "#BlackHair",
            "#MixedKidsHair"
          ],
          trend_opportunities: [
            "Create a series of 'random mall approaches' for more viral content",
            "Showcase more before/after transformations of kids with curly/textured hair",
            "Add trending audio to the salon transformation sequence",
            "Create tutorials for parents of mixed-race children's hair care"
          ],
          video_metadata: {
            duration: "0:27",
            platform: "TikTok",
            title: "How we almost got kicked out the mall for doing too much 😅",
            format: "Portrait",
            content_type: "Comedy Skit with Professional Service Reveal"
          },
          content_analysis: {
            objects: ["barber", "child", "father", "mother", "salon chair", "hair tools", "scissors"],
            scene_transitions: "Mall to salon transition with whip-pan effect",
            text_detected: ["How we almost got kicked out the mall for doing too much 😅", "Every princess deserves her crown 👑✨ #RoyalTrim"],
            main_themes: ["Comedy", "Transformation", "Professional Services", "Parenting"],
            content_type: "Transformation Reveal"
          },
          narrative_summary: "A bold mall prank where a barber approaches a dad holding his biracial daughter, pretends to cut her hair causing tension, then calms the situation by offering professional service. The scene transitions to a salon where the girl receives a beautiful haircut, ending with a dramatic before/after transformation.",
          timeline_points: [
            { label: "Hook", description: "Surprise mall approach with scissors", timestamp: "0:00" },
            { label: "Tension", description: "Dad's angry reaction, ready to fight", timestamp: "0:03" },
            { label: "Resolution", description: "Explanation calms situation", timestamp: "0:07" },
            { label: "Transition", description: "Mall to barbershop scene change", timestamp: "0:08" },
            { label: "Transformation", description: "Professional haircut sequence", timestamp: "0:16" },
            { label: "Reveal", description: "Before/after comparison with caption", timestamp: "0:23" }
          ],
          engagement_prediction: {
            best_segments: [
              { timestamp: "0:00-0:03", reason: "Shocking opening creates immediate intrigue with dad's reaction" },
              { timestamp: "0:16-0:22", reason: "Haircut transformation of biracial child's hair showcases your expertise" },
              { timestamp: "0:23-0:27", reason: "Before/after reveal delivers satisfying payoff with 'princess' messaging" }
            ]
          },
          target_audience: ["Parents of young children", "Mixed-race families", "Hair care enthusiasts", "Prank/comedy content viewers"],
          follower_count: 10000
        });
      }, 3000);
    });
  },
  
  getAnalysisStatus: async (analysisId: string) => {
    return {
      status: "completed",
      progress: 100
    };
  }
};
