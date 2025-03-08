
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { generateWordReport } from "@/utils/reportGenerator";

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

  const downloadWordReport = async () => {
    try {
      // Generate the report document
      const { blob, filename } = await generateWordReport(
        videoMetadata || { title: "Video Analysis", duration: "Unknown" },
        analysisData
      );
      
      // Create download link and trigger download
      const url = URL.createObjectURL(blob);
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
        description: "Your Word document report has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your report. Please try again.",
      });
    }
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="outline" 
        size="sm"
        className="border-primary/20 text-primary hover:bg-primary/10"
        onClick={() => handleAction("Download Report", onDownload || downloadWordReport)}
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
