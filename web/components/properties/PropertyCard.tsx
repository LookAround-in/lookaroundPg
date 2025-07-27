'use client'
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin, User, Star } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Badge } from 'components/ui/badge';
import { authClient } from '@/lib/auth-client';
import { useWishlist } from 'contexts/WishlistContext';
import Image from 'next/image';
import { Property } from '@/interfaces/property';
import formatText from '@/utils/formatText';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, className = '' }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);

  const isInWishlist = wishlist.includes(property.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist) {
      removeFromWishlist(property.id);
    } else {
      addToWishlist(property.id);
    }
  };

  const getGenderBadgeColor = (gender: string) => {
    switch (gender) {
      case 'men': return 'bg-blue-100 text-blue-800 hover:text-white';
      case 'women': return 'bg-pink-100 text-pink-800 hover:text-white';
      case 'co-living': return 'bg-purple-100 text-purple-800 hover:text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  //No need to filter as the backend is sending the sharingTypes already sorted by price

  return (
    <div className={`property-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link href={`/property/${property.id}`}>
          <Image
            placeholder='blur'
            blurDataURL='/blurImg.png'
            src={property.images[0] || '/placeholder.svg'}
            alt={property.title}
            width={400}
            height={300}
            className={`w-full h-full object-cover transition-all duration-300 hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </Link>
        
        {/* Virtual Tour Badge */}
        {property.virtualTourUrl && (
          <Badge className="absolute top-3 left-3 bg-accent text-primary hover:text-white">
            360° Tour
          </Badge>
        )}
        
        {/* Wishlist Button */}
        {user && (
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-3 right-3 p-2 h-8 w-8 bg-white/80 hover:bg-white wishlist-heart ${
              isInWishlist ? 'active' : ''
            }`}
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current text-red-500' : ''}`} />
          </Button>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <Link href={`/property/${property.id}`}>
          {/* Title and Location */}
          <div className="mb-3">
            <h3 className="font-semibold text-lg text-charcoal mb-1 line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="line-clamp-1">{property.address}</span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-3">
            <span className="text-2xl font-bold text-primary">
              ₹{property.sharingTypes[0]?.pricePerMonth.toLocaleString()}
            </span>
            <span className="text-gray-600 text-sm ml-1">/month</span>
          </div>

          {/* Gender Preference */}
          <div className="mb-3">
            <Badge className={getGenderBadgeColor(property.propertyType)}>
              {property.propertyType === 'COLIVE' ? 'Co-living' : 
               property.propertyType === 'MEN' ? 'Men Only' : 'Women Only'}
            </Badge>
          </div>

          {/* Amenities */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {formatText(amenity.type)}
                </Badge>
              ))}
              {property.amenities.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{property.amenities.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </Link>

        {/* Host Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center">
              {property.hostId ? (
                <Image
                  placeholder="blur"
                  blurDataURL="/blurImg.png"
                  src={`https://ui-avatars.com/api/?name=${property.Host?.user?.name}&background=random`}
                  alt={property.hostId}
                  width={32}
                  height={32}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <User className="h-3 w-3 text-white" />
              )}
            </div>
            <span className="text-sm text-gray-600">{property.Host?.user?.name}</span>
          </div>
          
          {property.rating && (
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{property.rating}</span>
              {property.reviews && (
                <span className="text-xs text-gray-500">({property.reviews.length})</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
