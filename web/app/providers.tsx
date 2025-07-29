"use client";
import React from "react";
import { Toaster } from "components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster as Sonner } from "components/ui/sonner";
import { TooltipProvider } from "components/ui/tooltip";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { WishlistProvider } from "contexts/WishlistContext";
import { PropertyProvider } from "../contexts/PropertyContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 0,
        refetchOnMount: true,
      },
    },
  }));
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <WishlistProvider>
            <PropertyProvider>
              {children}
            </PropertyProvider>
          </WishlistProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
