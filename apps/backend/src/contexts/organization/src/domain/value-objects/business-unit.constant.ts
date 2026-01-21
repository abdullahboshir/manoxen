export const BUSINESS_MODEL = {
    RETAIL: "retail",
    WHOLESALE: "wholesale",
    DISTRIBUTOR: "distributor",
    MANUFACTURING: "manufacturing",
    SERVICE: "service",
    ONLINE_ONLY: "online_only",
    HYBRID: "hybrid",
    MARKETPLACE: "marketplace",
} as const;

export const BUSINESS_INDUSTRY = {
    FASHION: "fashion",
    ELECTRONICS: "electronics",
    GROCERY: "grocery",
    PHARMACY: "pharmacy",
    RESTAURANT: "restaurant",
    BEAUTY: "beauty",
    FURNITURE: "furniture",
    AUTOMOTIVE: "automotive",
    BOOKS_STATIONERY: "books_stationery",
    STORE: "store",
    GENERAL: "general",
    OTHER: "other",
} as const;

export const BUSINESS_INDUSTRY_ARRAY = [
    "fashion",
    "electronics",
    "grocery",
    "pharmacy",
    "restaurant",
    "beauty",
    "furniture",
    "automotive",
    "books_stationery",
    "general",
    "other",
    "store",
] as const;

export const BUSINESS_MODEL_ARRAY = [
    "hybrid",
    "retail",
    "wholesale",
    "distributor",
    "manufacturing",
    "service",
    "online_only",
    "marketplace",
] as const;

export const BUSINESS_UNIT_STATUS = {
    DRAFT: "draft",
    UNDER_REVIEW: "under_review",
    PUBLISHED: "published",
    SUSPENDED: "suspended",
    ARCHIVED: "archived",
    ACTIVE: "active",
    INACTIVE: "inactive",
} as const;

export const BUSINESS_UNIT_STATUS_ARRAY = [
    "draft",
    "under_review",
    "published",
    "suspended",
    "archived",
    "active",
    "inactive",
] as const;

export const SYSTEM_MODULES = {
    POS: "pos",
    ERP: "erp",
    HRM: "hrm",
    COMMERCE: "commerce",
    CRM: "crm",
    LOGISTICS: "logistics",
} as const;

export const SYSTEM_MODULES_ARRAY = ["crm", "pos", "erp", "hrm", "commerce", "logistics"] as const;
