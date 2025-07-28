import { z } from 'zod';
import { 
  PropertyType, 
  FurnishingType, 
  FurnitureType, 
  AmenityType, 
  SharingType, 
  MoveInStatus,
} from '../interfaces/pg';

// Enum schemas based on your existing enums
export const PropertyTypeSchema = z.nativeEnum(PropertyType);
export const FurnishingTypeSchema = z.nativeEnum(FurnishingType);
export const FurnitureTypeSchema = z.nativeEnum(FurnitureType);
export const AmenityTypeSchema = z.nativeEnum(AmenityType);
export const SharingTypeSchema = z.nativeEnum(SharingType);
export const MoveInStatusSchema = z.nativeEnum(MoveInStatus);

// Sharing Type Details Schema
export const SharingTypeDetailsSchema = z.object({
  type: SharingTypeSchema,
  description: z.string()
    .min(1, 'Description is required')
    .max(200, 'Description must be less than 200 characters')
    .optional(),
  price: z.number()
    .min(0, 'Price must be non-negative'),
  availability: z.number()
    .int('Availability must be a whole number')
    .min(1, 'Availability must be at least 1'),
  pricePerMonth: z.number()
    .min(1, 'Monthly price must be greater than 0'),
  pricePerDay: z.number()
    .min(0, 'Daily price must be non-negative')
    .optional(),
  deposit: z.number()
    .min(0, 'Deposit must be non-negative'),
  refundableDeposit: z.boolean()
    .optional(),
  refundableAmount: z.number()
    .min(0, 'Refundable amount must be non-negative'),
  maintainanceCharges: z.number()
    .min(0, 'Maintenance charges must be non-negative')
    .optional(),
  electricityCharges: z.number()
    .min(0, 'Electricity charges must be non-negative')
    .optional(),
  waterCharges: z.number()
    .min(0, 'Water charges must be non-negative')
    .optional(),
  maintenanceIncluded: z.boolean()
    .optional()
})

// Main PG Data Schema
export const PgDataSchema = z.object({
  id: z.string()
    .uuid('ID must be a valid UUID'),
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters')
    .trim(),
  hostId: z.string()
    .uuid('ID must be a valid UUID'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .trim()
    .optional(),
  propertyType: PropertyTypeSchema,
  foodIncluded: z.boolean()
    .optional(),
  furnishing: FurnishingTypeSchema,
  address: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters')
    .trim(),
  latitude: z.number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  longitude: z.number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
  furnitures: z.array(FurnitureTypeSchema)
    .refine((arr) => new Set(arr).size === arr.length, {
      message: 'Duplicate furniture types are not allowed'
    }),
  amenities: z.array(AmenityTypeSchema)
    .refine((arr) => new Set(arr).size === arr.length, {
      message: 'Duplicate amenity types are not allowed'
    }),
  sharingTypes: z.array(SharingTypeDetailsSchema)
    .min(1, 'At least one sharing type is required')
    .refine((arr) => {
      const types = arr.map(st => st.type);
      return new Set(types).size === types.length;
    }, {
      message: 'Duplicate sharing types are not allowed'
    }),
  pgRules: z.string()
    .min(1, 'PG rules cannot be empty')
    .optional(),
  moveInStatus: MoveInStatusSchema,
  virtualTourUrl: z.string()
    .url('Virtual tour URL must be a valid URL')
    .optional(),
  images: z.array(z.string().url('Each image must be a valid URL'))
    .max(10, 'Maximum 10 images allowed'),
})

// Create PG Schema (without ID for creation)
export const CreatePgDataSchema = PgDataSchema.omit({ id: true });

// Update PG Schema (partial with required ID)
export const UpdatePgDataSchema = PgDataSchema.partial().extend({
  id: z.string().uuid('Property ID must be a valid UUID')
});

// Form validation schema (more lenient for client-side)
export const PgFormSchema = CreatePgDataSchema.extend({
  latitude: z.union([z.number(), z.string()]).transform((val) => Number(val)),
  longitude: z.union([z.number(), z.string()]).transform((val) => Number(val)),
  pgRules: z.union([
    z.string().min(1, 'PG rules cannot be empty'),
    z.array(z.string().min(1, 'Rule cannot be empty'))
      .min(1, 'At least one rule is required')
  ]).transform((val) => {
    return Array.isArray(val) ? val.join(', ') : val;
  }).optional(),
}).refine((data) => {
  return !isNaN(data.latitude) && !isNaN(data.longitude);
}, {
  message: "Latitude and longitude must be valid numbers"
});

// Sharing Type form schema for adding individual sharing types
export const SharingTypeFormSchema = z.object({
  type: SharingTypeSchema,
  description: z.string()
    .min(1, 'Description is required')
    .transform((val) => val.trim()),
  price: z.union([z.number(), z.string()])
    .transform((val) => Number(val) || 0),
  pricePerMonth: z.union([z.number(), z.string()])
    .transform((val) => Number(val))
    .refine((val) => val > 0, 'Monthly price must be greater than 0'),
  deposit: z.union([z.number(), z.string()])
    .transform((val) => Number(val) || 0),
  refundableAmount: z.union([z.number(), z.string()])
    .transform((val) => Number(val) || 0),
  availability: z.union([z.number(), z.string()])
    .transform((val) => Number(val))
    .refine((val) => val > 0, 'Availability must be greater than 0'),
});

// Error formatting helper
export const formatZodErrors = (errors: z.ZodError) => {
  return errors.errors.reduce((acc, error) => {
    const path = error.path.join('.');
    acc[path] = error.message;
    return acc;
  }, {} as Record<string, string>);
};

// Type exports (re-export from interfaces for convenience)
export type { PgData, SharingTypeDetails } from '../interfaces/pg';
export type CreatePgData = z.infer<typeof CreatePgDataSchema>;
export type UpdatePgData = z.infer<typeof UpdatePgDataSchema>;
export type PgForm = z.infer<typeof PgFormSchema>;
export type SharingTypeForm = z.infer<typeof SharingTypeFormSchema>;

export const reviewFormSchema = z.object({
  comment: z
    .string()
    .min(10, {
      message: "Comment must be at least 10 characters.",
    })
    .max(160, {
      message: "Comment must not be longer than 160 characters.",
    }),
  rating:  z.number()
    .min(0, 'Rating must be between 0 and 5')
    .max(5, 'Rating must be between 0 and 5'),
})