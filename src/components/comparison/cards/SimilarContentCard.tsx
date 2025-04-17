
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { TrendingUp, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimilarityExplanation } from "../SimilarityExplanation";
import { ComparisonFilters } from "../ComparisonFilters";
import { SimilarVideosGrid } from "../SimilarVideosGrid";

interface SimilarContentCardProps {
  videoTitle: string;
  filteredVideos: any[];
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
  thumbnails: Record<string, string | null>;
}

export function SimilarContentCard({ 
  videoTitle, 
  filteredVideos, 
  onFilterChange, 
  onSortChange,
  thumbnails 
}: SimilarContentCardProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary text-lg flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Similar Content Benchmarks
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <SimilarityExplanation 
          userVideoTitle={videoTitle}
          similarityMethod=" content theme, style, and execution quality"
          matchCount={filteredVideos.length}
        />
        
        <ComparisonFilters 
          onFilterChange={onFilterChange}
          onSortChange={onSortChange}
          totalVideos={filteredVideos.length}
        />
        
        <SimilarVideosGrid 
          videos={filteredVideos.map(video => ({
            ...video,
            thumbnailUrl: thumbnails[video.id] || null
          }))}
        />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Study these top performers to identify patterns and techniques you can incorporate
          </p>
          <Button>
            <Lightbulb className="h-4 w-4 mr-2" />
            Apply Winning Strategies
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
