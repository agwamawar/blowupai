
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ViralityGaugeProps {
  score: number;
  size?: "small" | "medium" | "large";
  showDetails?: boolean;
  colorMode?: "standard" | "gradient";
}

export function ViralityGauge({ 
  score, 
  size = "medium", 
  showDetails = false,
  colorMode = "standard"
}: ViralityGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [score]);
  
  // Determine size class
  const sizeClass = size === "small" 
    ? "w-24 h-24" 
    : size === "medium" 
      ? "w-40 h-40" 
      : "w-56 h-56";
  
  // Determine color based on score
  const getColor = (value: number) => {
    if (value < 40) return "#ef4444"; // Red
    if (value < 70) return "#f59e0b"; // Amber
    return "#10b981"; // Green
  };
  
  const color = getColor(score);
  
  // Determine the label to show based on score
  const getLabel = (value: number) => {
    if (value < 40) return "Low Potential";
    if (value < 70) return "Moderate Potential";
    if (value < 85) return "High Potential";
    return "Viral Potential";
  };
  
  // Gradient colors for the path
  const gradientTransform = colorMode === "gradient" ? "rotate(90)" : "";
  const gradientColors = {
    low: "#ef4444",
    medium: "#f59e0b",
    high: "#10b981"
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className={sizeClass}>
        {colorMode === "gradient" ? (
          <svg style={{ height: 0, width: 0 }}>
            <defs>
              <linearGradient id="viralityGradient" gradientTransform={gradientTransform}>
                <stop offset="0%" stopColor={gradientColors.low} />
                <stop offset="50%" stopColor={gradientColors.medium} />
                <stop offset="100%" stopColor={gradientColors.high} />
              </linearGradient>
            </defs>
          </svg>
        ) : null}
        
        <CircularProgressbar
          value={animatedScore}
          text={`${animatedScore}%`}
          circleRatio={0.75}
          styles={buildStyles({
            rotation: 1 / 2 + 1 / 8,
            strokeLinecap: "round",
            textSize: "16px",
            pathColor: colorMode === "gradient" ? "url(#viralityGradient)" : color,
            textColor: color,
            trailColor: "#e5e7eb"
          })}
        />
      </div>
      
      {showDetails && (
        <div className="mt-4 text-center">
          <div className="text-lg font-bold" style={{ color }}>
            {getLabel(score)}
          </div>
          
          <div className="flex items-center justify-center mt-3 text-xs text-gray-500 space-x-2">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
              <span>0-39%</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-amber-500 mr-1"></div>
              <span>40-69%</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
              <span>70-100%</span>
            </div>
          </div>
          
          {score >= 70 && (
            <div className="mt-3 px-3 py-1.5 bg-green-50 border border-green-100 rounded-lg text-xs text-green-700">
              Your content is in the top {100 - Math.round(score/1.25)}% of videos analyzed for viral potential!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
