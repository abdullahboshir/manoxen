import { Schema, model, Document, Types } from "mongoose";
import { contextScopePlugin } from "@manoxen/core-util";
import type { IDesignation } from "../../../domain/entities/designation.entity";

export interface IDesignationDocument extends Omit<IDesignation, 'id'>, Document {
    _id: Types.ObjectId;
}

const designationSchema = new Schema<IDesignationDocument>({
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, uppercase: true },
    description: { type: String },
    rank: { type: Number, required: true, min: 1 },
    department: { type: Schema.Types.ObjectId as any, ref: 'Department', required: true },
    defaultAccess: [{
        type: String,
        enum: ['pos', 'erp', 'hrm', 'commerce', 'crm', 'logistics', 'system']
    }],
    businessUnit: { type: Schema.Types.ObjectId as any, ref: 'BusinessUnit', required: true, index: true },
    organization: { type: Schema.Types.ObjectId as any, ref: 'Organization', required: true, index: true },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

designationSchema.index({ businessUnit: 1, code: 1 }, { unique: true });

// Apply Context-Aware Data Isolation
designationSchema.plugin(contextScopePlugin, {
    organizationField: 'organization',
    businessUnitField: 'businessUnit'
});

export const Designation = model<IDesignationDocument>('Designation', designationSchema);
