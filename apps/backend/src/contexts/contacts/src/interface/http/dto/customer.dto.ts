import { z } from "zod";

export const createCustomerZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  type: z.enum(['individual', 'business']).optional(),
  segment: z.enum(['regular', 'premium', 'vip']).optional(),
  address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipCode: z.string().optional(),
      country: z.string().optional(),
  }).optional(),
  taxId: z.string().optional(),
  contactPerson: z.string().optional(),
  notes: z.string().optional(),
  // Relationships handled by backend usually, but allowing for now if needed or ignored
});

export type CreateCustomerInput = z.infer<typeof createCustomerZodSchema>;
