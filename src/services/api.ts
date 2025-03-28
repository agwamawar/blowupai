
interface ApiResponse<T> {
  data: T;
  success: boolean;
}

interface ApiError {
  message: string;
  code?: string;
}

export async function postToEndpoint<T, P = any>(payload: P): Promise<ApiResponse<T>> {
  return enhancedFetch<ApiResponse<T>>('/api/endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    showToast: true // Enable error toasts by default
  });
}
