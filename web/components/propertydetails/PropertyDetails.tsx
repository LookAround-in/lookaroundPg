"use client";
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "components/ui/button";
import { Badge } from "components/ui/badge";
import { Card, CardContent } from "components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "components/ui/dialog";
import { Checkbox } from "components/ui/checkbox";
import {
  MapPin,
  Heart,
  User,
  Star,
  Phone,
  Mail,
  ArrowLeft,
  Eye,
  Calendar,
  Users,
  Home,
  Play,
  Loader2,
  Utensils,
  Sofa,
  Car,
  Train,
  ShoppingBag,
  Hospital,
  PencilRuler,
  PackagePlus,
  MessageSquareDot,
  User2
} from "lucide-react";
import { useWishlist } from "contexts/WishlistContext";
import { useToast } from "hooks/use-toast";
import Image from "next/image";
import { Property, PropertyApiResponse } from "@/interfaces/property";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import formatText, { formatRating } from "@/utils/format";
import { useAuth } from "@/contexts/AuthContext";
import { PgRequestData } from "@/interfaces/pg";
import Review from "../review/Review";
import ShareButton from "../share/Share";
import { motion } from "framer-motion"

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

const createPropertyRequest = async (pgRequest: PgRequestData) => {
  if (!pgRequest) {
    throw new Error("PG request data is required");
  }
  const response = await fetch("/api/v1/pgrequest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pgRequest),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create property request");
  }
  return response.json();
};

const PropertyDetails = ({ propertyId }: { propertyId: string }) => {
  const router = useRouter();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showHostInfo, setShowHostInfo] = useState(false);
  const [selectedSharingType, setSelectedSharingType] = useState<
    "SINGLE" | "DOUBLE" | "TRIPLE" | "QUAD"
  >("TRIPLE");
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showVirtualTourModal, setShowVirtualTourModal] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, refetch, isLoading, isPending, isError } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => fetchPropertyById(propertyId),
    enabled: !!propertyId,
  });

  const { mutate: createPropertyRequestMutation, isPending: pendingRequest } = useMutation({
    mutationFn: createPropertyRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pgRequests"] });
      setShowHostInfo(true);
      setShowTermsDialog(false);
      toast({
        title: "Contact information revealed",
        description: "You can now contact the host directly.",
      });
    },
    onError: (error: Error) => {
      console.error("Error creating property request:", error);
      toast({
        title: "Error revealing contact information",
        description:
          "There was an error revealing the host's contact information. Try again later.",
        variant: "destructive",
      });
    },
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

  const availableSharingTypes = useMemo(() => {
    if (
      !property ||
      !property.sharingTypes ||
      property.sharingTypes.length === 0
    ) {
      return ["SINGLE", "DOUBLE", "TRIPLE", "QUAD"];
    }
    return property.sharingTypes.map((st) => {
      const typeMap: Record<string, string> = {
        SINGLE: "single",
        DOUBLE: "double",
        TRIPLE: "triple",
        QUAD: "quad",
      };
      return typeMap[st.type] || st.type.toLowerCase();
    });
  }, [property]);

  const getCurrentSharingTypeData = useMemo(() => {
    if (!property?.sharingTypes || property.sharingTypes.length === 0) {
      return null;
    }

    const typeMap: Record<string, string> = {
      single: "SINGLE",
      double: "DOUBLE",
      triple: "TRIPLE",
      quad: "QUAD",
    };

    const targetType = typeMap[selectedSharingType];
    const sharingTypeData = property.sharingTypes.find(
      (st) => st.type === targetType
    );

    return sharingTypeData || property.sharingTypes[0];
  }, [property?.sharingTypes, selectedSharingType]);

  useEffect(() => {
    if (
      availableSharingTypes.length > 0 &&
      !availableSharingTypes.includes(selectedSharingType)
    ) {
      setSelectedSharingType(
        availableSharingTypes[0] as "SINGLE" | "DOUBLE" | "TRIPLE" | "QUAD"
      );
    }
  }, [availableSharingTypes, selectedSharingType]);
  const sharingTypeInAsc = [...availableSharingTypes].reverse();
  const propertyAddress = property?.description.split("@").pop()?.trim();
  const propertyDescription = property?.description.split("@")[0].trim();

  if (isLoading || isPending) {
    return (
      <div className="min-h-screen bg-light-gray transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Loading skeleton */}
          <div className="flex justify-between items-center mb-6">
            <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery Skeleton */}
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="aspect-[16/10] bg-gray-200 animate-pulse"></div>
              </div>

              {/* Property Info Skeleton */}
              <div className="bg-white rounded-lg p-6">
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg">
                    <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Additional skeleton cards */}
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              {/* Host Profile Skeleton */}
              <div className="bg-white rounded-lg p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="space-y-3">
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Show error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">
            Error loading property
          </h1>
          <p className="text-gray-600 mb-4">
            {isError ||
              "Failed to load property details"}
          </p>
          <div className="space-x-4">
            <Button onClick={() => refetch()}>Try Again</Button>
            <Button variant="outline" onClick={() => router.push("/explore")}>
              Back to Explore
            </Button>
          </div>
        </div>
      </div>
    );
  }
  // Show not found state when data is loaded but property is null
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <Button onClick={() => router.push("/explore")}>
            Back to Explore
          </Button>
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

  const handleRevealHostInfo = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to view host contact information.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }
    setShowTermsDialog(true);
  };

  const getGenderBadgeColor = (gender: string) => {
    switch (gender) {
      case "men":
        return "bg-blue-100 text-blue-800";
      case "women":
        return "bg-pink-100 text-pink-800";
      case "co-living":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeColor = (status: number) => {
    if (status < 0) return "bg-primary text-white";
    else if (status <= 5) return "bg-primary text-white";
    else if (status > 5) return "bg-primary text-white";
  };

  const handleTermsAcceptance = () => {
    if (!termsAccepted) {
      toast({
        title: "Terms acceptance required",
        description: "Please accept the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    createPropertyRequestMutation({
      hostId: property.hostId,
      userId: user?.id,
      pgId: property.id,
    });
  };

  return (
    <div className="min-h-screen bg-light-gray transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button and Virtual Tour button for mobile */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={() => router.back()}>
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden shadow-lg">
              <div className="relative aspect-[16/10]">
                <Image
                  placeholder="blur"
                  blurDataURL="/blurImg.png"
                  width={1920}
                  height={1080}
                  src={
                    property.images?.[currentImageIndex] || '/placeholder.svg'
                  }
                  alt={property.images?.[currentImageIndex] || 'Property image'}
                  className="w-full h-full object-cover"
                />

                {/* Virtual Tour Badge */}
                {property.virtualTourUrl && (
                  <Badge className="absolute top-3 left-3 bg-accent text-primary hover:text-white">
                    <Eye className="h-3 w-3 mr-1" />
                    360° Tour Available
                  </Badge>
                )}

                {/* Wishlist Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={`absolute top-4 right-4 p-2 h-10 w-10 bg-white/80 hover:bg-white wishlist-heart ${isInWishlist ? "active" : ""
                    }`}
                  onClick={handleWishlistToggle}
                >
                  <Heart
                    className={`h-5 w-5 ${isInWishlist ? "fill-current text-red-500" : ""
                      }`}
                  />
                </Button>
                <ShareButton isIcon={true} />

                {/* Image navigation */}
                {property.images && property.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={() =>
                        setCurrentImageIndex(
                          currentImageIndex === 0
                            ? property.images.length - 1
                            : currentImageIndex - 1
                        )
                      }
                    >
                      ←
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={() =>
                        setCurrentImageIndex(
                          currentImageIndex === property.images.length - 1
                            ? 0
                            : currentImageIndex + 1
                        )
                      }
                    >
                      →
                    </Button>

                    {/* Image dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {property.images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full ${index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/50"
                            }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Property Info */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Title and Location */}
                  <div>
                    <h1 className="text-3xl font-bold text-charcoal">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{propertyAddress}</span>
                    </div>
                  </div>

                  {/* Food and furnishing info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Utensils className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-800">
                          Food Included
                        </p>
                        <p className="text-sm text-gray-600">
                          {property.foodIncluded
                            ? "Yes, meals provided"
                            : "Not included"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Sofa className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-800">
                          Furnishing
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatText(property.furnishing)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sharing Type Selector - Add safety check */}
                  {availableSharingTypes.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">
                        Select Sharing Type
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {sharingTypeInAsc.map((type) => (
                          <Button
                            key={type}
                            variant={
                              selectedSharingType === type
                                ? "default"
                                : "outline"
                            }
                            onClick={() => {
                              setSelectedSharingType(
                                type as "SINGLE" | "DOUBLE" | "TRIPLE" | "QUAD"
                              );
                              setCurrentImageIndex(0);
                            }}
                            className={
                              selectedSharingType === type
                                ? "bg-gradient-cool text-white"
                                : ""
                            }
                          >
                            {type === "single"
                              ? "Single"
                              : type === "double"
                                ? "Double"
                                : type === "triple"
                                  ? "Triple"
                                  : "Quad"}{" "}
                            Sharing
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price and Status - Add safety check */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-primary">
                        ₹
                        {getCurrentSharingTypeData?.pricePerMonth?.toLocaleString() ||
                          "N/A"}
                      </span>
                      <span className="text-gray-600 ml-2">/month</span>
                    </div>
                    {property.sharingTypes &&
                      property.sharingTypes.length > 0 && (
                        <Badge
                          className={getStatusBadgeColor(
                            property.sharingTypes[0].availability
                          )}
                        >
                          {property.sharingTypes[0].availability > 5
                            ? "Available"
                            : property.sharingTypes[0].availability > 0
                              ? "Limited Availability"
                              : "Full"}
                        </Badge>
                      )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className={getGenderBadgeColor(property.propertyType)}
                    >
                      {property.propertyType === "COLIVE"
                        ? "Co-living"
                        : property.propertyType === "MEN"
                          ? "Men Only"
                          : "Women Only"}
                    </Badge>
                    {property.virtualTourUrl && (
                      <Badge variant="outline" className="">
                        Virtual Tour
                      </Badge>
                    )}

                  </div>

                  {/*Rating */}
                  {property.avgRating && (
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold">
                          {formatRating(property?.avgRating)}
                        </span>
                      </div>
                      {property?.reviews && (
                        <span className="text-gray-600">
                          ({property?.reviewCount} reviews)
                        </span>
                      )}
                    </div>
                  )}

                  {/* Quick Info Cards */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-3 bg-gradient-cool-light rounded-lg">
                      <Users className="h-6 w-6 mx-auto mb-2 text-gradient-cool" />
                      <p className="text-sm font-medium">Sharing Type</p>
                      <p className="text-xs text-gray-600 capitalize">
                        {selectedSharingType}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gradient-cool-light rounded-lg">
                      <Home className="h-6 w-6 mx-auto mb-2 text-gradient-cool" />
                      <p className="text-sm font-medium">Property Type</p>
                      <p className="text-xs text-gray-600">
                        {formatText(property.propertyType)}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gradient-cool-light rounded-lg">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-gradient-cool" />
                      <p className="text-sm font-medium">Move-in</p>
                      <p className="text-xs text-gray-600">
                        {formatText(property.moveInStatus)}
                      </p>
                    </div>
                  </div>

                  {/* Pricing Details with Refundable Deposit */}
                  {getCurrentSharingTypeData && (
                    <div className="mt-6 relative">
                      <div className={`mt-6 p-4 bg-gray-200 rounded-lg ${user ? 'blur-none' : 'blur-md'}`}>
                        <h3 className="text-lg font-semibold mb-3">
                          Pricing Details ({selectedSharingType} sharing)
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-700">Monthly Rent:</span>
                            <span className="font-medium">
                              ₹
                              {getCurrentSharingTypeData.pricePerMonth?.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700">
                              Security Deposit:
                            </span>
                            <span className="font-medium">
                              ₹
                              {getCurrentSharingTypeData.deposit?.toLocaleString()}
                            </span>
                          </div>
                          {getCurrentSharingTypeData.maintainanceCharges && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 ml-4">
                                - Maintenance:
                              </span>
                              <span className="text-red-600 font-medium">
                                - ₹
                                {getCurrentSharingTypeData.maintainanceCharges.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {getCurrentSharingTypeData.refundableAmount && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 ml-4">
                                - Refundable Amount:
                              </span>
                              <span className="text-green-600 font-medium">
                                + ₹
                                {getCurrentSharingTypeData.refundableAmount.toLocaleString()}
                              </span>
                            </div>
                          )}
                          <hr className="my-2" />
                          <div className="flex justify-between font-semibold text-md">
                            <span>Total Move-in Cost:</span>
                            <span className="text-primary">
                              ₹
                              {(
                                getCurrentSharingTypeData.pricePerMonth +
                                getCurrentSharingTypeData.deposit
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Overlay text when user is not logged in */}
                      {!user && (
                        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                          <p className="text-lg font-semibold text-gray-800 mb-2">
                            🔒 Please
                            <Link href="/login" className="text-primary hover:underline pl-1 pr-1">
                              login
                            </Link>
                            to see price details
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      About this place
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {propertyDescription}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Furniture List */}
            {property.Host.languagesSpokenByHost && property.Host.languagesSpokenByHost.length > 0 && (
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <User2 className="h-5 w-5 mr-2" />
                    Languages Spoken By Host
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-3"
                  >
                    {property.Host.languagesSpokenByHost.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-700">
                          {formatText(item)}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            )}

            {/* Furniture List */}
            {property.furnitures && property.furnitures.length > 0 && (
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Sofa className="h-5 w-5 mr-2" />
                    Furniture & Amenities Included
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-3"
                  >
                    {property.furnitures.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-700">
                          {formatText(item.type)}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            )}

            {/* Nearby Facilities */}
            {property.nearbyFacilities && property.nearbyFacilities.length > 0 && (
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Nearby Facilities
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {property.nearbyFacilities.map((facility, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="h-5 w-5">{facility.icon}</span>
                          <div>
                            <p className="font-medium text-gray-800">
                              {facility.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              {facility.distance} Km
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </CardContent>
              </Card>
            )}

            {/* Amenities*/}
            {property.amenities && property.amenities.length > 0 && (
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <PackagePlus className="h-5 w-5 mr-2" />
                    Additional Amenities
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-3"
                  >
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-700">
                          {formatText(amenity.type)}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            )}

            {/* House Rules */}
            {property.pgRules && (
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <PencilRuler className="h-5 w-5 mr-2" />
                    House Rules
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-700">{property.pgRules}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews Section */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">{property?.reviewCount > 0 ? "Guest Reviews" : "No Reviews Yet"}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">
                        {formatRating(property?.avgRating)}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      ({property?.reviewCount || 0} reviews)
                    </span>
                  </div>
                </div>
                <div className="space-y-6">
                  <Review property={property} refetchProperty={refetch} />
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Host Profile */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-cool rounded-full flex items-center justify-center mx-auto">
                    {property.hostId ? (
                      <Image
                        placeholder="blur"
                        blurDataURL='/blurImg.png'
                        src={property.Host?.user?.image || `https://ui-avatars.com/api/?name=${property.Host?.user?.name}&background=random`}
                        alt={property.hostId}
                        width={32}
                        height={32}
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <User className="h-8 w-8 text-white" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">{property.Host?.user?.name || property.hostId}</h3>
                    <p className="text-gray-600">Property Host</p>
                  </div>


                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{formatRating(property.avgRating)}</span>
                    <span className="text-gray-600">
                      ({property?.reviewCount || 0} reviews)
                    </span>
                  </div>


                  {user ? (
                    <>
                      <div className="space-y-2">
                        {!showHostInfo ? (
                          <Button
                            onClick={handleRevealHostInfo}
                            className="w-full bg-gradient-cool hover:opacity-90"
                          >
                            Reveal Host Info
                          </Button>
                        ) : (
                          <div className="space-y-2">
                            {property.Host?.contactNumber && (
                              <a href={`tel:${property.Host.contactNumber}`}>
                                <Button variant="outline" className="w-full">
                                  <Phone className="h-4 w-4 mr-2" />
                                  {property.Host.contactNumber}
                                </Button>
                              </a>
                            )}
                            {property.Host?.user?.email && (
                              <a href={`mailto:${property.Host?.user?.email}`}>
                                <Button variant="outline" className="w-full mt-2">
                                  <Mail className="h-4 w-4 mr-2" />
                                  Email Host
                                </Button>
                              </a>
                            )}
                            {property.Host?.contactNumber && (
                              <a
                                href={`https://wa.me/${property.Host.contactNumber.replace(
                                  /\D/g,
                                  ""
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button className="w-full bg-green-500 hover:bg-green-600 mt-2">
                                  <MessageSquareDot className="h-4 w-4 mr-2" />
                                  WhatsApp
                                </Button>
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      <Link href={`/properties/${property.hostId}`}>
                        <Button variant="ghost" className="w-full mt-2">
                          View All Properties by Host
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <p className="text-lg font-thin">Please <Link href="/login" className="text-primary">login</Link> to reveal host information.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Location</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                    className="rounded-lg"
                  ></iframe>
                </div>
                <p className="text-gray-600 text-sm">{propertyAddress}</p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleWishlistToggle}
                variant="outline"
                className="w-full shadow-lg"
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${isInWishlist ? "fill-current text-red-500" : ""
                    }`}
                />
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
              <ShareButton isIcon={false} />

              {/* Enhanced Virtual Tour Button */}
              {property.virtualTourUrl && (
                <Button
                  onClick={() => setShowVirtualTourModal(true)}
                  className="w-full bg-gradient-cool text-white shadow-lg transform transition-all duration-200 hover:scale-105 hidden md:flex items-center justify-center"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Take Virtual Tour - 360°
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Terms and Conditions Dialog */}
        <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
          <DialogContent className="max-w-md rounded-lg">
            <DialogHeader>
              <DialogTitle>Terms and Conditions</DialogTitle>
              <DialogDescription>
                Please read and accept the terms before proceeding.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Important Notice</h4>
                <p className="text-sm text-gray-600">
                  LookAroundPG is just a platform that connects users with
                  property hosts. LookAroundPG is not responsible for any
                  disputes, damages, or issues that may arise between users and
                  hosts. By proceeding, you acknowledge that any transactions or
                  agreements are directly between you and the property host.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) =>
                    setTermsAccepted(checked === true)
                  }
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowTermsDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleTermsAcceptance}
                disabled={!termsAccepted}
                className="mb-2 sm:mb-0"
              >
                {pendingRequest ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Accept & Continue"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Virtual Tour Modal */}
        <Dialog
          open={showVirtualTourModal}
          onOpenChange={setShowVirtualTourModal}
        >
          <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden p-2">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="flex items-center gap-2 pt-2">
                <Play className="h-5 w-5" />
                Virtual Tour - {property.title}
              </DialogTitle>
            </DialogHeader>
            {/* Future use case, when there are multiple versions of the same property for different sharing options*/}
            {/* <div className="p-6">
              <Tabs defaultValue="single" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="single">Single Sharing</TabsTrigger>
                  <TabsTrigger value="double">Double Sharing</TabsTrigger>
                  <TabsTrigger value="triple">Triple Sharing</TabsTrigger>
                </TabsList>

                <TabsContent value="single" className="mt-4">
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-semibold mb-2">Single Sharing - Virtual Tour</h3>
                      <p className="text-gray-300">360° view of single occupancy room</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="double" className="mt-4">
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-semibold mb-2">Double Sharing - Virtual Tour</h3>
                      <p className="text-gray-300">360° view of double occupancy room</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="triple" className="mt-4">
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-semibold mb-2">Triple Sharing - Virtual Tour</h3>
                      <p className="text-gray-300">360° view of triple occupancy room</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div> */}
            <div className="w-full h-full">
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  src={property.virtualTourUrl}
                  title="360 Virtual Tour"
                  className="absolute top-0 w-full h-full rounded-lg"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div >
  );
};

export default PropertyDetails;
