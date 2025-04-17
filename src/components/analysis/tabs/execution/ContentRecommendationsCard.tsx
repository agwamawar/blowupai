
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Settings, Palette, Music, Layout, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getContentTypeSpecificImprovements, getPlatformSpecificImprovements } from "@/services/agents/utils/improvementUtils";

interface ContentRecommendationsProps {
  recommendations: {
    editing: string[];
    style: string[];
    narrative: string[];
    audio: string[];
    structure: string[];
  };
  contentType: string;
  platform: string;
}

export function ContentRecommendationsCard({ 
  recommendations,
  contentType,
  platform
}: ContentRecommendationsProps) {
  // Get platform and content specific recommendations
  const platformSpecificTips = getPlatformSpecificImprovements(platform);
  const contentSpecificTips = getContentTypeSpecificImprovements(contentType);
  
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Content Execution Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="editing" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="editing" className="flex items-center gap-1">
              <Settings className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Editing</span>
            </TabsTrigger>
            <TabsTrigger value="style" className="flex items-center gap-1">
              <Palette className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Style</span>
            </TabsTrigger>
            <TabsTrigger value="narrative" className="flex items-center gap-1">
              <Layout className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Narrative</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-1">
              <Music className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Audio</span>
            </TabsTrigger>
            <TabsTrigger value="structure" className="flex items-center gap-1">
              <Video className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Structure</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="editing" className="mt-0">
            <div className="space-y-4">
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-2">Editing Recommendations</Badge>
              {recommendations.editing.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-md">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">{i+1}</span>
                  </div>
                  <div>
                    <p className="text-sm">{tip}</p>
                  </div>
                </div>
              ))}
              {contentSpecificTips.length > 0 && (
                <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-md mt-4">
                  <p className="text-sm font-medium text-amber-800">{contentType} Editing Tip</p>
                  <p className="text-sm text-amber-700 mt-1">{contentSpecificTips[0]}</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="style" className="mt-0">
            <div className="space-y-4">
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-2">Style Recommendations</Badge>
              {recommendations.style.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-md">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">{i+1}</span>
                  </div>
                  <div>
                    <p className="text-sm">{tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="narrative" className="mt-0">
            <div className="space-y-4">
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-2">Narrative Recommendations</Badge>
              {recommendations.narrative.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-md">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">{i+1}</span>
                  </div>
                  <div>
                    <p className="text-sm">{tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="audio" className="mt-0">
            <div className="space-y-4">
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-2">Audio Recommendations</Badge>
              {recommendations.audio.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-md">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">{i+1}</span>
                  </div>
                  <div>
                    <p className="text-sm">{tip}</p>
                  </div>
                </div>
              ))}
              {platformSpecificTips.length > 1 && (
                <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-md mt-4">
                  <p className="text-sm font-medium text-blue-800">{platform} Audio Tip</p>
                  <p className="text-sm text-blue-700 mt-1">{platformSpecificTips[1]}</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="structure" className="mt-0">
            <div className="space-y-4">
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-2">Structure Recommendations</Badge>
              {recommendations.structure.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-md">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">{i+1}</span>
                  </div>
                  <div>
                    <p className="text-sm">{tip}</p>
                  </div>
                </div>
              ))}
              {contentSpecificTips.length > 1 && platformSpecificTips.length > 0 && (
                <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-md mt-4">
                  <p className="text-sm font-medium text-blue-800">{platform} Structure Tip</p>
                  <p className="text-sm text-blue-700 mt-1">{platformSpecificTips[0]}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
