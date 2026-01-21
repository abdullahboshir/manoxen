import { Schema, model, Document, Types } from "mongoose";
import { contextScopePlugin } from "@manoxen/core-util";
import type { ILeaveType } from "../../../domain/entities/leave-type.entity";

export interface ILeaveTypeDocument extends Omit<ILeaveType, 'id'>, Document {
    _id: Types.ObjectId;
}

const leaveTypeSchema = new Schema<ILeaveTypeDocument>({
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, uppercase: true },
    description: { type: String },
    daysPerYear: { type: Number, required: true, default: 0 },
    isPaid: { type: Boolean, default: true },
    carryForward: { type: Boolean, default: false },
    businessUnit: { type: Schema.Types.ObjectId, ref: 'BusinessUnit', required: true, index: true },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

leaveTypeSchema.index({ businessUnit: 1, code: 1 }, { unique: true });

// Apply Context-Aware Data Isolation
leaveTypeSchema.plugin(contextScopePlugin, {
    organizationField: 'organization',
    businessUnitField: 'businessUnit'
});

export const LeaveType = model<ILeaveTypeDocument>('LeaveType', leaveTypeSchema);
