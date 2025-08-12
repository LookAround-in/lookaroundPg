"use client";
import React from "react";
import { Button } from "components/ui/button";
import { Badge } from "components/ui/badge";
import { Card, CardContent } from "components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import {
  ArrowLeft,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PropertyApiResponse } from "@/interfaces/property";
import { useQuery } from "@tanstack/react-query";
import HostStats from "./host-stats";
import dynamic from "next/dynamic";

const PropertyList = dynamic(() => import("@/components/explore/property-list"), {
  loading: () => <div>Loading properties...</div>,
  ssr: false,
});
const HostPropertyReviews = dynamic(() => import("./reviews-list"), {
  loading: () => <div>Loading reviews...</div>,
  ssr: false,
});

const fetchHostProperties = async (
  hostId: string
): Promise<PropertyApiResponse> => {
  const response = await fetch(`/api/v1/pg/getPgByhostId/${hostId}`, {
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

interface HostPropertiesProps {
  hostId: string;
  initialData?: PropertyApiResponse | null;
  error?: string | null;
}

const HostProperties = ({ hostId, initialData, error }: HostPropertiesProps) => {
  const router = useRouter();
  const hostPropertiesData = useQuery({
    queryKey: ["hostProperties", hostId],
    queryFn: () => fetchHostProperties(hostId as string),
    initialData: initialData, // Use server data initially
    enabled: !initialData || !!hostId, // Only fetch if no initial data or when hostId changes
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: false, // Don't refetch on mount since we have server data
    refetchOnWindowFocus: false,
  });

  const hostProperties = hostPropertiesData.data?.data || [];

  if (
    !hostPropertiesData.isLoading &&
    !hostPropertiesData.isPending &&
    !hostPropertiesData.isError &&
    hostProperties.length === 0
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <Card className="text-center p-8">
          <CardContent>
            <div className="w-20 h-20 bg-gradient-cool-light rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <User className="h-10 w-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Host not found</h1>
            <p className="text-gray-600 mb-6">
              The host you're looking for doesn't exist or has been removed.
            </p>
            <Button
              onClick={() => router.push("/explore")}
              className="bg-gradient-cool text-white hover:opacity-90"
            >
              Explore Properties
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // find averageRating of Host using an average of all rated properties
  let totalRating = 0;
  let totalRatedProperties = 0;
  hostProperties.forEach((p) => {
    if (p.avgRating > 0) {
      totalRating += p.avgRating;
      totalRatedProperties++;
    }
  });
  const averageRating =
    totalRatedProperties > 0 ? totalRating / totalRatedProperties : 0;
  const totalReviews = hostProperties.reduce(
    (acc, p) => acc + (p.reviews?.length || 0),
    0
  );
  // By default becuase if array is empty it will return true
  let isHostVerified = false;
  if (hostProperties.length > 0){
    isHostVerified = hostProperties.every((p) => !!p.virtualTourUrl);
  }
  const hostStats = {
    totalProperties: hostProperties.length,
    averageRating: averageRating,
    totalReviews: totalReviews,
    responseRate: 98,
    responseTime: "2 hours",
    yearsHosting: 5,
    occupancyRate: 92,
    repeatGuests: 78,
    isHostVerified
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Back button */}
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Previous Page
        </Button>
        {/* Enhanced Host Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          <HostStats hostProperties={hostProperties} hostStats={hostStats}/>
        </div>

        {/* Enhanced Tabs Section */}
        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 lg:mb-8 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger
              value="properties"
              className="font-semibold data-[state=active]"
            >
              All Properties ({hostStats.totalProperties})
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="font-semibold data-[state=active]"
            >
              Reviews ({hostStats.totalReviews})
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="font-semibold data-[state=active]"
            >
              About Host
            </TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-charcoal mb-2 tracking-tight">
                  All Properties by{" "}
                  {hostProperties.length > 0
                    ? hostProperties[0].Host.user.name
                    : "Loading..."}
                </h2>
                <p className="text-gray-600 font-medium">
                  {hostProperties.length} properties available for booking
                </p>
              </div>
              <Badge
                variant="outline"
                className="text-gradient-cool border-2 font-semibold"
              >
                <Users className="h-4 w-4 mr-1" />
                Active Host
              </Badge>
            </div>
            <PropertyList filteredProperties={hostProperties} />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h3 className="text-xl font-bold text-charcoal mb-4">
                  User Reviews for Properties
                </h3>
                <HostPropertyReviews hostId={hostId} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h3 className="text-xl font-bold text-charcoal mb-4">
                  About{" "}
                  {hostProperties.length > 0
                    ? hostProperties[0].Host.user.name
                    : "Loading..."}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                    Welcome! I'm{" "}
                    {hostProperties.length > 0
                      ? hostProperties[0].Host.user.name
                      : "Loading..."}
                    , a dedicated property host with over{" "}
                    {hostStats.yearsHosting} years of experience in providing
                    comfortable and safe accommodations in Bangalore. I take
                    pride in maintaining high-quality properties and ensuring
                    all my guests have a pleasant stay.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    My properties are carefully selected and maintained to
                    provide the best living experience for students and working
                    professionals. I believe in creating a home-like environment
                    where guests can focus on their goals while enjoying
                    comfortable amenities.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-gradient-cool-light p-4 rounded-lg">
                      <h4 className="font-semibold text-gradient-cool mb-2">
                        Languages
                      </h4>
                      <p className="text-sm text-gray-600">
                        English, Hindi, Kannada
                      </p>
                    </div>
                    <div className="bg-gradient-cool-light p-4 rounded-lg">
                      <h4 className="font-semibold text-gradient-cool mb-2">
                        Response Time
                      </h4>
                      <p className="text-sm text-gray-600">
                        Usually within {hostStats.responseTime}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
      </div>
    </div>
  );
};

export default HostProperties;