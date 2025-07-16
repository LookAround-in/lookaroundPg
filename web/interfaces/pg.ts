// Enums (define these based on your Prisma schema)
export enum PropertyType {
  PG = "PG",
  HOSTEL = "HOSTEL",
  APARTMENT = "APARTMENT"
}

export enum FurnishingType {
  FULLY_FURNISHED = "FULLY_FURNISHED",
  SEMI_FURNISHED = "SEMI_FURNISHED",
  UNFURNISHED = "UNFURNISHED"
}

export enum Furniture {
  BED = "BED",
  WARDROBE = "WARDROBE",
  STUDY_TABLE = "STUDY_TABLE",
  CHAIR = "CHAIR",
  AC = "AC",
  FAN = "FAN"
}

export enum Amenity {
  WIFI = "WIFI",
  AC = "AC",
  LAUNDRY = "LAUNDRY",
  PARKING = "PARKING",
  SECURITY = "SECURITY",
  GYM = "GYM",
  MESS = "MESS"
}

export enum SharingType {
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE",
  TRIPLE = "TRIPLE",
  DORMITORY = "DORMITORY"
}

export enum MoveInStatus {
  IMMEDIATE = "IMMEDIATE",
  AVAILABLE = "AVAILABLE",
  NOT_AVAILABLE = "NOT_AVAILABLE"
}

// Complete PgData interface matching Prisma model
export interface PgData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  hostId: string;
  description?: string;
  propertyType: PropertyType;
  foodIncluded: boolean;
  furnishing: FurnishingType;
  address: string;
  latitude: number;
  longitude: number;
  furnitures: Furniture[];
  amenities: Amenity[];
  sharingTypes: SharingType[];
  pgRules?: string;
  moveInStatus: MoveInStatus;
  virtualTourUrl?: string;
  images: string[];
  hostName?: string;
  hostContact?: string;
  rating: number;
  reviews: string[];
}

// Request body interface for creating PG 
export interface CreatePgRequest {
  pgData: {
    title: string;
    hostId: string;
    description?: string;
    propertyType: PropertyType;
    foodIncluded?: boolean;
    furnishing: FurnishingType;
    address: string;
    latitude: number;
    longitude: number;
    furnitures?: Furniture[];
    amenities?: Amenity[];
    sharingTypes: SharingType[];
    pgRules?: string;
    moveInStatus: MoveInStatus;
    virtualTourUrl?: string;
    images?: string[];
    hostName?: string;
    hostContact?: string;
    rating?: number;
    reviews?: string[];
  };
}

// Update request interface
export interface UpdatePgRequest {
  pgData: Partial<Omit<CreatePgRequest['pgData'], 'hostId'>>;
}

// Response interfaces
export interface PgResponse {
  success: boolean;
  message: string;
  data?: PgData;
  error?: string;
}

export interface PgListResponse {
  success: boolean;
  message: string;
  data?: PgData[];
  error?: string;
}

// Enhanced sharing type interface for detailed pricing
export interface SharingTypeDetails {
  type: SharingType;
  description?: string;
  price: number;
  availability: number;
  pricePerMonth: number;
  pricePerDay?: number;
  deposit: number;
  refundableDeposit?: boolean;
  refundableAmount: number;
  maintainanceCharges?: number;
  electricityCharges?: number;
  waterCharges?: number;
  maintenanceIncluded?: boolean;
}
