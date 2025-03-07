
import { Users } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface AnalysisPeriodSelectorProps {
  analysisPeriod: number[];
  setAnalysisPeriod: (value: number[]) => void;
}

export function AnalysisPeriodSelector({
  analysisPeriod,
  setAnalysisPeriod,
}: AnalysisPeriodSelectorProps) {
  const [inputValue, setInputValue] = useState(analysisPeriod[0].toString());

  // Sync input value when slider changes
  useEffect(() => {
    setInputValue(analysisPeriod[0].toString());
  }, [analysisPeriod[0]]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleInputBlur = () => {
    let value = parseInt(inputValue);
    
    // Validate the input value
    if (isNaN(value)) {
      value = analysisPeriod[0];
    } else {
      value = Math.max(0, Math.min(100000, value));
    }
    
    setInputValue(value.toString());
    setAnalysisPeriod([value]);
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">Number of Followers</label>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Slider
            value={analysisPeriod}
            onValueChange={setAnalysisPeriod}
            min={0}
            max={100000}
            step={1000}
            className="flex-1"
          />
          <div className="w-24">
            <Input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              min={0}
              max={100000}
              step={1000}
              className="h-9 text-right"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {Number(inputValue).toLocaleString()} followers
          </span>
        </div>
      </div>
    </div>
  );
}
