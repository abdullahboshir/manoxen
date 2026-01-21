import { Schema, model, Document, Types } from 'mongoose';
import { contextScopePlugin } from '@manoxen/core-util';

export interface IPaymentGateway extends Document {
    organizationId: Types.ObjectId;
    businessUnitId: Types.ObjectId;
    provider: 'stripe' | 'sslcommerz' | 'bkash' | 'nagad' | 'paypal';
    config: {
        publicKey?: string;
        privateKey?: string;
        merchantId?: string;
        storeId?: string;
        storePassword?: string;
        appKey?: string;
        appSecret?: string;
        isTestMode: boolean;
    };
    isActive: boolean;
    isDefault: boolean;
}

const PaymentGatewaySchema = new Schema<IPaymentGateway>(
    {
        organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
        businessUnitId: { type: Schema.Types.ObjectId, ref: 'BusinessUnit', required: true, index: true },
        provider: {
            type: String,
            enum: ['stripe', 'sslcommerz', 'bkash', 'nagad', 'paypal'],
            required: true,
        },
        config: {
            publicKey: String,
            privateKey: String,
            merchantId: String,
            storeId: String,
            storePassword: String,
            appKey: String,
            appSecret: String,
            isTestMode: { type: Boolean, default: true },
        },
        isActive: { type: Boolean, default: true },
        isDefault: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

// Plugins
PaymentGatewaySchema.plugin(contextScopePlugin);

// Indexes
PaymentGatewaySchema.index({ businessUnitId: 1, provider: 1 }, { unique: true });

export const PaymentGateway = model<IPaymentGateway>('PaymentGateway', PaymentGatewaySchema);
