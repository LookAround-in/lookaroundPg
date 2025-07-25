"use client";
import { Toaster } from "components/ui/toaster";
import { Toaster as Sonner } from "components/ui/sonner";
import { TooltipProvider } from "components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WishlistProvider } from "contexts/WishlistContext";
import { PropertyProvider } from "../contexts/PropertyContext";
import { Navbar } from "components/layout/Navbar";
import { Footer } from "components/layout/Footer";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
            <WishlistProvider>
              <PropertyProvider>
                <Navbar />
                {children}
                <Footer />
              </PropertyProvider>
            </WishlistProvider>
        </TooltipProvider>
      </QueryClientProvider>
  );
}