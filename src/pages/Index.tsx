
import { useState } from "react";
import { Header } from "../components/Header";
import { VideoUpload } from "../components/VideoUpload";
import { Features } from "../components/Features";
import { HowItWorks } from "../components/HowItWorks";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { AnalysisProgressOverlay } from "@/components/AnalysisProgressOverlay";
import { ApiTester } from "@/components/ApiTester";

const API_TESTER_ENABLED = true; // Set to false to hide the API tester

export default function Index() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState("");
  const navigate = useNavigate();

  const handleSubmitVideo = async (videoUrl: string, platform: string, contentType: string, followerCount: number) => {
    setIsAnalyzing(true);
    
    // Start analysis progress simulation
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 10;
      if (currentProgress > 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setProgress(Math.floor(currentProgress));
    }, 500);
    
    try {
      // Call Supabase Edge Function to analyze video
      const response = await fetch("https://jzvonrpyefweapxftanj.supabase.co/functions/v1/analyze-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl, platform, userId: "demo-user", followerCount }),
      });
      
      clearInterval(interval);
      setProgress(100);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const analysisData = await response.json();
      
      // Navigate to dashboard with analysis data
      setTimeout(() => {
        setIsAnalyzing(false);
        navigate("/dashboard", { state: { analysisData } });
      }, 500);
    } catch (error) {
      console.error("Error analyzing video:", error);
      clearInterval(interval);
      setIsAnalyzing(false);
      // Show error toast or message
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="py-12 md:py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="container px-4 md:px-6">
            <VideoUpload onSubmit={handleSubmitVideo} />
            {API_TESTER_ENABLED && <ApiTester />}
          </div>
        </section>
        <Features />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
      
      {isAnalyzing && (
        <AnalysisProgressOverlay 
          progress={progress} 
          stage={currentStage} 
          onCancel={() => setIsAnalyzing(false)} 
        />
      )}
    </div>
  );
}
