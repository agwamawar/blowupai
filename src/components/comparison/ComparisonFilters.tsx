
import { useState } from "react";
import { Filter, SortAsc, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ComparisonFiltersProps {
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
  totalVideos: number;
}

export function ComparisonFilters({
  onFilterChange,
  onSortChange,
  totalVideos
}: ComparisonFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{totalVideos}</span> similar videos
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select defaultValue="all" onValueChange={onFilterChange}>
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="TikTok">TikTok</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="YouTube">YouTube</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <SortAsc className="h-4 w-4 text-muted-foreground" />
          <Select defaultValue="relevance" onValueChange={onSortChange}>
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="views">Most Views</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" size="sm" className="h-9">
          <TrendingUp className="h-4 w-4 mr-2" />
          Top Performing
        </Button>
      </div>
    </div>
  );
}
