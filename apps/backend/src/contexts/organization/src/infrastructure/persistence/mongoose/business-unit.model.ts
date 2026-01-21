import { Schema, model } from "mongoose";
import { contextScopePlugin } from "@manoxen/core-util";
import { brandingSchema, contactSchema, locationSchema } from "../../../shared/common.schema";
import type { IBusinessUnitCore } from "../../../domain/entities/business-unit.entity";
import { Document, Model, Types } from "mongoose";

export interface IBusinessUnitCoreDocument extends Document, IBusinessUnitCore {
    id: string;
    isActive: boolean;
    isPublished: boolean;
    isSuspended: boolean;
    performanceScore: number;
    totalEarnings: number;
    daysSinceCreation: number;
    publish(): Promise<void>;
    unpublish(): Promise<void>;
    suspend(reason: string): Promise<void>;
    activate(): Promise<void>;
    updatePerformanceMetrics(): Promise<void>;
    updateStatistics(): Promise<void>;
    addProduct(productId: Types.ObjectId): Promise<void>;
    removeProduct(productId: Types.ObjectId): Promise<void>;
    calculateBusinessUnitCommission(): number;
    getProductStats(): Promise<{
        total: number;
        active: number;
        categories: number;
    }>;
    getOrderStats(timeframe: "daily" | "weekly" | "monthly" | "yearly"): Promise<{
        timeframe: string;
        orders: number;
        revenue: number;
        averageOrderValue: number;
    }>;
}

export interface IBusinessUnitCoreModel extends Model<IBusinessUnitCoreDocument> {
    findFeaturedBusinessUnits(limit?: number): Promise<IBusinessUnitCoreDocument[]>;
    findBusinessUnitsByCategory(categoryId: Types.ObjectId): Promise<IBusinessUnitCoreDocument[]>;
    findBusinessUnitsByVendor(vendorId: Types.ObjectId): Promise<IBusinessUnitCoreDocument[]>;
    searchBusinessUnits(query: string, filters?: any): Promise<IBusinessUnitCoreDocument[]>;
    findTopPerformingBusinessUnits(limit?: number): Promise<IBusinessUnitCoreDocument[]>;
    findNewBusinessUnits(limit?: number): Promise<IBusinessUnitCoreDocument[]>;
    findBusinessUnitsNeedingAttention(): Promise<IBusinessUnitCoreDocument[]>;
    getBusinessUnitStats(id: Types.ObjectId): Promise<any>;
    getCategoryBusinessUnitStats(categoryId: Types.ObjectId): Promise<any>;
    getVendorBusinessUnitStats(vendorId: Types.ObjectId): Promise<any>;
    getPlatformBusinessUnitStats(): Promise<any>;
    calculateBusinessUnitGrowthMetrics(): Promise<any>;
}

export const businessUnitCoreSchema = new Schema<IBusinessUnitCoreDocument, IBusinessUnitCoreModel>(
    {
        branding: { type: brandingSchema, required: true },
        contact: { type: contactSchema, required: true },
        location: { type: locationSchema, required: true },
        organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
        name: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        slug: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true,
        },
        domain: {
            type: String,
            enum: ["retail", "pharmacy", "grocery", "restaurant", "electronics", "fashion", "service", "construction", "automotive", "health", "hospitality", "other"],
            default: "retail",
            index: true
        },
        attributeGroup: { type: Schema.Types.ObjectId, ref: 'Category', index: true },
        attributeGroups: [{ type: Schema.Types.ObjectId, ref: 'Category', index: true }],

        // ====== LOCALIZATION (Identity Defaults) ======
        localization: {
            currency: { type: String, enum: ["BDT", "USD"], default: "BDT" },
            language: { type: String, enum: ["en", "bn"], default: "en" },
            timezone: { type: String, default: "Asia/Dhaka" },
            dateFormat: { type: String, default: "DD/MM/YYYY" },
            weightUnit: { type: String, enum: ["kg", "g", "lb"], default: "kg" },
            dimensionUnit: { type: String, enum: ["cm", "inch"], default: "cm" },
            inventoryManagement: { type: Boolean, default: true },
            lowStockAlert: { type: Boolean, default: true },
        },

        features: {
            hasInventory: { type: Boolean, default: true },
            hasVariants: { type: Boolean, default: true },
            hasAttributeGroups: { type: Boolean, default: true },
            hasShipping: { type: Boolean, default: true },
            hasSeo: { type: Boolean, default: true },
            hasCompliance: { type: Boolean, default: true },
            hasBundles: { type: Boolean, default: true },
            hasWarranty: { type: Boolean, default: true }
        },

        // ====== ACTIVE MODULES ======
        activeModules: {
            pos: { type: Schema.Types.Mixed, default: true },
            erp: { type: Schema.Types.Mixed, default: true },
            hrm: { type: Schema.Types.Mixed, default: false },
            commerce: { type: Schema.Types.Mixed, default: false },
            crm: { type: Schema.Types.Mixed, default: false },
            logistics: { type: Schema.Types.Mixed, default: false },
            governance: { type: Schema.Types.Mixed, default: false },
            integrations: { type: Schema.Types.Mixed, default: false },
            saas: { type: Schema.Types.Mixed, default: false }
        },
        licensedModules: [{
            type: String,
            enum: ['commerce', 'pos', 'erp', 'hrm', 'crm', 'logistics', 'integrations', 'accounting', 'reports', 'api_access'],
        }],
        licenseExpiry: { type: Date },
        customDomain: { type: String, trim: true },
        dedicatedConfig: {
            serverRegion: { type: String },
            dbCluster: { type: String },
            customEnv: { type: Schema.Types.Mixed }
        },

        // ====== POLICIES & SEO ======
        policies: {
            returnPolicy: { type: String, required: false },
            shippingPolicy: { type: String, required: false },
            privacyPolicy: { type: String, required: false },
            termsOfService: { type: String, required: false },
            warrantyPolicy: { type: String },
            refundPolicy: { type: String }
        },
        seo: {
            metaTitle: { type: String, required: false, default: "" },
            metaDescription: { type: String, required: false, default: "" },
            keywords: [{ type: String }],
            canonicalUrl: { type: String },
            ogImage: { type: String },
            structuredData: { type: Schema.Types.Mixed },
        },

        // ====== PERFORMANCE & RATINGS ======
        performance: {
            responseRate: { type: Number, default: 0, min: 0, max: 100 },
            fulfillmentRate: { type: Number, default: 0, min: 0, max: 100 },
            onTimeDeliveryRate: { type: Number, default: 0, min: 0, max: 100 },
            customerSatisfaction: { type: Number, default: 0, min: 0, max: 5 },
            productQualityScore: { type: Number, default: 0, min: 0, max: 5 },
            overallScore: { type: Number, default: 0, min: 0, max: 100 },
        },

        ratings: {
            average: { type: Number, default: 0, min: 0, max: 5 },
            count: { type: Number, default: 0 },
            totalReviews: { type: Number, default: 0 },
            distribution: {
                1: { type: Number, default: 0 },
                2: { type: Number, default: 0 },
                3: { type: Number, default: 0 },
                4: { type: Number, default: 0 },
                5: { type: Number, default: 0 },
            },
        },

        // ====== STATISTICS ======
        statistics: {
            totalProducts: { type: Number, default: 0 },
            activeProducts: { type: Number, default: 0 },
            totalOrders: { type: Number, default: 0 },
            completedOrders: { type: Number, default: 0 },
            totalRevenue: { type: Number, default: 0 },
            monthlyRevenue: { type: Number, default: 0 },
            totalCustomers: { type: Number, default: 0 },
            repeatCustomers: { type: Number, default: 0 },
            visitorCount: { type: Number, default: 0 },
            conversionRate: { type: Number, default: 0, min: 0, max: 100 },
            averageOrderValue: { type: Number, default: 0 },
        },

        // ====== STATUS & VISIBILITY ======
        status: {
            type: String,
            enum: ["draft", "under_review", "published", "suspended", "archived"],
            default: "draft",
            index: true,
        },
        visibility: {
            type: String,
            enum: ["public", "private", "unlisted"],
            default: "public",
            index: true,
        },
        isFeatured: { type: Boolean, default: false, index: true },
        isVerified: { type: Boolean, default: false },
        featuredExpiresAt: { type: Date },

        // ====== TIMESTAMPS ======
        publishedAt: { type: Date },
        lastOrderAt: { type: Date },
        lastReviewAt: { type: Date },
        isDeleted: { type: Boolean, default: false, select: false },
        deletedAt: { type: Date },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// ==================== INDEXES ====================
businessUnitCoreSchema.index({ slug: 1 });
businessUnitCoreSchema.index({ status: 1, visibility: 1 });
businessUnitCoreSchema.index({ categories: 1 });
businessUnitCoreSchema.index({ primaryCategory: 1 });
businessUnitCoreSchema.index({ isFeatured: 1 });
businessUnitCoreSchema.index({
    "branding.name": "text",
    "branding.description": "text",
    tags: "text",
});
businessUnitCoreSchema.index({ createdAt: -1 });
businessUnitCoreSchema.index({ "ratings.average": -1 });
businessUnitCoreSchema.index({ "statistics.totalRevenue": -1 });

// ==================== VIRTUAL PROPERTIES ====================
businessUnitCoreSchema.virtual("isActive").get(function (this: IBusinessUnitCoreDocument) {
    return this.status === "published" && this.visibility === "public";
});

businessUnitCoreSchema.virtual("isPublished").get(function (this: IBusinessUnitCoreDocument) {
    return this.status === "published";
});

businessUnitCoreSchema.virtual("isSuspended").get(function (this: IBusinessUnitCoreDocument) {
    return this.status === "suspended";
});

businessUnitCoreSchema.virtual("performanceScore").get(function (this: IBusinessUnitCoreDocument) {
    return this.performance?.overallScore || 0;
});

businessUnitCoreSchema.virtual("totalEarnings").get(function (this: IBusinessUnitCoreDocument) {
    return this.statistics?.totalRevenue || 0;
});

businessUnitCoreSchema.virtual("daysSinceCreation").get(function (this: IBusinessUnitCoreDocument) {
    if (!this.createdAt) return 0;
    const diffTime = Math.abs(new Date().getTime() - this.createdAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

businessUnitCoreSchema.virtual("outlets", {
    ref: "Outlet",
    localField: "_id",
    foreignField: "businessUnit"
});

// Virtual for business unit settings
businessUnitCoreSchema.virtual('settings', {
    ref: 'BusinessUnitSettings',
    localField: '_id',
    foreignField: 'businessUnit',
    justOne: true
});

// Plugins
businessUnitCoreSchema.plugin(contextScopePlugin, {
    organizationField: 'organization'
});

// ==================== STATICS ====================
businessUnitCoreSchema.statics.findFeaturedBusinessUnits = function (
    limit: number = 12
): Promise<IBusinessUnitCoreDocument[]> {
    return this.find({
        isFeatured: true,
        status: "published",
        visibility: "public",
        $or: [
            { featuredExpiresAt: { $exists: false } },
            { featuredExpiresAt: { $gte: new Date() } },
        ],
    })
        .limit(limit)
        .sort({ "ratings.average": -1, "statistics.totalRevenue": -1 });
};

businessUnitCoreSchema.statics.findBusinessUnitsByCategory = function (
    categoryId: Types.ObjectId
): Promise<IBusinessUnitCoreDocument[]> {
    return this.find({
        categories: categoryId,
        status: "published",
        visibility: "public",
    })
        .sort({ "ratings.average": -1, "statistics.totalRevenue": -1 });
};

businessUnitCoreSchema.statics.findBusinessUnitsByVendor = function (
    vendorId: Types.ObjectId
): Promise<IBusinessUnitCoreDocument[]> {
    return this.find({ vendor: vendorId })
        .sort({ createdAt: -1 });
};

businessUnitCoreSchema.statics.searchBusinessUnits = function (
    query: string,
    filters: any = {}
): Promise<IBusinessUnitCoreDocument[]> {
    const searchFilter: any = {
        $text: { $search: query },
        status: "published",
        visibility: "public",
    };

    if (filters.categories)
        searchFilter.categories = { $in: filters.categories };
    if (filters.domain)
        searchFilter.domain = filters.domain;
    if (filters.minRating)
        searchFilter["ratings.average"] = { $gte: filters.minRating };

    return this.find(searchFilter)
        .sort({
            score: { $meta: "textScore" },
            "ratings.average": -1,
        })
        .limit(filters.limit || 20);
};

businessUnitCoreSchema.statics.findTopPerformingBusinessUnits = function (
    limit: number = 10
): Promise<IBusinessUnitCoreDocument[]> {
    return this.find({
        status: "published",
        visibility: "public",
        "statistics.totalOrders": { $gt: 0 },
    })
        .limit(limit)
        .sort({
            "performance.overallScore": -1,
            "statistics.totalRevenue": -1,
        });
};

businessUnitCoreSchema.statics.findNewBusinessUnits = function (
    limit: number = 10
): Promise<IBusinessUnitCoreDocument[]> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return this.find({
        status: "published",
        visibility: "public",
        createdAt: { $gte: thirtyDaysAgo },
    })
        .limit(limit)
        .sort({ createdAt: -1 });
};

businessUnitCoreSchema.statics.findBusinessUnitsNeedingAttention = function (
): Promise<IBusinessUnitCoreDocument[]> {
    return this.find({
        status: "published",
        $or: [
            { "performance.overallScore": { $lt: 60 } },
            { "ratings.average": { $lt: 3.0 } },
            { "statistics.activeProducts": 0 },
            {
                "statistics.totalOrders": 0,
                createdAt: {
                    $lte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                },
            },
        ],
    })
        .limit(50);
};

businessUnitCoreSchema.statics.getBusinessUnitStats = async function (
    businessUnitId: Types.ObjectId
): Promise<any> {
    return this.aggregate([
        { $match: { _id: businessUnitId } },
        {
            $project: {
                businessUnitName: "$branding.name",
                organization: 1,
                status: 1,
                totalProducts: "$statistics.totalProducts",
                activeProducts: "$statistics.activeProducts",
                totalOrders: "$statistics.totalOrders",
                totalRevenue: "$statistics.totalRevenue",
                averageRating: "$ratings.average",
                performanceScore: "$performance.overallScore",
                daysActive: {
                    $divide: [
                        { $subtract: [new Date(), "$createdAt"] },
                        1000 * 60 * 60 * 24,
                    ],
                },
            },
        },
    ]);
};

businessUnitCoreSchema.statics.getCategoryBusinessUnitStats = async function (
    categoryId: Types.ObjectId
): Promise<any> {
    return this.aggregate([
        { $match: { categories: categoryId, status: "published" } },
        {
            $group: {
                _id: "$primaryCategory",
                totalBusinessUnits: { $sum: 1 },
                averageRating: { $avg: "$ratings.average" },
                totalProducts: { $sum: "$statistics.totalProducts" },
                totalRevenue: { $sum: "$statistics.totalRevenue" },
            },
        },
    ]);
};

businessUnitCoreSchema.statics.getVendorBusinessUnitStats = async function (
    vendorId: Types.ObjectId
): Promise<any> {
    return this.aggregate([
        { $match: { vendor: vendorId } },
        {
            $group: {
                _id: "$status",
                businessUnitCount: { $sum: 1 },
                totalProducts: { $sum: "$statistics.totalProducts" },
                totalRevenue: { $sum: "$statistics.totalRevenue" },
                averageRating: { $avg: "$ratings.average" },
            },
        },
    ]);
};

businessUnitCoreSchema.statics.getPlatformBusinessUnitStats = async function (
): Promise<any> {
    return this.aggregate([
        { $match: { status: "published" } },
        {
            $group: {
                _id: null,
                totalBusinessUnits: { $sum: 1 },
                featuredBusinessUnits: { $sum: { $cond: ["$isFeatured", 1, 0] } },
                verifiedBusinessUnits: { $sum: { $cond: ["$isVerified", 1, 0] } },
                averageRating: { $avg: "$ratings.average" },
                totalProducts: { $sum: "$statistics.totalProducts" },
                totalRevenue: { $sum: "$statistics.totalRevenue" },
            },
        },
    ]);
};

businessUnitCoreSchema.statics.calculateBusinessUnitGrowthMetrics = async function (
): Promise<any> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return this.aggregate([
        {
            $match: {
                status: "published",
                createdAt: { $gte: thirtyDaysAgo },
            },
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                newBusinessUnits: { $sum: 1 },
                totalRevenue: { $sum: "$statistics.totalRevenue" },
            },
        },
        { $sort: { _id: 1 } },
    ]);
};

export const BusinessUnit = model<IBusinessUnitCoreDocument, IBusinessUnitCoreModel>("BusinessUnit", businessUnitCoreSchema);
export default BusinessUnit;

