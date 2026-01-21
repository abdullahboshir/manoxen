import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

const urlSchema = z.string().url().optional().or(z.literal(''));

const createOutletBaseSchema = z.object({
  name: z.string().min(1, "Outlet name is required").max(100),
  description: z.string().max(500).optional(),
  businessUnit: objectIdSchema,
  organization: objectIdSchema,
  
  branding: z.object({
    logo: urlSchema,
    banner: urlSchema,
  }).optional(),

  contact: z.object({
    email: z.string().email(),
    phone: z.string().min(5).max(20),
  }),

  location: z.object({
    address: z.string().min(5).max(200),
    city: z.string().min(1).max(50),
    state: z.string().min(1).max(50),
    country: z.string().min(1).max(50),
    postalCode: z.string().min(1).max(20),
    coordinates: z.object({
      lat: z.number().optional(),
      lng: z.number().optional(),
    }).optional(),
  }),

  activeModules: z.record(z.string(), z.boolean()).optional(),
  status: z.enum(["active", "inactive", "suspended"]).optional(),
});

export const createOutletValidationSchema = z.object({
  body: createOutletBaseSchema
});

export const updateOutletValidationSchema = z.object({
  body: createOutletBaseSchema.partial()
});
