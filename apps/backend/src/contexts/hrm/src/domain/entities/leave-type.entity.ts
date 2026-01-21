import type { Types } from "mongoose";

export interface ILeaveType {
    id?: string;
    name: string;
    code: string;
    description?: string;
    daysPerYear: number;
    isPaid: boolean;
    carryForward: boolean;
    organization: Types.ObjectId;
    businessUnit: Types.ObjectId;
    isActive: boolean;
}
