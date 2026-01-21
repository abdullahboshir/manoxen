import type { IProductPricing as IBasePricing, IProductPricingDocument as IBaseDocument } from "@manoxen/pricing";

export interface IProductPricing extends IBasePricing {
  // Map legacy fields if necessary
  sellingPrice: number; // In @manoxen/pricing this is basePrice or salePrice
}

export type IProductPricingDocument = IProductPricing & IBaseDocument;
