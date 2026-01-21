import { Document } from "mongoose";

export interface IProductVariant {
  product: string;
  hasVariants: boolean;
  variantAttributes: Array<{
    name: string;
    values: string[];
    displayType: string;
    sortOrder: number;
  }>;
  variants: Array<{
    variantId: string;
    parentProduct: string;
    sku: string;
    barcode?: string;
    attributes: Map<string, string>;
    pricing: {
       basePrice: number;
       salePrice?: number;
       costPrice: number;
       currency: string;
    };
    inventory: {
       stock: number;
       reserved: number;
       sold: number;
       lowStockThreshold: number;
       allowBackorder: boolean;
    };
    images: string[];
    physicalProperties?: any;
    status: string;
    isDefault: boolean;
    sortOrder: number;
  }>;
}

export interface IProductVariantDocument extends IProductVariant, Document {}
