// Property interface based on the API response structure

import { SharingTypeDetails } from "./pg";

export interface Host {
  id: string;
  contactNumber: string;
  user: {
    name: string;
    email:string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
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

interface PgData {
  id: string;
  title: string;
  description: string;
  address: string;
  images: string[];
  propertyType: string;
}


export interface HostRequest {
  id: string;
  hostId: string;
  userId: string;
  pgId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  pgData: PgData;
  user: User;
}

export interface PropertyRequestsApiResponse {
  success: boolean;
  data: HostRequest[];
}