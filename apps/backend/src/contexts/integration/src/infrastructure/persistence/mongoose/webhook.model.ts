import { Schema, model } from 'mongoose';
import type { IWebhookDocument, IWebhookModel } from './webhook.interface';
import { contextScopePlugin } from '@manoxen/core-util';

const WebhookSchema = new Schema<IWebhookDocument, IWebhookModel>(
    {
        organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
        businessUnitId: { type: Schema.Types.ObjectId, ref: 'BusinessUnit', required: true, index: true },
        name: { type: String, required: true, trim: true },
        url: { type: String, required: true, trim: true },
        events: [{ type: String, required: true }],
        isActive: { type: Boolean, default: true, index: true },
        secret: { type: String, required: true },
        headers: { type: Schema.Types.Mixed },
        retryPolicy: {
            maxRetries: { type: Number, default: 3, min: 0, max: 5 },
            retryDelay: { type: Number, default: 5, min: 1 }, // seconds
        },
        lastTriggeredAt: { type: Date },
        failureCount: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

// Plugins
WebhookSchema.plugin(contextScopePlugin);

// Indexes
WebhookSchema.index({ businessUnitId: 1, events: 1, isActive: 1 });

// Static methods
WebhookSchema.statics.getActiveWebhooks = async function (businessUnitId: string, event: string) {
    return this.find({
        businessUnitId,
        events: event,
        isActive: true,
    });
};

export const Webhook = model<IWebhookDocument, IWebhookModel>('Webhook', WebhookSchema);
