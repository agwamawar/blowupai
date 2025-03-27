
import { ClipboardCopy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface OpportunityListProps {
  opportunities: string[];
}

export function OpportunityList({ opportunities }: OpportunityListProps) {
  const { toast } = useToast();
  
  if (opportunities.length === 0) return null;
  
  const handleCopyTip = (tip: string) => {
    navigator.clipboard.writeText(tip).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "You can now paste this tip in your notes",
        duration: 3000,
      });
    }).catch(() => {
      toast({
        title: "Couldn't copy to clipboard",
        description: "Please try again or copy manually",
        variant: "destructive",
        duration: 3000,
      });
    });
  };
  
  return (
    <div>
      <h4 className="text-gray-700 mb-2 font-medium">Quick Fixes For Your Video</h4>
      <ul className="space-y-2">
        {opportunities.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 group">
            <span className="text-primary text-xs mt-1">🔹</span>
            <span className="flex-1">{item}</span>
            <button 
              onClick={() => handleCopyTip(item)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-primary"
              aria-label="Copy tip"
            >
              <ClipboardCopy className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
