import { Schema, model, Document, Types } from "mongoose";
import { contextScopePlugin } from "@manoxen/core-util";
import type { IAttendance } from "../../../domain/entities/attendance.entity";

export interface IAttendanceDocument extends Omit<IAttendance, 'id'>, Document {
    _id: Types.ObjectId;
}

const attendanceSchema = new Schema<IAttendanceDocument>({
    staff: { type: Schema.Types.ObjectId as any, ref: 'User', required: true },
    date: { type: Date, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date },
    status: {
        type: String,
        enum: ['present', 'late', 'half-day', 'absent'],
        default: 'present'
    },
    notes: { type: String },
    businessUnit: { type: Schema.Types.ObjectId as any, ref: 'BusinessUnit', required: true, index: true },
    organization: { type: Schema.Types.ObjectId as any, ref: 'Organization', required: true, index: true }
}, {
    timestamps: true
});

attendanceSchema.index({ staff: 1, date: 1 }, { unique: true });

// Apply Context-Aware Data Isolation
attendanceSchema.plugin(contextScopePlugin, {
    organizationField: 'organization',
    businessUnitField: 'businessUnit'
});

export const Attendance = model<IAttendanceDocument>('Attendance', attendanceSchema);
