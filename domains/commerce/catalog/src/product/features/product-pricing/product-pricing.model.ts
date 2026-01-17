import { Schema, model } from "mongoose";
import type { IProductPricingDocument } from "./product-pricing.interface";

const productPricingSchema = new Schema<IProductPricingDocument>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, unique: true },
  costPrice: { type: Number, required: true, min: 0 },
  basePrice: { type: Number, required: true, min: 0 },
  sellingPrice: { type: Number, required: true, min: 0 },
  discountType: { 
    type: String, 
    enum: ['percentage', 'fixed'],
    default: null
  },
  discountValue: { type: Number, min: 0 },
  minPrice: { type: Number, min: 0 },
  maxPrice: { type: Number, min: 0 },
  currency: { type: String, default: 'USD' },
  taxCategory: { type: Schema.Types.ObjectId, ref: 'Tax' },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Validation: sellingPrice should be between minPrice and maxPrice
productPricingSchema.pre('save', function(next) {
  if (this.minPrice && this.maxPrice && this.minPrice > this.maxPrice) {
    next(new Error('minPrice cannot be greater than maxPrice'));
  }
  next();
});

export const ProductPricing = model<IProductPricingDocument>('ProductPricing', productPricingSchema);
