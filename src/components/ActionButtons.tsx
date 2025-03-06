
import { Download, Share2, Save, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ActionButtonsProps {
  onReanalyze?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  onSave?: () => void;
}

export function ActionButtons({ 
  onReanalyze, 
  onDownload, 
  onShare, 
  onSave 
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
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="border-primary/20 text-primary hover:bg-primary/10"
        onClick={() => handleAction("Reanalyze", onReanalyze)}
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Reanalyze
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        className="border-primary/20 text-primary hover:bg-primary/10"
        onClick={() => handleAction("Download Report", onDownload)}
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
      
      <Button 
        variant="outline" 
        size="sm"
        className="border-primary/20 text-primary hover:bg-primary/10"
        onClick={() => handleAction("Save Analysis", onSave)}
      >
        <Save className="mr-2 h-4 w-4" />
        Save
      </Button>
    </div>
  );
}
