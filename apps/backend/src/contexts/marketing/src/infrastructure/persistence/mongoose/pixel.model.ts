import { Schema, model, Document } from 'mongoose';
import { contextScopePlugin } from "@manoxen/core-util";

export interface IPixel extends Document {
    name: string;
    pixelId: string;
    accessToken?: string;
    isActive: boolean;
    organization: Schema.Types.ObjectId;
    businessUnit: Schema.Types.ObjectId;
    description?: string;
}

const pixelSchema = new Schema<IPixel>({
    name: { type: String, required: true },
    pixelId: { type: String, required: true },
    accessToken: { type: String, select: false },
    isActive: { type: Boolean, default: true },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    businessUnit: { type: Schema.Types.ObjectId, ref: 'BusinessUnit', required: true, index: true },
    description: { type: String },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

pixelSchema.index({ pixelId: 1 }, { unique: true });

// Apply Context-Aware Data Isolation
pixelSchema.plugin(contextScopePlugin, {
    organizationField: 'organization',
    businessUnitField: 'businessUnit'
});

export const Pixel = model<IPixel>('Pixel', pixelSchema);
