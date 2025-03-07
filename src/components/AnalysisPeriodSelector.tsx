
import { Users } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AnalysisPeriodSelectorProps {
  analysisPeriod: number[];
  setAnalysisPeriod: (value: number[]) => void;
}

export function AnalysisPeriodSelector({
  analysisPeriod,
  setAnalysisPeriod,
}: AnalysisPeriodSelectorProps) {
  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">Number of Followers</label>
      <div className="space-y-2">
        <Slider
          value={analysisPeriod}
          onValueChange={setAnalysisPeriod}
          min={1000}
          max={100000}
          step={1000}
        />
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {analysisPeriod[0].toLocaleString()} followers
          </span>
        </div>
      </div>
    </div>
  );
}
