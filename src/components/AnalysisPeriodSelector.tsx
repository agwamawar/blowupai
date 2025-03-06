
import { Clock } from "lucide-react";
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
      <label className="text-sm font-medium">Analysis Period (hours)</label>
      <div className="space-y-2">
        <Slider
          value={analysisPeriod}
          onValueChange={setAnalysisPeriod}
          min={12}
          max={168}
          step={12}
        />
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {analysisPeriod[0]} hours after posting
          </span>
        </div>
      </div>
    </div>
  );
}
