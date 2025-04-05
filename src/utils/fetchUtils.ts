
import { toast } from "sonner";

export interface FetchOptions extends RequestInit {
  showToast?: boolean;
  autoRetry?: boolean;
  maxRetries?: number;
}

/**
 * Enhanced fetch function with error handling and toast notifications
 */
export async function enhancedFetch<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { showToast = false, autoRetry = false, maxRetries = 3, ...fetchOptions } = options;
  
  try {
    // Attempt to fetch the resource
    const response = await fetch(url, fetchOptions);
    
    // Check if the response is OK
    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      let errorData: any = { message: response.statusText };
      
      if (contentType && contentType.includes("application/json")) {
        errorData = await response.json();
      } else {
        errorData.message = await response.text();
      }
      
      const error = new Error(errorData.message || "An error occurred");
      throw error;
    }
    
    return await response.json() as T;
    
  } catch (error) {
    // Show toast notification if option is enabled
    if (showToast) {
      toast.error(error.message || "Could not complete the request");
    }
    
    // Retry logic if enabled
    if (autoRetry && maxRetries > 0) {
      console.log(`Retrying fetch (${maxRetries} attempts left)...`);
      return enhancedFetch<T>(url, {
        ...options,
        maxRetries: maxRetries - 1
      });
    }
    
    throw error;
  }
}
