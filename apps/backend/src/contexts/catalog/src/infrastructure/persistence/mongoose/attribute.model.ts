import { Schema, model } from "mongoose";
import { Document, Model } from "mongoose";
import type { IAttribute } from "../../../domain/entities/attribute.entity";
import { contextScopePlugin } from "@manoxen/core-util";

export interface IAttributeDocument extends IAttribute, Document {}
export interface IAttributeModel extends Model<IAttributeDocument> {}


const attributeSchema = new Schema<IAttributeDocument, IAttributeModel>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Unique per Business Unit logic handled in service if needed, but simple unique for now
    },
    values: [{
        type: String,
        trim: true
    }],
    businessUnit: {
        type: Schema.Types.ObjectId as any,
        ref: "BusinessUnit",
        required: false
    },
    availableModules: {
        type: [{
            type: String,
            enum: ['pos', 'erp', 'hrm', 'commerce', 'crm', 'logistics', 'system']
        }],
        default: ['pos', 'commerce'],
        index: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    createdBy: {
        type: Schema.Types.ObjectId as any,
        ref: "User"
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

attributeSchema.index({ businessUnit: 1 });
attributeSchema.index({ status: 1 });
attributeSchema.index({ name: 1, businessUnit: 1 }, { unique: true });

// Apply Context-Aware Data Isolation
attributeSchema.plugin(contextScopePlugin, {
    businessUnitField: 'businessUnit'
});

export const Attribute = model<IAttributeDocument, IAttributeModel>("Attribute", attributeSchema);





