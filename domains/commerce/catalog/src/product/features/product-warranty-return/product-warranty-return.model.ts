import { Schema, model } from "mongoose";
import type { IProductWarrantyReturnDocument } from "./product-warranty-return.interface";

const productWarrantyReturnSchema = new Schema<IProductWarrantyReturnDocument>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, unique: true },
  warranty: { type: Schema.Types.ObjectId, ref: 'Warranty' },
  returnWindowDays: { type: Number, required: true, default: 30, min: 0 },
  returnType: { 
    type: String, 
    enum: ['no-return', 'no-questions-asked', 'defective-only'],
    default: 'no-questions-asked'
  },
  returnShippingPaidBy: { 
    type: String, 
    enum: ['customer', 'merchant', 'both'],
    default: 'merchant'
  },
  replacementPolicy: { type: String },
  restockingFee: { type: Number, min: 0, max: 100 }
}, {
  timestamps: true
});

export const ProductWarrantyReturn = model<IProductWarrantyReturnDocument>('ProductWarrantyReturn', productWarrantyReturnSchema);
