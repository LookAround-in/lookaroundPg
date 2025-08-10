"use client";
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const AdminLayout = ({ children }: { children: ReactNode }) => {
 const router = useRouter();
 
   const {
     data: session,
     isPending, //loading state
     error, //error object
     refetch //refetch the session
   } = authClient.useSession();
 
 
//    // Handle redirect in useEffect to avoid rendering issues
  //  useEffect(() => {
  //    if (!isPending && session?.user.role !== "admin") {
  //      router.push("/");
  //    }
  //  }, [session, isPending, router]);
 
   if (error) return <div>Error: {error.message}</div>;
   if (isPending) return (
     <div className="min-h-screen flex items-center justify-center bg-light-gray">
       <div className="text-center">
         <img src="/logo.png" alt="Loading" className="animate-spin sm:h-24 sm:w-24 h-16 w-16 animate-bounce" />
         <p className="text-gray-900 font-thin text-lg">Loading...</p>
       </div>
     </div>
   );
 
//    // Don't render children if user is authenticated (redirect in progress)
  //  if (session?.user.role !== "admin") {
  //    return <div>Redirecting...</div>;
  //  }

  return <div>{children}</div>;
};

export default AdminLayout;

