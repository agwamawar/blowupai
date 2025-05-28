
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCheck, MapPin } from "lucide-react";

interface AudienceDemographicsProps {
  femalePercentage: number[];
  setFemalePercentage: (value: number[]) => void;
  primaryAgeGroup: string;
  setPrimaryAgeGroup: (value: string) => void;
  primaryLocation: string;
  setPrimaryLocation: (value: string) => void;
  contentNiche: string;
  setContentNiche: (value: string) => void;
}

export function AudienceDemographics({
  femalePercentage,
  setFemalePercentage,
  primaryAgeGroup,
  setPrimaryAgeGroup,
  primaryLocation,
  setPrimaryLocation,
  contentNiche,
  setContentNiche
}: AudienceDemographicsProps) {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <UserCheck className="h-5 w-5 text-primary" />
        Audience Demographics
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Female Audience</label>
            <Badge variant="outline">{femalePercentage[0]}%</Badge>
          </div>
          <Slider
            value={femalePercentage}
            onValueChange={setFemalePercentage}
            max={100}
            min={0}
            step={5}
            className="w-full"
          />
          <div className="text-xs text-muted-foreground">Female vs male audience split</div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Primary Age Group</label>
          <Select value={primaryAgeGroup} onValueChange={setPrimaryAgeGroup}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="13-17">13-17 years</SelectItem>
              <SelectItem value="18-24">18-24 years</SelectItem>
              <SelectItem value="25-34">25-34 years</SelectItem>
              <SelectItem value="35-44">35-44 years</SelectItem>
              <SelectItem value="45-54">45-54 years</SelectItem>
              <SelectItem value="55+">55+ years</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-xs text-muted-foreground">Largest age demographic</div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Primary Location
          </label>
          <Select value={primaryLocation} onValueChange={setPrimaryLocation}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="UK">United Kingdom</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="France">France</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-xs text-muted-foreground">Main geographic audience</div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Content Niche</label>
          <Select value={contentNiche} onValueChange={setContentNiche}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="beauty">Beauty</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
              <SelectItem value="comedy">Comedy</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="parenting">Parenting</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-xs text-muted-foreground">Your content category</div>
        </div>
      </div>
    </div>
  );
}
