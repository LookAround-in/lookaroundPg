"use client";
import React from "react";
import { ExploreApiResponse } from "@/interfaces/property";
import { useQuery } from "@tanstack/react-query";
import { PropertyCard } from "./PropertyCard";
import PropertySkeleton from "./PropertySkeleton";
import Link from "next/link";
import { Button } from "components/ui/button";

const fetchTrendingProperties = async (): Promise<ExploreApiResponse> => {
  const response = await fetch("/api/v1/pg/getTrendingPg", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trending properties");
  }

  return response.json();
};

export default function Trending() {
  const trendingPropertiesData = useQuery({
    queryKey: ["trendingProperties"],
    queryFn: fetchTrendingProperties,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  const trendingProperties = trendingPropertiesData.data?.data || [];

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-charcoa mb-2">
                Trending Now
              </h2>
              <p className="text-gray-600">
                Popular properties that are booking fast
              </p>
            </div>
            <Link href="/explore">
              <Button variant="outline" className="">
                Explore More
              </Button>
            </Link>
          </div>

          {/* Loading State */}
          {(trendingPropertiesData.isLoading ||
            trendingPropertiesData.isPending) && (
            <>
              {/* Mobile Horizontal Scroll Skeleton */}
              <div className="md:hidden">
                <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={`mobile-trending-skeleton-${index}`}
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
                  <PropertySkeleton
                    key={`desktop-trending-skeleton-${index}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Error State */}
          {trendingPropertiesData.isError && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4 text-red-600">
                  Error loading properties
                </h1>
                <p className="text-gray-600 mb-4">
                  {(trendingPropertiesData.error as Error)?.message ||
                    "Failed to load property details"}
                </p>
                <div className="space-x-4">
                  <Button onClick={() => trendingPropertiesData.refetch()}>
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {!trendingPropertiesData.isLoading &&
            !trendingPropertiesData.isPending &&
            !trendingPropertiesData.isError && (
              <>
                {/* Mobile Horizontal Scroll */}
                <div className="md:hidden">
                  <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                    {trendingProperties.map((property, index) => (
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
                  {trendingProperties.map((property, index) => (
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
