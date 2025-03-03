
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  isVendor: boolean;
  avatar?: string;
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
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock validation - in a real app, this would call an API
      if (email && password) {
        // For demo, we'll create a mock user based on the email
        const mockUser: User = {
          id: `user-${Math.random().toString(36).substring(2, 10)}`,
          name: email.split('@')[0],
          email,
          isVendor: email.includes('vendor'),
          avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
        };
        
        setUser(mockUser);
        localStorage.setItem('afroconnect-user', JSON.stringify(mockUser));
        
        toast({
          title: "Sign in successful",
          description: `Welcome back, ${mockUser.name}!`,
        });
        
        return true;
      }
      
      toast({
        title: "Sign in failed",
        description: "Invalid credentials. Please try again.",
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
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock validation - in a real app, this would call an API
      if (name && email && password) {
        // For demo, we'll create a user based on the provided info
        const newUser: User = {
          id: `user-${Math.random().toString(36).substring(2, 10)}`,
          name,
          email,
          isVendor,
          avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
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
        description: "Please fill all required fields.",
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
