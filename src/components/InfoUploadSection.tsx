
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useVideoUpload } from "@/hooks/useVideoUpload";
import { useNavigate } from "react-router-dom";
import { InfoUploadHeader } from "./InfoUploadHeader";
import { InfoUploadPrompt } from "./InfoUploadPrompt";
import { InfoUploadControls } from "./InfoUploadControls";

export function InfoUploadSection() {
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
  
  const handlePlatformChange = (value: string) => {
    setSelectedPlatform(value);
  };

  const handleSendClick = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a video first",
        variant: "destructive",
      });
      return;
    }

    setAnalysisStarted(true);
  };
  
  useEffect(() => {
    if (analysisStarted && currentStep < 3) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
    
    if (currentStep === 3) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        
        setTimeout(() => {
          navigate('/auth');
        }, 1000);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [analysisStarted, currentStep, navigate]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSendClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [file, selectedPlatform]);

  return (
    <div className="w-full">
      <Card className="shadow-[0px_0px_16px_rgba(255,255,255,0.05)] border-[#2a2a2a] overflow-hidden bg-[#121212]/70 backdrop-blur-sm relative rounded-2xl">
        {/* Subtle radial gradient background */}
        <div className="absolute inset-0 bg-radial-gradient from-[#2a2a2a]/20 via-transparent to-transparent pointer-events-none"></div>
        
        <CardContent className="p-0 relative z-10">
          <div className="p-6 bg-[#121212]/70 hover:shadow-[0px_0px_12px_rgba(79,70,229,0.3)] transition-all duration-300 group">
            <InfoUploadHeader preview={preview} file={file} />
            <InfoUploadPrompt file={file} handleFileUpload={handleFileUpload} />
          </div>
          
          <InfoUploadControls 
            selectedPlatform={selectedPlatform}
            handlePlatformChange={handlePlatformChange}
            handleSendClick={handleSendClick}
          />
        </CardContent>
      </Card>
    </div>
  );
}
