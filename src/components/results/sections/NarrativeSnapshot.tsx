
import { SparklesIcon } from "lucide-react";

interface NarrativeSnapshotProps {
  summary: string;
}

export function NarrativeSnapshot({ 
  summary = "A surprise haircut in the mall turns into a heartwarming salon transformation."
}: NarrativeSnapshotProps) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200/30">
      <SparklesIcon className="h-5 w-5 text-primary/70 mt-0.5 flex-shrink-0" />
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">Narrative Snapshot</h3>
        <p className="text-sm leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}
