import { Schema, model } from "mongoose";
import { contextScopePlugin } from "@manoxen/core-util";
import type { IAccountHead } from "../../../domain/entities/account-head.entity";

const accountHeadSchema = new Schema<IAccountHead>({
    name: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: String, enum: ['asset', 'liability', 'equity', 'income', 'expense'], required: true },
    parentAccount: { type: Schema.Types.ObjectId, ref: 'AccountHead' },
    module: {
        type: String,
        enum: ['pos', 'erp', 'hrm', 'commerce', 'crm', 'logistics', 'system'],
        default: 'erp',
        required: true,
        index: true
    },
    balance: { type: Number, default: 0 },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    businessUnit: { type: Schema.Types.ObjectId, ref: 'BusinessUnit', required: true, index: true },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

accountHeadSchema.index({ code: 1, businessUnit: 1 }, { unique: true });
accountHeadSchema.index({ module: 1 });

export const AccountHead = model<IAccountHead>('AccountHead', accountHeadSchema);

// Apply Context-Aware Data Isolation
accountHeadSchema.plugin(contextScopePlugin, {
    organizationField: 'organization',
    businessUnitField: 'businessUnit'
});

