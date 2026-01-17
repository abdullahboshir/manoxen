import type { Document, Model, Types } from "mongoose";
import type { IProductCore as IBaseProductCore } from "@manoxen/shared-types";

export interface IProductCore extends IBaseProductCore {
  unit?: Types.ObjectId;
  organization: Types.ObjectId;
  outlet: Types.ObjectId;
  businessUnit: Types.ObjectId;
  vendor: {
    id: Types.ObjectId;
    name: string;
    rating: number;
    isVerified: boolean;
  };
  categories: Types.ObjectId[];
  primaryCategory: Types.ObjectId;
  crossSellProducts?: Types.ObjectId[];
  upsellProducts?: Types.ObjectId[];
  brands: Types.ObjectId[];
  pricing: Types.ObjectId;
  inventory: Types.ObjectId;
  shipping: Types.ObjectId;
  warranty: Types.ObjectId;
  details: Types.ObjectId;
  variantTemplate?: Types.ObjectId;
  statusInfo: IBaseProductCore['statusInfo'] & {
    reviewedBy?: Types.ObjectId;
  };
}

export type IProductDocument = IProductCore & Document & {
    isNewProduct: boolean;
    isBundleProduct: boolean;
    hasVariantsAvailable: boolean;

    addToWishlist(): Promise<void>;
  };

export interface IProductModel extends Model<IProductDocument> {
  findByOutlet(outletId: string | Types.ObjectId): Promise<IProductDocument[]>;
  searchProducts(query: string, filters?: any): Promise<IProductDocument[]>;
  getSimilarProducts(
    productId: string | Types.ObjectId,
    limit?: number
  ): Promise<IProductDocument[]>;
}




