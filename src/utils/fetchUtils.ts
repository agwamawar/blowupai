
import { toast } from "@/components/ui/use-toast";

interface FetchOptions extends RequestInit {
  showToast?: boolean;
}

export async function enhancedFetch<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const { showToast = true, ...fetchOptions } = options;
  
  try {
    const response = await fetch(url, fetchOptions);
    
    // Log response details
    console.debug('[API Request]', {
      url,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('[API Error]', {
        url,
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      throw new Error(`HTTP error! status: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error: any) {
    // Detailed error logging
    console.error('[Fetch Error]', {
      url,
      error: error.message,
      stack: error.stack
    });

    if (showToast) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch data"
      });
    }
    
    throw error;
  }
}
