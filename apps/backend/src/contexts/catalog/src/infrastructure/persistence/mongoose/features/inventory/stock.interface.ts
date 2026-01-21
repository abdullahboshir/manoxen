import type { Document, Types } from "mongoose";

export interface IStock {
  product: Types.ObjectId;
  warehouse?: Types.ObjectId;
  quantityOnHand: number; // Current quantity in stock
  quantityReserved: number; // Quantity reserved for orders
  quantityAvailable: number; // Available for sale
  reorderLevel: number; // Minimum quantity before reorder
  reorderQuantity: number; // Quantity to order when hitting reorder level
  lastRestockDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IStockDocument = IStock & Document;
