
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Music, Zap, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { VideoEditingStudioHeader } from "./studio/VideoEditingStudioHeader";
import { TimelineTab } from "./studio/TimelineTab";
import { AudioMixTab } from "./studio/AudioMixTab";
import { EffectsTab } from "./studio/EffectsTab";
import { AnalyticsTab } from "./studio/AnalyticsTab";

interface VideoEditingStudioProps {
  editingData: {
    pacingScore: number;
    transitions: string[];
    visualEffects: string[];
  };
  audioData: {
    clarity: number;
    balance: number;
    backgroundMusic: {
      used: boolean;
      type: string;
    };
    soundEffects: string[];
  };
  onTimestampClick?: (timestamp: string) => void;
}

export function VideoEditingStudioCard({ editingData, audioData, onTimestampClick }: VideoEditingStudioProps) {
  const [viralityScore, setViralityScore] = useState(73);

  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle>
          <VideoEditingStudioHeader viralityScore={viralityScore} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="timeline" className="flex items-center gap-1">
              <Scissors className="h-3.5 w-3.5" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-1">
              <Music className="h-3.5 w-3.5" />
              Audio Mix
            </TabsTrigger>
            <TabsTrigger value="effects" className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" />
              Effects
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-3.5 w-3.5" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline">
            <TimelineTab 
              onTimestampClick={onTimestampClick}
              viralityScore={viralityScore}
            />
          </TabsContent>

          <TabsContent value="audio">
            <AudioMixTab 
              audioData={audioData}
              viralityScore={viralityScore}
              setViralityScore={setViralityScore}
            />
          </TabsContent>

          <TabsContent value="effects">
            <EffectsTab 
              editingData={editingData}
              audioData={audioData}
              viralityScore={viralityScore}
              setViralityScore={setViralityScore}
            />
          </TabsContent>

          <TabsContent value="settings">
            <AnalyticsTab 
              editingData={editingData}
              audioData={audioData}
              viralityScore={viralityScore}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
