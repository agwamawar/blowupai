
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CONTENT_TYPES = [
  "Entertainment",
  "Educational",
  "Lifestyle",
  "News & Commentary",
  "Tech & Science",
  "Business & Finance",
  "Gaming",
  "Fitness & Health",
  "Food & Cooking",
  "Beauty & Fashion",
  "Music & Dance",
  "Art & Creativity",
  "Motivational & Self-Help",
  "Automotive & Mechanics",
  "Pets & Animals",
  "ASMR & Relaxation",
  "Horror & Mystery",
  "Relationships & Dating",
  "DIY & Home Improvement"
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
