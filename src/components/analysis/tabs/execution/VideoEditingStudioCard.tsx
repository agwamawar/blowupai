
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Play, Pause, Volume2, VolumeX, Sliders, Zap, Music, Video, Settings, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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
  const [viralityScore, setViralityScore] = useState(73);

  const timeline = [
    { time: "0:00", label: "Intro Hook", type: "video", viralityImpact: "+15%", impactReason: "Strong hook boosts initial retention" },
    { time: "0:08", label: "Transition 1", type: "transition", viralityImpact: "+8%", impactReason: "Dynamic cut maintains attention" },
    { time: "0:15", label: "Main Content", type: "video", viralityImpact: "+5%", impactReason: "Clear value delivery" },
    { time: "0:22", label: "Pattern Break", type: "effect", viralityImpact: "+12%", impactReason: "Prevents drop-off at critical moment" },
    { time: "0:30", label: "Call to Action", type: "video", viralityImpact: "+10%", impactReason: "Drives engagement actions" },
    { time: "0:45", label: "End Screen", type: "video", viralityImpact: "+3%", impactReason: "Encourages rewatches" }
  ];

  const handleSegmentClick = (timestamp: string) => {
    if (onTimestampClick) {
      onTimestampClick(timestamp);
    }
  };

  const calculateViralityImpact = (value: number, type: string) => {
    let impact = 0;
    switch (type) {
      case 'volume':
        impact = value >= 70 && value <= 90 ? 5 : -3;
        break;
      case 'balance':
        impact = value >= 60 && value <= 80 ? 8 : -5;
        break;
      case 'transitions':
        impact = value >= 70 ? 12 : -8;
        break;
    }
    return impact;
  };

  const getViralityColor = (impact: string) => {
    const num = parseInt(impact.replace('+', '').replace('%', ''));
    if (num >= 10) return 'text-green-600';
    if (num >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" />
          Video Editing Studio
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Virality Impact:</span>
            <Badge variant="outline" className="bg-primary/10">
              <TrendingUp className="h-3 w-3 mr-1" />
              {viralityScore}%
            </Badge>
          </div>
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
              
              <div className="text-sm font-medium">
                Projected Views: <span className="text-primary">+{Math.round(viralityScore * 1.2)}%</span>
              </div>
            </div>

            {/* Timeline Segments with Virality Impact */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Timeline Segments & Virality Impact</h4>
              <div className="grid gap-2">
                {timeline.map((segment, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-3 rounded border cursor-pointer transition-colors hover:bg-primary/10 hover:border-primary/30"
                    onClick={() => handleSegmentClick(segment.time)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono w-12">{segment.time}</span>
                      <div>
                        <span className="text-sm font-medium">{segment.label}</span>
                        <p className="text-xs text-muted-foreground">{segment.impactReason}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={segment.type === 'video' ? 'default' : 'secondary'} className="text-xs">
                        {segment.type}
                      </Badge>
                      <span className={`text-xs font-medium ${getViralityColor(segment.viralityImpact)}`}>
                        {segment.viralityImpact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Editing Actions with Impact Preview */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Quick Edits & Virality Boost</h4>
              <div className="grid gap-2">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded border">
                  <Button variant="outline" size="sm">Add Cut at 0:12</Button>
                  <span className="text-xs text-green-600 font-medium">+8% retention</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded border">
                  <Button variant="outline" size="sm">Insert Zoom Transition</Button>
                  <span className="text-xs text-green-600 font-medium">+5% engagement</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded border">
                  <Button variant="outline" size="sm">Add Text Overlay</Button>
                  <span className="text-xs text-yellow-600 font-medium">+3% clarity</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded border">
                  <Button variant="outline" size="sm">Apply Trending Filter</Button>
                  <span className="text-xs text-green-600 font-medium">+12% discoverability</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Audio Mix Tab */}
          <TabsContent value="audio" className="space-y-4">
            {/* Virality Impact Header */}
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Audio Optimization Impact
              </h4>
              <p className="text-xs text-muted-foreground">
                Optimal audio settings can increase engagement by 15-25% and improve algorithm performance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Master Volume with Impact */}
              <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Master Volume
                  </h4>
                  <div className="text-right">
                    <span className="text-xs">{volume[0]}%</span>
                    <div className={`text-xs ${calculateViralityImpact(volume[0], 'volume') > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {calculateViralityImpact(volume[0], 'volume') > 0 ? '+' : ''}{calculateViralityImpact(volume[0], 'volume')}% virality
                    </div>
                  </div>
                </div>
                <Slider
                  value={volume}
                  onValueChange={(value) => {
                    setVolume(value);
                    const impact = calculateViralityImpact(value[0], 'volume');
                    setViralityScore(prev => Math.max(0, Math.min(100, prev + impact * 0.1)));
                  }}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  {volume[0] >= 70 && volume[0] <= 90 
                    ? "✓ Optimal range for engagement" 
                    : "⚠ Adjust to 70-90% for best performance"
                  }
                </p>
              </div>

              {/* Audio Balance with Impact */}
              <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Sliders className="h-4 w-4" />
                    Voice/Music Balance
                  </h4>
                  <div className="text-right">
                    <span className="text-xs">{audioBalance[0]}/10</span>
                    <div className={`text-xs ${calculateViralityImpact(audioBalance[0], 'balance') > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {calculateViralityImpact(audioBalance[0], 'balance') > 0 ? '+' : ''}{calculateViralityImpact(audioBalance[0], 'balance')}% clarity
                    </div>
                  </div>
                </div>
                <Slider
                  value={audioBalance}
                  onValueChange={(value) => {
                    setAudioBalance(value);
                    const impact = calculateViralityImpact(value[0], 'balance');
                    setViralityScore(prev => Math.max(0, Math.min(100, prev + impact * 0.1)));
                  }}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  {audioBalance[0] >= 60 && audioBalance[0] <= 80 
                    ? "✓ Perfect voice-to-music ratio" 
                    : "⚠ Adjust for better voice clarity"
                  }
                </p>
              </div>
            </div>

            {/* Audio Tracks with Performance Impact */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Audio Tracks & Engagement Impact</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded border">
                  <span className="text-sm">Voice Track</span>
                  <div className="flex items-center gap-2">
                    <Slider value={[85]} max={100} className="w-20" />
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Volume2 className="h-3 w-3" />
                    </Button>
                    <span className="text-xs text-green-600">+12% clarity</span>
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
                      <span className="text-xs text-yellow-600">+5% mood</span>
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
                    <span className="text-xs text-green-600">+8% retention</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Enhancement with Virality Boost */}
            <div className="p-3 border border-primary/20 rounded-lg">
              <h4 className="text-sm font-medium mb-3">Audio Enhancement & Algorithm Boost</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm">Noise Reduction</Button>
                  <span className="text-xs text-green-600">+15% clarity</span>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm">Audio Normalize</Button>
                  <span className="text-xs text-green-600">+10% consistency</span>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm">Add Reverb</Button>
                  <span className="text-xs text-yellow-600">+3% depth</span>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm">EQ Settings</Button>
                  <span className="text-xs text-green-600">+7% professional</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Effects Tab */}
          <TabsContent value="effects" className="space-y-4">
            {/* Trending Effects Impact */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-600" />
                Trending Effects - Algorithm Boost
              </h4>
              <p className="text-xs text-amber-700">
                Using trending transitions and effects can increase discoverability by 20-40%
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Available Transitions & Virality Impact</h4>
              <div className="grid grid-cols-1 gap-2">
                {editingData.transitions.map((transition, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded border">
                    <Button variant="outline" size="sm" className="justify-start flex-1">
                      {transition}
                    </Button>
                    <span className="text-xs text-green-600 ml-2">
                      +{Math.floor(Math.random() * 15) + 5}% engagement
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Visual Effects & Performance Boost</h4>
              <div className="grid grid-cols-1 gap-2">
                {editingData.visualEffects.map((effect, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded border">
                    <Button variant="outline" size="sm" className="justify-start flex-1">
                      {effect}
                    </Button>
                    <span className="text-xs text-blue-600 ml-2">
                      +{Math.floor(Math.random() * 12) + 3}% visual appeal
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Sound Effects & Retention Impact</h4>
              <div className="grid grid-cols-1 gap-2">
                {audioData.soundEffects.map((effect, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded border">
                    <Button variant="outline" size="sm" className="justify-start flex-1">
                      {effect}
                    </Button>
                    <span className="text-xs text-purple-600 ml-2">
                      +{Math.floor(Math.random() * 10) + 2}% attention
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Effect Settings with Impact */}
            <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Transition Speed</h4>
                <div className="text-right">
                  <span className="text-xs">{transitionSpeed[0]}%</span>
                  <div className={`text-xs ${calculateViralityImpact(transitionSpeed[0], 'transitions') > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {calculateViralityImpact(transitionSpeed[0], 'transitions') > 0 ? '+' : ''}{calculateViralityImpact(transitionSpeed[0], 'transitions')}% pacing
                  </div>
                </div>
              </div>
              <Slider
                value={transitionSpeed}
                onValueChange={(value) => {
                  setTransitionSpeed(value);
                  const impact = calculateViralityImpact(value[0], 'transitions');
                  setViralityScore(prev => Math.max(0, Math.min(100, prev + impact * 0.1)));
                }}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                {transitionSpeed[0] >= 70 
                  ? "✓ Fast transitions boost retention" 
                  : "⚠ Increase speed for better engagement"
                }
              </p>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="settings" className="space-y-4">
            {/* Virality Prediction Dashboard */}
            <div className="p-4 bg-gradient-to-r from-primary/5 to-blue-50 border border-primary/20 rounded-lg">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Virality Prediction Dashboard
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{viralityScore}%</div>
                  <div className="text-xs text-muted-foreground">Overall Score</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{Math.round(viralityScore * 1.5)}K</div>
                  <div className="text-xs text-muted-foreground">Projected Views</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{Math.round(viralityScore * 0.8)}%</div>
                  <div className="text-xs text-muted-foreground">Engagement Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{Math.round(viralityScore * 0.3)}%</div>
                  <div className="text-xs text-muted-foreground">Share Rate</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                <h4 className="text-sm font-medium">Current Quality Metrics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Editing Quality:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{editingData.pacingScore}/10</span>
                      <Progress value={editingData.pacingScore * 10} className="w-16 h-2" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Audio Clarity:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{audioData.clarity}/10</span>
                      <Progress value={audioData.clarity * 10} className="w-16 h-2" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Audio Balance:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{audioData.balance}/10</span>
                      <Progress value={audioData.balance * 10} className="w-16 h-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                <h4 className="text-sm font-medium">Platform Export & Algorithm Optimization</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-background rounded border">
                    <Button variant="outline" size="sm" className="flex-1 justify-start">
                      Export for TikTok (1080x1920)
                    </Button>
                    <span className="text-xs text-green-600 ml-2">+25% reach</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-background rounded border">
                    <Button variant="outline" size="sm" className="flex-1 justify-start">
                      Export for Instagram (1080x1080)
                    </Button>
                    <span className="text-xs text-blue-600 ml-2">+20% engagement</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-background rounded border">
                    <Button variant="outline" size="sm" className="flex-1 justify-start">
                      Export for YouTube Shorts
                    </Button>
                    <span className="text-xs text-purple-600 ml-2">+30% discovery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Optimization Suggestions with Virality Impact */}
            <div className="p-3 border border-primary/20 rounded-lg">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                AI Virality Optimization Suggestions
              </h4>
              <ul className="text-sm space-y-3">
                {editingData.pacingScore < 8 && (
                  <li className="flex items-start justify-between gap-2 p-2 bg-amber-50 rounded border border-amber-200">
                    <div className="flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      <span className="text-amber-800">Increase cut frequency to improve pacing (current: {editingData.pacingScore}/10)</span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">+15% retention</Badge>
                  </li>
                )}
                {audioData.clarity < 8 && (
                  <li className="flex items-start justify-between gap-2 p-2 bg-blue-50 rounded border border-blue-200">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span className="text-blue-800">Apply noise reduction to improve voice clarity</span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">+20% clarity</Badge>
                  </li>
                )}
                {audioData.balance < 8 && (
                  <li className="flex items-start justify-between gap-2 p-2 bg-purple-50 rounded border border-purple-200">
                    <div className="flex items-start gap-2">
                      <span className="text-purple-600">•</span>
                      <span className="text-purple-800">Adjust music volume to 20-25% for better voice balance</span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">+12% engagement</Badge>
                  </li>
                )}
                <li className="flex items-start justify-between gap-2 p-2 bg-green-50 rounded border border-green-200">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-green-800">Add pattern interrupts every 7-10 seconds for retention</span>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">+25% virality</Badge>
                </li>
                <li className="flex items-start justify-between gap-2 p-2 bg-primary/5 rounded border border-primary/20">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span className="text-primary">Use trending hashtags in text overlays for algorithm boost</span>
                  </div>
                  <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300">+40% discovery</Badge>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
