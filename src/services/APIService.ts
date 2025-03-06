
import { useAuth } from '../contexts/AuthContext';

// Define response type for API calls
interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
}

// Base API URL - this should be set based on environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.afroconnect.com';

class APIServiceClass {
  private getAuthToken(): string | null {
    const storedUser = localStorage.getItem('afroconnect-user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        return user.token || null;
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return null;
      }
    }
    return null;
  }

  private async handleResponse<T>(response: Response): Promise<APIResponse<T>> {
    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized access - clear auth and redirect to login
        localStorage.removeItem('afroconnect-user');
        window.location.href = '/signin';
        return { success: false, message: 'Session expired. Please sign in again.' };
      }
      
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || `Error: ${response.status} ${response.statusText}`,
        errors: errorData.errors
      };
    }
    
    try {
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: true }; // No content but successful
    }
  }

  private getHeaders(includeAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    
    return headers;
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<APIResponse<T>> {
    try {
      const url = new URL(`${API_BASE_URL}${endpoint}`);
      
      // Add query parameters if provided
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        });
      }
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.getHeaders(),
      });
      
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error(`API GET error for ${endpoint}:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      };
    }
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });
      
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error(`API POST error for ${endpoint}:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      };
    }
  }

  // PUT request
  async put<T>(endpoint: string, data: any): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error(`API PUT error for ${endpoint}:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      };
    }
  }

  // PATCH request
  async patch<T>(endpoint: string, data: any): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error(`API PATCH error for ${endpoint}:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      };
    }
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });
      
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error(`API DELETE error for ${endpoint}:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      };
    }
  }

  // Upload file(s)
  async uploadFiles<T>(
    endpoint: string, 
    files: File[], 
    additionalData?: Record<string, any>
  ): Promise<APIResponse<T>> {
    try {
      const formData = new FormData();
      
      // Append files
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
      
      // Append additional data
      if (additionalData) {
        Object.entries(additionalData).forEach(([key, value]) => {
          formData.append(key, String(value));
        });
      }
      
      // Remove Content-Type header, let browser set it with boundary
      const headers: HeadersInit = {};
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      });
      
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error(`API upload error for ${endpoint}:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      };
    }
  }
}

// Create a singleton instance
export const APIService = new APIServiceClass();

// React hook for using the API service in components
export const useAPI = () => {
  const { isAuthenticated } = useAuth();
  
  return {
    api: APIService,
    isAuthenticated,
  };
};
