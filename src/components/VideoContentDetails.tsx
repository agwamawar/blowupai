import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, FileText, Info, Tag, ThumbsUp, Zap } from "lucide-react";

interface VideoContentDetailsProps {
  videoMetadata: {
    title: string;
    duration: string;
    platform: string;
  };
  contentDetails?: {
    detectedObjects?: string[];
    sceneTransitions?: string;
    detectedText?: string[];
    mainThemes?: string[];
    contentType?: string;
  };
}

export function VideoContentDetails({ 
  videoMetadata, 
  contentDetails = {} 
}: VideoContentDetailsProps) {
  const { 
    detectedObjects = ["barber", "child", "father", "mother", "salon chair", "hair tools", "scissors"], 
    sceneTransitions = "Mall to salon transition with whip-pan effect", 
    detectedText = ["How we almost got kicked out the mall for doing too much 😅", "Every princess deserves her crown 👑✨ #RoyalTrim"],
    mainThemes = ["Comedy", "Transformation", "Professional Services", "Parenting"],
    contentType = "Transformation Reveal"
  } = contentDetails;
  
  return (
    <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary text-lg flex items-center">
          <FileText className="h-5 w-5 text-primary mr-2" />
          Video Content Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 border-b pb-2 md:border-r md:border-b-0 md:pr-2">
              <h3 className="text-sm font-semibold flex items-center">
                <Video className="h-4 w-4 mr-1 text-primary/70" />
                Content Overview
              </h3>
              <p className="text-sm text-gray-600">
                Your {videoMetadata.duration} video "{videoMetadata.title}" creates a compelling narrative arc from a surprising 
                mall prank to a professional salon transformation. The video effectively captures the dad's protective reaction 
                when you approach his biracial daughter with scissors, creating tension that resolves in a satisfying transformation.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center">
                <Info className="h-4 w-4 mr-1 text-primary/70" />
                Scene Analysis
              </h3>
              <p className="text-sm text-gray-600">
                This {contentType.toLowerCase()} shows {sceneTransitions.toLowerCase()}.
                The opening mall scene uses fast cuts and zoom-ins on the dad's reaction, creating dramatic tension.
                The salon scenes effectively showcase your expertise with the biracial child's textured hair.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium flex items-center">
                  <Zap className="h-3 w-3 mr-1 text-amber-500" />
                  {videoMetadata.platform} Insight:
                </span> {" "}
                Videos featuring diverse hair types and textures are currently seeing 43% higher engagement on {videoMetadata.platform},
                especially with your focus on the mixed-race child's unique hair needs.
              </p>
            </div>
          </div>
          
          <div className="pt-3 border-t">
            <h3 className="text-sm font-semibold mb-2 flex items-center">
              <Tag className="h-4 w-4 mr-1 text-primary/70" />
              Content Classification
            </h3>
            <div className="flex flex-wrap gap-2">
              {mainThemes.map((theme, idx) => (
                <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {theme}
                </span>
              ))}
              <span className="px-2 py-1 bg-primary/5 text-primary/80 text-xs rounded-full flex items-center">
                <ThumbsUp className="h-3 w-3 mr-1" />
                {videoMetadata.platform} Optimized
              </span>
            </div>
          </div>
          
          {detectedObjects.length > 0 && (
            <div className="pt-3 border-t">
              <h3 className="text-sm font-semibold mb-2">Key Visual Elements</h3>
              <div className="flex flex-wrap gap-2">
                {detectedObjects.map((object, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {object}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                The presence of both parents (Black father, Indian mother) with their biracial daughter creates strong 
                representational content that resonates with diverse audiences on {videoMetadata.platform}.
              </p>
            </div>
          )}
          
          <div className="pt-3 border-t">
            <h3 className="text-sm font-semibold mb-2">Platform-Specific Analysis</h3>
            <p className="text-sm text-gray-600">
              {videoMetadata.platform === "TikTok" ? 
                `Your video's playful prank-to-service format aligns with current TikTok trends. The "surprising mall approach"
                 creates an immediate hook, while the professional transformation of the biracial child's hair showcases your 
                 specialty in working with diverse hair textures - a growing niche on TikTok.` : 
              videoMetadata.platform === "Instagram" ? 
                `Your content's transformation narrative fits Instagram's preference for high-quality before/after reveals.
                 The multicultural element (Black father, Indian mother, biracial child) adds representative value that
                 Instagram's algorithm currently favors for wider distribution.` : 
                `Your video's comedy-to-service format works well for YouTube. The narrative arc from tension to resolution
                 maintains viewer interest throughout, and the educational value of showing proper techniques for mixed-race
                 children's hair has strong search potential.`
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
