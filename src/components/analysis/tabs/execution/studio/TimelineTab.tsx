
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface TimelineSegment {
  time: string;
  label: string;
  type: string;
  viralityImpact: string;
  impactReason: string;
}

interface TimelineTabProps {
  onTimestampClick?: (timestamp: string) => void;
  viralityScore: number;
}

export function TimelineTab({ onTimestampClick, viralityScore }: TimelineTabProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const timeline: TimelineSegment[] = [
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

  const getViralityColor = (impact: string) => {
    const num = parseInt(impact.replace('+', '').replace('%', ''));
    if (num >= 10) return 'text-green-600';
    if (num >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4">
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
    </div>
  );
}
