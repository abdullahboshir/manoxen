import { Schema, model } from "mongoose";
import type { IWarranty } from "../../../domain/entities/warranty.entity";
import { contextScopePlugin } from "@manoxen/core-util";


const warrantySchema = new Schema<IWarranty>({
  name: { type: String, required: true, trim: true },
  duration: { type: Number, required: true, min: 0 },
  periodUnit: { 
    type: String, 
    required: true, 
    enum: ["days", "weeks", "months", "years"],
    default: "months" 
  },
  type: { 
    type: String, 
    required: true, 
    enum: ["seller", "manufacturer", "brand"],
    default: "seller" 
  },
  description: { type: String, trim: true },
  termsConditions: { type: String, trim: true },
  availableModules: [{ type: String }],
  isActive: { type: Boolean, default: true },
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  businessUnit: { type: Schema.Types.ObjectId, ref: 'BusinessUnit' }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (_doc, ret) {
      delete (ret as any).__v;
      return ret;
    }
  }
});

// Apply organization scoping plugin
warrantySchema.plugin(contextScopePlugin, {
  organizationField: 'organization',
  businessUnitField: 'businessUnit'
});

export const Warranty = model<IWarranty>('Warranty', warrantySchema);




