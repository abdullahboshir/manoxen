import { Schema, model, Document, Types } from "mongoose";
import { contextScopePlugin } from "@manoxen/core-util";
import type { ILeave } from "../../../domain/entities/leave.entity";
export type { ILeave };

export interface ILeaveDocument extends Omit<ILeave, 'id'>, Document {
    _id: Types.ObjectId;
}

const leaveSchema = new Schema<ILeaveDocument>({
    staff: { type: Schema.Types.ObjectId as any, ref: 'User', required: true },
    leaveType: { type: Schema.Types.ObjectId as any, ref: 'LeaveType', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    days: { type: Number, required: true },
    reason: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'cancelled'],
        default: 'pending'
    },
    approvedBy: { type: Schema.Types.ObjectId as any, ref: 'User' },
    rejectionReason: { type: String },
    businessUnit: { type: Schema.Types.ObjectId as any, ref: 'BusinessUnit', required: true, index: true },
    organization: { type: Schema.Types.ObjectId as any, ref: 'Organization', required: true, index: true }
}, {
    timestamps: true
});

// Apply Context-Aware Data Isolation
leaveSchema.plugin(contextScopePlugin, {
    organizationField: 'organization',
    businessUnitField: 'businessUnit'
});

export const Leave = model<ILeaveDocument>('Leave', leaveSchema);
