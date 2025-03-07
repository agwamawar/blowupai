
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CONTENT_TYPES = [
  "Challenges",
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
  "Aesthetic Vibes",
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
  "ASMR"
];

interface ContentTypeSelectorProps {
  selected: string;
  onSelect: (type: string) => void;
}

export function ContentTypeSelector({ selected, onSelect }: ContentTypeSelectorProps) {
  return (
    <Select value={selected} onValueChange={onSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select content type" />
      </SelectTrigger>
      <SelectContent>
        {CONTENT_TYPES.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
