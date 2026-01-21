import { model, Schema, Document, Types } from "mongoose";
import type { IPermissionGroup } from "../../../domain/entities/permission-group.entity";

export interface IPermissionGroupDocument extends Omit<IPermissionGroup, 'id' | '_id'>, Document {
    id: string;
    _id: Types.ObjectId;
}

const PermissionGroupSchema = new Schema<IPermissionGroupDocument>({
    name: { type: String, required: true, trim: true, unique: true },
    module: { type: String, required: true, index: true },
    description: { type: String, required: true },
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission', required: true }],
    resolver: {
        strategy: { type: String, required: true },
        priority: { type: Number, default: 0 },
        inheritFrom: [{ type: String }],
        override: { type: Boolean, default: false },
        fallback: { type: String, enum: ["allow", "deny"], default: "deny" }
    },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

export const PermissionGroup = model<IPermissionGroupDocument>('PermissionGroup', PermissionGroupSchema);
