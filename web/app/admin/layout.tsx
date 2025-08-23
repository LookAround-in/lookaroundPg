"use client";
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { UserRole } from "@/interfaces/session";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { isLoading, user } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   // Only run the check after loading is complete
  //   if (!isLoading) {
  //     // If no user is authenticated, redirect to login
  //     if (!user) {
  //       router.replace("/login");
  //       return;
  //     }

  //     // If user doesn't have admin or super_admin role, redirect to home
  //     if (user.role !== UserRole.admin && user.role !== UserRole.super_admin) {
  //       router.replace("/");
  //       return;
  //     }
  //   }
  // }, [isLoading, user, router]);

  // Show loading state while checking authentication
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

  // // Show loading state while redirecting (prevents flickering)
  // if (!user || (user.role !== UserRole.admin && user.role !== UserRole.super_admin)) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-light-gray">
  //       <div className="text-center">
  //         <img
  //           src="/logo.png"
  //           alt="Redirecting"
  //           className="animate-spin sm:h-24 sm:w-24 h-16 w-16 animate-bounce"
  //         />
  //         <p className="text-gray-900 font-thin text-lg">Checking permissions...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // Only render children if user is authenticated and has proper role
  return <div>{children}</div>;
};

export default AdminLayout;

