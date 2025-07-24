"use client";
import React, { ReactNode, useEffect } from "react";
import { authClient } from "lib/auth-client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  // Handle authentication redirect and toast in useEffect
  useEffect(() => {
    if (!isPending && !session && !error) {
      toast({
        title: "Authentication required",
        description: "Please login to access this page.",
        variant: "destructive",
      });
      router.push("/login");
    }
  }, [session, isPending, error, toast, router]);

  // Handle error state
  useEffect(() => {
    if (error) {
      toast({
        title: "Authentication error",
        description:
          "There was an error with your session. Please try logging in again.",
        variant: "destructive",
      });
      router.push("/login");
    }
  }, [error, toast, router]);

  // Render children only if authenticated
  return <div>{children}</div>;
};

export default AuthLayout;
