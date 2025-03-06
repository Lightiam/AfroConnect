
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
      const response = await APIService.post('/api/auth/signin', { email, password });
      
      if (response.success && response.data) {
        // Store the user with the JWT token
        const authenticatedUser: User = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          isVendor: response.data.isVendor,
          avatar: response.data.avatar,
          token: response.data.token // Save the JWT token
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
      
      // In production, make a real API call
      const response = await APIService.post('/api/auth/signup', {
        name,
        email,
        password,
        isVendor
      });
      
      if (response.success && response.data) {
        // Store the user with the JWT token
        const newUser: User = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          isVendor: response.data.isVendor,
          avatar: response.data.avatar,
          token: response.data.token // Save the JWT token
        };
        
        setUser(newUser);
        localStorage.setItem('afroconnect-user', JSON.stringify(newUser));
        
        toast({
          title: "Sign up successful",
          description: `Welcome to AfroConnect, ${name}!`,
        });
        
        return true;
      }
      
      toast({
        title: "Sign up failed",
        description: response.message || "Registration failed. Please try again.",
        variant: "destructive",
      });
      
      return false;
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "An error occurred. Please try again.",
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
