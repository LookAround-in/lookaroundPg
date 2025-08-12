'use client';
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, Heart, Mail, MessageSquareDot, Phone, Star, User } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Property } from "@/interfaces/property";
import { formatRating } from "@/utils/format";

interface PropertyDetailsProps {
  property: Property;
  showHostInfo: boolean;
  setShowHostInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTermsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleWishlistToggle: () => void;
  isInWishlist: boolean;
  setShowVirtualTourModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ property, setShowHostInfo, setShowTermsDialog, showHostInfo , handleWishlistToggle, isInWishlist, setShowVirtualTourModal }: PropertyDetailsProps) {
    const { user } = useAuth();
    const {toast} = useToast();
    const router = useRouter();
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

    
  return (
    <div className="space-y-6">
            {/* Host Profile */}
            <Card className="">
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
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Location</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                  ></iframe>
                </div>
                <p className="text-gray-600 text-sm">{property.address}</p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleWishlistToggle}
                variant="outline"
                className="w-full"
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${isInWishlist ? "fill-current text-red-500" : ""
                    }`}
                />
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>

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
  );
}
