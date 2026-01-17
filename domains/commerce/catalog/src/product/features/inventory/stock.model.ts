import { Schema, model } from "mongoose";
import type { IStockDocument } from "./stock.interface";

const stockSchema = new Schema<IStockDocument>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, unique: true },
  warehouse: { type: Schema.Types.ObjectId, ref: 'Warehouse' },
  quantityOnHand: { type: Number, required: true, default: 0, min: 0 },
  quantityReserved: { type: Number, required: true, default: 0, min: 0 },
  quantityAvailable: { type: Number, required: true, default: 0, min: 0 },
  reorderLevel: { type: Number, default: 10, min: 0 },
  reorderQuantity: { type: Number, default: 50, min: 0 },
  lastRestockDate: { type: Date },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Calculate available quantity
stockSchema.pre('save', function(next) {
  this.quantityAvailable = this.quantityOnHand - this.quantityReserved;
  next();
});

export const Stock = model<IStockDocument>('Stock', stockSchema);
