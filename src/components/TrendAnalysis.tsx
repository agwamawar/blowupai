
import { TrendingUp, Hash, Volume2, Scissors } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface TrendingAnalysisProps {
  trendScore: number;
  hashtags: string[];
  opportunities?: string[];
}

export function TrendAnalysis({ trendScore, hashtags, opportunities }: TrendingAnalysisProps) {
  // Enhanced trending hashtags with engagement data
  const enhancedHashtags = [
    { tag: "#ForYouPage", growth: "+189%", volume: "4.6B" },
    { tag: "#WatchTillTheEnd", growth: "+76%", volume: "2.2B" },
    { tag: "#ViralTikTok", growth: "+82%", volume: "1.7B" },
    { tag: "#ContentCreator", growth: "+41%", volume: "896M" },
    { tag: "#fyp", growth: "+92%", volume: "7.1B" },
  ];
  
  // Enhanced trending audio with usage data and pacing details
  const trendingAudio = [
    { 
      name: "Pieces (Official Sound) - Danilo Carrera", 
      uses: "3.5M", 
      growth: "+217%",
      pacingNotes: "Fast transitions at 0:12, 0:24, dramatic pause at 0:30"
    },
    { 
      name: "original sound - KAII", 
      uses: "1.7M", 
      growth: "+142%",
      pacingNotes: "Slow build, peak at 0:18, rhythmic pattern"
    },
    { 
      name: "I'm So Lucky Lucky - Grandbaby", 
      uses: "2.8M", 
      growth: "+97%",
      pacingNotes: "High energy throughout, quick beat changes"
    }
  ];
  
  // Sound effects that boost engagement
  const trendingSoundEffects = [
    { effect: "Bass drop", impact: "+48% retention", usage: "Key moments or reveals" },
    { effect: "Whoosh transition", impact: "+31% engagement", usage: "Scene changes" },
    { effect: "Pop/ding", impact: "+26% attention", usage: "Highlighting text points" }
  ];
  
  // Audio pacing strategies
  const audioPacingStrategies = [
    { strategy: "Pattern interrupt", timing: "Every 7-10 seconds", impact: "Reduces drop-off by 42%" },
    { strategy: "Audio-visual sync", timing: "Transitions on beat", impact: "2.3x higher shares" },
    { strategy: "Dynamic volume", timing: "Quiet → loud contrast", impact: "84% improved attention" }
  ];
  
  // Trending editing techniques with specific examples
  const trendingEdits = [
    { technique: "Hard cuts on beat", example: "Synchronize at 0:03, 0:08, 0:12" },
    { technique: "Seamless transitions", example: "Use masking technique between shots" },
    { technique: "Text pattern interrupt", example: "Add red/black bold text at key moments" }
  ];
  
  // Choose hashtags to display - use enhanced ones if possible, otherwise fallback to defaults
  const hashtagsToDisplay = hashtags?.length ? hashtags : enhancedHashtags.map(h => h.tag);

  // Enhanced opportunities with more specific actionable ideas
  const enhancedOpportunities = [
    "Videos starting with a 3-sec silent caption trending 56% higher this week",
    "Creators using 'flash frame' transitions between scenes seeing 3.2x higher completion rates",
    "Content with TikTok text-to-speech narration getting 44% more shares"
  ];
  
  const opportunitiesToDisplay = opportunities?.length ? opportunities : enhancedOpportunities;

  return (
    <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary text-lg flex items-center">
          <TrendingUp className="h-5 w-5 text-primary mr-2" />
          Trend Readiness Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700">Trend Match Score</span>
              <span className="font-bold text-primary">{trendScore}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div 
                className="bg-primary h-full rounded-full" 
                style={{ width: `${trendScore}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This content aligns with {trendScore}% of current trending indicators in your category
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-gray-700 mb-2 flex items-center font-medium">
              <Hash className="h-4 w-4 mr-1" /> 
              Trending Hashtags for Amplification
            </h4>
            <div className="flex flex-wrap gap-2">
              {enhancedHashtags.slice(0, 5).map((tag, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className="bg-primary/5 hover:bg-primary/10 border-primary/20 flex items-center gap-1.5 py-1"
                >
                  <span className="text-primary">{tag.tag}</span>
                  <span className="text-xs bg-primary/10 rounded-full px-1.5 py-0.5 text-primary/80">{tag.growth}</span>
                </Badge>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-gray-700 mb-2 flex items-center font-medium">
              <Volume2 className="h-4 w-4 mr-1" /> 
              Audio Optimization & Pacing
            </h4>
            
            {/* Trending Audio with Pacing Notes */}
            <div className="space-y-2 mb-3">
              <p className="text-xs font-medium text-gray-600">TRENDING AUDIO & PACING</p>
              {trendingAudio.map((sound, idx) => (
                <div key={idx} className="flex flex-col bg-primary/5 rounded-md p-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 truncate max-w-[200px]">{sound.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{sound.uses} uses</span>
                      <span className="text-xs text-green-600">{sound.growth}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 italic">Pacing: {sound.pacingNotes}</span>
                </div>
              ))}
            </div>
            
            {/* Sound Effects Section */}
            <div className="space-y-2 mb-3">
              <p className="text-xs font-medium text-gray-600">ENGAGEMENT-BOOSTING SOUND EFFECTS</p>
              {trendingSoundEffects.map((effect, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-50 rounded-md p-2 text-sm">
                  <span className="text-gray-800 font-medium">{effect.effect}</span>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-green-600 font-medium">{effect.impact}</span>
                    <span className="text-xs text-gray-500">Best for: {effect.usage}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Audio Pacing Strategies */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-600">OPTIMAL AUDIO PACING</p>
              {audioPacingStrategies.map((strategy, idx) => (
                <div key={idx} className="flex justify-between items-center bg-primary/5 rounded-md p-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-800 font-medium">{strategy.strategy}</span>
                    <span className="text-xs text-gray-600">{strategy.timing}</span>
                  </div>
                  <span className="text-xs text-green-600">{strategy.impact}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-gray-700 mb-2 flex items-center font-medium">
              <Scissors className="h-4 w-4 mr-1" /> 
              Trending Editing Techniques
            </h4>
            <div className="space-y-2">
              {trendingEdits.map((edit, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-50 rounded-md p-2 text-sm">
                  <span className="text-gray-800 font-medium">{edit.technique}</span>
                  <span className="text-xs text-gray-600 italic">{edit.example}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {opportunitiesToDisplay.length > 0 && (
            <div>
              <h4 className="text-gray-700 mb-2 font-medium">Trend-Based Adjustments</h4>
              <ul className="space-y-2">
                {opportunitiesToDisplay.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-primary text-xs mt-1">🔹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
