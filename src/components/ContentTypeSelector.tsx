
import { Check } from "lucide-react";

interface ContentTypeSelectorProps {
  selected: string[];
  onSelect: (types: string[]) => void;
}

export function ContentTypeSelector({
  selected,
  onSelect
}: ContentTypeSelectorProps) {
  const contentTypes = [
    { id: "entertainment", label: "Entertainment" },
    { id: "tutorial", label: "Tutorial" },
    { id: "educational", label: "Educational" },
    { id: "vlog", label: "Vlog" },
    { id: "product", label: "Product Review" },
    { id: "gaming", label: "Gaming" }
  ];
  
  const handleTypeClick = (typeId: string) => {
    // If already selected, remove it (unless it's the only one selected)
    if (selected.includes(typeId) && selected.length > 1) {
      onSelect(selected.filter(id => id !== typeId));
    } 
    // If not selected, add it
    else if (!selected.includes(typeId)) {
      onSelect([...selected, typeId]);
    }
  };
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {contentTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => handleTypeClick(type.id)}
          className={`flex items-center justify-between px-3 py-2 rounded-md border text-sm ${
            selected.includes(type.id)
              ? "border-primary/70 bg-primary/10 text-primary"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          {type.label}
          {selected.includes(type.id) && (
            <Check className="h-4 w-4 ml-2" />
          )}
        </button>
      ))}
    </div>
  );
}
