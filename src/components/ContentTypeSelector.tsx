
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONTENT_TYPES = [
  "Games",
  "Song Covers",
  "Livestreams",
  "Duets & Collabs",
  "Behind-the-Scenes",
  "Storytime",
  "How-To Videos",
  "Q&A Sessions",
  "Trend Jumps",
  "Before & After",
  "Countdowns",
  "Reaction Videos",
  "Reviews",
  "Motivational Posts",
  "Funny Skits",
  "Aesthetic Content",
  "Product Showcases",
  "Day in the Life",
  "POV Content",
  "Podcasts",
  "Unboxings",
  "Rants & Opinions",
  "Memes & Edits",
  "Loops & Satisfying Clips",
  "Tutorials",
  "Voiceovers",
  "Vlogs",
  "News & Commentary",
  "ASMR",
  "Interviews"
];

interface ContentTypeSelectorProps {
  selected: string | string[];
  onSelect: (type: string | string[]) => void;
}

export function ContentTypeSelector({ selected, onSelect }: ContentTypeSelectorProps) {
  const selectedTypes = Array.isArray(selected) ? selected : [selected];

  const handleSelect = (value: string) => {
    if (Array.isArray(selected)) {
      if (selected.includes(value)) {
        onSelect(selected.filter(type => type !== value));
      } else {
        onSelect([...selected, value]);
      }
    } else {
      onSelect([selected, value].filter(Boolean));
    }
  };

  const removeType = (typeToRemove: string) => {
    if (Array.isArray(selected)) {
      onSelect(selected.filter(type => type !== typeToRemove));
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTypes.map(type => (
          <Badge key={type} variant="secondary" className="flex items-center gap-1">
            {type}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => removeType(type)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {type}</span>
            </Button>
          </Badge>
        ))}
      </div>

      <Select 
        value={""} 
        onValueChange={handleSelect}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Add content type" />
        </SelectTrigger>
        <SelectContent>
          {CONTENT_TYPES.map((type) => (
            <SelectItem 
              key={type} 
              value={type}
              disabled={selectedTypes.includes(type)}
            >
              <div className="flex items-center gap-2">
                {selectedTypes.includes(type) && <Check className="h-4 w-4" />}
                {type}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
