'use client';
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  emailVerified?: boolean;
  image?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => Promise<void>;
  isLoading: boolean;
  error?: unknown;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, isPending, error } = authClient.useSession();

  const user = session?.user || null;
  const isLoading = isPending;

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
              variant: "destructive",
            });
            router.replace("/");
          },
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
      router.replace("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
