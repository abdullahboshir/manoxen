import { Schema, model, Document, Types } from 'mongoose';
import { contextScopePlugin } from '@manoxen/core-util';

export interface IMedia extends Document {
    organizationId: Types.ObjectId;
    businessUnitId: Types.ObjectId;
    filename: string;
    originalName: string;
    url: string;
    key: string; // S3 Key or similar storage path
    mimeType: string;
    size: number;
    altText?: string;
    context: string; // e.g., 'product', 'logo', 'audit'
    uploadedBy: Types.ObjectId; // User ID
    metadata?: Record<string, any>;
}

const MediaSchema = new Schema<IMedia>(
    {
        organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
        businessUnitId: { type: Schema.Types.ObjectId, ref: 'BusinessUnit', required: true, index: true },
        filename: { type: String, required: true },
        originalName: { type: String, required: true },
        url: { type: String, required: true },
        key: { type: String, required: true },
        mimeType: { type: String, required: true },
        size: { type: Number, required: true },
        altText: { type: String },
        context: { type: String, default: 'general', index: true },
        uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        metadata: { type: Schema.Types.Mixed },
    },
    {
        timestamps: true,
    }
);

// Plugins
MediaSchema.plugin(contextScopePlugin);

// Indexes
MediaSchema.index({ businessUnitId: 1, context: 1 });

export const Media = model<IMedia>('Media', MediaSchema);
