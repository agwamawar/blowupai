import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { ThumbnailGenerator } from "./video/ThumbnailGenerator";
import { useToast } from "@/hooks/use-toast";
import { useVideoUpload } from "@/hooks/useVideoUpload";
import { FileUploadArea } from "./FileUploadArea";
import { UploadBottomControls } from "./UploadBottomControls";
import { useNavigate } from "react-router-dom";

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
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleDrop([e.target.files[0]]);
    }
  };
  
  const handleAnalysisTypeChange = (value: string) => {
    setSelectedAnalysisType(value);
  };
  
  const handlePlatformChange = (value: string) => {
    setSelectedPlatform(value);
  };
  
  const currentPlatform = socialPlatforms.find(p => p.id === selectedPlatform) || socialPlatforms[0];
  
  useEffect(() => {
    if (analysisStarted && currentStep < 3) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2000); // Each step takes 2 seconds

      return () => clearTimeout(timer);
    }
    
    if (currentStep === 3) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        
        // Navigate to results after a brief delay
        setTimeout(() => {
          navigate('/results', { 
            state: { 
              analysisData: {
                video_url: preview,
                engagement_score: 78,
                virality_score: 83,
                trend_score: 75,
                // ... keep existing code (mock analysis data)
              }
            }
          });
        }, 1000);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [analysisStarted, currentStep, navigate, preview]);

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
            analysisStarted={analysisStarted}
            currentStep={currentStep}
            isComplete={isComplete}
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
            onSendClick={() => setAnalysisStarted(true)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
