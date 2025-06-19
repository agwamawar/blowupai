
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Instagram, Linkedin, Youtube, Send, Plus, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useVideoUpload } from "@/hooks/useVideoUpload";
import { FileUploadArea } from "./FileUploadArea";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const socialPlatforms = [
  { id: "facebook", name: "Facebook", icon: Facebook },
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "tiktok", name: "TikTok", icon: null },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin },
  { id: "youtube", name: "YouTube", icon: Youtube },
];

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
  
  const currentPlatform = socialPlatforms.find(p => p.id === selectedPlatform) || socialPlatforms[0];
  const PlatformIcon = currentPlatform.icon;

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
    <div className="w-full max-w-3xl mx-auto">
      <Card className="shadow-[0px_0px_16px_rgba(255,255,255,0.05)] border-[#2a2a2a] overflow-hidden bg-[#121212]/70 backdrop-blur-sm relative rounded-3xl">
        {/* Subtle radial gradient background */}
        <div className="absolute inset-0 bg-radial-gradient from-[#2a2a2a]/20 via-transparent to-transparent pointer-events-none"></div>
        
        <CardContent className="p-0 relative z-10">
          <div className="p-8 bg-[#121212]/70 hover:shadow-[0px_0px_12px_rgba(79,70,229,0.3)] transition-all duration-300 group">
            {preview && file && (
              <>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 mr-4 bg-[#2c2c2c] relative">
                    <img 
                      src={preview} 
                      alt="Video thumbnail" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="truncate max-w-[200px]">
                    <p className="text-base font-medium truncate text-[#f5f5f5]">{file?.name}</p>
                    <p className="text-sm text-[#cfcfcf]">
                      {Math.round(file?.size / 1024 / 1024 * 10) / 10} MB
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="rounded-xl h-16 flex items-center justify-center relative">
              <input 
                type="file" 
                id="video-upload-info" 
                className="hidden" 
                accept="video/*" 
                onChange={handleFileUpload}
              />
              <label htmlFor="video-upload-info" className="cursor-pointer flex items-center w-full h-full justify-center">
                {!file && (
                  <p className="font-medium text-xl text-[#e5e5e5] group-hover:text-[#f5f5f5] transition-colors">What do you want to know?</p>
                )}
              </label>
            </div>
          </div>
          
          <div className="p-6 border-t border-[#2a2a2a] flex items-center justify-between bg-[#121212]/70">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10 border-[#2a2a2a] text-[#e0e0e0] hover:bg-[#3a3a3a] bg-[#2c2c2c] hover:text-[#ffffff] transition-all duration-200"
              >
                <Plus className="h-5 w-5" />
              </Button>
              
              <Select
                value={selectedPlatform}
                onValueChange={handlePlatformChange}
              >
                <SelectTrigger className="w-[200px] flex items-center gap-3 border-[#2a2a2a] text-[#e0e0e0] bg-[#2c2c2c] hover:bg-[#3a3a3a] transition-colors h-10">
                  {PlatformIcon ? <PlatformIcon className="h-5 w-5 text-white" /> : 
                    <img src={`/${selectedPlatform}.svg`} alt={currentPlatform.name} className="h-5 w-5 filter brightness-0 invert" />
                  }
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent className="bg-[#2c2c2c] border-[#2a2a2a]">
                  {socialPlatforms.map(platform => (
                    <SelectItem key={platform.id} value={platform.id} className="text-[#e0e0e0] hover:bg-[#3a3a3a] focus:bg-[#3a3a3a]">
                      <span>{platform.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              size="sm" 
              className="flex items-center gap-3 w-auto bg-gradient-to-r from-[#4f1b8d] to-[#6c2bd9] hover:from-[#5a1f9e] hover:to-[#7a30e8] text-white border-0 hover:shadow-[0px_0px_8px_rgba(79,70,229,0.4)] transition-all duration-300 group h-10 px-4"
              onClick={handleSendClick}
            >
              <Send className="h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
