"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";

const UserLayout = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { user, isLoading, error, isInitialized } = useAuth();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (isInitialized && !user && !isLoading && !error) {
      toast({
        title: "Authentication required",
        description: "Please login to access this page.",
        variant: "destructive",
      });
      router.replace("/login");
    }
  }, [user, isLoading, error, isInitialized, toast, router]);

  // Handle authentication errors
  useEffect(() => {
    if (error && isInitialized) {
      toast({
        title: "Authentication error",
        description:
          "There was an error with your session. Please try logging in again.",
        variant: "destructive",
      });
      router.replace("/login");
    }
  }, [error, isInitialized, toast, router]);

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

  // Don't render if no user (will redirect)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="text-center">
          <Loader className="animate-spin sm:h-24 sm:w-24 h-16 w-16 text-primary" />
          <p className="text-gray-900 font-thin text-lg">Redirecting to Login...</p>
        </div>
      </div>
    );
  }

  // Render protected content
  return <div>{children}</div>;
};

export default UserLayout;
