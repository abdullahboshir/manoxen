import { Schema, model } from "mongoose";
import { contextScopePlugin } from "@manoxen/core-util";

export interface ILeave {
    staff: Schema.Types.ObjectId;
    leaveType: Schema.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    days: number;
    reason: string;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    approvedBy?: Schema.Types.ObjectId;
    rejectionReason?: string;
    organization: Schema.Types.ObjectId;
    businessUnit: Schema.Types.ObjectId;
}

const leaveSchema = new Schema<ILeave>({
    staff: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    leaveType: { type: Schema.Types.ObjectId, ref: 'LeaveType', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    days: { type: Number, required: true },
    reason: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'cancelled'],
        default: 'pending'
    },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    rejectionReason: { type: String },
    businessUnit: { type: Schema.Types.ObjectId, ref: 'BusinessUnit', required: true, index: true },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true }
}, {
    timestamps: true
});

export const Leave = model<ILeave>('Leave', leaveSchema);

// Apply Context-Aware Data Isolation
leaveSchema.plugin(contextScopePlugin, {
    organizationField: 'organization',
    businessUnitField: 'businessUnit'
});

