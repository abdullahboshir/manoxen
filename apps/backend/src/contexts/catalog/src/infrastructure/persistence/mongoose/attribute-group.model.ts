import { Schema, model } from "mongoose";
import type { IAttributeGroup } from "../../../domain/entities/attribute-group.entity";
import { contextScopePlugin } from "@manoxen/core-util";

const attributeFieldSchema = new Schema({
    key: { type: String, required: true },
    label: { type: String, required: true },
    type: { 
        type: String, 
        enum: ['text', 'number', 'date', 'select', 'boolean', 'textarea'],
        required: true 
    },
    required: { type: Boolean, default: false },
    options: [{ type: String }],
    placeholder: { type: String }
}, { _id: false });

const attributeGroupSchema = new Schema<IAttributeGroup>({
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    availableModules: {
        type: [{
            type: String,
            enum: ['pos', 'erp', 'hrm', 'commerce', 'crm', 'logistics', 'marketing', 'integrations', 'system']
        }],
        default: ['commerce']
    },
    fields: [attributeFieldSchema],
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    organization: { type: Schema.Types.ObjectId as any, ref: "Organization", required: true },
    businessUnit: { type: Schema.Types.ObjectId as any, ref: "BusinessUnit", required: true }
}, {
    timestamps: true
});

attributeGroupSchema.plugin(contextScopePlugin, {
    organizationField: 'organization',
    businessUnitField: 'businessUnit'
});

export const AttributeGroup = model<IAttributeGroup>("AttributeGroup", attributeGroupSchema);
