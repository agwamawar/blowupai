
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function ApiTester() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testApis = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('test-ai-apis');
      
      if (error) {
        throw new Error(error.message);
      }
      
      setResults(data);
    } catch (err: any) {
      console.error('Error testing APIs:', err);
      setError(err.message || 'Failed to test APIs');
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = (service: any) => {
    if (!service) return null;
    
    const isSuccess = service.status === 'success';
    
    return (
      <Alert variant={isSuccess ? "default" : "destructive"} className="mt-2">
        {isSuccess ? (
          <CheckCircle className="h-4 w-4" />
        ) : (
          <AlertCircle className="h-4 w-4" />
        )}
        <AlertTitle>{isSuccess ? "Success" : "Error"}</AlertTitle>
        <AlertDescription>
          {service.message}
          {service.details && (
            <div className="text-xs mt-1">{service.details}</div>
          )}
        </AlertDescription>
      </Alert>
    );
  };

  return (
    <Card className="w-full max-w-xl mx-auto my-4">
      <CardHeader>
        <CardTitle>AI API Tester</CardTitle>
        <CardDescription>Verify that AI model APIs are working correctly</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {results && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold">YOLO API (Object Detection)</h3>
              {renderStatus(results.yolo_api)}
            </div>
            <div>
              <h3 className="text-sm font-semibold">Hugging Face API (DINO)</h3>
              {renderStatus(results.huggingface_api)}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={testApis} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing APIs...
            </>
          ) : (
            "Test AI APIs"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
