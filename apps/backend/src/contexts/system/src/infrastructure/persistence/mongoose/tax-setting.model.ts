import { Schema, model, Document, Types } from 'mongoose';
import { contextScopePlugin } from '@manoxen/core-util';

export interface ITaxSetting extends Document {
    organizationId: Types.ObjectId;
    businessUnitId: Types.ObjectId;
    name: string;
    rate: number; // Percentage
    type: 'vat' | 'sales_tax' | 'gst' | 'other';
    isDefault: boolean;
    isActive: boolean;
    region?: string;
    rules?: Array<{
        condition: string;
        adjustment: number;
    }>;
}

const TaxSettingSchema = new Schema<ITaxSetting>(
    {
        organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
        businessUnitId: { type: Schema.Types.ObjectId, ref: 'BusinessUnit', required: true, index: true },
        name: { type: String, required: true },
        rate: { type: Number, required: true, min: 0 },
        type: {
            type: String,
            enum: ['vat', 'sales_tax', 'gst', 'other'],
            default: 'vat',
        },
        isDefault: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
        region: { type: String },
        rules: [{
            condition: String,
            adjustment: Number,
        }],
    },
    {
        timestamps: true,
    }
);

// Plugins
TaxSettingSchema.plugin(contextScopePlugin);

// Indexes
TaxSettingSchema.index({ businessUnitId: 1, type: 1, isDefault: 1 });

export const TaxSetting = model<ITaxSetting>('TaxSetting', TaxSettingSchema);
