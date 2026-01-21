import type { TaxConfiguration } from "@manoxen/shared-types";
import type { Document, Types } from "mongoose";

export interface IPriceComponent {
  name: string;
  amount: number;
  type: 'base' | 'tax' | 'discount' | 'shipping' | 'fee';
}

export interface IPriceBreakdown {
  total: number;
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  components: IPriceComponent[];
  currency: string;
}

export interface IPricingContext {
  userId?: string;
  businessUnitId?: string;
  currency: string;
  countryCode?: string;
}

export interface IProductPricing {
  product: Types.ObjectId;
  domain: string;

  // Base Pricing
  basePrice: number;
  salePrice?: number;
  currency: "BDT" | "USD" | string;
  costPrice: number;
  profitMargin: number;
  profitMarginType: "percentage" | "fixed";

  // Discount System
  discount: {
    amount: number;
    type: "percentage" | "fixed";
    startDate?: Date;
    endDate?: Date;
    isActive: boolean;
  };

  // Wholesale Pricing
  wholesaleTiers: {
    minQuantity: number;
    maxQuantity?: number;
    price: number;
    enabled: boolean;
  }[];

  // Commission
  commission: {
    rate: number;
    type: "percentage" | "fixed";
    calculationBase: "selling_price" | "base_price";
    minimumFee?: number;
  };

  // Tax Configuration
  tax: TaxConfiguration;

  // Flash Sale Pricing
  flashSale?: {
    price: number;
    stock: number;
    sold: number;
    startDate: Date;
    endDate: Date;
    limitPerCustomer: number;
  };

  // Price History
  priceHistory: {
    date: Date;
    basePrice: number;
    salePrice?: number;
    reason: "regular" | "sale" | "flash_sale" | "adjustment";
  }[];

  updatedAt: Date;
}

export type IProductPricingDocument = IProductPricing &
  Document & {
    calculateFinalPrice(quantity?: number): number;
    calculateCommission(quantity?: number): number;
    calculateTax(quantity?: number): number;
    isFlashSaleActive(): boolean;
    isDiscountActive(): boolean;
  };
