'use state'
import React, { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { usePropertyContext } from 'app/contexts/PropertyContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Heart, User, Star, Phone, Mail, ArrowLeft, Eye, Calendar, Users, Home, Play, Loader2, Utensils, Sofa, Car, Train, ShoppingBag, Hospital, PencilRuler, PackagePlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { mockProperties } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const PropertyDetails = () => {
  const { propertyId } = usePropertyContext();
  const router = useRouter();
  const { user } = useAuth();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showHostInfo, setShowHostInfo] = useState(false);
  const [selectedSharingType, setSelectedSharingType] = useState<'single' | 'double' | 'triple'>('triple');
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showVirtualTourModal, setShowVirtualTourModal] = useState(false);
  
  const property = mockProperties.find(p => p.id === propertyId);
  
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">Property not found</h1>
          <Button onClick={() => router.push('/explore')}>
            Back to Explore
          </Button>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlist.includes(property.id);

  const handleWishlistToggle = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to add properties to your wishlist.",
        variant: "destructive",
      });
      router.push('/login');
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
      router.push('/login');
      return;
    }
    setShowTermsDialog(true);
  };

  const getGenderBadgeColor = (gender: string) => {
    switch (gender) {
      case 'men': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'women': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'co-living': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-primary text-white';
      case 'limited': return 'bg-primary text-white';
      case 'full': return 'bg-primary text-white';
      default: return 'bg-primary text-white';
    }
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
    setShowHostInfo(true);
    setShowTermsDialog(false);
    toast({
      title: "Contact information revealed",
      description: "You can now contact the host directly.",
    });
  };

  // Pricing data based on sharing type with refundable deposit
  const pricingData = {
    single: {
      price: property.price_single,
      deposit: 5000,
      refundableDeposit: 4000,
      maintenance: 1000
    },
    double: {
      price: property.price_double,
      deposit: 4000,
      refundableDeposit: 3200,
      maintenance: 800
    },
    triple: {
      price: property.price_triple,
      deposit: 3000,
      refundableDeposit: 2500,
      maintenance: 600
    }
  };

  //Mock property features data
  const propertyFeatures = {
    foodIncluded: true,
    furnishing: 'Fully Furnished',
    furniture: [
      'Single Bed with Mattress',
      'Study Table & Chair',
      'Wardrobe',
      'Side Table',
      'Mirror',
      'Ceiling Fan',
      'Window Curtains'
    ],
    nearbyFacilities: [
      { name: 'Metro Station', distance: '0.5 km', icon: Train },
      { name: 'Shopping Mall', distance: '2 km', icon: ShoppingBag },
      { name: 'Hospital', distance: '1.5 km', icon: Hospital },
      { name: 'Bus Stop', distance: '200 m', icon: Car },
      { name: 'ATM', distance: '300 m', icon: MapPin },
      { name: 'Grocery Store', distance: '500 m', icon: ShoppingBag }
    ]
  };

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent PG with all amenities. The host is very responsive and the location is perfect for my office commute.",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Rahul Kumar",
      rating: 4,
      date: "1 month ago", 
      comment: "Good facilities and clean rooms. WiFi speed could be better but overall satisfied with the stay.",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Sneha Patel",
      rating: 5,
      date: "2 months ago",
      comment: "Amazing place! Feels like home. The food is delicious and the common areas are well maintained.",
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-light-gray dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button and Virtual Tour button for mobile */}
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/explore')}
            className="dark:text-white dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          {/* Virtual Tour Button - Mobile Top Right */}
          {property.virtualTour && (
            <Button 
              onClick={() => setShowVirtualTourModal(true)}
              className="md:hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
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
            <Card className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
              <div className="relative aspect-[16/10]">
                <img
                  src={property.images[currentImageIndex] || '/placeholder.svg'}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Virtual Tour Badge */}
                {property.virtualTour && (
                  <Badge className="absolute top-3 left-3 bg-accent text-primary hover:text-white">
                    <Eye className="h-3 w-3 mr-1" />
                    360° Tour Available
                  </Badge>
                )}
                
                {/* Wishlist Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={`absolute top-4 right-4 p-2 h-10 w-10 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 wishlist-heart ${
                    isInWishlist ? 'active' : ''
                  }`}
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current text-red-500' : 'dark:text-white'}`} />
                </Button>
                
                {/* Image navigation */}
                {property.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 dark:text-white"
                      onClick={() => setCurrentImageIndex(
                        currentImageIndex === 0 ? property.images.length - 1 : currentImageIndex - 1
                      )}
                    >
                      ←
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 dark:text-white"
                      onClick={() => setCurrentImageIndex(
                        currentImageIndex === property.images.length - 1 ? 0 : currentImageIndex + 1
                      )}
                    >
                      →
                    </Button>
                    
                    {/* Image dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {property.images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
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
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Title and Location */}
                  <div>
                    <h1 className="text-3xl font-bold text-charcoal dark:text-white mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.location}</span>
                    </div>
                  </div>

                  {/* Food and furnishing info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Utensils className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-800">Food Included</p>
                        <p className="text-sm text-gray-600">
                          {propertyFeatures.foodIncluded ? 'Yes, meals provided' : 'Not included'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Sofa className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-800">Furnishing</p>
                        <p className="text-sm text-gray-600">{propertyFeatures.furnishing}</p>
                      </div>
                    </div>
                  </div>

                  {/* Sharing Type Selector */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Select Sharing Type</h3>
                    <div className="flex flex-wrap gap-3">
                      {(['single', 'double', 'triple'] as const).map((type) => (
                        <Button
                          key={type}
                          variant={selectedSharingType === type ? 'default' : 'outline'}
                          onClick={() => {
                            setSelectedSharingType(type);
                            setCurrentImageIndex(0);
                          }}
                          className={selectedSharingType === type ? 'bg-gradient-cool text-white' : ''}
                        >
                          {type === 'single' ? 'Single' : type === 'double' ? 'Double' : 'Triple'} Sharing
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Price and Status */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-primary dark:text-blue-400">
                        {/* ₹{property.price.toLocaleString()} */}
                        ₹{pricingData[selectedSharingType].price.toLocaleString()}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">/month</span>
                    </div>
                    <Badge className={getStatusBadgeColor(property.availabilityStatus)}>
                      {property.availabilityStatus === 'available' ? 'Available' :
                       property.availabilityStatus === 'limited' ? 'Limited Availability' : 'Full'}
                    </Badge>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant='outline' className={getGenderBadgeColor(property.genderPreference)}>
                      {property.genderPreference === 'co-living' ? 'Co-living' : 
                       property.genderPreference === 'men' ? 'Men Only' : 'Women Only'}
                    </Badge>
                    <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                      {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)} Room
                    </Badge>
                    {property.virtualTour && (
                      <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">Virtual Tour</Badge>
                    )}
                    {propertyFeatures.foodIncluded && (
                      <Badge variant='outline' className="bg-green-100 text-green-800">
                        <Utensils className="h-3 w-3 mr-1" />
                        Food Included
                      </Badge>
                    )}
                  </div>

                  {/* Rating */}
                  {property.rating && (
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold dark:text-white">{property.rating}</span>
                      </div>
                      {property.reviewCount && (
                        <span className="text-gray-600 dark:text-gray-400">({property.reviewCount} reviews)</span>
                      )}
                    </div>
                  )}

                  {/* Quick Info Cards */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-3 bg-gradient-cool-light dark:bg-gray-700 rounded-lg">
                      <Users className="h-6 w-6 mx-auto mb-2 text-gradient-cool dark:text-blue-400" />
                      <p className="text-sm font-medium dark:text-white">Sharing Type</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{selectedSharingType}</p>
                    </div>
                    <div className="text-center p-3 bg-gradient-cool-light dark:bg-gray-700 rounded-lg">
                      <Home className="h-6 w-6 mx-auto mb-2 text-gradient-cool dark:text-blue-400" />
                      <p className="text-sm font-medium dark:text-white">Property Type</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{property.propertyType}</p>
                    </div>
                    <div className="text-center p-3 bg-gradient-cool-light dark:bg-gray-700 rounded-lg">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-gradient-cool dark:text-blue-400" />
                      <p className="text-sm font-medium dark:text-white">Move-in</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{property.move_in}</p>
                    </div>
                  </div>

                  {/* Pricing Details with Refundable Deposit */}
                  <div className="mt-6 p-4 bg-gray-200 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">
                      Pricing Details ({selectedSharingType} sharing)
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Monthly Rent:</span>
                        <span className="font-medium">
                          ₹{pricingData[selectedSharingType].price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Security Deposit:</span>
                        <span className="font-medium">
                          ₹{pricingData[selectedSharingType].deposit.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 ml-4">- Maintenance:</span>
                        <span className="text-red-600 font-medium">
                          - ₹{pricingData[selectedSharingType].maintenance.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 ml-4">- Refundable Amount:</span>
                        <span className="text-green-600 font-medium">
                          + ₹{pricingData[selectedSharingType].refundableDeposit.toLocaleString()}
                        </span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between font-semibold text-md">
                        <span>Total Move-in Cost:</span>
                        <span className="text-primary">
                          ₹
                          {(
                            pricingData[selectedSharingType].price +
                            pricingData[selectedSharingType].deposit 
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">About this place</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {property.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Furniture List */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Sofa className="h-5 w-5 mr-2" />
                  Furniture & Amenities Included
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {propertyFeatures.furniture.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Nearby Facilities */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Nearby Facilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {propertyFeatures.nearbyFacilities.map((facility, index) => {
                    const IconComponent = facility.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-800">{facility.name}</p>
                          <p className="text-sm text-gray-600">{facility.distance}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center dark:text-white">
                  <PackagePlus className="h-5 w-5 mr-2"/>
                  Additional Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary dark:bg-blue-400 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* House Rules */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center dark:text-white">
                  <PencilRuler className="h-5 w-5 mr-2"/>
                  House Rules
                </h3>
                <div className="space-y-2">
                  {property.houseRules.map((rule, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary dark:bg-blue-400 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">{rule}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold dark:text-white">Guest Reviews</h3>
                  {property.rating && (
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold dark:text-white">{property.rating}</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">({property.reviewCount} reviews)</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-6 last:pb-0">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold dark:text-white">{review.name}</h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-6 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                  View All Reviews
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Host Profile */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-cool rounded-full flex items-center justify-center mx-auto">
                    {property.hostAvatar ? (
                      <Image src={property.hostAvatar} alt={property.hostName} width={32} height={32} className="w-full h-full rounded-full" />
                    ) : (
                      <User className="h-8 w-8 text-white" />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg dark:text-white">{property.hostName}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Property Host</p>
                  </div>

                  {property.rating && (
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium dark:text-white">{property.rating}</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        ({property.reviewCount} reviews)
                      </span>
                    </div>
                  )}

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
                        {property.hostPhone && (
                          <a href={`tel:${property.hostPhone}`}>
                            <Button variant="outline" className="w-full dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                              <Phone className="h-4 w-4 mr-2" />
                              {property.hostPhone}
                            </Button>
                          </a>
                        )}
                        {property.hostEmail && (
                          <a href={`mailto:${property.hostEmail}`}>
                            <Button variant="outline" className="w-full dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 mt-2">
                              <Mail className="h-4 w-4 mr-2" />
                              Email Host
                            </Button>
                          </a>
                        )}
                        {property.hostPhone && (
                          <a 
                            href={`https://wa.me/${property.hostPhone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="w-full bg-green-500 hover:bg-green-600 mt-2">
                              WhatsApp
                            </Button>
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <Link href={`/host/properties/${property.hostId}`}>
                    <Button variant="ghost" className="w-full dark:text-white dark:hover:bg-gray-700 mt-2">
                      View All Properties by Host
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Location</h3>
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-500 dark:text-gray-400">Map placeholder</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {property.location}
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleWishlistToggle}
                variant="outline" 
                className="w-full dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
              >
                <Heart className={`h-4 w-4 mr-2 ${isInWishlist ? 'fill-current text-red-500' : ''}`} />
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
              
              {/* Enhanced Virtual Tour Button */}
              {property.virtualTour && (
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
          <DialogContent className="max-w-md">
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
                  LookaroundPG is just a platform that connects users with property hosts.
                  LookaroundPG is not responsible for any disputes, damages, or issues that may arise
                  between users and hosts. By proceeding, you acknowledge that any transactions or
                  agreements are directly between you and the property host.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowTermsDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleTermsAcceptance} disabled={!termsAccepted} className='mb-2 sm:mb-0'>
                Accept & Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Virtual Tour Modal */}
        <Dialog open={showVirtualTourModal} onOpenChange={setShowVirtualTourModal}>
          <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Virtual Tour - {property.title}
              </DialogTitle>
            </DialogHeader>
            <div className="p-6">
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
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PropertyDetails;
