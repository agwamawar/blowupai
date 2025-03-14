
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, FileText, Info, Tag, ThumbsUp } from "lucide-react";

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
    detectedObjects = [], 
    sceneTransitions = "Single scene video", 
    detectedText = [],
    mainThemes = ["Entertainment", "Informative"],
    contentType = "Tutorial"
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
                Your {videoMetadata.duration} video "{videoMetadata.title}" contains visual elements that are 
                appropriate for {videoMetadata.platform} audiences. The video has {detectedObjects.length > 0 ? 
                `key visual elements like ${detectedObjects.slice(0, 3).join(", ")}` : 
                "no clearly identifiable objects"}.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center">
                <Info className="h-4 w-4 mr-1 text-primary/70" />
                Scene Analysis
              </h3>
              <p className="text-sm text-gray-600">
                This {contentType.toLowerCase()} shows {sceneTransitions.toLowerCase()}.
                {detectedText.length > 0 ? 
                  ` On-screen text elements like "${detectedText.join('", "')}" enhance viewer comprehension.` : 
                  " No on-screen text was detected, consider adding captions for better engagement."}
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
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
