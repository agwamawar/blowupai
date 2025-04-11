
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UploadControls } from "./UploadControls";
import { VideoContentDetails } from "./VideoContentDetails";

interface UploadSectionProps {
  onAnalyze: (data: any) => void;
}

export function UploadSection({ onAnalyze }: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [platform, setPlatform] = useState("tiktok");
  const [contentType, setContentType] = useState<string[]>(["entertainment"]);
  const [followerCount, setFollowerCount] = useState<number[]>([0, 10000]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState<string | null>(null);
  const [videoMetadata, setVideoMetadata] = useState<any>(null);
  
  const { toast } = useToast();
  
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const videoFile = acceptedFiles[0];
      
      if (!videoFile.type.startsWith('video/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload a video file",
          variant: "destructive",
        });
        return;
      }
      
      setFile(videoFile);
      
      // Generate a URL for the video
      const objectUrl = URL.createObjectURL(videoFile);
      setVideoUrl(objectUrl);
      
      // Extract basic metadata from the video
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        setVideoMetadata({
          duration: video.duration,
          resolution: `${video.videoWidth}x${video.videoHeight}`,
          fileSize: videoFile.size,
        });
        URL.revokeObjectURL(video.src);
      };
      video.src = objectUrl;
    }
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'video/*': []
    },
    maxFiles: 1
  });
  
  const handleAnalyzeClick = () => {
    setIsLoading(true);
    
    // Simulate analysis progress
    let progress = 0;
    const stages = [
      "Initializing analysis",
      "Processing video content",
      "Analyzing engagement patterns",
      "Extracting key moments",
      "Generating recommendations",
      "Finalizing report"
    ];
    
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      const stageIndex = Math.min(
        Math.floor((progress / 100) * stages.length),
        stages.length - 1
      );
      
      setAnalysisProgress(Math.min(progress, 99));
      setAnalysisStage(stages[stageIndex]);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Mock analysis result
        const mockResult = {
          video_url: videoUrl,
          video_metadata: {
            title: file?.name.split('.')[0] || "Untitled Video",
            duration: formatDuration(videoMetadata?.duration || 30),
            resolution: videoMetadata?.resolution || "1080x1920",
            uploadTime: new Date().toISOString(),
            platform: platform,
            category: contentType[0],
          },
          content_analysis: {
            objects: ["person", "room", "product"],
            scene_transitions: "Multiple scene transitions detected",
            text_detected: ["Check this out!", "New product!"]
          },
          engagement_prediction: {
            best_segments: [
              {
                timestamp: "00:05",
                reason: "High viewer retention at the product reveal"
              },
              {
                timestamp: "00:15",
                reason: "Strong emotional response during demonstration"
              }
            ],
            segments: Array(10).fill(0).map((_, i) => ({
              timestamp: formatTimestamp(i * (videoMetadata?.duration || 30) / 10),
              engagement_score: Math.floor(Math.random() * 40) + 60
            }))
          },
          virality_score: Math.floor(Math.random() * 30) + 70,
          engagement_score: Math.floor(Math.random() * 40) + 60,
          trend_score: Math.floor(Math.random() * 25) + 75,
          trending_hashtags: [
            "#trending",
            "#viral",
            "#content",
            contentType.map(t => `#${t}`)[0]
          ],
          trend_opportunities: [
            "Add trending audio to your content",
            "Incorporate current events references",
            "Use popular challenge formats",
            "Respond to trending topics in your niche"
          ],
          follower_count: followerCount[1]
        };
        
        setIsLoading(false);
        setAnalysisProgress(0);
        setAnalysisStage(null);
        
        // Call the onAnalyze callback with the mock result
        onAnalyze(mockResult);
      }
    }, 300);
  };
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const formatTimestamp = (seconds: number) => {
    return formatDuration(seconds);
  };
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Upload Zone */}
        <div className="w-full">
          {!videoUrl ? (
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                isDragActive 
                  ? "border-primary bg-primary/5" 
                  : "border-gray-300 hover:border-primary/50 hover:bg-gray-50"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-sm font-medium text-gray-900">
                Drop your video here, or <span className="text-primary">browse</span>
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Supports MP4, MOV, AVI up to 100MB
              </p>
            </div>
          ) : (
            // Video Preview
            <div className="space-y-4">
              <div className="relative aspect-[9/16] max-w-[250px] mx-auto rounded-lg overflow-hidden border border-gray-200">
                <video
                  src={videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  muted
                />
              </div>
              
              <div className="flex justify-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setFile(null);
                    setVideoUrl(null);
                    setVideoMetadata(null);
                  }}
                >
                  Change Video
                </Button>
              </div>
              
              {videoMetadata && (
                <div className="text-sm text-gray-700 border rounded-md p-3 flex flex-col space-y-1 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Duration:</span>
                    <span>{formatDuration(videoMetadata.duration)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Resolution:</span>
                    <span>{videoMetadata.resolution}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">File size:</span>
                    <span>{(videoMetadata.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="w-full">
          <UploadControls
            platform={platform}
            setPlatform={setPlatform}
            contentType={contentType}
            setContentType={setContentType}
            followerCount={followerCount}
            setFollowerCount={setFollowerCount}
            file={file}
            onAnalyze={handleAnalyzeClick}
            isLoading={isLoading}
            analysisProgress={analysisProgress}
            analysisStage={analysisStage}
            videoMetadata={videoMetadata}
          />
        </div>
      </div>
      
      {videoUrl && videoMetadata && (
        <div className="mt-8">
          <VideoContentDetails 
            videoMetadata={{
              title: file?.name.split('.')[0] || "Untitled Video",
              duration: formatDuration(videoMetadata.duration),
              platform: platform,
            }}
          />
        </div>
      )}
    </div>
  );
}
