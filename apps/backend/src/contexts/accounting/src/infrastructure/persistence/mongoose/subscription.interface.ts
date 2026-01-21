import { Document, Model, Types } from 'mongoose';

export interface ISubscription {
    organizationId: Types.ObjectId;
    businessUnitId: Types.ObjectId;
    packageId: Types.ObjectId; // Reference to Package model
    status: 'active' | 'cancelled' | 'suspended' | 'expired' | 'trial';
    billingCycle: 'monthly' | 'quarterly' | 'yearly';
    price: number;
    currency: string;
    startDate: Date;
    endDate: Date;
    nextBillingDate?: Date;
    trialEndsAt?: Date;
    cancelledAt?: Date;
    cancelReason?: string;
    autoRenew: boolean;
    paymentMethod?: {
        type: 'card' | 'bank_transfer' | 'mobile_banking';
        last4?: string;
        brand?: string;
    };
    invoiceHistory: Types.ObjectId[]; // Reference to Invoice model
}

export interface ISubscriptionDocument extends ISubscription, Document { }

export interface ISubscriptionModel extends Model<ISubscriptionDocument> {
    getActiveSubscription(businessUnitId: string): Promise<ISubscriptionDocument | null>;
    isTrialActive(businessUnitId: string): Promise<boolean>;
}
