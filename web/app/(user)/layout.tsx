"use client";
import React, { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";

const UserLayout = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="text-center">
          <Loader className="animate-spin sm:h-24 sm:w-24 h-16 w-16 text-primary" />
          <p className="text-gray-900 font-thin text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Render protected content
  return <div>{children}</div>;
};

export default UserLayout;
