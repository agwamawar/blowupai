
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Music, Smartphone, CheckIcon, XIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ExecutionBreakdownTabProps {
  executionData: any;
  finalOptimizations: string[];
  followerCount: number;
  videoMetadata: {
    platform: string;
    contentType: string;
    duration: string;
  };
  videoDetails?: any;
}

export function ExecutionBreakdownTab({
  executionData,
  finalOptimizations,
  followerCount,
  videoMetadata,
  videoDetails
}: ExecutionBreakdownTabProps) {
  return (
    <div className="space-y-6">
      {/* Editing & Visual Quality */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <Edit className="h-5 w-5 mr-2" />
            Editing & Visual Quality
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pacing & Cut Frequency</span>
                  <span className="font-semibold">{executionData.editingQuality?.pacingScore || 7}/10</span>
                </div>
                <Progress 
                  value={(executionData.editingQuality?.pacingScore || 7) * 10} 
                  className="h-2" 
                />
                <p className="text-xs text-muted-foreground">
                  {followerCount < 50000 
                    ? "Aim for a scene change every 7-10 seconds for growth" 
                    : "For your audience size, scene changes every 5-7 seconds is optimal"}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Text Overlays Used</span>
                {executionData.editingQuality?.hasTextOverlays ? (
                  <CheckIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <XIcon className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>
            
            <div className="space-y-3">
              <span className="text-sm font-medium">On-Screen Elements</span>
              <div className="grid grid-cols-2 gap-2">
                {(executionData.editingQuality?.onScreenElements || ["Text Overlays", "Transitions", "Graphics"]).map((element, i) => (
                  <Badge key={i} className="justify-center py-1 bg-primary/10 hover:bg-primary/20 text-primary border-none">
                    {element}
                  </Badge>
                ))}
              </div>
              
              <div className="space-y-2 pt-3">
                <span className="text-sm font-medium">Recommended Scene Structure</span>
                <div className="flex items-center justify-between gap-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 w-[20%] flex items-center justify-center text-[10px] text-white">
                    Hook
                  </div>
                  <div className="h-full bg-blue-400 w-[30%] flex items-center justify-center text-[10px] text-white">
                    Context
                  </div>
                  <div className="h-full bg-purple-400 w-[40%] flex items-center justify-center text-[10px] text-white">
                    Value
                  </div>
                  <div className="h-full bg-orange-400 w-[10%] flex items-center justify-center text-[10px] text-white">
                    CTA
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Optimal time distribution for maximum engagement
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Audio & Sound Design */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <Music className="h-5 w-5 mr-2" />
            Audio & Sound Design
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Using Trending Audio</span>
                {executionData.audioDesign?.usedTrendingAudio ? (
                  <CheckIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <XIcon className="h-5 w-5 text-red-500" />
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sound Choice Impact</span>
                  <span className="font-semibold">{executionData.audioDesign?.soundChoiceImpact || 6}/10</span>
                </div>
                <Progress 
                  value={(executionData.audioDesign?.soundChoiceImpact || 6) * 10} 
                  className="h-2" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Audio Sync & Clarity</span>
                  <span className="font-semibold">{executionData.audioDesign?.audioSyncScore || 8}/10</span>
                </div>
                <Progress 
                  value={(executionData.audioDesign?.audioSyncScore || 8) * 10} 
                  className="h-2" 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <span className="text-sm font-medium">Audio Recommendations</span>
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded">
                  <p className="text-sm font-medium">Trending Audio Opportunity</p>
                  <p className="text-xs text-muted-foreground">
                    Using trending sounds increases discovery by 43% for accounts your size
                  </p>
                </div>
                
                <div className="p-3 bg-muted/50 rounded">
                  <p className="text-sm font-medium">Audio Balance</p>
                  <p className="text-xs text-muted-foreground">
                    Keep background music at 15-20% of voice volume for optimal clarity
                  </p>
                </div>
                
                <div className="p-3 bg-muted/50 rounded">
                  <p className="text-sm font-medium">Sound Effects</p>
                  <p className="text-xs text-muted-foreground">
                    Add 2-3 subtle sound effects to emphasize key points
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Format & Platform Optimization */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <Smartphone className="h-5 w-5 mr-2" />
            Format & Platform Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Correct Aspect Ratio</span>
                {executionData.platformOptimization?.correctAspectRatio ? (
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    <CheckIcon className="h-3 w-3 mr-1" /> Correct
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                    <XIcon className="h-3 w-3 mr-1" /> Incorrect
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Thumbnail Appeal</span>
                  <span className="font-semibold">{executionData.platformOptimization?.thumbnailAppeal || 7}/10</span>
                </div>
                <Progress 
                  value={(executionData.platformOptimization?.thumbnailAppeal || 7) * 10} 
                  className="h-2" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Hashtag Effectiveness</span>
                  <span className="font-semibold">{executionData.platformOptimization?.hashtagEffectiveness || 8}/10</span>
                </div>
                <Progress 
                  value={(executionData.platformOptimization?.hashtagEffectiveness || 8) * 10} 
                  className="h-2" 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <span className="text-sm font-medium">Suggested Hashtags</span>
              <div className="flex flex-wrap gap-1">
                {(executionData.platformOptimization?.suggestedHashtags || ["#LearnOnTikTok", "#ProductivityHacks", "#WorkLife"]).map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="space-y-2 pt-2">
                <span className="text-sm font-medium">Critical Optimizations</span>
                <div className="space-y-2">
                  {finalOptimizations.map((opt, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="mt-0.5 h-4 w-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] text-white font-bold">{i+1}</span>
                      </div>
                      <p className="text-sm">{opt}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="w-full">
                  Apply AI Fixes
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
