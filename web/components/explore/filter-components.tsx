"use client";
import React, {
  memo
} from "react";
import { Button } from "components/ui/button";
import { Label } from "components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "components/ui/select";
import { Checkbox } from "components/ui/checkbox";
import { Slider } from "components/ui/slider";
import { Card, CardContent } from "components/ui/card";
import { Badge } from "components/ui/badge";
import { Star } from "lucide-react";
import formatText from "@/utils/format";

// City Filter Component
interface CityFilterProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  cities: Array<{ value: string; label: string; available: boolean }>;
}
export const CityFilter = memo<CityFilterProps>(
  ({ selectedCity, onCityChange, cities }) => {
    return (
      <div>
        <h4 className="text-sm font-semibold mb-3 block text-gray-700">City</h4>
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem
                key={city.value}
                value={city.value}
                disabled={!city.available}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{city.label}</span>
                  {!city.available && (
                    <span className="text-xs text-gray-500 ml-2">
                      Coming Soon
                    </span>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
);

// Location Filter Component
interface LocationFilterProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  locations: string[];
  disabled: boolean;
}
export const LocationFilter = memo<LocationFilterProps>(
  ({ selectedLocation, onLocationChange, locations, disabled }) => {
    return (
      <div>
        <h4 className="text-sm font-semibold mb-3 block text-gray-700">
          Location
        </h4>
        <Select
          value={selectedLocation || "all"}
          onValueChange={(value) =>
            onLocationChange(value === "all" ? "" : value)
          }
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
);

// Price Range Filter Component
interface PriceRangeFilterProps {
  priceFilter: number[];
  onPriceChange: (value: number[]) => void;
  min: number;
  max: number;
  step: number;
}
export const PriceRangeFilter = memo<PriceRangeFilterProps>(
  ({ priceFilter, onPriceChange, min, max, step }) => {
    return (
      <div>
        <Label className="text-sm font-semibold mb-3 block text-gray-700">
          Price Range (Monthly)
        </Label>
        <div className="px-2">
          <Slider
            value={priceFilter}
            onValueChange={onPriceChange}
            min={min}
            max={max}
            step={step}
            className="mb-4"
          />
          <div className="flex justify-between">
            <Badge
              variant="outline"
              className="bg-gradient-cool-light text-gradient-cool font-medium"
            >
              ₹{priceFilter[0].toLocaleString()}
            </Badge>
            <Badge
              variant="outline"
              className="bg-gradient-cool-light text-gradient-cool font-medium"
            >
              ₹{priceFilter[1].toLocaleString()}
            </Badge>
          </div>
        </div>
      </div>
    );
  }
);

// Gender Preference Filter Component
interface GenderFilterProps {
  genderPreference: string;
  onGenderChange: (gender: string) => void;
}
export const GenderFilter = memo<GenderFilterProps>(
  ({ genderPreference, onGenderChange }) => {
    const genderOptions = [ { value: "any", label: "Any" }, { value: "men", label: "Men Only" }, { value: "women", label: "Women Only" },{ value: "co-living", label: "Co-living" }];
    return (
      <div>
        <Label className="text-sm font-semibold mb-3 block text-gray-700">
          Gender Preference
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {genderOptions.map((option) => (
            <Button
              key={option.value}
              variant={
                genderPreference === option.value ? "default" : "outline"
              }
              size="sm"
              onClick={() => onGenderChange(option.value)}
              className={
                genderPreference === option.value ? "bg-gradient-cool text-white" : ""
              }
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    );
  }
);

// Rating Filter Component
interface RatingFilterProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}
export const RatingFilter = memo<RatingFilterProps>(
  ({ rating, onRatingChange }) => {
    return (
      <div>
        <Label className="text-sm font-semibold mb-3 block text-gray-700">
          Minimum Rating
        </Label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onRatingChange(star === rating ? 0 : star)}
              className={`p-2 rounded-lg transition-colors ${
                star <= rating
                  ? "text-yellow-400 bg-yellow-50"
                  : "text-gray-300 hover:text-yellow-400"
              }`}
            >
              <Star className="h-5 w-5 fill-current" />
            </button>
          ))}
        </div>
      </div>
    );
  }
);

// Amenities Filter Component
interface AmenitiesFilterProps {
  amenities: string[];
  onAmenityChange: (amenity: string, checked: boolean) => void;
  availableAmenities: string[];
}
export const AmenitiesFilter = memo<AmenitiesFilterProps>(
  ({ amenities, onAmenityChange, availableAmenities }) => {
    return (
      <div>
        <Label className="text-sm font-semibold mb-3 block text-gray-700">
          Amenities ({amenities.length} selected)
        </Label>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
          {availableAmenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-3">
              <Checkbox
                id={amenity}
                checked={amenities.includes(amenity)}
                onCheckedChange={(checked) =>
                  onAmenityChange(amenity, checked === true)
                }
                className="border-2"
              />
              <Label htmlFor={amenity} className="text-sm cursor-pointer">
                {formatText(amenity)}
              </Label>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

// Sharing Type Filter Component
interface SharingTypeFilterProps {
  sharingType: string;
  onSharingTypeChange: (type: string) => void;
}
export const SharingTypeFilter = memo<SharingTypeFilterProps>(
  ({ sharingType, onSharingTypeChange }) => {
    return (
      <div>
        <Label className="text-sm font-semibold mb-3 block text-gray-700">
          Room Sharing
        </Label>
        <Select value={sharingType} onValueChange={onSharingTypeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Sharing</SelectItem>
            <SelectItem value="single">Single Occupancy</SelectItem>
            <SelectItem value="double">Double Sharing</SelectItem>
            <SelectItem value="triple">Triple Sharing</SelectItem>
            <SelectItem value="quad">Quad Sharing</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }
);

// Virtual Tour Filter Component
interface VirtualTourFilterProps {
  virtualTour: boolean;
  onVirtualTourChange: (checked: boolean) => void;
}
export const VirtualTourFilter = memo<VirtualTourFilterProps>(
  ({ virtualTour, onVirtualTourChange }) => {
    return (
      <Card className="bg-gradient-cool text-white border-none">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="virtual-tour"
              checked={virtualTour}
              onCheckedChange={(checked) => onVirtualTourChange(checked === true)}
              className="border-2 bg-gray-100"
            />
            <Label
              htmlFor="virtual-tour"
              className="text-sm font-medium cursor-pointer text-gray-100"
            >
              Virtual Tour Available
            </Label>
          </div>
        </CardContent>
      </Card>
    );
  }
);