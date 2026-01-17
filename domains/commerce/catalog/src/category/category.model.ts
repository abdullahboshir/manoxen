import { Schema, model } from "mongoose";
import type { ICategory } from "./category.interface";
import { makeSlug } from "@manoxen/core-util";
import { contextScopePlugin } from "@manoxen/core-util";


const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
      maxlength: 50,
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
        enum: ['pos', 'erp', 'hrm', 'ecommerce', 'crm', 'logistics', 'system']
      }],
      default: ['pos', 'ecommerce'],
      index: true
    },
    slug: {
      type: String,
      index: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
    businessUnit: {
      type: Schema.Types.ObjectId,
      ref: "BusinessUnit",
      required: false,
      index: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      index: true,
    },
    level: {
      type: Number,
      default: 0,
      index: true,
    },
    path: {
      type: String, // Materialized Path: /rootID/subID/
      default: "/",
      index: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    image: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: { type: Boolean, default: false, select: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

// Self-referencing index for tree traversal optimization
CategorySchema.index({ parentId: 1, businessUnit: 1 });
CategorySchema.index({ level: 1 });

CategorySchema.pre("save", function (next) {
  const doc = this as any;
  if (doc.isModified("name")) {
    doc.slug = makeSlug(doc.name);
  }
  next();
});

// Compound indexes for scoped uniqueness
CategorySchema.index({ name: 1, businessUnit: 1 }, { unique: true });
CategorySchema.index({ slug: 1, businessUnit: 1 }, { unique: true });

export const Category = model<ICategory>("Category", CategorySchema);

// Apply Context-Aware Data Isolation
CategorySchema.plugin(contextScopePlugin, {
  organizationField: 'organization',
  businessUnitField: 'businessUnit'
});





