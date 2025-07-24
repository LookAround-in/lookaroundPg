"use client";
import { useToast } from "@/hooks/use-toast";
import React, { ReactNode, useEffect } from "react";
import { authClient } from "lib/auth-client";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session, error } = authClient.useSession();

  useEffect(() => {
    if (session) {
      toast({
        title: "Authentication done",
        description: "You are now logged in.",
        variant: "default",
      });
      router.push("/profile");
    }
  }, [session, toast, router]);

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

  return <div>{children}</div>;
};

export default AuthLayout;
