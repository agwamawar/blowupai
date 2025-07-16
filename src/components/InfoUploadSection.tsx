
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useVideoUpload } from "@/hooks/useVideoUpload";
import { useNavigate } from "react-router-dom";
import { InfoUploadHeader } from "./InfoUploadHeader";
import { InfoUploadPrompt } from "./InfoUploadPrompt";
import { InfoUploadControls } from "./InfoUploadControls";
import { LoaderCircle, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
  }, [file, selectedPlatform, handleSendClick]);

  const steps = [
    {
      id: "metadata",
      description: "Extracting video metadata",
      isComplete: currentStep > 0,
      isActive: currentStep === 0
    },
    {
      id: "concept",
      description: "Analyzing content structure",
      isComplete: currentStep > 1,
      isActive: currentStep === 1
    },
    {
      id: "trends",
      description: "Evaluating trend alignment",
      isComplete: currentStep > 2,
      isActive: currentStep === 2
    },
    {
      id: "complete",
      description: "Taking you to Analysis Page...",
      isComplete: isComplete,
      isActive: currentStep === 3
    }
  ];

  return (
    <div className="w-full">
      <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-200 shadow-lg overflow-hidden backdrop-blur-sm relative rounded-2xl">
        {/* Subtle background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
        
        <CardContent className="p-0 relative z-10">
          <div className="p-6 hover:bg-white/5 transition-all duration-300 group">
            <InfoUploadHeader preview={preview} file={file} />
            {analysisStarted && (
              <div className="space-y-2 mt-4 animate-fade-in">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={cn(
                      "flex items-center gap-3 text-sm transition-all duration-300",
                      index > currentStep && "opacity-40",
                      step.isActive && "text-blue-400",
                      "animate-fade-in"
                    )}
                    style={{
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <div className="relative flex items-center justify-center w-5 h-5">
                      {step.isComplete ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : step.isActive ? (
                        <LoaderCircle className="w-4 h-4 animate-spin text-blue-400" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-white/30" />
                      )}
                    </div>
                    <span className="flex-1 text-white/90">{step.description}</span>
                    {step.isComplete && step.id === "complete" && (
                      <ArrowRight className="w-4 h-4 text-blue-400 animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
            )}
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
