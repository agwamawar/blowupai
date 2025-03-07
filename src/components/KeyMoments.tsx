
import { Target, CheckCircle, XCircle } from "lucide-react";
import { HighlightMoment } from "@/types/insightTypes";

interface KeyViralMomentsProps {
  highlightMoments: HighlightMoment[];
}

export function KeyMoments({ highlightMoments }: KeyViralMomentsProps) {
  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold mb-4 flex items-center">
        <Target className="h-4 w-4 text-primary mr-2" />
        Key Viral Indicators
      </h3>
      
      <h4 className="text-sm font-medium mb-3">High-Impact Moments</h4>
      <div className="space-y-3 mb-6">
        {highlightMoments.filter(moment => moment.isPositive).map((moment, idx) => (
          <div key={idx} className="flex p-3 border border-green-100 bg-green-50 rounded-md">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mr-3">
              <span className="text-green-700 text-sm font-medium">{moment.timestamp}</span>
            </div>
            <div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-1.5" />
                <h5 className="font-medium text-gray-800">{moment.title}</h5>
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  {moment.retention}% retention
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{moment.description}</p>
              {moment.fix && (
                <div className="mt-1.5 flex items-start">
                  <span className="text-xs text-green-700 font-medium flex items-center">
                    <span className="mr-1">Boost potential:</span>
                    <span>{moment.fix}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <h4 className="text-sm font-medium mb-3">Drop-off Risks & Fixes</h4>
      <div className="space-y-3 mb-6">
        {highlightMoments.filter(moment => !moment.isPositive).map((moment, idx) => (
          <div key={idx} className="flex p-3 border border-amber-100 bg-amber-50 rounded-md">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mr-3">
              <span className="text-amber-700 text-sm font-medium">{moment.timestamp}</span>
            </div>
            <div>
              <div className="flex items-center">
                <XCircle className="h-4 w-4 text-amber-600 mr-1.5" />
                <h5 className="font-medium text-gray-800">{moment.title}</h5>
                <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                  {moment.retention}% retention
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{moment.description}</p>
              {moment.fix && (
                <div className="mt-1.5 flex items-start">
                  <span className="text-xs text-amber-700 font-medium mr-1">🔹 Fix:</span>
                  <span className="text-xs text-gray-700">{moment.fix}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
