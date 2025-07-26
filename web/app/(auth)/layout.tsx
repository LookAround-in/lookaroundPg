"use client";
import { useToast } from "@/hooks/use-toast";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { user, isLoading, isInitialized, error } = useAuth(); // Added error from AuthContext

  // Redirect authenticated users away from auth pages
  useEffect(() => {
    if (isInitialized && user && !isLoading && !error) {
      toast({
        title: "Already authenticated",
        description: "You are already logged in.",
        variant: "default",
      });
      router.replace("/profile");
    }
  }, [user, isLoading, isInitialized, toast, router, error]);

  // Handle error state - show error but don't redirect (we're already on auth page)
  useEffect(() => {
    if (error && isInitialized) {
      toast({
        title: "Authentication error",
        description:
          "There was an error with your session. Please try logging in again.",
        variant: "destructive",
      });
    }
  }, [error, isInitialized, toast]);

  // Show loading while checking authentication
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="text-center">
          <Loader className="animate-spin sm:h-24 sm:w-24 h-16 w-16 text-primary" />
          <p className="text-gray-900 font-thin text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show redirecting message if user is authenticated
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="text-center">
          <Loader className="animate-spin sm:h-24 sm:w-24 h-16 w-16 text-primary" />
          <p className="text-gray-900 font-thin text-lg">Redirecting to Profile...</p>
        </div>
      </div>
    );
  }

  // Render auth pages for unauthenticated users
  return <div>{children}</div>;
};

export default AuthLayout;
