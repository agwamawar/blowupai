
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function HelpCenterSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // TODO: Implement search functionality
  };

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for help articles, guides, or FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-full focus:bg-white/15 focus:border-white/40"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#8d4c55] hover:bg-[#8d4c55]/80 rounded-full px-6"
        >
          Search
        </Button>
      </div>
    </div>
  );
}
