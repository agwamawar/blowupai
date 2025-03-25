import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { CountdownTimer } from "@/components/CountdownTimer";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { KeyFeatures } from "@/components/KeyFeatures";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Added useLocation
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  const handleAnalysisComplete = (data: any) => {
    console.log("Analysis complete, data received:", data);

    const heatmapData = data.engagement_prediction?.segments?.map((segment: any) => ({
      time: segment.timestamp,
      engagement: segment.engagement_score
    })) || [];

    setAnalysisData(data);
    setIsAnalyzing(false);

    navigate('/dashboard', { 
      state: { analysisData: data },
      replace: true 
    });
  };

  //Check for pending analysis after login
  useEffect(() => {
    const pendingAction = sessionStorage.getItem('pendingAction');
    if (pendingAction === 'analyze') {
      const storedData = sessionStorage.getItem('analysisData');
      if (storedData) {
        const analysisData = JSON.parse(storedData);
        handleAnalysisComplete(analysisData); // Simulate completion; Adapt as needed
        sessionStorage.removeItem('pendingAction');
        sessionStorage.removeItem('analysisData');
      }
    }
  }, [location]); //Run this effect when location changes (after login redirect)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="space-y-12 md:space-y-20">
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/20 mt-8">
            <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
              <Header />
              <UploadSection onAnalyze={handleAnalyze} /> {/* Updated to call handleAnalyze */}
            </div>
          </div>

          <div className="px-2 sm:px-4">
            <CountdownTimer />
          </div>

          <section className="py-12 md:py-20" id="features">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Key Features</h2>
            <KeyFeatures />
          </section>

          <HowItWorks />

          <Testimonials />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const handleAnalyze = async () => {
    //setLoading(true); // Assuming setLoading is defined elsewhere
    try {
      const token = localStorage.getItem('googleAccessToken');
      if (!token) {
        sessionStorage.setItem('pendingAction', 'analyze');
        //sessionStorage.setItem('analysisData', JSON.stringify(analysisData)); // Removed as this might not be available yet.
        navigate('/auth');
        return;
      }
      // Analysis logic (this would need to be fleshed out depending on your backend setup)
      // ... fetch('/api/analyze', {method: 'POST', body: JSON.stringify(videoData), headers:{'Authorization': `Bearer ${token}`}})
      // ... .then(res => res.json()).then(data => handleAnalysisComplete(data))
      // Placeholder for analysis
      const mockData = {engagement_prediction: {segments: [{timestamp: 10, engagement_score: 0.8}, {timestamp: 20, engagement_score: 0.9}]}};
      handleAnalysisComplete(mockData);
    } catch (error) {
      console.error("Analysis failed:", error);
      // Handle error appropriately, e.g., display an error message
    }
  };


export default Index;