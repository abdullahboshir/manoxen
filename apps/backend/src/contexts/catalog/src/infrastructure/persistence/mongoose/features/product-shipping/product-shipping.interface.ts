import type { Document, Types } from "mongoose";

export interface IProductShipping {
  product: Types.ObjectId;
  weight: number; // in kg
  length: number; // in cm
  width: number; // in cm
  height: number; // in cm
  isFragile: boolean;
  requiresSpecialHandling: boolean;
  shippingClass?: string;
  hazmatCode?: string;
  shippingRestrictions?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type IProductShippingDocument = IProductShipping & Document;
