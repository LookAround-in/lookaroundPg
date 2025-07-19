// Property interface based on the API response structure

import { SharingTypeDetails } from "./pg";

export interface Host {
  id: string;
  userId: string;
  contactNumber: string;
  alternateContact: string;
  whatsApp: string;
  Address: string;
  createdAt: string;
  updatedAt: string;
}

export interface Furniture {
  id: string;
  type: string;
  pgDataId: string;
}

export interface Amenity {
  id: string;
  type: string;
  pgDataId: string;
}

export interface Property {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  hostId: string;
  description: string;
  propertyType: string;
  foodIncluded: boolean;
  furnishing: string;
  address: string;
  latitude: number;
  longitude: number;
  pgRules: string;
  moveInStatus: string;
  virtualTourUrl: string;
  images: string[];
  rating: number;
  reviews: string[];
  Host: Host;
  furnitures: Furniture[];
  amenities: Amenity[];
  sharingTypes: SharingTypeDetails[];
}

export interface ExploreApiResponse {
  success: boolean;
  message: string;
  data: Property[];
}

