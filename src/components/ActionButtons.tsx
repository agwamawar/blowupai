
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { downloadWordReport } from "@/lib/reportGenerator";
import { AnalysisDataType } from "@/types/analysisTypes";

interface ActionButtonsProps {
  onDownload?: () => void;
  onShare?: () => void;
  videoMetadata?: {
    title: string;
    duration: string;
    platform?: string;
  };
  analysisData?: AnalysisDataType;
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
  
  const handleDownloadReport = () => {
    if (!videoMetadata) {
      toast({
        title: "Missing Video Details",
        description: "Unable to generate report: video details are missing.",
        variant: "destructive",
      });
      return;
    }
    
    downloadWordReport(
      videoMetadata, 
      analysisData,
      () => {
        toast({
          title: "Report Downloaded",
          description: "Your Word document report has been downloaded successfully.",
        });
      }
    );
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="outline" 
        size="sm"
        className="border-primary/20 text-primary hover:bg-primary/10"
        onClick={() => handleAction("Download Report", onDownload || handleDownloadReport)}
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
