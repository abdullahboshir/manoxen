import type { Document, Types } from "mongoose";

export interface IProductWarrantyReturn {
  product: Types.ObjectId;
  warranty?: Types.ObjectId; // Reference to Warranty
  returnWindowDays: number; // Days within which product can be returned
  returnType: "no-return" | "no-questions-asked" | "defective-only";
  returnShippingPaidBy: "customer" | "merchant" | "both";
  replacementPolicy?: string;
  restockingFee?: number; // As percentage
  createdAt: Date;
  updatedAt: Date;
}

export type IProductWarrantyReturnDocument = IProductWarrantyReturn & Document;
