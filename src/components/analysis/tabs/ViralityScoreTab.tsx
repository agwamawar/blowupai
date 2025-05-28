
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Play, Loader2 } from "lucide-react";
import { SimulationControls } from "./virality/SimulationControls";
import { AudienceDemographics } from "./virality/AudienceDemographics";
import { SimulationResults } from "./virality/SimulationResults";
import { 
  getDemographicMultipliers, 
  calculateEngagement, 
  generateTimelineData, 
  generateInsights 
} from "./virality/simulationUtils";

interface ViralityScoreTabProps {
  viralityData: {
    engagementScore: number;
    viralityScore: number;
    predictions: any;
  };
  recommendations: Array<{
    title: string;
    description: string;
    actionItems?: string[];
  }>;
  videoMetadata: {
    platform: string;
    contentType: string;
    duration: string;
  };
}

export function ViralityScoreTab({
  viralityData,
  recommendations,
  videoMetadata
}: ViralityScoreTabProps) {
  // Simulation parameters
  const [followerCount, setFollowerCount] = useState([50000]);
  const [averageViews, setAverageViews] = useState([75]);
  const [hoursAfterPosting, setHoursAfterPosting] = useState([24]);
  
  // Audience demographics
  const [femalePercentage, setFemalePercentage] = useState([70]);
  const [primaryAgeGroup, setPrimaryAgeGroup] = useState("25-34");
  const [primaryLocation, setPrimaryLocation] = useState("UK");
  const [contentNiche, setContentNiche] = useState("lifestyle");

  // Simulation state
  const [isRunning, setIsRunning] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const handleRunSimulation = async () => {
    setIsRunning(true);
    setHasResults(false);
    
    // Simulate AI reasoning delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsRunning(false);
    setHasResults(true);
  };

  // Calculate metrics and data for results
  const demographics = getDemographicMultipliers(
    femalePercentage[0], 
    primaryAgeGroup, 
    primaryLocation, 
    contentNiche
  );
  
  const currentMetrics = calculateEngagement(
    followerCount[0],
    averageViews[0],
    hoursAfterPosting[0],
    femalePercentage[0],
    primaryAgeGroup,
    demographics
  );
  
  const timelineData = generateTimelineData(
    followerCount[0],
    averageViews[0],
    demographics
  );
  
  const insights = generateInsights(
    hoursAfterPosting[0],
    followerCount[0],
    averageViews[0],
    femalePercentage[0],
    primaryAgeGroup,
    primaryLocation,
    contentNiche,
    currentMetrics.demographicBoost
  );

  return (
    <div className="space-y-6">
      {/* Simulation Controls */}
      <Card className="border border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Engagement Simulation Environment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Creator Parameters */}
            <SimulationControls
              followerCount={followerCount}
              setFollowerCount={setFollowerCount}
              averageViews={averageViews}
              setAverageViews={setAverageViews}
              hoursAfterPosting={hoursAfterPosting}
              setHoursAfterPosting={setHoursAfterPosting}
            />

            {/* Audience Demographics */}
            <AudienceDemographics
              femalePercentage={femalePercentage}
              setFemalePercentage={setFemalePercentage}
              primaryAgeGroup={primaryAgeGroup}
              setPrimaryAgeGroup={setPrimaryAgeGroup}
              primaryLocation={primaryLocation}
              setPrimaryLocation={setPrimaryLocation}
              contentNiche={contentNiche}
              setContentNiche={setContentNiche}
            />

            {/* Run Button */}
            <div className="border-t pt-6 flex justify-center">
              <Button 
                onClick={handleRunSimulation}
                disabled={isRunning}
                size="lg"
                className="px-8"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Simulation
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results - Only show after running simulation */}
      {hasResults && (
        <SimulationResults
          metrics={currentMetrics}
          timelineData={timelineData}
          insights={insights}
        />
      )}
    </div>
  );
}
