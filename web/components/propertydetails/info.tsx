'use client';
import { Calendar, Home, MapPin, Sofa, Star, Users, Utensils } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import formatText, { formatRating } from "@/utils/format";
import { Button } from "@/components/ui/button"
import { Property } from "@/interfaces/property";
import { Badge } from "components/ui/badge";
import { useEffect, useMemo, useState } from "react";

interface PropertyInfoProps {
  property: Property;
}

export default function PropertyInfo({ property }: PropertyInfoProps) {
    const [selectedSharingType, setSelectedSharingType] = useState<
        "SINGLE" | "DOUBLE" | "TRIPLE" | "QUAD"
      >("TRIPLE");
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
    return (
        <>
        <Card className="">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Title and Location */}
                  <div>
                    <h1 className="text-3xl font-bold text-charcoal">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.address}</span>
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
                        {availableSharingTypes.map((type) => (
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
                    {property.foodIncluded && (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800"
                      >
                        <Utensils className="h-3 w-3 mr-1" />
                        Food Included
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
                    <div className="mt-6 p-4 bg-gray-200 rounded-lg">
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
                  )}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      About this place
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {property.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
        </>
    )
}