import { Schema, model } from "mongoose";
import type { IBrand } from "../../../domain/entities/brand.entity";
import { makeSlug } from "@manoxen/core-util";
import { contextScopePlugin } from "@manoxen/core-util";

const BrandSchema = new Schema<IBrand>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true,
            maxlength: 100,
        },
        domain: {
            type: String,
            enum: ["retail", "pharmacy", "grocery", "restaurant", "electronics", "fashion", "service", "construction", "automotive", "health", "hospitality", "other"],
            default: "retail",
            index: true
        },
        availableModules: {
            type: [{
                type: String,
                enum: ['pos', 'erp', 'hrm', 'commerce', 'crm', 'logistics', 'system']
            }],
            default: ['pos', 'commerce'],
            index: true
        },
        slug: {
            type: String,
            unique: true,
            index: true,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        logo: {
            type: String,
        },
        website: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        organization: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
            required: false,
            index: true,
        },
        businessUnit: {
            type: Schema.Types.ObjectId,
            ref: "BusinessUnit",
            required: false, // Can be global or BU specific
            index: true,
        },
    },
    { timestamps: true }
);

BrandSchema.index({ businessUnit: 1 });
BrandSchema.index({ status: 1 });

BrandSchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = makeSlug(this.name);
    }
    next();
});

export const Brand = model<IBrand>("Brand", BrandSchema);

// Apply Context-Aware Data Isolation
BrandSchema.plugin(contextScopePlugin, {
    organizationField: 'organization',
    businessUnitField: 'businessUnit'
});





