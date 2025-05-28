
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, Clock } from "lucide-react";

interface SimulationControlsProps {
  followerCount: number[];
  setFollowerCount: (value: number[]) => void;
  averageViews: number[];
  setAverageViews: (value: number[]) => void;
  hoursAfterPosting: number[];
  setHoursAfterPosting: (value: number[]) => void;
}

export function SimulationControls({
  followerCount,
  setFollowerCount,
  averageViews,
  setAverageViews,
  hoursAfterPosting,
  setHoursAfterPosting
}: SimulationControlsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Follower Count
          </label>
          <Badge variant="outline">{followerCount[0].toLocaleString()}</Badge>
        </div>
        <Slider
          value={followerCount}
          onValueChange={setFollowerCount}
          max={1000000}
          min={1000}
          step={1000}
          className="w-full"
        />
        <div className="text-xs text-muted-foreground">1K - 1M followers</div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Average Views
          </label>
          <Badge variant="outline">{averageViews[0]}%</Badge>
        </div>
        <Slider
          value={averageViews}
          onValueChange={setAverageViews}
          max={100}
          min={10}
          step={5}
          className="w-full"
        />
        <div className="text-xs text-muted-foreground">Percentage of followers who typically view your content</div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Hours Since Posted
          </label>
          <Badge variant="outline">{hoursAfterPosting[0]}h</Badge>
        </div>
        <Slider
          value={hoursAfterPosting}
          onValueChange={setHoursAfterPosting}
          max={72}
          min={1}
          step={1}
          className="w-full"
        />
        <div className="text-xs text-muted-foreground">Algorithm boost decreases over time</div>
      </div>
    </div>
  );
}
