"use client";
import React from "react";
import Image from "next/image";
import { PropertyCard } from "components/properties/PropertyCard";
import { Button } from "components/ui/button";
import { Badge } from "components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { Progress } from "components/ui/progress";
import {
  ArrowLeft,
  User,
  Star,
  Phone,
  Mail,
  MapPin,
  Home,
  Calendar,
  TrendingUp,
  Users,
  Shield,
  Award,
  MessageSquareDot,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { PropertyApiResponse } from "@/interfaces/property";
import { useQuery } from "@tanstack/react-query";
import PropertySkeleton from "@/components/properties/PropertySkeleton";
import { formatRating } from "@/utils/format";

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

const fetchHostPropertyReviews = async (hostId: string) => {
  const response = await fetch(`/api/v1/reviews/getAllReviews/${hostId}`, {
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

const HostProperties = () => {
  const { hostId } = useParams();
  const router = useRouter();

  const hostPropertiesData = useQuery({
    queryKey: ["hostProperties", hostId],
    queryFn: () => fetchHostProperties(hostId as string),
    enabled: !!hostId,
  });

  const hostProperties = hostPropertiesData.data?.data || [];

  const hostPropertyReviewsData = useQuery({
    queryKey: ["hostPropertyReviews", hostId],
    queryFn: () => fetchHostPropertyReviews(hostId as string),
    enabled: !!hostId,
  });

  const reviews = hostPropertyReviewsData.data?.data || [];

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
          {/* Main Profile Card */}
          <Card className="lg:col-span-2 gradient-border">
            <CardContent className="p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-6">
                {/* Host Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-cool rounded-full flex items-center justify-center flex-shrink-0 p-1">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                      {hostProperties.length > 0 &&
                      hostProperties[0].Host.user ? (
                        <Image
                          placeholder="blur"
                          blurDataURL="/blurImg.png"
                          src={
                            hostProperties[0].Host.user.image ||
                            `https://ui-avatars.com/api/?name=${hostProperties[0].Host.user.name}&background=random&color=fff`
                          }
                          alt={hostProperties[0].Host.user.name}
                          width={32}
                          height={32}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-10 w-10 text-gradient-cool" />
                      )}
                    </div>
                  </div>
                  {isHostVerified && (
                    <Badge className="absolute -bottom-2 -right-2 bg-green-500 text-white border-2 border-white">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                  )}
                </div>

                {/* Host Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-charcoal mb-2 tracking-tight">
                        {hostPropertiesData.isLoading ||
                        hostPropertiesData.isPending ? (
                          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
                        ) : hostProperties.length > 0 ? (
                          hostProperties[0].Host.user.name
                        ) : (
                          "Unknown Host"
                        )}
                      </h1>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge
                          variant="outline"
                          className="border-gray-600 bg-gradient-cool text-white font-medium"
                        >
                          <Award className="h-3 w-3 mr-1" />
                          Superhost
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-gray-600 text-gray-900"
                        >
                          Property Host
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-1" />
                          <span className="font-medium">
                            {hostStats.totalProperties} Properties
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>Bangalore, Karnataka</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{hostStats.yearsHosting} years hosting</span>
                        </div>
                      </div>
                    </div>

                    {!hostPropertiesData.isLoading &&
                      !hostPropertiesData.isPending &&
                      hostProperties.length > 0 && (
                        <div className="flex items-center space-x-2 mt-4 sm:mt-0 bg-yellow-50 px-3 py-2 rounded-lg">
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="text-lg font-bold">
                            {formatRating(hostStats.averageRating)}
                          </span>
                          <span className="text-gray-600 text-sm">
                            ({hostStats.totalReviews} reviews)
                          </span>
                        </div>
                      )}
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <a href={`tel:${hostProperties[0]?.Host.contactNumber}`}>
                      <Button className="bg-gradient-cool text-white hover:opacity-90 font-medium">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Host
                      </Button>
                    </a>
                    <a href={`mailto:${hostProperties[0]?.Host?.user?.email}`}>
                      <Button variant="outline" className="font-medium">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </a>
                    <a
                      href={`https://wa.me/${hostProperties[0]?.Host?.contactNumber.replace(
                        /\D/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-green-500 text-white hover:bg-green-600 border-green-500 font-medium">
                        <MessageSquareDot className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gradient-cool flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Host Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Response Rate
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    {hostStats.responseRate}%
                  </span>
                </div>
                <Progress value={hostStats.responseRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Occupancy Rate
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {hostStats.occupancyRate}%
                  </span>
                </div>
                <Progress value={hostStats.occupancyRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Repeat Guests
                  </span>
                  <span className="text-sm font-bold text-purple-600">
                    {hostStats.repeatGuests}%
                  </span>
                </div>
                <Progress value={hostStats.repeatGuests} className="h-2" />
              </div>
              <div className="pt-2 border-t :border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Response Time
                  </span>
                  <span className="text-sm font-bold text-gradient-cool">
                    {hostStats.responseTime}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
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

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {/* Skeleton Cards for better UX while data is still loading */}
              {(hostPropertiesData.isLoading || hostPropertiesData.isPending) &&
                // Show skeleton cards
                Array.from({ length: 6 }).map((_, index) => (
                  <PropertySkeleton key={`skeleton-${index}`} />
                ))}
              {/* Error State */}
              {hostPropertiesData.isError && (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4 text-red-600">
                      Error loading properties
                    </h1>
                    <p className="text-gray-600 mb-4">
                      {(hostPropertiesData.error as Error)?.message ||
                        "Failed to load property details"}
                    </p>
                    <div className="space-x-4">
                      <Button onClick={() => hostPropertiesData.refetch()}>
                        Try Again
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {!hostPropertiesData.isLoading &&
                !hostPropertiesData.isPending &&
                !hostPropertiesData.isError &&
                hostProperties &&
                hostProperties.map((property, index) => (
                  <div
                    key={property.id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <PropertyCard property={property} className="h-full" />
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h3 className="text-xl font-bold text-charcoal mb-4">
                  User Reviews for Properties
                </h3>
                {reviews.length > 0 ? (reviews.map((review, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 last:border-b-0 p-6 shadow-md rounded-lg mb-2 last:mb-0"
                  >
                    <div className="flex flex-row items-center justify-between mb-2">
                      <p className="text-gray-900 text-xl">{review?.pgData?.title}</p>
                      <Button variant="link">
                        <a href={`/property/${review?.pgData?.id}`}>View Details</a>
                      </Button>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Image
                        placeholder="blur"
                        blurDataURL="/blurImg.png"
                        src={
                          review.user.image ||
                          `https://ui-avatars.com/api/?name=${review.user.name}&background=random`
                        }
                        alt={review.user.name}
                        width={32}
                        height={32}
                        className="w-10 h-10 rounded-full bg-gray-200"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{review.user.name}</h4>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))): (
                  <div className="text-center py-12">
                    <p className="text-gray-600">
                      No reviews available for this host yet.
                    </p>
                  </div>
                )}
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
                <div className="prose max-w-none">
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
