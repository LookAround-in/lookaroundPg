// Enums (define these based on your Prisma schema)
export enum PropertyType {
  MEN = "MEN",
  WOMEN = "WOMEN",
  COLIVE = "COLIVE",
}

export enum FurnishingType {
  FURNISHED = "FURNISHED",
  SEMI_FURNISHED = "SEMI_FURNISHED",
  UNFURNISHED = "UNFURNISHED",
}

export enum FurnitureType {
  BED = "BED",
  SOFA = "SOFA",
  TABLE = "TABLE",
  CHAIR = "CHAIR",
  WARDROBE = "WARDROBE",
  FRIDGE = "FRIDGE",
  WASHING_MACHINE = "WASHING_MACHINE",
  AIR_CONDITIONER = "AIR_CONDITIONER",
  MICROWAVE = "MICROWAVE",
  TELEVISION = "TELEVISION",
  WATER_PURIFIER = "WATER_PURIFIER",
  GAS_STOVE = "GAS_STOVE",
  KITCHEN_APPLIANCES = "KITCHEN_APPLIANCES",
  FURNITURE_OTHER = "FURNITURE_OTHER",
  NONE = "NONE",
}

export enum AmenityType {
  PARKING = "PARKING",
  WIFI = "WIFI",
  GYM = "GYM",
  SWIMMING_POOL = "SWIMMING_POOL",
  SECURITY = "SECURITY",
  POWER_BACKUP = "POWER_BACKUP",
  LIFT = "LIFT",
  PET_FRIENDLY = "PET_FRIENDLY",
  GARDEN = "GARDEN",
  PLAY_AREA = "PLAY_AREA",
  CLUBHOUSE = "CLUBHOUSE",
  HOUSEKEEPING = "HOUSEKEEPING",
  MAINTENANCE = "MAINTENANCE",
  CCTV = "CCTV",
  COMMON_AREA = "COMMON_AREA",
  LAUNDRY = "LAUNDRY",
  GARBAGE_DISPOSAL = "GARBAGE_DISPOSAL",
  COMMUNITY_EVENTS = "COMMUNITY_EVENTS",
  AMENITIES_OTHER = "AMENITIES_OTHER",
}

export enum SharingType {
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE",
  TRIPLE = "TRIPLE",
  QUAD = "QUAD",
}

export enum MoveInStatus {
  IMMEDIATE = "IMMEDIATE",
  WITHIN_ONE_WEEK = "WITHIN_ONE_WEEK",
  WITHIN_TWO_WEEKS = "WITHIN_TWO_WEEKS",
  WITHIN_ONE_MONTH = "WITHIN_ONE_MONTH",
}

export interface PgData {
  id: string;
  title: string;
  hostId: string;
  description?: string;
  propertyType: PropertyType;
  foodIncluded?: boolean;
  furnishing: FurnishingType;
  address: string;
  latitude: number;
  longitude: number;
  furnitures: FurnitureType[];
  amenities: AmenityType[];
  sharingTypes: SharingTypeDetails[];
  pgRules?: string;
  moveInStatus: MoveInStatus;
  virtualTourUrl?: string;
  images: string[];
  rating: number;
  reviews: string[];
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

export type PgCreateInput = Omit<PgData, "id" | "createdAt" | "updatedAt"> & {
  rating?: number;
  reviews?: string[];
};

export interface PgRequestData {
  hostId: string;
  userId: string;
  pgId: string;
}