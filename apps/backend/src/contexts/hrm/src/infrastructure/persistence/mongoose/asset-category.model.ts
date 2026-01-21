import { Schema, model, Document, Types } from "mongoose";
import { contextScopePlugin } from "@manoxen/core-util";
import type { IAssetCategory } from "../../../domain/entities/asset-category.entity";

export interface IAssetCategoryDocument extends Omit<IAssetCategory, 'id'>, Document {
    _id: Types.ObjectId;
}

const assetCategorySchema = new Schema<IAssetCategoryDocument>({
    name: { type: String, required: true },
    code: { type: String, required: true, uppercase: true },
    description: { type: String },
    module: {
        type: String,
        enum: ['pos', 'erp', 'hrm', 'commerce', 'crm', 'logistics', 'system'],
        default: 'erp',
        required: true,
        index: true
    },
    depreciationRate: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    businessUnit: { type: Schema.Types.ObjectId as any, ref: 'BusinessUnit', required: true }
}, {
    timestamps: true
});

assetCategorySchema.index({ code: 1, businessUnit: 1 }, { unique: true });
assetCategorySchema.plugin(contextScopePlugin, { businessUnitField: 'businessUnit' });

export const AssetCategory = model<IAssetCategoryDocument>('AssetCategory', assetCategorySchema);
