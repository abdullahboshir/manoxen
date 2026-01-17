import { Schema, model } from "mongoose";
import { contextScopePlugin } from "@manoxen/core-util";

export interface INotificationTemplate {
    name: string;
    code: string; // e.g. ORDER_CONFIRMATION
    type: 'EMAIL' | 'SMS' | 'PUSH';
    module: 'pos' | 'erp' | 'hrm' | 'ecommerce' | 'crm' | 'logistics' | 'system';
    subject?: string;
    content: string; // HTML or Text
    variables: string[]; // e.g. ['{{customerName}}', '{{orderId}}']
    isActive: boolean;
    organization?: Schema.Types.ObjectId;
    businessUnit?: Schema.Types.ObjectId; // Optional: specific to a BU, or global if null
}

const notificationTemplateSchema = new Schema<INotificationTemplate>({
    name: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: String, enum: ['EMAIL', 'SMS', 'PUSH'], required: true },
    module: {
        type: String,
        enum: ['pos', 'erp', 'hrm', 'ecommerce', 'crm', 'logistics', 'system'],
        required: true
    },
    subject: { type: String },
    content: { type: String, required: true },
    variables: [{ type: String }],
    isActive: { type: Boolean, default: true },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', index: true },
    businessUnit: { type: Schema.Types.ObjectId, ref: 'BusinessUnit' }
}, {
    timestamps: true
});

notificationTemplateSchema.index({ code: 1, businessUnit: 1, type: 1 }, { unique: true });
notificationTemplateSchema.index({ module: 1 });

export const NotificationTemplate = model<INotificationTemplate>('NotificationTemplate', notificationTemplateSchema);

// Apply Context-Aware Data Isolation
notificationTemplateSchema.plugin(contextScopePlugin, {
    organizationField: 'organization',
    businessUnitField: 'businessUnit',
    includeGlobal: true
});













