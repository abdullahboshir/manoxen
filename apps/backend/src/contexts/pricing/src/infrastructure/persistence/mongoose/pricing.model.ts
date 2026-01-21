import { Schema, model } from "mongoose";
import type { IProductPricingDocument } from "../../../domain/entities/pricing.entity";
import { TaxConfigurationSchema } from "@manoxen/catalog";

const pricingSchema = new Schema<IProductPricingDocument>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, unique: true },
  domain: {
    type: String,
    enum: ["retail", "pharmacy", "grocery", "restaurant", "electronics", "fashion", "service", "construction", "automotive", "health", "hospitality", "other"],
    default: "retail",
    index: true
  },

  // Base Pricing
  basePrice: { type: Number, required: true, min: 0 },
  salePrice: { type: Number, min: 0 },
  currency: { type: String, default: "BDT" },
  costPrice: { type: Number, required: true, min: 0 },
  profitMargin: { type: Number, required: true, min: 0 },
  profitMarginType: { type: String, enum: ["percentage", "fixed"], default: "percentage" },

  // Discount System
  discount: {
    amount: { type: Number, default: 0, min: 0 },
    type: { type: String, enum: ["percentage", "fixed"], default: "percentage" },
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: false }
  },

  // Wholesale Pricing
  wholesaleTiers: [{
    minQuantity: { type: Number, required: true, min: 1 },
    maxQuantity: { type: Number, min: 1 },
    price: { type: Number, required: true, min: 0 },
    enabled: { type: Boolean, default: true }
  }],

  // Commission
  commission: {
    rate: { type: Number, default: 0, min: 0, max: 100 },
    type: { type: String, enum: ["percentage", "fixed"], default: "percentage" },
    calculationBase: { type: String, enum: ["selling_price", "base_price"], default: "selling_price" },
    minimumFee: { type: Number, default: 0, min: 0 }
  },

  // Tax Configuration
  tax: { type: TaxConfigurationSchema, required: true },

  // Flash Sale Pricing
  flashSale: {
    price: { type: Number, min: 0 },
    stock: { type: Number, min: 0 },
    sold: { type: Number, default: 0, min: 0 },
    startDate: { type: Date },
    endDate: { type: Date },
    limitPerCustomer: { type: Number, min: 1 }
  },

  // Price History
  priceHistory: [{
    date: { type: Date, default: Date.now },
    basePrice: { type: Number, required: true },
    salePrice: { type: Number },
    reason: {
      type: String,
      enum: ["regular", "sale", "flash_sale", "adjustment"],
      default: "regular"
    }
  }]
}, {
  timestamps: true
});

// ==================== INSTANCE METHODS ====================

pricingSchema.methods['calculateFinalPrice'] = function (quantity: number = 1): number {
  let finalPrice = this['basePrice'];

  if (this['salePrice'] && this['salePrice'] > 0) {
    finalPrice = this['salePrice'];
  }

  if (this['discount'].isActive && this['isDiscountActive']()) {
    if (this['discount'].type === 'percentage') {
      finalPrice = finalPrice * (1 - this['discount'].amount / 100);
    } else {
      finalPrice = Math.max(0, finalPrice - this['discount'].amount);
    }
  }

  if (this['wholesaleTiers'] && this['wholesaleTiers'].length > 0) {
    const applicableTier = this['wholesaleTiers']
      .filter((tier: any) => tier.enabled)
      .sort((a: any, b: any) => b.minQuantity - a.minQuantity)
      .find((tier: any) => quantity >= tier.minQuantity && (!tier.maxQuantity || quantity <= tier.maxQuantity));

    if (applicableTier) {
      finalPrice = applicableTier.price;
    }
  }

  if (this['isFlashSaleActive']()) {
    finalPrice = this['flashSale']!.price;
  }

  return Math.max(0, finalPrice * quantity);
};

pricingSchema.methods['calculateCommission'] = function (quantity: number = 1): number {
  const finalPrice = this['calculateFinalPrice'](quantity);
  let commission = 0;

  if (this['commission'].type === 'percentage') {
    commission = finalPrice * (this['commission'].rate / 100);
  } else {
    commission = this['commission'].rate;
  }

  if (this['commission'].minimumFee && commission < this['commission'].minimumFee) {
    commission = this['commission'].minimumFee;
  }

  return commission;
};

pricingSchema.methods['calculateTax'] = function (quantity: number = 1): number {
  if (!this['tax'].taxable) return 0;
  const finalPrice = this['calculateFinalPrice'](quantity);
  if (this['tax'].taxInclusive) {
    return finalPrice * (this['tax'].taxRate / (100 + this['tax'].taxRate));
  } else {
    return finalPrice * (this['tax'].taxRate / 100);
  }
};

pricingSchema.methods['isFlashSaleActive'] = function (): boolean {
  if (!this['flashSale']) return false;
  const now = new Date();
  return this['flashSale'].startDate <= now &&
    this['flashSale'].endDate >= now &&
    this['flashSale'].stock > this['flashSale'].sold;
};

pricingSchema.methods['isDiscountActive'] = function (): boolean {
  if (!this['discount'].isActive) return false;
  const now = new Date();
  const hasStarted = !this['discount'].startDate || this['discount'].startDate <= now;
  const hasEnded = this['discount'].endDate && this['discount'].endDate < now;
  return hasStarted && !hasEnded;
};

export const ProductPricing = model<IProductPricingDocument>('ProductPricing', pricingSchema);
