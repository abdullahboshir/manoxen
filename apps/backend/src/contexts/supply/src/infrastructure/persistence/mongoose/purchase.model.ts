import { Schema, model, Document, Types } from "mongoose";
import mongoose from "mongoose";
import { contextScopePlugin } from "@manoxen/core-util";

/**
 * Purchase Document Interface
 * Represents a purchase order from a supplier
 */
export interface IPurchaseDocument extends Document {
  organization: Types.ObjectId;
  businessUnit: Types.ObjectId;
  outlet?: Types.ObjectId;
  supplier: Types.ObjectId;
  
  // Purchase Details
  referenceNumber: string;
  purchaseDate: Date;
  expectedDeliveryDate?: Date;
  deliveryDate?: Date;
  
  // Items
  items: Array<{
    product: Types.ObjectId;
    quantity: number;
    unitPrice: number;
    discount: number;
    tax: number;
    total: number;
  }>;
  
  // Financials
  subTotal: number;
  totalDiscount: number;
  totalTax: number;
  shippingCost: number;
  grandTotal: number;
  paidAmount: number;
  dueAmount: number;
  
  // Payment
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  paymentMethod?: string;
  
  // Status
  status: 'draft' | 'pending' | 'ordered' | 'received' | 'partial_received' | 'cancelled' | 'returned';
  
  // Additional
  notes?: string;
  attachments?: string[];
  createdBy?: Types.ObjectId;
  
  createdAt: Date;
  updatedAt: Date;
}

const purchaseItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0 },
  tax: { type: Number, default: 0, min: 0 },
  total: { type: Number, required: true, min: 0 }
}, { _id: false });

const purchaseSchema = new Schema<IPurchaseDocument>({
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
  businessUnit: { type: Schema.Types.ObjectId, ref: 'BusinessUnit', required: true, index: true },
  outlet: { type: Schema.Types.ObjectId, ref: 'Outlet', index: true },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true, index: true },
  
  referenceNumber: { type: String, required: true, unique: true },
  purchaseDate: { type: Date, default: Date.now, required: true },
  expectedDeliveryDate: { type: Date },
  deliveryDate: { type: Date },
  
  items: [purchaseItemSchema],
  
  // Financials
  subTotal: { type: Number, required: true, min: 0 },
  totalDiscount: { type: Number, default: 0, min: 0 },
  totalTax: { type: Number, default: 0, min: 0 },
  shippingCost: { type: Number, default: 0, min: 0 },
  grandTotal: { type: Number, required: true, min: 0 },
  paidAmount: { type: Number, default: 0, min: 0 },
  dueAmount: { type: Number, default: 0, min: 0 },
  
  // Payment
  paymentStatus: { 
    type: String, 
    enum: ['unpaid', 'partial', 'paid'], 
    default: 'unpaid',
    index: true 
  },
  paymentMethod: { type: String },
  
  // Status
  status: { 
    type: String, 
    enum: ['draft', 'pending', 'ordered', 'received', 'partial_received', 'cancelled', 'returned'], 
    default: 'draft',
    index: true 
  },
  
  // Additional
  notes: { type: String },
  attachments: [{ type: String }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

// ==================== PRE-SAVE MIDDLEWARE ====================

purchaseSchema.pre('save', function(next) {
  // Auto-calculate dueAmount
  this.dueAmount = this.grandTotal - this.paidAmount;
  
  // Auto-update paymentStatus
  if (this.paidAmount >= this.grandTotal) {
    this.paymentStatus = 'paid';
  } else if (this.paidAmount > 0) {
    this.paymentStatus = 'partial';
  } else {
    this.paymentStatus = 'unpaid';
  }
  
  next();
});

// ==================== INDEXES ====================

purchaseSchema.index({ purchaseDate: -1 });
purchaseSchema.index({ status: 1, purchaseDate: -1 });
purchaseSchema.index({ supplier: 1, purchaseDate: -1 });
purchaseSchema.index({ 'items.product': 1 });

// ==================== MODEL ====================

export const Purchase = (mongoose.models.Purchase as mongoose.Model<IPurchaseDocument>) 
  || model<IPurchaseDocument>('Purchase', purchaseSchema);

// Apply Context-Aware Data Isolation
purchaseSchema.plugin(contextScopePlugin, {
  organizationField: 'organization',
  businessUnitField: 'businessUnit',
  outletField: 'outlet'
});
