"use client";
import React, { useState, useMemo, useCallback, useTransition} from "react";
import { Property } from "@/interfaces/property";
import { CityFilter, LocationFilter, PriceRangeFilter, GenderFilter, RatingFilter, AmenitiesFilter, SharingTypeFilter, VirtualTourFilter} from './filter-components';
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Button } from "components/ui/button";
import { Badge, Filter, SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose} from "components/ui/sheet";
import { useDebouncedCallback } from "use-debounce";

const availableAmenities = [
  "PARKING", "WIFI", "GYM", "SWIMMING_POOL", "SECURITY", "POWER_BACKUP",
  "LIFT", "PET_FRIENDLY", "GARDEN", "PLAY_AREA", "CLUBHOUSE", "HOUSEKEEPING",
  "MAINTENANCE", "CCTV", "COMMON_AREA", "LAUNDRY", "GARBAGE_DISPOSAL",
  "COMMUNITY_EVENTS", "AMENITIES_OTHER",
];

const cities = [
  { value: "bangalore", label: "Bangalore", available: true },
  { value: "hyderabad", label: "Hyderabad", available: false },
  { value: "chennai", label: "Chennai", available: false },
];

interface FilterState {
  selectedCity: string;
  selectedLocation: string;
  priceFilter: number[];
  debouncedPriceRange: number[];
  genderPreference: string;
  amenities: string[];
  virtualTour: boolean;
  propertyType: string;
  sharingType: string;
  rating: number;
}

interface FilterProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  properties: Property[];
  filters: FilterState;
  onFiltersChange: (newFilters: Partial<FilterState>) => void;
}

export default function FilterComponent({ 
  sortBy, 
  setSortBy, 
  properties, 
  filters,
  onFiltersChange 
}: FilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Compute derived values from properties
  const locations = useMemo(
    () => [...new Set(properties.map((p) => p.address))],
    [properties]
  );

  const priceRange = useMemo(() => {
    if (properties.length === 0) return { min: 500, max: 50000 };
    const allPrices = properties
      .flatMap((property) =>
        property.sharingTypes.map((st) => st.pricePerMonth)
      )
      .filter((price) => price > 0);
    
    if (allPrices.length === 0) return { min: 500, max: 50000 };
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    return {
      min: Math.max(500, Math.floor(minPrice * 0.8)),
      max: Math.ceil(maxPrice * 1.2),
    };
  }, [properties]);

  // Debounced price range update
  const debouncedSetPriceRange = useDebouncedCallback((value: number[]) => {
    startTransition(() => {
      onFiltersChange({ debouncedPriceRange: value });
    });
  }, 300);

  // Event handlers - all use onFiltersChange instead of local setState
  const handleCityChange = useCallback((city: string) => {
    onFiltersChange({ selectedCity: city });
  }, [onFiltersChange]);

  const handleLocationChange = useCallback((location: string) => {
    onFiltersChange({ selectedLocation: location });
  }, [onFiltersChange]);

  const handlePriceRangeChange = useCallback((value: number[]) => {
    onFiltersChange({ priceFilter: value });
    debouncedSetPriceRange(value);
  }, [debouncedSetPriceRange, onFiltersChange]);

  const handleGenderChange = useCallback((gender: string) => {
    onFiltersChange({ genderPreference: gender });
  }, [onFiltersChange]);

  const handleRatingChange = useCallback((newRating: number) => {
    onFiltersChange({ rating: newRating });
  }, [onFiltersChange]);

  const handleSharingTypeChange = useCallback((type: string) => {
    onFiltersChange({ sharingType: type });
  }, [onFiltersChange]);

  const handleVirtualTourChange = useCallback((checked: boolean) => {
    onFiltersChange({ virtualTour: checked });
  }, [onFiltersChange]);

  const handleAmenityChange = useCallback((amenity: string, checked: boolean) => {
    const newAmenities = checked
      ? [...filters.amenities, amenity]
      : filters.amenities.filter((a) => a !== amenity);
    onFiltersChange({ amenities: newAmenities });
  }, [filters.amenities, onFiltersChange]);

  const clearFilters = useCallback(() => {
    const defaultFilters: FilterState = {
      selectedCity: "bangalore",
      selectedLocation: "",
      priceFilter: [priceRange.min, priceRange.max],
      debouncedPriceRange: [priceRange.min, priceRange.max],
      genderPreference: "any",
      amenities: [],
      virtualTour: false,
      propertyType: "any",
      sharingType: "any",
      rating: 0,
    };
    onFiltersChange(defaultFilters);
    setSortBy("newest");
  }, [priceRange.min, priceRange.max, setSortBy, onFiltersChange]);

  // Calculate active filters count
  const activeFiltersCount = [
    filters.selectedCity !== "bangalore",
    filters.selectedLocation !== "" && filters.selectedLocation !== "all",
    filters.genderPreference !== "any",
    filters.amenities.length > 0,
    filters.virtualTour,
    filters.propertyType !== "any",
    filters.sharingType !== "any",
    filters.rating > 0,
    (filters.debouncedPriceRange[0] !== priceRange.min && filters.debouncedPriceRange[0] !== 0) ||
    (filters.debouncedPriceRange[1] !== priceRange.max && filters.debouncedPriceRange[1] !== 0),
  ].filter(Boolean).length;

  const filterContent = useMemo(() => (
    <div className="space-y-6">
      <CityFilter
        selectedCity={filters.selectedCity}
        onCityChange={handleCityChange}
        cities={cities}
      />
      
      <LocationFilter
        selectedLocation={filters.selectedLocation}
        onLocationChange={handleLocationChange}
        locations={locations}
        disabled={filters.selectedCity !== "bangalore"}
      />
      
      <SharingTypeFilter
        sharingType={filters.sharingType}
        onSharingTypeChange={handleSharingTypeChange}
      />
      
      <PriceRangeFilter
        priceFilter={filters.priceFilter}
        onPriceChange={handlePriceRangeChange}
        min={1000}
        max={100000}
        step={500}
      />
      
      <GenderFilter
        genderPreference={filters.genderPreference}
        onGenderChange={handleGenderChange}
      />
      
      <RatingFilter
        rating={filters.rating}
        onRatingChange={handleRatingChange}
      />
      
      <AmenitiesFilter
        amenities={filters.amenities}
        onAmenityChange={handleAmenityChange}
        availableAmenities={availableAmenities}
      />
      
      <VirtualTourFilter
        virtualTour={filters.virtualTour}
        onVirtualTourChange={handleVirtualTourChange}
      />
      
      {activeFiltersCount > 0 && (
        <Button onClick={clearFilters} variant="outline" className="w-full">
          <X className="h-4 w-4 mr-2" />
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  ), [filters, handleCityChange, handleLocationChange, handlePriceRangeChange, handleGenderChange, handleRatingChange, handleSharingTypeChange, handleVirtualTourChange, handleAmenityChange, clearFilters, activeFiltersCount, locations]);

  return (
    <div>
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-6">
          {/* Enhanced Desktop Filters Sidebar */}
          <div
            className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <Card className="gradient-border sticky ">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg font-bold">
                  <span className="flex items-center text-gradient-cool">
                    <SlidersHorizontal className="h-5 w-5 mr-2" />
                    Advanced Filters
                  </span>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="font-medium text-primary hover:bg-primary hover:text-gray-100"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear ({activeFiltersCount})
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>{filterContent}</CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Filter Button */}
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
              <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto ">
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold text-gradient-cool">
                    Filter Properties
                  </SheetTitle>
                </SheetHeader>
                <div className="py-6">{filterContent}</div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
        </div>
    </div>
  );
}

// Export the FilterState type for use in Properties component
export type { FilterState };