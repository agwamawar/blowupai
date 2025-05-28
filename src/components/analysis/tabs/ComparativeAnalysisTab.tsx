
import { ContentPerformanceCard } from "@/components/comparison/cards/ContentPerformanceCard";
import { MissingElementsCard } from "@/components/comparison/cards/MissingElementsCard";
import { UniqueStrengthsCard } from "@/components/comparison/cards/UniqueStrengthsCard";
import { SimilarContentCard } from "@/components/comparison/cards/SimilarContentCard";
import { ComparativeData, VideoMetadata } from "@/types/comparisonTypes";
import { useSimilarVideos } from "@/hooks/useSimilarVideos";
import { useThumbnails } from "@/hooks/useThumbnails";

interface ComparativeAnalysisTabProps {
  comparativeData: ComparativeData;
  followerCount: number;
  videoMetadata: VideoMetadata;
}

export function ComparativeAnalysisTab({
  comparativeData,
  followerCount,
  videoMetadata
}: ComparativeAnalysisTabProps) {
  const {
    similarVideos,
    filteredVideos,
    handleFilterChange,
    handleSortChange
  } = useSimilarVideos(comparativeData);

  const thumbnails = useThumbnails(similarVideos);
  
  return (
    <div className="space-y-6">
      <ContentPerformanceCard 
        similarityIndex={{
          conceptMatch: comparativeData.similarityIndex?.conceptMatch || 72,
          executionMatch: comparativeData.similarityIndex?.executionMatch || 65
        }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MissingElementsCard 
          missingElements={comparativeData.missingElements || [
            "Clear call-to-action",
            "Pattern interrupts every 7-10 seconds",
            "Trending audio implementation"
          ]}
        />
        
        <UniqueStrengthsCard 
          uniqueStrengths={comparativeData.uniqueStrengths || [
            "Original presentation style",
            "Useful informational content",
            "Good production quality"
          ]}
        />
      </div>
      
      <SimilarContentCard 
        videoTitle={videoMetadata.title || "Your Video"}
        filteredVideos={filteredVideos}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        thumbnails={thumbnails}
      />
    </div>
  );
}
