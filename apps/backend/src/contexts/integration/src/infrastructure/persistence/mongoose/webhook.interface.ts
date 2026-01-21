import { Document, Model, Types } from 'mongoose';

export interface IWebhook {
    organizationId: Types.ObjectId;
    businessUnitId: Types.ObjectId;
    name: string;
    url: string;
    events: string[]; // e.g., ['order.created', 'payment.received', 'product.updated']
    isActive: boolean;
    secret: string; // For signature verification
    headers?: Record<string, string>;
    retryPolicy: {
        maxRetries: number;
        retryDelay: number; // in seconds
    };
    lastTriggeredAt?: Date;
    failureCount: number;
}

export interface IWebhookDocument extends IWebhook, Document { }

export interface IWebhookModel extends Model<IWebhookDocument> {
    getActiveWebhooks(businessUnitId: string, event: string): Promise<IWebhookDocument[]>;
}
