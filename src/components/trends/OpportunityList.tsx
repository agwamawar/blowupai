
interface OpportunityListProps {
  opportunities: string[];
}

export function OpportunityList({ opportunities }: OpportunityListProps) {
  if (opportunities.length === 0) return null;
  
  return (
    <div>
      <h4 className="text-gray-700 mb-2 font-medium">Quick Fixes For Your Video</h4>
      <ul className="space-y-2">
        {opportunities.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="text-primary text-xs mt-1">🔹</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
