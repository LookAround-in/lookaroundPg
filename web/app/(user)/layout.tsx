"use client";
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const UserLayout = ({ children }: { children: ReactNode }) => {

  const router = useRouter();

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch //refetch the session
  } = authClient.useSession();

  console.log(session?.user);

  // Handle redirect in useEffect to avoid rendering issues
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (error) return <div>Error: {error.message}</div>;
  if (isPending) return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray">
      <div className="text-center">
        <img src="/logo.png" alt="Loading" className="animate-spin sm:h-24 sm:w-24 h-16 w-16 animate-bounce" />
        <p className="text-gray-900 font-thin text-lg">Loading...</p>
      </div>
    </div>
  );

  // Don't render children if user is authenticated (redirect in progress)
  if (!session?.user) {
    return <div>Redirecting...</div>;
  }

  // Render protected content
  return <div>{children}</div>;
};

export default UserLayout;
