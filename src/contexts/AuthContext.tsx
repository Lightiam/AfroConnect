
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { APIService } from '@/services/APIService';

interface User {
  id: string;
  name: string;
  email: string;
  isVendor: boolean;
  avatar?: string;
  token?: string; // JWT token
}

// Define response data types for API calls
interface AuthResponse {
  id: string;
  name: string;
  email: string;
  isVendor: boolean;
  avatar?: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string, isVendor: boolean) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signIn: async () => false,
  signUp: async () => false,
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('afroconnect-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // In production, make a real API call
      const response = await APIService.post<AuthResponse>('/api/auth/signin', { email, password });

      if (response.success && response.data) {
        // Type assertion to ensure TypeScript knows the data structure
        const authData = response.data as AuthResponse;

        // Store the user with the JWT token
        const authenticatedUser: User = {
          id: authData.id,
          name: authData.name,
          email: authData.email,
          isVendor: authData.isVendor,
          avatar: authData.avatar,
          token: authData.token // Save the JWT token
        };

        setUser(authenticatedUser);
        localStorage.setItem('afroconnect-user', JSON.stringify(authenticatedUser));

        toast({
          title: "Sign in successful",
          description: `Welcome back, ${authenticatedUser.name}!`,
        });

        return true;
      }

      toast({
        title: "Sign in failed",
        description: response.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });

      return false;
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    isVendor: boolean
  ): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Validate input before making API call
      if (!name.trim()) {
        toast({
          title: "Sign up failed",
          description: "Please enter your name.",
          variant: "destructive",
        });
        return false;
      }

      if (!email.trim() || !email.includes('@')) {
        toast({
          title: "Sign up failed",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return false;
      }

      if (password.length < 6) {
        toast({
          title: "Sign up failed",
          description: "Password must be at least 6 characters long.",
          variant: "destructive",
        });
        return false;
      }

      // In production, make a real API call
      const response = await APIService.post<AuthResponse>('/api/auth/signup', {
        name,
        email,
        password,
        isVendor
      });

      if (response.success && response.data) {
        // Type assertion to ensure TypeScript knows the data structure
        const authData = response.data as AuthResponse;

        // Store the user with the JWT token
        const newUser: User = {
          id: authData.id,
          name: authData.name,
          email: authData.email,
          isVendor: authData.isVendor,
          avatar: authData.avatar,
          token: authData.token // Save the JWT token
        };

        setUser(newUser);
        localStorage.setItem('afroconnect-user', JSON.stringify(newUser));

        toast({
          title: "Sign up successful",
          description: `Welcome to AfroConnect, ${name}!`,
        });

        return true;
      }

      // Handle specific error messages from the API
      let errorMessage = "Registration failed. Please try again.";

      if (response.message) {
        // Check for common error scenarios
        if (response.message.toLowerCase().includes('email') && response.message.toLowerCase().includes('exist')) {
          errorMessage = "This email is already registered. Please use a different email or sign in.";
        } else if (response.message.toLowerCase().includes('password')) {
          errorMessage = "Password doesn't meet requirements. Please use a stronger password.";
        } else {
          errorMessage = response.message;
        }
      }

      toast({
        title: "Sign up failed",
        description: errorMessage,
        variant: "destructive",
      });

      return false;
    } catch (error) {
      console.error("Sign up error:", error);

      // Extract more detailed error information
      let errorMessage = "There was a problem creating your account. Please try again.";

      if (error instanceof Error) {
        console.error("Error details:", {
          name: error.name,
          message: error.message,
          stack: error.stack
        });

        // Check for network errors
        if (error.name === 'TypeError' && error.message.includes('NetworkError')) {
          errorMessage = "Network error. Please check your internet connection and try again.";
        } else if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
          errorMessage = "Unable to connect to the server. Please try again later.";
        } else {
          errorMessage = `Error: ${error.name} - ${error.message}`;
        }
      }

      // Show the error message to the user
      toast({
        title: "Sign up failed",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    // In a production app, you might want to invalidate the token on the server
    APIService.post('/api/auth/signout').catch(err => {
      console.error('Error signing out:', err);
    });

    setUser(null);
    localStorage.removeItem('afroconnect-user');
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
