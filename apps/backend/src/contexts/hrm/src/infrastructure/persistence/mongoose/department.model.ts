import { Schema, model, Document, Types } from "mongoose";
import { contextScopePlugin } from "@manoxen/core-util";
import type { IDepartment } from "../../../domain/entities/department.entity";

export interface IDepartmentDocument extends Omit<IDepartment, 'id'>, Document {
    _id: Types.ObjectId;
}

const departmentSchema = new Schema<IDepartmentDocument>({
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, uppercase: true },
    description: { type: String },
    module: {
        type: String,
        enum: ['pos', 'erp', 'hrm', 'commerce', 'crm', 'logistics', 'system'],
        required: true,
        default: 'hrm'
    },
    businessUnit: { type: Schema.Types.ObjectId as any, ref: 'BusinessUnit', required: true, index: true },
    organization: { type: Schema.Types.ObjectId as any, ref: 'Organization', required: true, index: true },
    parentId: { type: Schema.Types.ObjectId as any, ref: 'Department' },
    headOfDepartment: { type: Schema.Types.ObjectId as any, ref: 'Staff' },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

departmentSchema.index({ businessUnit: 1, code: 1 }, { unique: true });

// Apply Context-Aware Data Isolation
departmentSchema.plugin(contextScopePlugin, {
    organizationField: 'organization',
    businessUnitField: 'businessUnit'
});

export const Department = model<IDepartmentDocument>('Department', departmentSchema);
