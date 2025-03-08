
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { formatVideoTime } from "@/lib/videoUtils";

interface ActionButtonsProps {
  onDownload?: () => void;
  onShare?: () => void;
  videoMetadata?: {
    title: string;
    duration: string;
  };
  analysisData?: any;
}

export function ActionButtons({ 
  onDownload, 
  onShare,
  videoMetadata,
  analysisData
}: ActionButtonsProps) {
  const { toast } = useToast();
  
  const handleAction = (action: string, callback?: () => void) => {
    if (callback) {
      callback();
    } else {
      toast({
        title: `${action} Action`,
        description: `${action} functionality will be implemented soon.`,
      });
    }
  };

  const downloadReport = () => {
    // Create a report text based on available data
    const title = videoMetadata?.title || "Video Analysis";
    const duration = videoMetadata?.duration || "Unknown duration";
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").substring(0, 19);
    const filename = `${title.replace(/\s+/g, "-")}-analysis-${timestamp}.txt`;
    
    let reportContent = `VIDEO ANALYSIS REPORT\n`;
    reportContent += `Generated on: ${new Date().toLocaleString()}\n\n`;
    reportContent += `Title: ${title}\n`;
    reportContent += `Duration: ${duration}\n\n`;
    
    // Add more analysis data if available
    if (analysisData) {
      if (analysisData.engagement_score) {
        reportContent += `Engagement Score: ${analysisData.engagement_score}\n`;
      }
      
      if (analysisData.video_metadata?.platform) {
        reportContent += `Platform: ${analysisData.video_metadata.platform}\n`;
      }
      
      if (analysisData.content_analysis?.key_moments) {
        reportContent += `\nKEY MOMENTS:\n`;
        analysisData.content_analysis.key_moments.forEach((moment: any, index: number) => {
          reportContent += `${index + 1}. ${moment.description} at ${moment.timestamp}\n`;
        });
      }
      
      if (analysisData.recommendations) {
        reportContent += `\nRECOMMENDATIONS:\n`;
        analysisData.recommendations.forEach((rec: any, index: number) => {
          reportContent += `${index + 1}. ${rec.title}: ${rec.description}\n`;
        });
      }
    }
    
    // Create a downloadable blob
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report Downloaded",
      description: "Your analysis report has been downloaded successfully.",
    });
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="outline" 
        size="sm"
        className="border-primary/20 text-primary hover:bg-primary/10"
        onClick={() => handleAction("Download Report", onDownload || downloadReport)}
      >
        <Download className="mr-2 h-4 w-4" />
        Download Report
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        className="border-primary/20 text-primary hover:bg-primary/10"
        onClick={() => handleAction("Share Analysis", onShare)}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
    </div>
  );
}
