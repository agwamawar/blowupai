
import { Scissors } from "lucide-react";

interface EditingTechnique {
  technique: string;
  example: string;
}

interface EditingTrendsProps {
  trendingEdits: EditingTechnique[];
}

export function EditingTrends({ trendingEdits }: EditingTrendsProps) {
  return (
    <div>
      <h4 className="text-gray-700 mb-2 flex items-center font-medium">
        <Scissors className="h-4 w-4 mr-1" /> 
        Editing Tricks That Work
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
  );
}
