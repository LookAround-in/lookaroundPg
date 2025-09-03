"use client";
import React, { useState, useMemo, useCallback, useTransition} from "react";
import { Property } from "@/interfaces/property";
import dynamic from "next/dynamic";
const CityFilter = dynamic(() => import("./filter-components").then(mod => mod.CityFilter));
const LocationFilter = dynamic(() => import("./filter-components").then(mod => mod.LocationFilter));
const PriceRangeFilter = dynamic(() => import("./filter-components").then(mod => mod.PriceRangeFilter));
const GenderFilter = dynamic(() => import("./filter-components").then(mod => mod.GenderFilter));
const RatingFilter = dynamic(() => import("./filter-components").then(mod => mod.RatingFilter));
const AmenitiesFilter = dynamic(() => import("./filter-components").then(mod => mod.AmenitiesFilter));
const SharingTypeFilter = dynamic(() => import("./filter-components").then(mod => mod.SharingTypeFilter));
const VirtualTourFilter = dynamic(() => import("./filter-components").then(mod => mod.VirtualTourFilter));
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
  { value: "hyderabad", label: "Hyderabad", available: true },
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
  locations: string[];
}

export default function FilterComponent({ 
  setSortBy, 
  properties, 
  filters,
  onFiltersChange,
  locations 
}: FilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [isPending, startTransition] = useTransition();

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

  // State where there is no filter applied
  const clearFilters = useCallback(() => {
    const defaultFilters: FilterState = {
      selectedCity: "",
      selectedLocation: "",
      priceFilter: [3000, 30000],
      debouncedPriceRange: [3000, 30000],
      genderPreference: "any",
      amenities: [],
      virtualTour: false,
      propertyType: "any",
      sharingType: "any",
      rating: 0,
    };
    onFiltersChange(defaultFilters);
    setSortBy("newest");
  }, [setSortBy, onFiltersChange]);

  // Calculate active filters count
  const activeFiltersCount = [
    filters.selectedCity !== "",
    filters.selectedLocation !== "" && filters.selectedLocation !== "all",
    filters.genderPreference !== "any",
    filters.amenities.length > 0,
    filters.virtualTour,
    filters.propertyType !== "any",
    filters.sharingType !== "any",
    filters.rating > 0,
    (filters.debouncedPriceRange[0] !== 3000 && filters.debouncedPriceRange[0] !== 0) ||
    (filters.debouncedPriceRange[1] !== 30000 && filters.debouncedPriceRange[1] !== 0),
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
        disabled={filters.selectedCity == "chennai"}
      />
      
      <SharingTypeFilter
        sharingType={filters.sharingType}
        onSharingTypeChange={handleSharingTypeChange}
      />
      
      <PriceRangeFilter
        priceFilter={filters.priceFilter}
        onPriceChange={handlePriceRangeChange}
        min={1000}
        max={50000}
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
            <Card className="gradient-border sticky shadow-lg">
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