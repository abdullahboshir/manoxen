import type { Document, Types } from "mongoose";

export interface IProductPricing {
  product: Types.ObjectId;
  costPrice: number; // Cost to business
  basePrice: number; // Manufacturer/Suggested retail price
  sellingPrice: number; // Current selling price
  discountType?: "percentage" | "fixed"; // Type of discount
  discountValue?: number; // Discount percentage or amount
  minPrice?: number; // Minimum allowed price
  maxPrice?: number; // Maximum allowed price
  currency: string; // Currency code (e.g., "USD", "INR")
  taxCategory?: Types.ObjectId; // Reference to Tax
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IProductPricingDocument = IProductPricing & Document;
