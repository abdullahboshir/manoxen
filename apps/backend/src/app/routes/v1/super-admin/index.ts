import { Router } from "express";
import requireModule from "#core/middleware/license.middleware";



import { UploadRoutes } from "#app/modules/platform/common/upload/upload.routes";

// IAM
import { userRoutes } from "#app/modules/iam/user/user.routes";
import { roleRoutes } from "#app/modules/iam/role/role.routes";
import { permissionRoutes } from "#app/modules/iam/permission/permission.routes";
import { PermissionGroupRoutes } from "#app/modules/iam/permission-group/permission-group.routes";

// Platform Organization
import { businessUnitRoutes } from "#app/modules/platform/organization/business-unit/core/business-unit.routes";
import { OutletRoutes } from "#app/modules/platform/organization/outlet/outlet.routes";
import { dashboardRoutes } from "./dashboard.routes";

// Domain Routes (Using Public API aka 'barrel' exports)
import { 
  productRoutes,
  categoryRoutes,
  BrandRoutes,
  UnitRoutes,
  TaxRoutes,
  attributeRoutes,
  AttributeGroupRoutes,
  WarrantyRoutes 
} from "#domain/catalog/index";

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
} from "#domain/sales/index";

import { 
  SupplierRoutes,
  PurchaseRoutes,
  InventoryRoutes,
  SalesReportRoutes,
  PurchaseReportRoutes,
  StockReportRoutes,
  ProfitLossRoutes,
  logisticsRoutes,
  AccountRoutes,
  TransactionRoutes,
  BudgetRoutes
} from "#domain/erp/index";

import { 
  AttendanceRoutes,
  LeaveRoutes,
  PayrollRoutes,
  DepartmentRoutes,
  DesignationRoutes,
  AssetRoutes 
} from "#domain/hrm/index";

import { 
  ShareholderRoutes,
  VotingRoutes,
  MeetingRoutes,
  ComplianceRoutes 
} from "#domain/governance/index";

import {
  ExpenseRoutes,
  ExpenseCategoryRoutes,
  CashRegisterRoutes
} from "#domain/pos/index";


// Settings
import { SystemSettingsRoutes } from "#app/modules/platform/settings/system-settings/system-settings.routes";
import { PlatformSettingsRoutes } from "#app/modules/platform/settings/platform-settings/platform-settings.routes";
import { BusinessUnitSettingsRoutes } from "#app/modules/platform/organization/business-unit/settings/settings.routes";

// Marketing
import { marketingRoutes } from "#app/modules/marketing/core/marketing.routes";
import { automationRoutes } from "#app/modules/platform/automation/automation.routes";
import { SEORoutes } from "#app/modules/marketing/seo/seo.routes";
import { AffiliateRoutes } from "#app/modules/marketing/affiliates/affiliate.routes";
import { EventRoutes } from "#app/modules/marketing/events/event.routes";
import { PixelRoutes } from "#app/modules/marketing/pixels/pixel.routes";

// Middleware
import moduleGuard from "#app/middlewares/moduleGuard";
import auth from "#core/middleware/auth";

// Contacts
import { customerRoutes } from "#app/modules/contacts/customers/customer.routes";



// Finance (Platform)
import { ReconciliationRoutes } from "#app/modules/platform/finance/reconciliation/reconciliation.routes";
import { PayoutRoutes } from "#app/modules/platform/finance/payouts/payout.routes";
import { SettlementRoutes } from "#app/modules/platform/finance/settlements/settlement.routes";

// System Management
import { AuditLogRoutes } from "#app/modules/platform/system/audit-log/audit-log.routes";
import { BackupRoutes } from "#app/modules/platform/system/backup/backup.routes";
import { NotificationRoutes } from "#app/modules/platform/system/notification/notification.routes";
import { CurrencyRoutes } from "#app/modules/platform/system/currency/currency.routes";
import { LanguageRoutes } from "#app/modules/platform/system/language/language.routes";
import { ZoneRoutes } from "#app/modules/platform/system/zone/zone.routes";
import { APIKeyRoutes } from "#app/modules/platform/system/api-key/api-key.routes";
import { WebhookRoutes } from "#app/modules/platform/system/webhook/webhook.routes";
import { EmailTemplateRoutes } from "#app/modules/platform/system/email-template/email-template.routes";
import { SMSTemplateRoutes } from "#app/modules/platform/system/sms-template/sms-template.routes";

import { contextGuard, USER_ROLE } from "@manoxen/iam-core";



const superAdminRoutes = Router();

// ========================================================================
// ðŸ›¡ï¸ GLOBAL SECURITY LAYER: Centralized Authentication
// ========================================================================
superAdminRoutes.use(auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.ORGANIZATION_OWNER,
    'admin',
    'manager',
    'business-admin'
));

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

// --- CRM (Licensed) ---
superAdminRoutes.use("/customers", moduleGuard('crm'), requireModule('crm'), customerRoutes);
superAdminRoutes.use("/marketing", moduleGuard('crm'), requireModule('crm'), marketingRoutes);
superAdminRoutes.use("/automation", moduleGuard('crm'), requireModule('crm'), automationRoutes);

// --- E-COMMERCE (Licensed) ---
superAdminRoutes.use("/storefront", moduleGuard('ecommerce'), requireModule('ecommerce'), storefrontRoutes);
superAdminRoutes.use("/product-questions", moduleGuard('ecommerce'), requireModule('ecommerce'), ProductQARoutes);
superAdminRoutes.use("/reviews", moduleGuard('ecommerce'), requireModule('ecommerce'), ProductReviewRoutes);

// --- LOGISTICS (Licensed) ---
superAdminRoutes.use("/risk", moduleGuard('logistics'), requireModule('logistics'), riskRoutes);
superAdminRoutes.use("/logistics", moduleGuard('logistics'), requireModule('logistics'), logisticsRoutes);

// --- CORE SYSTEM (Context Guarded where ID is present) ---
superAdminRoutes.use("/upload", UploadRoutes);
superAdminRoutes.use("/users", userRoutes);
superAdminRoutes.use("/role", roleRoutes);
superAdminRoutes.use("/permission", permissionRoutes);
superAdminRoutes.use("/business-unit", contextGuard(), businessUnitRoutes);
superAdminRoutes.use("/outlets", contextGuard(), OutletRoutes);
superAdminRoutes.use("/settings", contextGuard(), BusinessUnitSettingsRoutes);
superAdminRoutes.use("/system-settings", SystemSettingsRoutes);
superAdminRoutes.use("/platform-settings", PlatformSettingsRoutes);
superAdminRoutes.use("/permission-groups", PermissionGroupRoutes);
superAdminRoutes.use("/dashboard", dashboardRoutes);

// --- HRM ---
superAdminRoutes.use("/hrm/attendance", moduleGuard('hrm'), AttendanceRoutes);
superAdminRoutes.use("/hrm/leave", moduleGuard('hrm'), LeaveRoutes);
superAdminRoutes.use("/hrm/payroll", moduleGuard('hrm'), PayrollRoutes);
superAdminRoutes.use("/hrm/departments", moduleGuard('hrm'), DepartmentRoutes);
superAdminRoutes.use("/hrm/designations", moduleGuard('hrm'), DesignationRoutes);
superAdminRoutes.use("/hrm/assets", moduleGuard('hrm'), AssetRoutes);

// --- ACCOUNTING ---
superAdminRoutes.use("/accounting/accounts", moduleGuard('erp'), AccountRoutes);
superAdminRoutes.use("/accounting/transactions", moduleGuard('erp'), TransactionRoutes);
superAdminRoutes.use("/accounting/budgets", moduleGuard('erp'), BudgetRoutes);

// --- STOREFRONT ADVANCED ---
superAdminRoutes.use("/storefront/themes", moduleGuard('ecommerce'), ThemeRoutes);
superAdminRoutes.use("/storefront/plugins", moduleGuard('ecommerce'), PluginRoutes);
superAdminRoutes.use("/storefront/landing-pages", moduleGuard('ecommerce'), LandingPageRoutes);
superAdminRoutes.use("/storefront/abandoned-carts", moduleGuard('ecommerce'), AbandonedCartRoutes);

// --- MARKETING ADVANCED ---
superAdminRoutes.use("/marketing/seo", moduleGuard('crm'), SEORoutes);
superAdminRoutes.use("/marketing/affiliates", moduleGuard('crm'), AffiliateRoutes);
superAdminRoutes.use("/marketing/events", moduleGuard('crm'), EventRoutes);
superAdminRoutes.use("/marketing/pixels", moduleGuard('crm'), PixelRoutes);

// --- FINANCE (Platform) ---
superAdminRoutes.use("/finance/reconciliation", ReconciliationRoutes);
superAdminRoutes.use("/finance/payouts", PayoutRoutes);
superAdminRoutes.use("/finance/settlements", SettlementRoutes);

// --- SYSTEM ---
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

// --- GOVERNANCE ---
superAdminRoutes.use("/governance/shareholders", moduleGuard('governance'), ShareholderRoutes);
superAdminRoutes.use("/governance/voting", moduleGuard('governance'), VotingRoutes);
superAdminRoutes.use("/governance/meetings", moduleGuard('governance'), MeetingRoutes);
superAdminRoutes.use("/governance/compliance", moduleGuard('governance'), ComplianceRoutes);


export const adminGroupRoutes = superAdminRoutes;
export default superAdminRoutes;








