"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "components/ui/button";
import {
  ArrowLeft,
  Eye,
} from "lucide-react";
import { useWishlist } from "contexts/WishlistContext";
import { useToast } from "hooks/use-toast";
import { Property, PropertyApiResponse } from "@/interfaces/property";
import {
  useQuery,
} from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import dynamic from "next/dynamic";
const VirtualTour = dynamic(() => import("./virtual-tour"), { ssr: false });
const Sidebar = dynamic(() => import("./sidebar"), { ssr: false });
const TermsDialog = dynamic(() => import("./terms-dialog"), { ssr: false });
import Header from "./header";

const fetchPropertyById = async (
  propertyId: string
): Promise<PropertyApiResponse> => {
  if (!propertyId) {
    throw new Error("Pg Id is required");
  }
  const response = await fetch(`/api/v1/pg/getPgById/${propertyId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
interface PropertyDetailsProps {
  propertyId: string;
  initialData?: PropertyApiResponse | null;
  error?: string | null;
}

const PropertyDetails = ({propertyId, initialData, error}: PropertyDetailsProps) => {
  const router = useRouter();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const [showHostInfo, setShowHostInfo] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showVirtualTourModal, setShowVirtualTourModal] = useState(false);//KEEP IT HIGH LEVE
  const { user } = useAuth();

  const { data, refetch, isLoading, isPending, isError, error: queryError } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => fetchPropertyById(propertyId),
    initialData: initialData, // Use server data initially
    enabled: !!propertyId && !error, // Only fetch if no initial data
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: false, // Don't refetch on mount since we have server data
    refetchOnWindowFocus: false,
  });

  const property: Property = useMemo(() => {
    if (isLoading || isPending) {
      return null;
    }
    if (isError || !data.data) {
      console.error("Error fetching property:");
      return null;
    }
    // If data.data is an array, pick the first item; otherwise, use as is
    const response = Array.isArray(data.data) ? data.data[0] : data.data;
    return response;
  }, [data, isLoading, isPending, isError]);

  // Show not found state when data is loaded but property is null
  if (error || isError || !property) {
    const errorMessage = error || (queryError as Error)?.message || "Property not found";
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">🏠</div>
          <h1 className="text-2xl font-bold mb-2 text-gray-900">
            {error?.includes("Failed to load") || isError ? "Connection Error" : "Property Not Found"}
          </h1>
          <p className="text-gray-600 mb-6">
            {error?.includes("Failed to load") || isError 
              ? "Unable to connect to the server. Please check your connection and try again."
              : "The property you're looking for doesn't exist or has been removed."
            }
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => router.push("/explore")}
              className="w-full bg-gradient-cool text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Explore
            </Button>
            {(error?.includes("Failed to load") || isError) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  if (refetch) {
                    refetch();
                  } else {
                    window.location.reload();
                  }
                }}
                className="w-full"
              >
                Try Again
              </Button>
            )}
          </div>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-gray-500">
                Debug Info
              </summary>
              <pre className="text-xs text-gray-400 mt-2 overflow-auto">
                {JSON.stringify({ error, isError, queryError, propertyId }, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    );
  }
  const isInWishlist = wishlist.includes(property.id || "");
  const handleWishlistToggle = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to add properties to your wishlist.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }
    if (isInWishlist) {
      removeFromWishlist(property.id);
      toast({
        title: "Removed from wishlist",
        description: "Property has been removed from your wishlist.",
      });
    } else {
      addToWishlist(property.id);
      toast({
        title: "Added to wishlist",
        description: "Property has been added to your wishlist.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-light-gray transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button and Virtual Tour button for mobile */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" className="shadow-lg" onClick={() => router.push("/explore")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          {property.virtualTourUrl && (
            <Button
              onClick={() => setShowVirtualTourModal(true)}
              className="md:hidden bg-gradient-cool text-white shadow-lg"
              size="sm"
            >
              <Eye className="h-4 w-4 mr-2" />
              360° Tour
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Header */}
          <Header
            property={property}
            isInWishlist={isInWishlist}
            handleWishlistToggle={handleWishlistToggle}
            refetch={refetch}
          />
          {/* Sidebar */}
          <Sidebar 
            property={property}
            showHostInfo={showHostInfo}
            setShowHostInfo={setShowHostInfo}
            setShowTermsDialog={setShowTermsDialog}
            handleWishlistToggle={handleWishlistToggle}
            isInWishlist={isInWishlist}
            setShowVirtualTourModal={setShowVirtualTourModal}
          />
        </div>

        {/* Terms and Conditions Dialog */}
        <TermsDialog
          property={{ hostId: property.hostId, id: property.id }}
          showTermsDialog={showTermsDialog}
          setShowTermsDialog={setShowTermsDialog}
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}
          setShowHostInfo={setShowHostInfo}
        />

        {/* Virtual Tour Modal */}
        <VirtualTour
          property={{ title: property.title, virtualTourUrl: property.virtualTourUrl }}
          showVirtualTourModal={showVirtualTourModal}
          setShowVirtualTourModal={setShowVirtualTourModal}
        />
      </div>
    </div>
  );
};

export default PropertyDetails;
