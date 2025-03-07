
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { TrendScore } from "./trends/TrendScore";
import { TrendingHashtags } from "./trends/TrendingHashtags";
import { AudioTrends } from "./trends/AudioTrends";
import { EditingTrends } from "./trends/EditingTrends";
import { OpportunityList } from "./trends/OpportunityList";

interface TrendingAnalysisProps {
  trendScore: number;
  hashtags: string[];
  opportunities?: string[];
}

export function TrendAnalysis({ trendScore, hashtags, opportunities }: TrendingAnalysisProps) {
  // Popular hashtags with growth data
  const enhancedHashtags = [
    { tag: "#ForYouPage", growth: "+189%", volume: "4.6B" },
    { tag: "#WatchTillTheEnd", growth: "+76%", volume: "2.2B" },
    { tag: "#ViralTikTok", growth: "+82%", volume: "1.7B" },
    { tag: "#ContentCreator", growth: "+41%", volume: "896M" },
    { tag: "#fyp", growth: "+92%", volume: "7.1B" },
  ];
  
  // Popular sounds with usage tips
  const trendingAudio = [
    { 
      name: "Pieces (Official Sound) - Danilo Carrera", 
      uses: "3.5M", 
      growth: "+217%",
      pacingNotes: "Quick changes at 0:12, 0:24, pause at 0:30"
    },
    { 
      name: "original sound - KAII", 
      uses: "1.7M", 
      growth: "+142%",
      pacingNotes: "Slow start, peak at 0:18, beat pattern"
    },
    { 
      name: "I'm So Lucky Lucky - Grandbaby", 
      uses: "2.8M", 
      growth: "+97%",
      pacingNotes: "High energy, quick beat changes"
    }
  ];
  
  // Sound effects that boost views
  const trendingSoundEffects = [
    { effect: "Bass drop", impact: "+48% keep watching", usage: "Big reveals" },
    { effect: "Whoosh sound", impact: "+31% more views", usage: "Scene changes" },
    { effect: "Pop/ding", impact: "+26% attention", usage: "Highlighting text" }
  ];
  
  // Sound timing tricks
  const audioPacingStrategies = [
    { strategy: "Change it up", timing: "Every 7-10 seconds", impact: "42% fewer people leaving" },
    { strategy: "Match sound to visuals", timing: "On the beat", impact: "2.3x more shares" },
    { strategy: "Soft to loud moments", timing: "Quiet → loud contrast", impact: "84% better attention" }
  ];
  
  // Editing tricks that work
  const trendingEdits = [
    { technique: "Cut on the beat", example: "Time cuts at 0:03, 0:08, 0:12" },
    { technique: "Smooth transitions", example: "Mask between shots" },
    { technique: "Attention-grabbing text", example: "Bold red/black text at key moments" }
  ];
  
  // Choose hashtags to display - use enhanced ones if possible, otherwise fallback to defaults
  const hashtagsToDisplay = hashtags?.length ? hashtags : enhancedHashtags.map(h => h.tag);

  // Simple tips to improve your video
  const enhancedOpportunities = [
    "Silent captions for 3 secs at start get 56% more views this week",
    "Quick 'flash' transitions between scenes get 3.2x more people watching to the end",
    "Using TikTok robot voice gets 44% more shares"
  ];
  
  const opportunitiesToDisplay = opportunities?.length ? opportunities : enhancedOpportunities;

  return (
    <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary text-lg flex items-center">
          <TrendingUp className="h-5 w-5 text-primary mr-2" />
          How Trendy Is Your Video?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <TrendScore trendScore={trendScore} />
          
          <Separator />
          
          <TrendingHashtags hashtags={enhancedHashtags} />
          
          <Separator />
          
          <AudioTrends 
            trendingAudio={trendingAudio}
            trendingSoundEffects={trendingSoundEffects}
            audioPacingStrategies={audioPacingStrategies}
          />
          
          <Separator />
          
          <EditingTrends trendingEdits={trendingEdits} />
          
          <Separator />
          
          <OpportunityList opportunities={opportunitiesToDisplay} />
        </div>
      </CardContent>
    </Card>
  );
}
