import { Subscription } from '../../infrastructure/persistence/mongoose/subscription.model';
import { Invoice } from '../../infrastructure/persistence/mongoose/invoice.model';
import { AppError } from '@manoxen/core-util';
import status from 'http-status';

export class SubscriptionService {
    /**
     * Get active subscription for a business unit
     */
    static async getActiveSubscription(user: any) {
        const businessUnitId = user.businessUnit;
        const subscription = await (Subscription as any).getActiveSubscription(businessUnitId);
        
        if (!subscription) {
            throw new AppError(status.NOT_FOUND, 'No active subscription found');
        }
        
        return subscription;
    }

    /**
     * Activate a subscription
     */
    static async activateSubscription(data: any, user: any) {
        const organizationId = user.organization;
        const businessUnitId = user.businessUnit;
        
        // Cancel existing active subscriptions
        await Subscription.updateMany(
            { businessUnitId, status: 'active' },
            { status: 'cancelled', cancelledAt: new Date(), cancelReason: 'New subscription activated' }
        );

        const subscription = await Subscription.create({
            ...data,
            organizationId,
            businessUnitId,
            status: 'active',
            startDate: new Date()
        });

        return subscription;
    }

    /**
     * Cancel a subscription
     */
    static async cancelSubscription(id: string, reason: string, user: any) {
        const query = { _id: id, businessUnitId: user.businessUnit };
        const subscription = await Subscription.findOneAndUpdate(
            query,
            { status: 'cancelled', cancelledAt: new Date(), cancelReason: reason, autoRenew: false },
            { new: true }
        );

        if (!subscription) {
            throw new AppError(status.NOT_FOUND, 'Subscription not found');
        }

        return subscription;
    }

    /**
     * Get subscription billing history (Invoices)
     */
    static async getBillingHistory(user: any) {
        return Invoice.find({ businessUnitId: user.businessUnit }).sort({ createdAt: -1 });
    }

    /**
     * Process trial expiration (Background Task)
     */
    static async processTrialExpirations() {
        const now = new Date();
        const expiredTrials = await Subscription.find({
            status: 'trial',
            trialEndsAt: { $lte: now }
        });

        for (const subscription of expiredTrials) {
            subscription.status = 'expired';
            await subscription.save();
            // Trigger notification or event here
        }
    }
}
