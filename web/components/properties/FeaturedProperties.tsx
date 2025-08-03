"use client";
import React from "react";
import { PropertyApiResponse } from "@/interfaces/property";
import { useQuery } from "@tanstack/react-query";
import { PropertyCard } from "./PropertyCard";
import PropertySkeleton from "./PropertySkeleton";
import Link from "next/link";
import { Button } from "components/ui/button";

const fetchFeaturedProperties = async (): Promise<PropertyApiResponse> => {
  const response = await fetch(`/api/v1/pg/getFeaturedPg`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch featured properties");
  }

  return response.json();
};

export default function Featured() {
  const featuredPropertiesData = useQuery({
    queryKey: ["featuredProperties"],
    queryFn: fetchFeaturedProperties,
  });
  const featuredProperties = featuredPropertiesData.data?.data || [];

  return (
    <>
      {/* Featured Properties Section - Enhanced Mobile Scrolling */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-charcoa mb-2">
                Featured Properties
              </h2>
              <p className="text-gray-600">
                Handpicked accommodations with excellent ratings
              </p>
            </div>
            <Link href="/explore">
              <Button variant="outline" className="">
                View All
              </Button>
            </Link>
          </div>

          {/* Loading State */}
          {(featuredPropertiesData.isLoading ||
            featuredPropertiesData.isPending) && (
            <>
              {/* Mobile Horizontal Scroll Skeleton */}
              <div className="md:hidden">
                <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={`mobile-skeleton-${index}`}
                      className="flex-shrink-0 w-80"
                    >
                      <PropertySkeleton />
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Grid Skeleton */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <PropertySkeleton key={`desktop-skeleton-${index}`} />
                ))}
              </div>
            </>
          )}

          {/* Error State */}
          {featuredPropertiesData.isError && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4 text-red-600">
                  Error loading properties
                </h1>
                <p className="text-gray-600 mb-4">
                  {(featuredPropertiesData.error as Error)?.message ||
                    "Failed to load property details"}
                </p>
                <div className="space-x-4">
                  <Button onClick={() => featuredPropertiesData.refetch()}>
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {!featuredPropertiesData.isLoading &&
            !featuredPropertiesData.isPending &&
            !featuredPropertiesData.isError && (
              <>
                {/* Mobile Horizontal Scroll */}
                <div className="md:hidden">
                  <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                    {featuredProperties.map((property, index) => (
                      <div
                        key={property.id}
                        className="flex-shrink-0 w-80 animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <PropertyCard property={property} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProperties.map((property, index) => (
                    <div
                      key={property.id}
                      className="animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <PropertyCard property={property} />
                    </div>
                  ))}
                </div>
              </>
            )}
        </div>
      </section>
    </>
  );
}
