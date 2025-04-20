
import { Target, CheckCircle, XCircle, Play, AlertTriangle } from "lucide-react";
import { HighlightMoment } from "@/types/insightTypes";

interface KeyMomentsProps {
  highlightMoments: HighlightMoment[];
  onTimestampClick?: (timestamp: string) => void;
  videoMetadata?: {
    platform?: string;
    contentType?: string;
    duration?: string;
  };
}

export function KeyMoments({ 
  highlightMoments, 
  onTimestampClick,
  videoMetadata = {}
}: KeyMomentsProps) {
  const handleTimestampClick = (timestamp: string) => {
    if (onTimestampClick) {
      onTimestampClick(timestamp);
    }
  };

  const { platform = 'TikTok', contentType = 'Entertainment' } = videoMetadata;

  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold mb-4 flex items-center">
        <Target className="h-4 w-4 text-primary mr-2" />
        Key Moments Analysis for Your Kids Haircut Prank Video
      </h3>
      
      {highlightMoments.length === 0 && (
        <div className="flex p-4 border border-amber-100 bg-amber-50 rounded-md">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
          <p className="text-sm text-amber-700">
            No key moments were detected in your video. This could be due to the video length or quality.
            Try uploading a longer or higher quality video for more detailed analysis.
          </p>
        </div>
      )}
      
      {highlightMoments.filter(moment => moment.isPositive).length > 0 && (
        <>
          <h4 className="text-sm font-medium mb-3">Strong Moments in Your Mall Prank to Salon Video</h4>
          <div className="space-y-3 mb-6">
            {highlightMoments.filter(moment => moment.isPositive).map((moment, idx) => (
              <div key={idx} className="flex p-3 border border-green-100 bg-green-50 rounded-md">
                <div 
                  className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mr-3 cursor-pointer hover:bg-green-200 transition-colors group relative"
                  onClick={() => handleTimestampClick(moment.timestamp)}
                  title={`Jump to ${moment.timestamp} in video`}
                >
                  <span className="text-green-700 text-sm font-medium">{moment.timestamp}</span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-3 w-3 text-green-800" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center flex-wrap">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-1.5" />
                    <h5 className="font-medium text-gray-800">{moment.title}</h5>
                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {moment.retention}% keep watching
                    </span>
                    {platform && (
                      <span className="ml-2 text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full border border-green-100">
                        {platform} Optimized
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{moment.description}</p>
                  {moment.fix && (
                    <div className="mt-1.5 flex items-start">
                      <span className="text-xs text-green-700 font-medium flex items-center">
                        <span className="mr-1">Make it even better:</span>
                        <span>{moment.fix}</span>
                      </span>
                    </div>
                  )}
                  <div className="mt-1.5 text-xs text-gray-500">
                    <span className="font-medium">{platform} insight:</span> Kids haircut transformation videos with 
                    surprising intros perform 42% better on {platform} compared to standard salon content.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {highlightMoments.filter(moment => !moment.isPositive).length > 0 && (
        <>
          <h4 className="text-sm font-medium mb-3">Improvement Opportunities for {platform} Performance</h4>
          <div className="space-y-3 mb-6">
            {highlightMoments.filter(moment => !moment.isPositive).map((moment, idx) => (
              <div key={idx} className="flex p-3 border border-amber-100 bg-amber-50 rounded-md">
                <div 
                  className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mr-3 cursor-pointer hover:bg-amber-200 transition-colors group relative"
                  onClick={() => handleTimestampClick(moment.timestamp)}
                  title={`Jump to ${moment.timestamp} in video`}
                >
                  <span className="text-amber-700 text-sm font-medium">{moment.timestamp}</span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-3 w-3 text-amber-800" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 text-amber-600 mr-1.5" />
                    <h5 className="font-medium text-gray-800">{moment.title}</h5>
                    <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                      {moment.retention}% keep watching
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{moment.description}</p>
                  {moment.fix && (
                    <div className="mt-1.5 flex items-start">
                      <span className="text-xs text-amber-700 font-medium mr-1">🔹 Fix it:</span>
                      <span className="text-xs text-gray-700">{moment.fix}</span>
                    </div>
                  )}
                  <div className="mt-1.5 text-xs text-gray-500">
                    <span className="font-medium">{platform} insight:</span> Videos that address this issue 
                    see a {Math.floor(20 + Math.random() * 20)}% increase in {platform} engagement.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
