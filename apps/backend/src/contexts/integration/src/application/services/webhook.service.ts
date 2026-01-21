
import { AppError } from '@manoxen/core-util';
import status from 'http-status';
import axios from 'axios';
import crypto from 'crypto';
import { Webhook } from '../../infrastructure/persistence/mongoose/webhook.model';

export class WebhookService {
    /**
     * Create a new webhook
     */
    static async createWebhook(data: any, user: any) {
        const organizationId = user.organization;
        const businessUnitId = user.businessUnit;
        
        if (!businessUnitId) {
            throw new AppError(status.BAD_REQUEST, 'Business unit context required');
        }

        const webhook = await Webhook.create({
            ...data,
            organizationId,
            businessUnitId
        });
        
        return webhook;
    }

    /**
     * Get all webhooks for a business unit
     */
    static async getWebhooks(user: any) {
        return Webhook.find({ businessUnitId: user.businessUnit });
    }

    /**
     * Update a webhook
     */
    static async updateWebhook(id: string, data: any, user: any) {
        const query = { _id: id, businessUnitId: user.businessUnit };
        const webhook = await Webhook.findOneAndUpdate(query, data, { new: true });
        
        if (!webhook) {
            throw new AppError(status.NOT_FOUND, 'Webhook not found');
        }
        
        return webhook;
    }

    /**
     * Delete a webhook
     */
    static async deleteWebhook(id: string, user: any) {
        const query = { _id: id, businessUnitId: user.businessUnit };
        const webhook = await Webhook.findOneAndDelete(query);
        
        if (!webhook) {
            throw new AppError(status.NOT_FOUND, 'Webhook not found');
        }
        
        return webhook;
    }

    /**
     * Trigger webhooks for an event
     */
    static async triggerEvent(event: string, payload: any, businessUnitId: string) {
        const webhooks = await (Webhook as any).getActiveWebhooks(businessUnitId, event);
        
        for (const webhook of webhooks) {
            this.dispatchWebhook(webhook, event, payload).catch((err: Error) => {
                console.error(`Failed to dispatch webhook ${webhook._id}:`, err.message);
            });
        }
    }

    /**
     * Dispatch a single webhook
     */
    private static async dispatchWebhook(webhook: any, event: string, payload: any) {
        const signature = crypto
            .createHmac('sha256', webhook.secret)
            .update(JSON.stringify(payload))
            .digest('hex');

        try {
            await axios.post(webhook.url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Manoxen-Event': event,
                    'X-Manoxen-Signature': signature,
                    ...webhook.headers
                },
                timeout: 5000
            });

            await Webhook.findByIdAndUpdate(webhook._id, {
                lastTriggeredAt: new Date(),
                failureCount: 0
            });
        } catch (error) {
            const failureCount = (webhook.failureCount || 0) + 1;
            await Webhook.findByIdAndUpdate(webhook._id, {
                failureCount,
                isActive: failureCount < (webhook.retryPolicy?.maxRetries || 5)
            });
            throw error;
        }
    }
}
