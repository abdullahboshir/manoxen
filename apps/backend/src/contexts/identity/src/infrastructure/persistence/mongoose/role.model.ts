import { model, Schema, Document, Types } from "mongoose";
import { contextScopePlugin } from "@manoxen/core-util";
import { cachingMiddleware } from "@manoxen/infra-common";
import type { IRole } from "../../../domain/entities/role.entity";

export interface IRoleDocument extends Omit<IRole, 'id' | '_id'>, Document {
    id: string;
    _id: Types.ObjectId;
}

const RoleSchema = new Schema<IRoleDocument>({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
    permissionGroups: [{ type: Schema.Types.ObjectId, ref: "PermissionGroup" }],
    isSystemRole: { type: Boolean, default: false },
    roleScope: {
      type: String,
      enum: ['GLOBAL', 'ORGANIZATION', 'BUSINESS', 'OUTLET'],
      required: true,
      index: true
    },
    isActive: { type: Boolean, default: true },
    hierarchyLevel: { type: Number, required: true, default: 1 },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', default: null, index: true },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

RoleSchema.index({ name: 1, roleScope: 1 }, { unique: true });
cachingMiddleware(RoleSchema as any);

RoleSchema.plugin(contextScopePlugin, {
  organizationField: 'organization',
  includeGlobal: true
});

export const Role = model<IRoleDocument>('Role', RoleSchema);
