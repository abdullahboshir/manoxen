import { Schema, model } from "mongoose";
import type { IExpenseCategoryDocument } from "../../../domain/entities/expense-category.entity";
import { contextScopePlugin } from "@manoxen/core-util";

const expenseCategorySchema = new Schema<IExpenseCategoryDocument>({
    name: { type: String, required: true },
    type: {
        type: String,
        enum: ['fixed', 'variable'],
        default: 'variable'
    },
    module: {
        type: String,
        enum: ['pos', 'erp', 'hrm', 'commerce', 'crm', 'logistics', 'system'],
        required: true,
        default: 'pos', // Most expenses are POS based initially
        index: true
    },
    isActive: { type: Boolean, default: true },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    businessUnit: { type: Schema.Types.ObjectId, ref: 'BusinessUnit', index: true },
    description: { type: String }
}, {
    timestamps: true
});

// Compound index to prevent duplicate names within the same Business Unit
expenseCategorySchema.index({ name: 1, businessUnit: 1 }, { unique: true });
expenseCategorySchema.index({ businessUnit: 1 });
expenseCategorySchema.index({ isActive: 1 });

export const ExpenseCategory = model<IExpenseCategoryDocument>('ExpenseCategory', expenseCategorySchema);

// Apply Context-Aware Data Isolation
expenseCategorySchema.plugin(contextScopePlugin, {
    organizationField: 'organization',
    businessUnitField: 'businessUnit'
});





