import { Document } from "mongoose";

export interface IProductShipping {
  product: string;
  // Add properties as needed based on usage
}

export interface IProductShippingDocument extends IProductShipping, Document {}
