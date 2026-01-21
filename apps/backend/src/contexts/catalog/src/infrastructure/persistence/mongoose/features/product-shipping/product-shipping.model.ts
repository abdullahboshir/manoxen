import { Schema, model } from "mongoose";
import type { IProductShippingDocument } from "./product-shipping.interface";


const productShippingSchema = new Schema<IProductShippingDocument>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, unique: true },
  weight: { type: Number, required: true, min: 0 },
  length: { type: Number, required: true, min: 0 },
  width: { type: Number, required: true, min: 0 },
  height: { type: Number, required: true, min: 0 },
  isFragile: { type: Boolean, default: false },
  requiresSpecialHandling: { type: Boolean, default: false },
  shippingClass: { type: String },
  hazmatCode: { type: String },
  shippingRestrictions: [{ type: String }]
}, {
  timestamps: true
});

export const ProductShipping = model<IProductShippingDocument>('ProductShipping', productShippingSchema);
