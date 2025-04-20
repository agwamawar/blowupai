
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Volume2, Mic, AudioWaveform } from "lucide-react";

interface AudioQualityProps {
  clarity: number;
  balance: number;
  backgroundMusic: {
    used: boolean;
    type: string;
  };
  soundEffects: string[];
}

export function AudioQualityCard({
  clarity = 8,
  balance = 7,
  backgroundMusic = {
    used: true,
    type: "Upbeat comedic track"
  },
  soundEffects = ["Mall ambience", "Reaction gasp", "Salon tools", "Success chime"]
}: AudioQualityProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          Audio Design Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Scene-by-Scene Audio Analysis */}
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 bg-muted/30 rounded-lg">
              <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                <Mic className="h-4 w-4 text-primary" />
                Mall Scene Audio
              </h3>
              <ul className="text-sm space-y-1.5 text-muted-foreground">
                <li>• Natural mall ambience creates authenticity</li>
                <li>• Clear dialogue during tension moment</li>
                <li>• Opportunity for dramatic sound effect during dad's reaction</li>
              </ul>
            </div>
            
            <div className="p-3 bg-muted/30 rounded-lg">
              <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                <Volume2 className="h-4 w-4 text-primary" />
                Salon Scene Audio
              </h3>
              <ul className="text-sm space-y-1.5 text-muted-foreground">
                <li>• Professional salon atmosphere audio</li>
                <li>• Clear explanation of hair care technique</li>
                <li>• Satisfying styling tool sounds</li>
              </ul>
            </div>
            
            <div className="p-3 bg-muted/30 rounded-lg">
              <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                <AudioWaveform className="h-4 w-4 text-primary" />
                Music & Effects
              </h3>
              <ul className="text-sm space-y-1.5 text-muted-foreground">
                <li>• {backgroundMusic.type} maintains energy throughout</li>
                <li>• Volume properly ducked during dialogue</li>
                <li>• Transformation reveal emphasized with music swell</li>
              </ul>
            </div>
          </div>

          {/* Sound Effects Timeline */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Key Audio Elements</h3>
            <div className="space-y-2">
              {soundEffects.map((effect, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary/70"></div>
                  <span className="text-sm">{effect}</span>
                  <span className="text-xs text-muted-foreground">
                    ({i === 0 ? "Throughout" : 
                      i === 1 ? "0:03" : 
                      i === 2 ? "0:15-0:40" : 
                      "0:42"})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Audio Enhancement Recommendations */}
          <div className="p-3 border border-primary/20 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Audio Enhancement Tips</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Add a record-scratch effect when dad hands daughter to mom (0:03)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Include soft background music during hair care explanation (0:15-0:30)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Enhance transformation reveal with impact sound (0:42)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Add subtle mall ambience during opening scene for authenticity
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
