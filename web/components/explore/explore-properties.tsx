"use client";
import { useEffect, useState, useMemo } from "react";
import Filter, { FilterState } from "./filter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select";
import { ExploreApiResponse, Property } from "@/interfaces/property";
import { SharingType } from "@/interfaces/pg";
import dynamic from "next/dynamic";
const PaginationWithLinks = dynamic(() => import("../ui/pagination-with-links").then(mod => mod.PaginationWithLinks), { ssr: false });
const PropertyList = dynamic(() => import("./property-list"), { ssr: false });
interface ExplorePropertiesProps {
    page: number;
    limit: number;
    explorePropertiesData: ExploreApiResponse;
    isLoading: boolean;
    error: string | null;
}

function ExploreProperties({page = 1, limit = 12, explorePropertiesData, isLoading, error}: ExplorePropertiesProps) {
  const [sortBy, setSortBy] = useState("newest");
  const [originalProperties, setOriginalProperties] = useState<Property[]>([]);

  // Initialize filter state
  const [filters, setFilters] = useState<FilterState>({
    selectedCity: "",
    selectedLocation: "",
    priceFilter: [0, 0],
    debouncedPriceRange: [0, 0],
    genderPreference: "any",
    amenities: [],
    virtualTour: false,
    propertyType: "any",
    sharingType: "any",
    rating: 0,
  });

  const totalProperties = explorePropertiesData?.data?.totalItems || 0;

  // Set original properties and update price range when data changes
  useEffect(() => {
    if (explorePropertiesData.data ) {
      const properties = explorePropertiesData.data.properties || [];
      setOriginalProperties(properties);

      // Calculate price range from properties
      if (properties.length > 0) {
        const allPrices = properties
          .flatMap((property) =>
            property.sharingTypes.map((st) => st.pricePerMonth)
          )
          .filter((price) => price > 0);
        
        if (allPrices.length > 0) {
          const minPrice = Math.min(...allPrices);
          const maxPrice = Math.max(...allPrices);
          const priceRange = {
            min: Math.max(500, Math.floor(minPrice * 0.8)),
            max: Math.ceil(maxPrice * 1.2),
          };
          
          // Update price filter only if it's different from current
          setFilters(prev => ({
            ...prev,
            priceFilter: [priceRange.min, priceRange.max],
            debouncedPriceRange: [priceRange.min, priceRange.max],
          }));
        }
      }
    } else {
      setOriginalProperties([]);
    }
  }, [explorePropertiesData.data]);

  // Handler to update filters
  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Filter and sort properties - moved from Filter component
  const filteredProperties = useMemo(() => {
    const filtered = originalProperties?.filter((property) => {
      // City filter 
      const city = property.city.toLowerCase();
      if (!city.includes(filters.selectedCity.toLowerCase())){
        return false;
      }
      // Location filter
      if (
        filters.selectedLocation &&
        filters.selectedLocation !== "" &&
        !property.address.toLowerCase().includes(filters.selectedLocation.toLowerCase())
      ) {
        return false;
      }

      // Price filter based on sharing type
      let propertyPrice = 0;

      if (filters.sharingType === "any") {
        const prices = property.sharingTypes.map((st) => st.pricePerMonth);
        if (prices.length === 0) return false;
        propertyPrice = prices.length > 0 ? Math.min(...prices) : 0;
      } else {
        const targetType =
          filters.sharingType === "single"
            ? SharingType.SINGLE
            : filters.sharingType === "double"
            ? SharingType.DOUBLE
            : filters.sharingType === "triple"
            ? SharingType.TRIPLE
            : SharingType.QUAD;
        const matchedSharingType = property.sharingTypes.find(
          (st) => st.type === targetType
        );

        if (!matchedSharingType) return false;
        propertyPrice = matchedSharingType.pricePerMonth;
      }

      if (
        propertyPrice < filters.debouncedPriceRange[0] ||
        propertyPrice > filters.debouncedPriceRange[1]
      ) {
        return false;
      }

      // Gender preference filter
      if (filters.genderPreference !== "any") {
        const genderMap = {
          men: "MEN",
          women: "WOMEN",
          "co-living": "COLIVE",
        };
        const targetGender =
          genderMap[filters.genderPreference as keyof typeof genderMap];
        if (targetGender && property.propertyType !== targetGender) {
          return false;
        }
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const propertyAmenities = property.amenities.map(
          (amenity) => amenity.type
        );
        const hasAllAmenities = filters.amenities.every((amenity) =>
          propertyAmenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      // Virtual tour filter
      if (
        filters.virtualTour &&
        (!property.virtualTourUrl || property.virtualTourUrl.trim() === "")
      ) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && (!property.avgRating || property.avgRating < filters.rating)) {
        return false;
      }

      return true;
    });

    // Sort properties
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => {
          const aPrice = Math.min(...a.sharingTypes.map((st) => st.pricePerMonth));
          const bPrice = Math.min(...b.sharingTypes.map((st) => st.pricePerMonth));
          return aPrice - bPrice;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const aPrice = Math.min(...a.sharingTypes.map((st) => st.pricePerMonth));
          const bPrice = Math.min(...b.sharingTypes.map((st) => st.pricePerMonth));
          return bPrice - aPrice;
        });
        break;
      case "rating":
        filtered.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
        break;
      case "newest":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return filtered;
  }, [originalProperties, filters, sortBy]);

  const locations = useMemo(
    () => [...new Set(filteredProperties.map((p) =>  p.address))],
    [filteredProperties]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Results Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-charcoal mb-2 tracking-tight">
              Available Properties
            </h2>
            <p className="text-gray-600 flex items-center text-base lg:text-lg font-medium">
              <span className="inline-block w-3 h-3 bg-gradient-cool rounded-full mr-3"></span>
              {filteredProperties.length} properties found
            </p>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] lg:w-[200px] border-2 border-gray-200 h-10 lg:h-12 font-medium">
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
          <Filter 
            sortBy={sortBy} 
            setSortBy={setSortBy} 
            properties={originalProperties}
            filters={filters}
            onFiltersChange={updateFilters}
            locations={locations}
          />
          <PropertyList filteredProperties={filteredProperties} isLoading={isLoading} error={error} />
        </div>
        <div className='mt-4 flex justify-center'>
          <PaginationWithLinks page={page} pageSize={limit} totalCount={totalProperties}/>
        </div>
      </div>
      {/* Floating Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Filter 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
          properties={originalProperties}
          filters={filters}
          onFiltersChange={updateFilters}
          locations={locations}
        />
      </div>
    </div>
  );
}

export default ExploreProperties;