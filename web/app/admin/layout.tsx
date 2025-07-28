"use client";
import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  console.log(user);

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

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin" && user.role !== "super_admin") {
    console.log("User role:", user.role);
    redirect("/");
  }

  return <div>{children}</div>;
};

export default AdminLayout;
