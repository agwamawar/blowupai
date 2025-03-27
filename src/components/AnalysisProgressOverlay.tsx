
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalysisProgressOverlayProps {
  isLoading: boolean;
  analysisProgress: number;
  analysisStage: string | null;
  platform: string;
}

const wittyMessages: Record<string, string[]> = {
  "Validating video format": [
    "Checking if your video is up to snuff... no VHS tapes allowed!",
    "Making sure this isn't a recording of your cat walking across the keyboard...",
    "Confirming this isn't just a PowerPoint with cool transitions..."
  ],
  "Reading metadata": [
    "Peeking behind the curtain of your video... ooh, secrets!",
    "Reading your video's diary... don't worry, we won't tell anyone!",
    "Extracting those juicy video details... like digital detectives!"
  ],
  "Detecting visual elements": [
    "Counting how many times you blinked... just kidding!",
    "Spotting all the cool stuff in your video that even you missed!",
    "Looking for Waldo in your footage... and everything else too!"
  ],
  "Analyzing audio quality": [
    "Listening carefully... was that your stomach growling in the background?",
    "Making sure your audio isn't underwater or from outer space...",
    "Checking if your microphone was actually a potato..."
  ],
  "Scanning text content": [
    "Reading all the text so fast we might need glasses afterward...",
    "Deciphering your captions faster than ancient hieroglyphics!",
    "Checking for typos so your viewers don't have to!"
  ],
  "Evaluating platform compliance": [
    "Making sure {platform} doesn't send your video to the shadow realm...",
    "Confirming your content won't make {platform}'s algorithms sad...",
    "Ensuring {platform} will actually show your masterpiece to humans..."
  ],
  "Generating engagement metrics": [
    "Calculating how many people will smash that like button...",
    "Predicting viral potential... no pressure!",
    "Estimating how many new followers you'll get... spoiler: lots!"
  ],
  "Finalizing analysis": [
    "Putting the finishing touches on your video fortune cookie...",
    "Almost there! Just adding some sparkles to your results...",
    "Wrapping everything up with a bow... because your video deserves it!"
  ]
};

const getRandomWittyMessage = (stage: string | null, platform: string): string => {
  if (!stage || !wittyMessages[stage]) return "Working our magic...";
  
  const messages = wittyMessages[stage];
  const randomIndex = Math.floor(Math.random() * messages.length);
  const message = messages[randomIndex];
  
  // Replace platform placeholder if needed
  return message.replace('{platform}', platform);
};

export function AnalysisProgressOverlay({
  isLoading,
  analysisProgress,
  analysisStage,
  platform,
}: AnalysisProgressOverlayProps) {
  // Early return if not loading
  if (!isLoading) return null;

  // Ensure progress is a valid number between 0-100
  const normalizedProgress = isNaN(analysisProgress) ? 0 : 
    Math.min(100, Math.max(0, analysisProgress));
  
  const wittyMessage = getRandomWittyMessage(analysisStage, platform);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <Card className="w-[90%] max-w-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">Analyzing Video</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Analysis Progress</span>
              <span>{Math.round(normalizedProgress)}%</span>
            </div>
            <Progress value={normalizedProgress} className="h-2" />
          </div>
          
          {analysisStage && (
            <div className="bg-primary/10 text-primary p-4 rounded-md flex flex-col items-center justify-center space-y-2">
              <span className="text-center font-medium">{analysisStage}</span>
              <span className="text-center text-sm italic">{wittyMessage}</span>
            </div>
          )}
          
          <div className="text-sm text-muted-foreground text-center mt-4">
            This may take a moment. We're analyzing your video for the best performance on {platform}.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
