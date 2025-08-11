"use client";
import React from "react";
import { Toaster } from "components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster as Sonner } from "components/ui/sonner";
import { TooltipProvider } from "components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { WishlistProvider } from "contexts/WishlistContext";
import { Analytics } from "@vercel/analytics/next"
import { getQueryClient } from "@/lib/get-query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <WishlistProvider>
              {children}
          </WishlistProvider>
        </AuthProvider>
      </TooltipProvider>
      <Analytics />
    </QueryClientProvider>
  );
}
