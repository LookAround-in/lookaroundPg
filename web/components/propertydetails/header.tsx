'use client';
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Eye, Heart, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
const PropertyInfo = dynamic(() => import("./info"));
const Features = dynamic(() => import("./features"));
const Review = dynamic(() => import("../review/Review"));
import { Property } from "@/interfaces/property";
import { formatRating } from "@/utils/format";
import ShareButton from "../share/Share";

interface HeaderProps {
  property: Property;
  refetch: () => void;
  handleWishlistToggle: () => void;
  isInWishlist: boolean;
}

export default function Header({ property, refetch, handleWishlistToggle, isInWishlist }: HeaderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <>
      {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden shadow-lg">
              <div className="relative aspect-[16/10]">
                <Image
                  placeholder="blur"
                  blurDataURL="/blurImg.png"
                  width={800}
                  height={600}
                  src={
                    property.images?.[currentImageIndex] || '/placeholder.svg'
                  }
                  alt={property.title || 'Property image'}
                  className="w-full h-full object-cover"
                />

                {/* Virtual Tour Badge */}
                {property.virtualTourUrl && (
                  <Badge className="absolute top-3 left-3 bg-accent text-primary hover:text-white">
                    <Eye className="h-3 w-3 mr-1" />
                    360° Tour Available
                  </Badge>
                )}

                <ShareButton isIcon={true} />

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
            <PropertyInfo property={property} />

            <Features property={property} />

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
        </>
    )
}