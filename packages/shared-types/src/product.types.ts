import type { Types } from "mongoose";
import type { ModuleName } from "./common.types";

export interface SEOData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

export interface TaxConfiguration {
  taxable: boolean;
  taxClass: string;
  taxRate: number;
  taxInclusive: boolean;
  hscode?: string;
}

export interface BundleProduct {
  product: Types.ObjectId | string;
  quantity: number;
  discount?: number;
}

export interface ProductStatus {
  status: "draft" | "under_review" | "published" | "rejected" | "archived" | "suspended";
  rejectionReason?: string;
  reviewedBy?: Types.ObjectId | string;
  reviewedAt?: Date | string;
  publishedAt?: Date | string;
}

export interface PhysicalProperties {
  weight?: number;
  weightUnit?: "kg" | "g" | "lb";
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: "cm" | "inch";
  };
}

export interface ProductAttributes {
  isOrganic: boolean;
  isElectric: boolean;
  isFragile: boolean;
  isPerishable: boolean;
  isHazardous: boolean;
  isDigital: boolean;
  isService: boolean;
  ageRestricted: boolean;
  minAge?: number;
  prescriptionRequired: boolean;
  prescriptionType?: "online" | "physical";
}

export interface InventoryBase {
  trackQuantity: boolean;
  stock: number;
  reserved: number;
  sold: number;
  lowStockThreshold: number;
  allowBackorder: boolean;
  stockLocation?: string;
  reorderPoint: number;
  backorderLimit?: number;
  stockStatus: "in_stock" | "out_of_stock" | "limited_stock";
}

export interface RatingDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface RatingSummary {
  average: number;
  count: number;
  totalReviews: number;
  verifiedReviews: number;
  helpfulVotes: number;
  distribution: RatingDistribution;
}

export interface DeliveryOptions {
  estimatedDelivery: string;
  estimatedDeliveryBangla?: string;
  availableFor: "home_delivery" | "pickup" | "both";
  cashOnDelivery: boolean;
  installationAvailable: boolean;
  installationCost?: number;
}

export interface IProductCore {
  name: string;
  nameBangla?: string;
  domain: string;
  slug: string;
  sku: string;
  barcode?: string;
  availableModules: ModuleName[];
  translations?: {
    lang: string;
    field: string;
    value: string;
  }[];
  unit?: Types.ObjectId | string;
  organization: Types.ObjectId | string;
  outlet: Types.ObjectId | string;
  businessUnit: Types.ObjectId | string;
  vendor: {
    id: Types.ObjectId | string;
    name: string;
    rating: number;
    isVerified: boolean;
  };
  categories: (Types.ObjectId | string)[];
  primaryCategory: Types.ObjectId | string;
  crossSellProducts?: (Types.ObjectId | string)[];
  upsellProducts?: (Types.ObjectId | string)[];
  brands: (Types.ObjectId | string)[];
  tags: string[];
  tagsBangla?: string[];
  images: string[];
  videos?: string[];
  pricing: Types.ObjectId | string;
  inventory: Types.ObjectId | string;
  shipping: Types.ObjectId | string;
  warranty: Types.ObjectId | string;
  details: Types.ObjectId | string;
  origine: string;
  variantTemplate?: Types.ObjectId | string;
  hasVariants: boolean;
  isBundle: boolean;
  bundleProducts: BundleProduct[];
  bundleDiscount: number;
  ratings: RatingSummary;
  delivery: DeliveryOptions;
  attributes: ProductAttributes;
  productmodel?: string;
  tax: TaxConfiguration;
  compliance: {
    hasCertification: boolean;
    certifications: string[];
    importRestrictions: string[];
    safetyStandards: string[];
  };
  reports: {
    isFeatured: boolean;
    isNew: boolean;
    isPopular: boolean;
    isBestSeller: boolean;
    isTrending: boolean;
    seo: SEOData;
    socialShares: number;
    wishlistCount: number;
  };
  statusInfo: ProductStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
  lastRestockedAt?: Date | string;
  isDeleted?: boolean;
  deletedAt?: Date | string;
}

export interface ICategory {
  organization: Types.ObjectId | string;
  businessUnit: Types.ObjectId | string;
  domain: string;
  name: string;
  description?: string;
  code?: string;
  slug?: string;
  image?: string;
  availableModules?: ModuleName[];
  isActive?: boolean;
  parentId?: Types.ObjectId | string | null;
  level?: number;
  path?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  isDeleted?: boolean;
  deletedAt?: Date | string;
}

export interface IBrand {
  name: string;
  domain: string;
  slug?: string;
  description?: string;
  logo?: string;
  website?: string;
  status: "active" | "inactive";
  availableModules: ModuleName[];
  businessUnit?: Types.ObjectId | string;
  organization?: Types.ObjectId | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ITax {
  _id?: string;
  name: string;
  rate: number;
  type: 'percentage' | 'fixed';
  availableModules: ModuleName[];
  businessUnit: Types.ObjectId | string | null;
  organization: Types.ObjectId | string | null;
  isDefault: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdBy?: Types.ObjectId | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IUnit {
  _id?: string;
  name: string;
  symbol: string;
  status: 'active' | 'inactive';
  businessUnit: Types.ObjectId | string | null;
  organization: Types.ObjectId | string | null;
  relatedBusinessTypes?: string[];
  module: ModuleName;
  createdBy?: Types.ObjectId | string;
  isDeleted: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IWarranty {
  name: string;
  duration: number;
  periodUnit: "days" | "weeks" | "months" | "years";
  type: "seller" | "manufacturer" | "brand";
  description?: string;
  termsConditions?: string;
  availableModules: string[] | ModuleName[];
  isActive: boolean;
  organization: Types.ObjectId | string;
  businessUnit?: Types.ObjectId | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
