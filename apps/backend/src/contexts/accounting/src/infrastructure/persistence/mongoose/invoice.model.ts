import { Schema, model, Document, Types } from 'mongoose';
import { contextScopePlugin } from '@manoxen/core-util';

export interface IInvoice extends Document {
    organizationId: Types.ObjectId;
    businessUnitId: Types.ObjectId;
    subscriptionId?: Types.ObjectId;
    invoiceNumber: string;
    status: 'paid' | 'unpaid' | 'overdue' | 'cancelled';
    amount: number;
    currency: string;
    dueDate: Date;
    paidAt?: Date;
    billingPeriod: {
        start: Date;
        end: Date;
    };
    items: Array<{
        description: string;
        amount: number;
    }>;
}

const InvoiceSchema = new Schema<IInvoice>(
    {
        organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
        businessUnitId: { type: Schema.Types.ObjectId, ref: 'BusinessUnit', required: true, index: true },
        subscriptionId: { type: Schema.Types.ObjectId, ref: 'Subscription', index: true },
        invoiceNumber: { type: String, required: true, unique: true },
        status: {
            type: String,
            enum: ['paid', 'unpaid', 'overdue', 'cancelled'],
            default: 'unpaid',
            index: true,
        },
        amount: { type: Number, required: true, min: 0 },
        currency: { type: String, default: 'BDT' },
        dueDate: { type: Date, required: true },
        paidAt: { type: Date },
        billingPeriod: {
            start: { type: Date, required: true },
            end: { type: Date, required: true },
        },
        items: [{
            description: { type: String, required: true },
            amount: { type: Number, required: true },
        }],
    },
    {
        timestamps: true,
    }
);

// Plugins
InvoiceSchema.plugin(contextScopePlugin);

export const Invoice = model<IInvoice>('Invoice', InvoiceSchema);
