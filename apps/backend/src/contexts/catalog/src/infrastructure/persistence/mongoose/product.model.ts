import { Schema, Types, model, Document, Model } from "mongoose";
import type { IProduct } from "../../../domain/entities/product.entity";
import { BundleProductSchema, DeliveryOptionsSchema, ProductAttributesSchema, ProductStatusSchema, RatingSummarySchema, SEOSchema, TaxConfigurationSchema } from "./product-shared.model";
import { contextScopePlugin } from "@manoxen/core-util";

export interface IProductDocument extends IProduct, Document {
  isNewProduct: boolean;
  isBundleProduct: boolean;
  hasVariantsAvailable: boolean;
  reports: IProduct['reports'];
  addToWishlist(): Promise<void>;
}

export interface IProductModel extends Model<IProductDocument> {
  findByOutlet(outletId: string | Types.ObjectId): Promise<IProductDocument[]>;
  searchProducts(query: string, filters?: any): Promise<IProductDocument[]>;
  getSimilarProducts(productId: string | Types.ObjectId, limit?: number): Promise<IProductDocument[]>;
}

const productSchema = new Schema<IProductDocument, IProductModel>({
  name: { type: String, required: true, trim: true, index: true },
  nameBangla: { type: String, trim: true },
  domain: {
    type: String,
    enum: ["retail", "pharmacy", "grocery", "restaurant", "electronics", "fashion", "service", "construction", "automotive", "health", "hospitality", "other"],
    default: "retail",
    index: true
  },
  slug: { type: String, required: true, unique: true },
  sku: { type: String, required: true, unique: true },
  barcode: { type: String, unique: true, sparse: true },
  translations: [{
    lang: { type: String, required: true },
    field: { type: String, required: true },
    value: { type: String, required: true }
  }],
  images: [{ type: String, required: true }],
  videos: [{ type: String, trim: true }],
  unit: { type: Schema.Types.ObjectId as any, ref: 'Unit' },

  organization: { type: Schema.Types.ObjectId as any, ref: 'Organization', required: true, index: true },
  outlet: {
    type: Schema.Types.ObjectId as any,
    ref: "Outlet",
    required: false,
    index: true,
  },
  businessUnit: { type: Schema.Types.ObjectId as any, ref: 'BusinessUnit', required: true, index: true },
  vendor: {
    id: { type: Schema.Types.ObjectId as any, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    isVerified: { type: Boolean, default: false }
  },
  categories: [{ type: Schema.Types.ObjectId as any, ref: 'Category', required: true }],
  primaryCategory: { type: Schema.Types.ObjectId as any, ref: 'Category', required: true },

  crossSellProducts: [{ type: Schema.Types.ObjectId as any, ref: 'Product' }],
  upsellProducts: [{ type: Schema.Types.ObjectId as any, ref: 'Product' }],
  brands: [{ type: Schema.Types.ObjectId as any, ref: 'Brand' }],
  tags: [{ type: String, trim: true }],
  tagsBangla: [{ type: String, trim: true }],

  pricing: { type: Schema.Types.ObjectId as any, ref: 'ProductPricing', required: true },
  inventory: { type: Schema.Types.ObjectId as any, ref: 'Stock', required: true },
  shipping: { type: Schema.Types.ObjectId as any, ref: 'ProductShipping', required: true },
  warranty: { type: Schema.Types.ObjectId as any, ref: 'ProductWarrantyReturn', required: true },
  details: { type: Schema.Types.ObjectId as any, ref: 'ProductDetails', required: true },

  hasVariants: { type: Boolean, default: false },
  variantTemplate: { type: Schema.Types.ObjectId as any, ref: 'ProductVariant' },

  isBundle: { type: Boolean, default: false },
  bundleProducts: [BundleProductSchema],
  bundleDiscount: { type: Number, default: 0, min: 0, max: 100 },

  ratings: { type: RatingSummarySchema, default: () => ({}) },
  delivery: { type: DeliveryOptionsSchema, required: true },
  attributes: { type: ProductAttributesSchema, default: () => ({}) },

  productmodel: { type: String },
  origine: { type: String },

  tax: { type: TaxConfigurationSchema, required: true },
  compliance: {
    hasCertification: { type: Boolean, default: false },
    certifications: [{ type: String }],
    importRestrictions: [{ type: String }],
    safetyStandards: [{ type: String }]
  },

  reports: {
    isFeatured: { type: Boolean, default: false, index: true },
    isNew: { type: Boolean, default: false, index: true },
    isPopular: { type: Boolean, default: false, index: true },
    isBestSeller: { type: Boolean, default: false, index: true },
    isTrending: { type: Boolean, default: false, index: true },
    seo: { type: SEOSchema, required: true },
    socialShares: { type: Number, default: 0 },
    wishlistCount: { type: Number, default: 0 }
  },

  statusInfo: { type: ProductStatusSchema, default: () => ({}) },

  availableModules: {
    type: [String],
    enum: ['pos', 'erp', 'hrm', 'commerce', 'crm', 'logistics', 'accounting', 'reports', 'system'],
    default: ['pos', 'commerce'],
    index: true
  },

  isDeleted: { type: Boolean, default: false, select: false },
  deletedAt: { type: Date },

  lastRestockedAt: { type: Date }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

productSchema.index({ businessUnit: 1 });
productSchema.index({ 'vendor.id': 1, createdAt: -1 });
productSchema.index({ categories: 1 });
productSchema.index({ brands: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ name: 'text', sku: 'text', tags: 'text' });

productSchema.virtual('isNewProduct').get(function (this: IProductDocument) {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  return this.createdAt > thirtyDaysAgo;
});

productSchema.virtual('isBundleProduct').get(function (this: IProductDocument) {
  return this.isBundle;
});

productSchema.virtual('hasVariantsAvailable').get(function (this: IProductDocument) {
  return this.hasVariants && this.variantTemplate !== undefined;
});

productSchema.methods['addToWishlist'] = async function (this: IProductDocument): Promise<void> {
  if (this.reports) {
    this.reports.wishlistCount += 1;
    await this.save();
  }
};

productSchema.statics['findByOutlet'] = async function (
  outletId: string | Types.ObjectId
): Promise<IProductDocument[]> {
  return this.find({ outlet: outletId, 'statusInfo.status': 'published' });
};

productSchema.statics['searchProducts'] = async function (query: string, filters: any = {}): Promise<IProductDocument[]> {
  const searchFilter: any = {
    $or: [
      { $text: { $search: query } },
      { sku: query },
      { barcode: query }
    ],
    'statusInfo.status': 'published'
  };

  if (filters.categories) searchFilter.categories = { $in: filters.categories };
  if (filters.brands) searchFilter.brands = { $in: filters.brands };

  return this.find(searchFilter)
    .populate('pricing inventory')
    .sort({ score: { $meta: "textScore" } });
};

productSchema.statics['getSimilarProducts'] = async function (productId: string | Types.ObjectId, limit: number = 10): Promise<IProductDocument[]> {
  const product = await this.findById(productId);
  if (!product) return [];

  return this.find({
    _id: { $ne: productId },
    categories: { $in: product.categories },
    'statusInfo.status': 'published'
  })
    .limit(limit)
    .populate('pricing inventory');
};

productSchema.pre(/^find/, function (this: any, next) {
  if (this.getQuery().isDeleted === true) {
    return next();
  }
  this.where({ isDeleted: { $ne: true } });
  next();
});

export const Product = model<IProductDocument, IProductModel>('Product', productSchema);

productSchema.plugin(contextScopePlugin, {
  organizationField: 'organization',
  businessUnitField: 'businessUnit',
  outletField: 'outlet'
});
