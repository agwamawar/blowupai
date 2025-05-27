import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Play, Pause, Volume2, VolumeX, Sliders, Zap, Music, Video, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [audioBalance, setAudioBalance] = useState([audioData.balance * 10]);
  const [transitionSpeed, setTransitionSpeed] = useState([editingData.pacingScore * 10]);

  const timeline = [
    { time: "0:00", label: "Intro Hook", type: "video" },
    { time: "0:08", label: "Transition 1", type: "transition" },
    { time: "0:15", label: "Main Content", type: "video" },
    { time: "0:22", label: "Pattern Break", type: "effect" },
    { time: "0:30", label: "Call to Action", type: "video" },
    { time: "0:45", label: "End Screen", type: "video" }
  ];

  const handleSegmentClick = (timestamp: string) => {
    if (onTimestampClick) {
      onTimestampClick(timestamp);
    }
  };

  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" />
          Video Editing Studio
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
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-4">
            {/* Video Controls */}
            <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-8 w-8 p-0"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="h-8 w-8 p-0"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <div className="flex-1 text-center">
                <span className="text-sm text-muted-foreground">Click timeline segments to jump to specific moments</span>
              </div>
            </div>

            {/* Timeline Segments */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Timeline Segments</h4>
              <div className="grid gap-2">
                {timeline.map((segment, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-2 rounded border cursor-pointer transition-colors hover:bg-primary/10 hover:border-primary/30"
                    onClick={() => handleSegmentClick(segment.time)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono">{segment.time}</span>
                      <span className="text-sm">{segment.label}</span>
                    </div>
                    <Badge variant={segment.type === 'video' ? 'default' : 'secondary'} className="text-xs">
                      {segment.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm">
                Add Cut
              </Button>
              <Button variant="outline" size="sm">
                Insert Transition
              </Button>
              <Button variant="outline" size="sm">
                Add Text Overlay
              </Button>
              <Button variant="outline" size="sm">
                Apply Filter
              </Button>
            </div>
          </TabsContent>

          {/* Audio Mix Tab */}
          <TabsContent value="audio" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Master Volume */}
              <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Master Volume
                  </h4>
                  <span className="text-xs">{volume[0]}%</span>
                </div>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Audio Balance */}
              <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Sliders className="h-4 w-4" />
                    Voice/Music Balance
                  </h4>
                  <span className="text-xs">{audioBalance[0]}/10</span>
                </div>
                <Slider
                  value={audioBalance}
                  onValueChange={setAudioBalance}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Audio Tracks */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Audio Tracks</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded border">
                  <span className="text-sm">Voice Track</span>
                  <div className="flex items-center gap-2">
                    <Slider value={[85]} max={100} className="w-20" />
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                {audioData.backgroundMusic.used && (
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded border">
                    <span className="text-sm">Background Music ({audioData.backgroundMusic.type})</span>
                    <div className="flex items-center gap-2">
                      <Slider value={[25]} max={100} className="w-20" />
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded border">
                  <span className="text-sm">Sound Effects</span>
                  <div className="flex items-center gap-2">
                    <Slider value={[60]} max={100} className="w-20" />
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Enhancement */}
            <div className="p-3 border border-primary/20 rounded-lg">
              <h4 className="text-sm font-medium mb-3">Audio Enhancement</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">Noise Reduction</Button>
                <Button variant="outline" size="sm">Audio Normalize</Button>
                <Button variant="outline" size="sm">Add Reverb</Button>
                <Button variant="outline" size="sm">EQ Settings</Button>
              </div>
            </div>
          </TabsContent>

          {/* Effects Tab */}
          <TabsContent value="effects" className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Available Transitions</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {editingData.transitions.map((transition, i) => (
                  <Button key={i} variant="outline" size="sm" className="justify-start">
                    {transition}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Visual Effects</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {editingData.visualEffects.map((effect, i) => (
                  <Button key={i} variant="outline" size="sm" className="justify-start">
                    {effect}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Sound Effects</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {audioData.soundEffects.map((effect, i) => (
                  <Button key={i} variant="outline" size="sm" className="justify-start">
                    {effect}
                  </Button>
                ))}
              </div>
            </div>

            {/* Effect Settings */}
            <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Transition Speed</h4>
                <span className="text-xs">{transitionSpeed[0]}%</span>
              </div>
              <Slider
                value={transitionSpeed}
                onValueChange={setTransitionSpeed}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                <h4 className="text-sm font-medium">Quality Metrics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Editing Quality:</span>
                    <span className="font-medium">{editingData.pacingScore}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Audio Clarity:</span>
                    <span className="font-medium">{audioData.clarity}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Audio Balance:</span>
                    <span className="font-medium">{audioData.balance}/10</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                <h4 className="text-sm font-medium">Export Settings</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Export for TikTok (1080x1920)
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Export for Instagram (1080x1080)
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Export for YouTube Shorts
                  </Button>
                </div>
              </div>
            </div>

            {/* Optimization Suggestions */}
            <div className="p-3 border border-primary/20 rounded-lg">
              <h4 className="text-sm font-medium mb-3">AI Optimization Suggestions</h4>
              <ul className="text-sm space-y-2 text-muted-foreground">
                {editingData.pacingScore < 8 && (
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Increase cut frequency to improve pacing (current: {editingData.pacingScore}/10)
                  </li>
                )}
                {audioData.clarity < 8 && (
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Apply noise reduction to improve voice clarity
                  </li>
                )}
                {audioData.balance < 8 && (
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Adjust music volume to 20-25% for better voice balance
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Add pattern interrupts every 7-10 seconds for retention
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
