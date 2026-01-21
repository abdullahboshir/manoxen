export const RESOURCE_SCOPE_MAP: Record<string, string> = {
    // 🌍 Global / Platform Level (Infrastructural & SaaS)
    systemConfig: "global",
    platformSetting: "global",
    apiKey: "global",
    webhook: "global",
    plugin: "global",
    currency: "global",
    language: "global",
    theme: "global",
    backup: "global",
    auditLog: "global",
    feature: "global",
    integration: "global",
    blacklist: "global",
    zone: "global",
    auth: "global",
    user: "global",
    role: "global",
    permission: "global",
    analyticsReport: "global",
    automation: "global",
    workflow: "global",
    subscription: "global", // SaaS Level
    global: "global",
    tenant: "global",
    domain: "organization",
    ssl: "organization",

    // 🏢 Organization / Tenant Level (Shared across Business Units)
    organizationSetting: "organization",
    businessUnit: "organization",
    businessSetting: "business",
    shareholder: "organization",
    meeting: "organization",
    voting: "organization",
    compliance: "organization",
    license: "organization",

    // 💼 Business Unit / Context Level (The "Business" Logic)
    report: "business",
    dashboard: "business",
    payment: "business",
    expense: "business",
    expenseCategory: "business",
    account: "business",
    transaction: "business",
    settlement: "business",
    payout: "business",
    reconciliation: "business",
    journal: "business",
    ledger: "business",
    balanceSheet: "business",
    budget: "business",
    seo: "business",
    promotion: "business",
    coupon: "business",
    adCampaign: "business",
    affiliate: "business",
    loyalty: "business",
    audience: "business",
    pixel: "business",
    event: "business",
    landingPage: "business",
    emailTemplate: "business",
    smsTemplate: "business",
    review: "business",
    customer: "business",
    supplier: "business",
    vendor: "business",
    staff: "business",
    payroll: "business",
    department: "business",
    designation: "business",
    asset: "business",
    notification: "business",
    chat: "business",
    ticket: "business",
    dispute: "business",
    call: "business",
    // meeting: "business", // Duplicate of Organization level meeting
    note: "business",
    fraudDetection: "business",
    riskRule: "business",
    riskProfile: "business",

    // 📦 ERP & Inventory (Usually Business scope, can be Warehouse if granular)
    product: "business",
    category: "business",
    brand: "business",
    variant: "business",
    attribute: "business",
    attributeGroup: "business",
    unit: "business",
    tax: "business",
    warranty: "business",
    inventory: "business",
    warehouse: "business",
    purchase: "business",
    adjustment: "business",
    transfer: "business",
    order: "business",
    quotation: "business",
    invoice: "business",
    return: "business",
    abandonedCart: "business",
    media: "business",
    folder: "business",
    wishlist: "business",
    cart: "business",
    question: "business",
    salesReport: "business",
    purchaseReport: "business",
    stockReport: "business",
    profitLossReport: "business",

    // 🏪 Outlet / Scoped Level (Direct POS usage)
    outlet: "outlet",
    storefront: "outlet",
    terminal: "outlet",
    cashRegister: "outlet",
    outletSetting: "outlet",
    attendance: "business",
    leave: "business",

    // 🚚 Logistics
    shipping: "business",
    courier: "business",
    delivery: "business",
    parcel: "business",
    driver: "business",
    vehicle: "business",
    track: "business",
    dispatch: "business",
};

/**
 * Fallback policy to ensure system stability when new resources are added 
 * without explicit mapping.
 */
export const DEFAULT_SCOPE = "business";

export function getScopeForResource(resource: string): string {
    return RESOURCE_SCOPE_MAP[resource] ?? DEFAULT_SCOPE;
}












