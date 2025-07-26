import { useToast } from '@/hooks/use-toast';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => Promise<void>;
  isLoading: boolean;
  isInitialized: boolean;
  error?: unknown;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, isPending, error } = authClient.useSession();
  
  const user = session?.user || null;
  const isLoading = isPending;
  const isInitialized = !isPending; // Initialized when not pending

  useEffect(() => {
    if (isInitialized && !isLoading) {
      const currentPath = window.location.pathname;
      
      // If user just logged in and we're on auth pages, redirect to profile
      if (user && (currentPath === '/login' || currentPath === '/register')) {
        router.replace('/profile');
      }
    }
  }, [user, isInitialized, isLoading, router]);

  const logout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast({
              title: "Logged out",
              description: "You have been successfully logged out.",
            });
            router.replace("/");
          },
          onError: (error) => {
            console.error("Logout error:", error);
            toast({
              title: "Logout Error",
              description: "There was an issue logging out. Please try again.",
              variant: "destructive"
            });
            router.replace("/");
          }
        }
      });
    } catch (error) {
      console.error("Logout error:", error);
      router.replace("/");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      logout, 
      isLoading, 
      isInitialized,
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
