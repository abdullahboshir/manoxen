import type { Types } from "mongoose";

export interface ILeave {
    id?: string;
    organization: Types.ObjectId;
    businessUnit: Types.ObjectId;
    staff: Types.ObjectId;
    leaveType: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    days: number;
    reason: string;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    approvedBy?: string;
    rejectionReason?: string;
}
