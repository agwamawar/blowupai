
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, CheckCircle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StyleConsistencyProps {
  styleData: {
    colorGrading: number;
    textOverlays: number;
    framing: number;
    brandAlignment: number;
  };
  contentType: string;
}

export function StyleConsistencyCard({ 
  styleData,
  contentType
}: StyleConsistencyProps) {
  // Common color grading styles for different content types
  const getColorGradingTip = () => {
    const contentTypeLower = contentType.toLowerCase();
    
    if (contentTypeLower.includes('lifestyle') || contentTypeLower.includes('travel')) {
      return "Warm, vibrant tones with increased saturation work well for lifestyle/travel content";
    } else if (contentTypeLower.includes('tutorial') || contentTypeLower.includes('educational')) {
      return "Clean, neutral color grading with high clarity helps viewers focus on information";
    } else if (contentTypeLower.includes('gaming')) {
      return "Vibrant, high-contrast color grading emphasizes game visuals";
    } else if (contentTypeLower.includes('beauty') || contentTypeLower.includes('fashion')) {
      return "Soft, flattering color grading with accurate skin tones is crucial for beauty content";
    } else {
      return "Consistent color treatment helps establish your visual brand identity";
    }
  };

  // Text overlay recommendations
  const getTextOverlayTip = () => {
    const score = styleData.textOverlays;
    if (score >= 8) {
      return "Your text overlays are well-designed and enhance the viewing experience";
    } else if (score >= 6) {
      return "Consider more consistent fonts and placement for text elements";
    } else {
      return "Text overlays could benefit from better readability and consistent styling";
    }
  };

  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          Style & Visual Consistency
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Color Grading</span>
                  <span className="text-sm font-medium">{styleData.colorGrading}/10</span>
                </div>
                <Progress value={styleData.colorGrading * 10} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {styleData.colorGrading >= 8 
                    ? "Excellent color treatment with consistent mood" 
                    : styleData.colorGrading >= 6 
                    ? "Good color grading with minor inconsistencies" 
                    : "Color grading needs more consistency"}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Text & Graphics</span>
                  <span className="text-sm font-medium">{styleData.textOverlays}/10</span>
                </div>
                <Progress value={styleData.textOverlays * 10} className="h-2" />
                <p className="text-xs text-muted-foreground">{getTextOverlayTip()}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Framing & Composition</span>
                  <span className="text-sm font-medium">{styleData.framing}/10</span>
                </div>
                <Progress value={styleData.framing * 10} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {styleData.framing >= 8 
                    ? "Excellent framing with strong compositional choices" 
                    : styleData.framing >= 6 
                    ? "Good framing with some inconsistent shots" 
                    : "Consider improving shot composition and framing"}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Brand Alignment</span>
                  <span className="text-sm font-medium">{styleData.brandAlignment}/10</span>
                </div>
                <Progress value={styleData.brandAlignment * 10} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {styleData.brandAlignment >= 8 
                    ? "Strong visual identity that aligns with your brand" 
                    : styleData.brandAlignment >= 6 
                    ? "Good brand consistency with room for improvement" 
                    : "Develop a more consistent visual identity"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 pt-4 border-t">
            <h4 className="text-sm font-medium">Style Consistency Checklist</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                {styleData.colorGrading >= 7 ? (
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-medium">Color Consistency</p>
                  <p className="text-xs text-muted-foreground">
                    {styleData.colorGrading >= 7 
                      ? "Maintains consistent color treatment throughout" 
                      : "Color treatment varies between scenes"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                {styleData.textOverlays >= 7 ? (
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-medium">Text Style</p>
                  <p className="text-xs text-muted-foreground">
                    {styleData.textOverlays >= 7 
                      ? "Consistent font choices and text animations" 
                      : "Text styles vary or are inconsistently applied"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                {styleData.framing >= 7 ? (
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-medium">Shot Composition</p>
                  <p className="text-xs text-muted-foreground">
                    {styleData.framing >= 7 
                      ? "Well-composed shots with intentional framing" 
                      : "Framing varies in quality and intention"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                {styleData.brandAlignment >= 7 ? (
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-medium">Visual Branding</p>
                  <p className="text-xs text-muted-foreground">
                    {styleData.brandAlignment >= 7 
                      ? "Consistent visual identity that reinforces brand" 
                      : "Visual identity needs more consistent application"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-3 border-t">
            <div className="p-3 bg-primary/5 rounded-md">
              <h4 className="text-sm font-medium">Style Tip for {contentType}</h4>
              <p className="text-sm mt-1">{getColorGradingTip()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
