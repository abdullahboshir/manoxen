import { model, Schema, Document, Types } from "mongoose";
import type { IPermission } from "../../../domain/entities/permission.entity";

export interface IPermissionDocument extends Omit<IPermission, 'id' | '_id'>, Document {
    id: string;
    _id: Types.ObjectId;
}

const PermissionSchema = new Schema<IPermissionDocument>({
    id: { type: String, required: true, unique: true },
    module: { type: String, required: true, index: true },
    resource: { type: String, required: true },
    action: { type: String, required: true },
    scope: { type: String, required: true },
    effect: { type: String, enum: ['allow', 'deny'], default: 'allow' },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId as any, ref: "User", required: true },
    updatedBy: { type: Schema.Types.ObjectId as any, ref: "User", required: true }
}, {
    timestamps: true
});

PermissionSchema.index({ resource: 1, action: 1 });

export const Permission = model<IPermissionDocument>('Permission', PermissionSchema);
