import { Schema, model } from 'mongoose';
import type { ISubscriptionDocument, ISubscriptionModel } from './subscription.interface';
import { contextScopePlugin } from '@manoxen/core-util';

const SubscriptionSchema = new Schema<ISubscriptionDocument, ISubscriptionModel>(
    {
        organizationId: { type: Schema.Types.ObjectId as any, ref: 'Organization', required: true, index: true },
        businessUnitId: { type: Schema.Types.ObjectId as any, ref: 'BusinessUnit', required: true, index: true },
        packageId: { type: Schema.Types.ObjectId as any, ref: 'Package', required: true },
        status: {
            type: String,
            enum: ['active', 'cancelled', 'suspended', 'expired', 'trial'],
            default: 'trial',
            index: true,
        },
        billingCycle: {
            type: String,
            enum: ['monthly', 'quarterly', 'yearly'],
            default: 'monthly',
        },
        price: { type: Number, required: true, min: 0 },
        currency: { type: String, default: 'BDT' },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        nextBillingDate: { type: Date },
        trialEndsAt: { type: Date },
        cancelledAt: { type: Date },
        cancelReason: { type: String },
        autoRenew: { type: Boolean, default: true },
        paymentMethod: {
            type: { type: String, enum: ['card', 'bank_transfer', 'mobile_banking'] },
            last4: String,
            brand: String,
        },
        invoiceHistory: [{ type: Schema.Types.ObjectId as any, ref: 'Invoice' }],
    },
    {
        timestamps: true,
    }
);

// Plugins
SubscriptionSchema.plugin(contextScopePlugin);

// Indexes
SubscriptionSchema.index({ businessUnitId: 1, status: 1 });
SubscriptionSchema.index({ nextBillingDate: 1 });

// Static methods
SubscriptionSchema.statics.getActiveSubscription = async function (businessUnitId: string) {
    return this.findOne({ businessUnitId, status: 'active' }).populate('packageId');
};

SubscriptionSchema.statics.isTrialActive = async function (businessUnitId: string): Promise<boolean> {
    const subscription = await this.findOne({
        businessUnitId,
        status: 'trial',
        trialEndsAt: { $gt: new Date() },
    });
    return !!subscription;
};

export const Subscription = model<ISubscriptionDocument, ISubscriptionModel>('Subscription', SubscriptionSchema);
