
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface AIServiceErrorProps {
  message: string;
  onRetry?: () => void;
}

export function AIServiceError({ message, onRetry }: AIServiceErrorProps) {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>AI Service Error</AlertTitle>
      <AlertDescription className="mt-2">
        <p>{message}</p>
        <p className="text-sm mt-2">
          Please check your API keys and ensure they are properly configured.
        </p>
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry} 
            className="mt-2"
          >
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
