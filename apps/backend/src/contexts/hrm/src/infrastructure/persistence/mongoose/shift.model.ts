import { Schema, model, Document, Types } from "mongoose";
import { contextScopePlugin } from "@manoxen/core-util";
import type { IShift } from "../../../domain/entities/shift.entity";

export interface IShiftDocument extends Omit<IShift, 'id'>, Document {
    _id: Types.ObjectId;
}

const shiftSchema = new Schema<IShiftDocument>({
    name: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    organization: { type: Schema.Types.ObjectId as any, ref: 'Organization', required: true, index: true },
    businessUnit: { type: Schema.Types.ObjectId as any, ref: 'BusinessUnit', required: true, index: true }
}, {
    timestamps: true
});

shiftSchema.index({ name: 1, businessUnit: 1 }, { unique: true });

// Apply Context-Aware Data Isolation
shiftSchema.plugin(contextScopePlugin, {
    organizationField: 'organization',
    businessUnitField: 'businessUnit'
});

export const Shift = model<IShiftDocument>('Shift', shiftSchema);
