import { Router } from "express";
import { requireModule } from "@manoxen/infra-common";
import moduleGuard from "#app/middlewares/moduleGuard";
import { USER_ROLE } from "@manoxen/iam-core";
import { contextGuard } from "@manoxen/iam-core/src/middlewares/contextGuard";

// IAM
import { 
    userRoutes,
    roleRoutes,
    permissionRoutes,
    PermissionGroupRoutes,
    authMiddleware
} from "@manoxen/iam";

// Organization
import { 
    OrganizationRoutes, 
    businessUnitRoutes,
    OrganizationSettingsRoutes,
    PackageRoutes,
    LicenseRoutes,
    OutletRoutes,
    BusinessUnitSettingsRoutes
} from "@manoxen/organization";

// Catalog
import { 
  productRoutes,
  categoryRoutes,
  BrandRoutes,
  UnitRoutes,
  TaxRoutes,
  attributeRoutes,
  AttributeGroupRoutes,
  WarrantyRoutes 
} from "@manoxen/catalog";

// Sales (Storefront, Orders, Risk)
import { 
  orderRoutes,
  storefrontRoutes,
  ProductReviewRoutes,
  ProductQARoutes,
  riskRoutes,
  ThemeRoutes,
  PluginRoutes,
  LandingPageRoutes,
  AbandonedCartRoutes
} from "@manoxen/sales";

// Supply (Inventory, Suppliers, Purchase)
import { 
  SupplierRoutes,
  PurchaseRoutes,
  InventoryRoutes
} from "@manoxen/supply";

// Accounting
import { 
  AccountRoutes,
  TransactionRoutes,
  BudgetRoutes
} from "@manoxen/accounting";

// Analytics
import { 
  SalesReportRoutes,
  PurchaseReportRoutes,
  StockReportRoutes,
  ProfitLossRoutes,
  DashboardRoutes
} from "@manoxen/analytics";

// HRM
import { 
  AttendanceRoutes,
  LeaveRoutes,
  PayrollRoutes,
  DepartmentRoutes,
  DesignationRoutes,
  AssetRoutes 
} from "@manoxen/hrm";

// Governance & Legal
import { ShareholderRoutes } from "@manoxen/legal";
import { VotingRoutes } from "@manoxen/corporate";
import { ComplianceRoutes } from "@manoxen/governance";

// POS
import {
  ExpenseRoutes,
  ExpenseCategoryRoutes,
  CashRegisterRoutes
} from "@manoxen/pos";

// System Management
import { 
    SystemSettingsRoutes,
    AuditLogRoutes,
    BackupRoutes,
    NotificationRoutes,
    CurrencyRoutes,
    LanguageRoutes,
    ZoneRoutes,
    APIKeyRoutes,
    WebhookRoutes,
    EmailTemplateRoutes,
    SMSTemplateRoutes
} from "@manoxen/system";

// Marketing & Automation
import {
    marketingRoutes,
    SEORoutes,
    AffiliateRoutes,
    EventRoutes,
    PixelRoutes
} from "@manoxen/marketing";

import { automationRoutes } from "@manoxen/automation";

// Contacts (CRM)
import { customerRoutes } from "@manoxen/contacts";

// Ops & Logistics
import { MeetingRoutes } from "@manoxen/ops";
import { logisticsRoutes } from "@manoxen/logistics";

// Common / Shared
const stub = Router();
const UploadRoutes = stub;

const superAdminRoutes = Router();

// ========================================================================
// 🛡️ GLOBAL SECURITY LAYER: Centralized Authentication
// ========================================================================
superAdminRoutes.use(authMiddleware(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.ORGANIZATION_OWNER,
    'admin',
    'manager',
    'business-admin'
));

// --- CORE SYSTEM (Context Guarded where ID is present) ---
superAdminRoutes.use("/upload", UploadRoutes);
superAdminRoutes.use("/users", userRoutes);
superAdminRoutes.use("/role", roleRoutes);
superAdminRoutes.use("/permission", permissionRoutes);
superAdminRoutes.use("/permission-groups", PermissionGroupRoutes);
superAdminRoutes.use("/dashboard", DashboardRoutes);
superAdminRoutes.use("/system-settings", SystemSettingsRoutes);
superAdminRoutes.use("/organizations", OrganizationRoutes);
superAdminRoutes.use("/packages", PackageRoutes);
superAdminRoutes.use("/licenses", LicenseRoutes);

// Context Guarded Routes
superAdminRoutes.use("/business-unit", contextGuard(), businessUnitRoutes);
superAdminRoutes.use("/settings", contextGuard(), BusinessUnitSettingsRoutes);
superAdminRoutes.use("/outlets", contextGuard(), OutletRoutes);

// --- ERP CORE (Licensed) ---
superAdminRoutes.use("/products", moduleGuard('erp'), requireModule('erp'), productRoutes);
superAdminRoutes.use("/orders", moduleGuard('erp'), requireModule('erp'), orderRoutes);
superAdminRoutes.use("/categories", moduleGuard('erp'), requireModule('erp'), categoryRoutes);
superAdminRoutes.use("/brands", moduleGuard('erp'), requireModule('erp'), BrandRoutes);
superAdminRoutes.use("/units", moduleGuard('erp'), requireModule('erp'), UnitRoutes);
superAdminRoutes.use("/taxes", moduleGuard('erp'), requireModule('erp'), TaxRoutes);
superAdminRoutes.use("/attributes", moduleGuard('erp'), requireModule('erp'), attributeRoutes);
superAdminRoutes.use("/attribute-groups", moduleGuard('erp'), requireModule('erp'), AttributeGroupRoutes);
superAdminRoutes.use("/warranties", moduleGuard('erp'), requireModule('erp'), WarrantyRoutes);
superAdminRoutes.use("/suppliers", moduleGuard('erp'), requireModule('erp'), SupplierRoutes);
superAdminRoutes.use("/purchases", moduleGuard('erp'), requireModule('erp'), PurchaseRoutes);
superAdminRoutes.use("/inventory", moduleGuard('erp'), requireModule('erp'), InventoryRoutes);
superAdminRoutes.use("/expenses", moduleGuard('erp'), requireModule('erp'), ExpenseRoutes);
superAdminRoutes.use("/expense-categories", moduleGuard('erp'), requireModule('erp'), ExpenseCategoryRoutes);
superAdminRoutes.use("/cash-registers", moduleGuard('erp'), requireModule('erp'), CashRegisterRoutes);
superAdminRoutes.use("/reports/sales", moduleGuard('erp'), requireModule('erp'), SalesReportRoutes);
superAdminRoutes.use("/reports/purchases", moduleGuard('erp'), requireModule('erp'), PurchaseReportRoutes);
superAdminRoutes.use("/reports/stock", moduleGuard('erp'), requireModule('erp'), StockReportRoutes);
superAdminRoutes.use("/reports/profit-loss", moduleGuard('erp'), requireModule('erp'), ProfitLossRoutes);

// --- Reports & CRM (Licensed) ---
superAdminRoutes.use("/customers", moduleGuard('crm'), requireModule('crm'), customerRoutes);
superAdminRoutes.use("/automation", moduleGuard('crm'), requireModule('crm'), automationRoutes);

// --- Marketing ---
superAdminRoutes.use("/marketing", moduleGuard('marketing'), requireModule('marketing'), marketingRoutes);
superAdminRoutes.use("/marketing/seo", moduleGuard('marketing'), requireModule('marketing'), SEORoutes);
superAdminRoutes.use("/marketing/affiliates", moduleGuard('marketing'), requireModule('marketing'), AffiliateRoutes);
superAdminRoutes.use("/marketing/events", moduleGuard('marketing'), requireModule('marketing'), EventRoutes);
superAdminRoutes.use("/marketing/pixels", moduleGuard('marketing'), requireModule('marketing'), PixelRoutes);

// --- E-COMMERCE (Licensed) ---
superAdminRoutes.use("/storefront", moduleGuard('commerce'), requireModule('commerce'), storefrontRoutes);
superAdminRoutes.use("/product-questions", moduleGuard('commerce'), requireModule('commerce'), ProductQARoutes);
superAdminRoutes.use("/reviews", moduleGuard('commerce'), requireModule('commerce'), ProductReviewRoutes);

// --- LOGISTICS (Licensed) ---
superAdminRoutes.use("/risk", moduleGuard('logistics'), requireModule('logistics'), riskRoutes);
superAdminRoutes.use("/logistics", moduleGuard('logistics'), requireModule('logistics'), logisticsRoutes);

// --- HRM ---
superAdminRoutes.use("/hrm/attendance", moduleGuard('hrm'), AttendanceRoutes);
superAdminRoutes.use("/hrm/leave", moduleGuard('hrm'), LeaveRoutes);
superAdminRoutes.use("/hrm/payroll", moduleGuard('hrm'), PayrollRoutes);
superAdminRoutes.use("/hrm/departments", moduleGuard('hrm'), DepartmentRoutes);
superAdminRoutes.use("/hrm/designations", moduleGuard('hrm'), DesignationRoutes);
superAdminRoutes.use("/hrm/assets", moduleGuard('hrm'), AssetRoutes);

// --- ACCOUNTING ---
superAdminRoutes.use("/accounting/accounts", moduleGuard('accounting'), AccountRoutes);
superAdminRoutes.use("/accounting/transactions", moduleGuard('accounting'), TransactionRoutes);
superAdminRoutes.use("/accounting/budgets", moduleGuard('accounting'), BudgetRoutes);

// --- STOREFRONT ADVANCED ---
superAdminRoutes.use("/storefront/themes", moduleGuard('commerce'), ThemeRoutes);
superAdminRoutes.use("/storefront/plugins", moduleGuard('commerce'), PluginRoutes);
superAdminRoutes.use("/storefront/landing-pages", moduleGuard('commerce'), LandingPageRoutes);
superAdminRoutes.use("/storefront/abandoned-carts", moduleGuard('commerce'), AbandonedCartRoutes);


// --- SYSTEM & GOVERNANCE ---
superAdminRoutes.use("/system/audit-logs", AuditLogRoutes);
superAdminRoutes.use("/system/backups", BackupRoutes);
superAdminRoutes.use("/system/notifications", NotificationRoutes);
superAdminRoutes.use("/system/currencies", CurrencyRoutes);
superAdminRoutes.use("/system/languages", LanguageRoutes);
superAdminRoutes.use("/system/zones", ZoneRoutes);
superAdminRoutes.use("/system/api-keys", APIKeyRoutes);
superAdminRoutes.use("/system/webhooks", WebhookRoutes);
superAdminRoutes.use("/system/email-templates", EmailTemplateRoutes);
superAdminRoutes.use("/system/sms-templates", SMSTemplateRoutes);

superAdminRoutes.use("/governance/shareholders", moduleGuard('governance'), ShareholderRoutes);
superAdminRoutes.use("/governance/voting", moduleGuard('governance'), VotingRoutes);
superAdminRoutes.use("/governance/meetings", moduleGuard('governance'), MeetingRoutes);
superAdminRoutes.use("/governance/compliance", moduleGuard('governance'), ComplianceRoutes);


export const adminGroupRoutes = superAdminRoutes;
export default superAdminRoutes;
