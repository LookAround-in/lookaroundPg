'use client'
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Search, Filter, X, SlidersHorizontal, MapPin, Star, Home, Users } from 'lucide-react';
import { mockProperties } from '@/data/mockData';

const Explore = () => {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  // Enhanced filter states with updated price range
  const [location, setLocation] = useState(searchParams?.get('location') || '');
  const [priceRange, setPriceRange] = useState([8000, 35000]);
  const [genderPreference, setGenderPreference] = useState('any');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [virtualTour, setVirtualTour] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [propertyType, setPropertyType] = useState('any');
  const [sharingType, setSharingType] = useState('any');
  const [rating, setRating] = useState(0);

  const availableAmenities = [
    'WiFi', 'AC', 'Meals', 'Parking', 'Security', 'Gym', 
    'Laundry', 'Housekeeping', 'Common Area', 'Power Backup',
    'Refrigerator', 'Microwave', 'Balcony', 'Study Room'
  ];

  const filteredProperties = useMemo(() => {
    const filtered = mockProperties.filter(property => {
      // Location filter
      if (location && !property.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }
      
      // Price filter based on sharing type
      let propertyPrice = property.price;
      if (sharingType === 'single') propertyPrice = property.sharingOptions.single;
      else if (sharingType === 'double') propertyPrice = property.sharingOptions.double;
      else if (sharingType === 'triple') propertyPrice = property.sharingOptions.triple;
      
      if (propertyPrice < priceRange[0] || propertyPrice > priceRange[1]) {
        return false;
      }
      
      // Gender preference filter
      if (genderPreference !== 'any' && property.genderPreference !== genderPreference) {
        return false;
      }
      
      // Amenities filter
      if (amenities.length > 0) {
        const hasAllAmenities = amenities.every(amenity => 
          property.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }
      
      // Virtual tour filter
      if (virtualTour && !property.virtualTour) {
        return false;
      }
      
      // Rating filter
      if (rating > 0 && (!property.rating || property.rating < rating)) {
        return false;
      }
      
      return true;
    });

    // Sort properties
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [location, priceRange, genderPreference, amenities, virtualTour, sortBy, propertyType, rating, sharingType]);

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setAmenities([...amenities, amenity]);
    } else {
      setAmenities(amenities.filter(a => a !== amenity));
    }
  };

  const clearFilters = () => {
    setLocation('');
    setPriceRange([8000, 35000]);
    setGenderPreference('any');
    setAmenities([]);
    setVirtualTour(false);
    setSortBy('newest');
    setPropertyType('any');
    setSharingType('any');
    setRating(0);
  };

  const activeFiltersCount = [
    location,
    genderPreference !== 'any',
    amenities.length > 0,
    virtualTour,
    propertyType !== 'any',
    sharingType !== 'any',
    rating > 0,
    priceRange[0] !== 8000 || priceRange[1] !== 35000
  ].filter(Boolean).length;

  // Filter component for reuse
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Location Search */}
      <div>
        <Label className="text-sm font-semibold mb-3 block text-gray-700 dark:text-gray-300">
          Location
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 border-2 border-gray-200 focus:border-purple-400 dark:border-gray-600 dark:bg-gray-800"
          />
        </div>
      </div>

      {/* Sharing Type */}
      <div>
        <Label className="text-sm font-semibold mb-3 block text-gray-700 dark:text-gray-300">
          Room Sharing
        </Label>
        <Select value={sharingType} onValueChange={setSharingType}>
          <SelectTrigger className="border-2 border-gray-200 focus:border-purple-400 dark:border-gray-600 dark:bg-gray-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Sharing</SelectItem>
            <SelectItem value="single">Single Occupancy</SelectItem>
            <SelectItem value="double">Double Sharing</SelectItem>
            <SelectItem value="triple">Triple Sharing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-semibold mb-3 block text-gray-700 dark:text-gray-300">
          Price Range (Monthly)
        </Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={5000}
            max={50000}
            step={1000}
            className="mb-4"
          />
          <div className="flex justify-between">
            <Badge variant="outline" className="bg-gradient-cool-light text-gradient-cool font-medium">
              ₹{priceRange[0].toLocaleString()}
            </Badge>
            <Badge variant="outline" className="bg-gradient-cool-light text-gradient-cool font-medium">
              ₹{priceRange[1].toLocaleString()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Gender Preference */}
      <div>
        <Label className="text-sm font-semibold mb-3 block text-gray-700 dark:text-gray-300">
          Gender Preference
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {['any', 'men', 'women', 'co-living'].map((option) => (
            <Button
              key={option}
              variant={genderPreference === option ? "default" : "outline"}
              size="sm"
              onClick={() => setGenderPreference(option)}
              className={genderPreference === option ? "bg-gradient-cool text-white" : "dark:border-gray-600 dark:text-gray-300"}
            >
              {option === 'any' ? 'Any' : 
               option === 'men' ? 'Men Only' : 
               option === 'women' ? 'Women Only' : 'Co-living'}
            </Button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <Label className="text-sm font-semibold mb-3 block text-gray-700 dark:text-gray-300">
          Minimum Rating
        </Label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star === rating ? 0 : star)}
              className={`p-2 rounded-lg transition-colors ${
                star <= rating ? 'text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' : 'text-gray-300 hover:text-yellow-400'
              }`}
            >
              <Star className="h-5 w-5 fill-current" />
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <Label className="text-sm font-semibold mb-3 block text-gray-700 dark:text-gray-300">
          Amenities ({amenities.length} selected)
        </Label>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
          {availableAmenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-3">
              <Checkbox
                id={amenity}
                checked={amenities.includes(amenity)}
                onCheckedChange={(checked) => 
                  handleAmenityChange(amenity, checked === true)
                }
                className="border-2"
              />
              <Label htmlFor={amenity} className="text-sm cursor-pointer dark:text-gray-300">
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Virtual Tour Toggle */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white dark:bg-gray-700 border-none">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="virtual-tour"
              checked={virtualTour}
              onCheckedChange={(checked) => setVirtualTour(checked === true)}
              className="border-2 bg-gray-100"
            />
            <Label htmlFor="virtual-tour" className="text-sm font-medium cursor-pointer text-gray-100 dark:text-gray-200">
              Virtual Tour Available
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button onClick={clearFilters} variant="outline" className="w-full dark:border-gray-600 dark:text-gray-300">
          <X className="h-4 w-4 mr-2" />
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-cool relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6 animate-fadeInUp tracking-tight">
            Find Your Perfect PG
          </h1>
          <p className="text-lg lg:text-xl text-white/90 mb-6 lg:mb-8 animate-fadeInUp max-w-2xl mx-auto leading-relaxed" style={{animationDelay: '0.2s'}}>
            Discover safe, comfortable, and affordable accommodations tailored to your needs
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Results Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-charcoal dark:text-white mb-2 tracking-tight">
              Available Properties
            </h2>
            <p className="text-gray-600 dark:text-gray-300 flex items-center text-base lg:text-lg font-medium">
              <span className="inline-block w-3 h-3 bg-gradient-cool rounded-full mr-3"></span>
              {filteredProperties.length} properties found
            </p>
          </div>
          
          {/* Sort Controls */}
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] lg:w-[200px] border-2 border-gray-200 dark:border-gray-600 h-10 lg:h-12 font-medium">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-6">
          {/* Enhanced Desktop Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="gradient-border sticky dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg font-bold">
                  <span className="flex items-center text-gradient-cool">
                    <SlidersHorizontal className="h-5 w-5 mr-2" />
                    Advanced Filters
                  </span>
                  {activeFiltersCount > 0 && (
                    <Button variant='outline' size="sm" onClick={clearFilters} className="font-medium text-primary hover:bg-primary hover:text-gray-100">
                      <X className="h-4 w-4 mr-1" />
                      Clear ({activeFiltersCount})
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Properties Grid */}
          <div className="flex-1">
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {filteredProperties.map((property, index) => (
                  <div 
                    key={property.id}
                    className="animate-fadeInUp"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <PropertyCard property={property} className="h-full" />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12 lg:py-16 dark:bg-gray-800">
                <CardContent>
                  <div className="w-20 lg:w-24 h-20 lg:h-24 bg-gradient-cool-light rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                    <Search className="h-10 lg:h-12 w-10 lg:w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    No properties found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto text-base">
                    We couldn't find any properties matching your criteria. Try adjusting your filters to see more results.
                  </p>
                  <Button onClick={clearFilters} className="bg-gradient-cool text-white hover:opacity-90 font-semibold">
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Floating Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              size="lg"
              className="bg-gradient-cool text-white shadow-2xl hover:opacity-90 rounded-full h-14 w-14 p-0 animate-float"
            >
              <Filter className="h-6 w-6" />
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto dark:bg-gray-800">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold text-gradient-cool">
                Filter Properties
              </SheetTitle>
            </SheetHeader>
            <div className="py-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Explore;
