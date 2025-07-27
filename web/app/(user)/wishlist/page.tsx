"use client";
import React from "react";
import Link from "next/link";
import { Button } from "components/ui/button";
import { PropertyCard } from "components/properties/PropertyCard";
import { Heart, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import PropertySkeleton from "@/components/properties/PropertySkeleton";
import { useAuth } from "@/contexts/AuthContext";

const getWishListItems = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required to fetch wishlist");
  }
  const response = await fetch(
    `/api/v1/wishList/getWishListByUserId/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch wishlist");
  }
  return response.json();
};

const Wishlist = () => {
  const {user} = useAuth()

  const {
    data: wishListData,
    isLoading,
    isPending,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: () => getWishListItems(user?.id || ""),
    enabled: !!user?.id,
  });
  const wishlistProperties = wishListData?.data || [];

  return (
    <div className="min-h-screen bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-charcoal mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            {wishlistProperties.length} saved properties
          </p>
        </div>
        {/* Error loading data */}
        {isError && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4 text-red-600">
                Error loading properties
              </h1>
              <p className="text-gray-600 mb-4">
                {(wishlistProperties.error as Error)?.message ||
                  "Failed to load property details"}
              </p>
              <div className="space-x-4">
                <Button onClick={() => refetch()}>Try Again</Button>
              </div>
            </div>
          </div>
        )}
        {/* Skeleton Cards for better UX while data is still loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(isLoading || isPending) &&
            // Show skeleton cards
            Array.from({ length: 6 }).map((_, index) => (
              <PropertySkeleton key={`skeleton-${index}`} />
            ))}
        </div>

        {/* Content */}
        {!isLoading &&
        !isPending &&
        !isError &&
        wishlistProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProperties.map((property, index) => (
              <div
                key={property.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PropertyCard property={property.pgData} />
              </div>
            ))}
          </div>
        ) : (
          !isLoading &&
          !isError && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Start adding properties you like to see them here
              </p>
              <Link href="/explore">
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Explore Properties
                </Button>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Wishlist;
