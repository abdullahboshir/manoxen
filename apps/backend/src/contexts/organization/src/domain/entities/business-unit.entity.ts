import type { ISharedBranding, ISharedContact, ISharedLocation } from "../../shared/common.interface";
import type { IBusinessUnitPerformance, IBusinessUnitPolicy, IBusinessUnitSeo } from "../../shared/common.interface";

export interface IBusinessUnitCore {
    name: string;
    id: string;
    domain: string;
    organization?: string;
    branding: ISharedBranding;
    contact: ISharedContact;
    location: ISharedLocation;
    slug: string;
    categories: string[];
    primaryCategory: string;
    tags: string[];
    specialties: string[];
    attributeGroup?: string;
    attributeGroups?: string[];
    operationalModel: "retail" | "wholesale" | "distributor" | "manufacturing" | "service" | "online_only" | "hybrid" | "marketplace";
    industry: "fashion" | "electronics" | "grocery" | "pharmacy" | "restaurant" | "beauty" | "furniture" | "automotive" | "books_stationery" | "general" | "other";
    localization: {
        currency: "BDT" | "USD";
        language: "en" | "bn";
        timezone: string;
        dateFormat: string;
        inventoryManagement: boolean;
        lowStockAlert: boolean;
    };
    licenseExpiry?: Date;
    customDomain?: string;
    dedicatedConfig?: {
        serverRegion?: string;
        dbCluster?: string;
        customEnv?: any;
    };
    licensedModules: ('commerce' | 'pos' | 'erp' | 'hrm' | 'crm' | 'logistics' | 'integrations' | 'accounting' | 'reports' | 'api_access')[];
    policies?: IBusinessUnitPolicy;
    seo: IBusinessUnitSeo;
    features: {
        hasInventory: boolean;
        hasVariants: boolean;
        hasAttributeGroups: boolean;
        hasShipping: boolean;
        hasSeo: boolean;
        hasCompliance: boolean;
        hasBundles: boolean;
        hasWarranty: boolean;
    };
    activeModules: {
        pos: boolean | {
            enabled: boolean;
            features?: Record<string, boolean>;
        };
        erp: boolean | {
            enabled: boolean;
            features?: Record<string, boolean>;
        };
        hrm: boolean | {
            enabled: boolean;
            features?: Record<string, boolean>;
        };
        commerce: boolean | {
            enabled: boolean;
            features?: Record<string, boolean>;
        };
        crm: boolean | {
            enabled: boolean;
            features?: Record<string, boolean>;
        };
        logistics: boolean | {
            enabled: boolean;
            features?: Record<string, boolean>;
        };
        governance: boolean | {
            enabled: boolean;
            features?: Record<string, boolean>;
        };
        integrations: boolean | {
            enabled: boolean;
            features?: Record<string, boolean>;
        };
        saas: boolean | {
            enabled: boolean;
            features?: Record<string, boolean>;
        };
    };
    performance: IBusinessUnitPerformance;
    ratings: {
        average: number;
        count: number;
        totalReviews: number;
        distribution: {
            1: number;
            2: number;
            3: number;
            4: number;
            5: number;
        };
    };
    statistics: {
        totalProducts: number;
        activeProducts: number;
        totalOrders: number;
        completedOrders: number;
        totalRevenue: number;
        monthlyRevenue: number;
        totalCustomers: number;
        repeatCustomers: number;
        visitorCount: number;
        conversionRate: number;
        averageOrderValue: number;
    };
    status: "draft" | "under_review" | "published" | "suspended" | "archived";
    visibility: "public" | "private" | "unlisted";
    isFeatured: boolean;
    isVerified: boolean;
    featuredExpiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    lastOrderAt?: Date;
    lastReviewAt?: Date;
    isDeleted?: boolean;
    deletedAt?: Date;
    settings?: any;
}
