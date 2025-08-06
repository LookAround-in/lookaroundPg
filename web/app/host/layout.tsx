"use client";
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { UserRole } from "@/interfaces/session";

const HostLayout = ({ children }: { children: ReactNode }) => {
  const { isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/login");
        return;
      }

      if (user.role !== "host") {
        router.replace("/");
        return;
      }
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="text-center">
          <img
            src="/logo.png"
            alt="Loading"
            className="animate-spin sm:h-24 sm:w-24 h-16 w-16 animate-bounce"
          />
          <p className="text-gray-900 font-thin text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== UserRole.host) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="text-center">
          <img
            src="/logo.png"
            alt="Redirecting"
            className="animate-spin sm:h-24 sm:w-24 h-16 w-16 animate-bounce"
          />
          <p className="text-gray-900 font-thin text-lg">Checking permissions...</p>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default HostLayout;