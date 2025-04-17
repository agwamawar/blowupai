
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { ThumbnailGenerator } from "./video/ThumbnailGenerator";
import { useToast } from "@/hooks/use-toast";
import { useVideoUpload } from "@/hooks/useVideoUpload";
import { FileUploadArea } from "./FileUploadArea";
import { UploadBottomControls } from "./UploadBottomControls";

const socialPlatforms = [
  { id: "facebook", name: "Facebook", icon: Facebook },
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "tiktok", name: "TikTok", icon: null }, // No TikTok icon in lucide
  { id: "linkedin", name: "LinkedIn", icon: Linkedin },
  { id: "youtube", name: "YouTube", icon: Youtube },
];

export function UploadSection() {
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string>("Quick Analysis");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("facebook");
  const { toast } = useToast();
  
  // Use the custom hook for video upload handling to avoid glitches
  const {
    file,
    preview,
    uploadProgress,
    isValidating,
    handleDrop,
    removeFile
  } = useVideoUpload({
    onUpload: (videoFile) => {
      console.log("Video uploaded successfully:", videoFile.name);
    },
    onMetadataExtracted: (metadata) => {
      console.log("Video metadata extracted:", metadata);
    }
  });
  
  // Handler for file input change
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleDrop([e.target.files[0]]);
    }
  };
  
  // Handler for analysis type selection
  const handleAnalysisTypeChange = (value: string) => {
    setSelectedAnalysisType(value);
  };
  
  // Handler for platform selection
  const handlePlatformChange = (value: string) => {
    setSelectedPlatform(value);
  };
  
  // Get current platform
  const currentPlatform = socialPlatforms.find(p => p.id === selectedPlatform) || socialPlatforms[0];
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="shadow-lg border border-muted/40 overflow-hidden">
        <CardContent className="p-0">
          <FileUploadArea
            preview={preview}
            file={file}
            uploadProgress={uploadProgress}
            isValidating={isValidating}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
          />
          
          <UploadBottomControls
            selectedAnalysisType={selectedAnalysisType}
            handleAnalysisTypeChange={handleAnalysisTypeChange}
            selectedPlatform={selectedPlatform}
            handlePlatformChange={handlePlatformChange}
            platformIcon={currentPlatform.icon}
            platformName={currentPlatform.name}
            socialPlatforms={socialPlatforms}
            file={file}
          />
        </CardContent>
      </Card>
    </div>
  );
}
