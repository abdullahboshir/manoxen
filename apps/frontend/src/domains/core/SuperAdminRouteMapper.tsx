import AccountList from "@/domains/erp/accounting/ui/components/AccountList";
import BudgetList from "@/domains/erp/accounting/ui/components/BudgetList";
import ExpenseList from "@/domains/erp/accounting/ui/components/ExpenseList";
import TransactionList from "@/domains/erp/accounting/ui/components/TransactionList";

import AffiliateList from "@/domains/commerce/marketing/ui/components/AffiliateList";
import AudienceList from "@/domains/commerce/marketing/ui/components/AudienceList";
import CampaignList from "@/domains/commerce/marketing/ui/components/CampaignList";
import CouponList from "@/domains/commerce/marketing/ui/components/CouponList";
import EventList from "@/domains/commerce/marketing/ui/components/EventList";
import PixelList from "@/domains/commerce/marketing/ui/components/PixelList";
import PromotionList from "@/domains/commerce/marketing/ui/components/PromotionList";
import SeoSettings from "@/domains/commerce/marketing/ui/components/SeoSettings";

import CourierList from "@/domains/erp/supply-chain/ui/components/CourierList";
import ParcelList from "@/domains/erp/supply-chain/ui/components/ParcelList";

import AssetList from "@/domains/erp/hrm/ui/components/AssetList";
import AttendanceList from "@/domains/erp/hrm/ui/components/AttendanceList";
import DepartmentList from "@/domains/erp/hrm/ui/components/DepartmentList";
import DesignationList from "@/domains/erp/hrm/ui/components/DesignationList";
import LeaveList from "@/domains/erp/hrm/ui/components/LeaveList";
import PayrollList from "@/domains/erp/hrm/ui/components/PayrollList";
import StaffList from "@/domains/erp/hrm/ui/components/StaffList";

import ContentList from "./content/ContentList";

import BlacklistList from "./risk/BlacklistList";
import FraudDetectionList from "./risk/FraudDetectionList";
import RiskProfileList from "./risk/RiskProfileList";
import RiskRulesList from "./risk/RiskRulesList";

import ChatInterface from "./support/ChatInterface";
import DisputeList from "./support/DisputeList";
import TicketList from "./support/TicketList";

import ApiKeyList from "./system/ApiKeyList";
import AuditLogList from "./system/AuditLogList";
import BackupList from "./system/BackupList";
import CurrencyList from "./system/CurrencyList";
import EmailTemplateList from "./system/EmailTemplateList";
import LanguageList from "./system/LanguageList";
import NotificationList from "./system/NotificationList";
import SmsTemplateList from "./system/SmsTemplateList";
import WebhookList from "./system/WebhookList";
import ZoneList from "./system/ZoneList";

import LandingPageList from "./storefront/LandingPageList";
import PluginList from "./storefront/PluginList";
import ThemeList from "./storefront/ThemeList";
import QuestionList from "./storefront/QuestionList";

// Map route segments to Components
export const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  // Accounting
  "accounting/accounts": AccountList,
  "accounting/budgets": BudgetList,
  "accounting/expenses": ExpenseList,
  "accounting/transactions": TransactionList,

  // Reports & Analytics (formerly Marketing)
  "reports/affiliates": AffiliateList,
  "reports/campaigns": CampaignList,
  "reports/coupons": CouponList,
  "reports/promotions": PromotionList,
  "reports/seo": SeoSettings,
  "reports/audiences": AudienceList,
  "reports/pixel": PixelList,

  // Logistics
  "logistics/courier": CourierList,
  "logistics/parcel": ParcelList,

  // HRM
  "hrm/assets": AssetList,
  "hrm/attendance": AttendanceList,
  "hrm/departments": DepartmentList,
  "hrm/designations": DesignationList,
  "hrm/leave": LeaveList,
  "hrm/payroll": PayrollList,
  "hrm/staff": StaffList,

  // Content
  content: ContentList,

  // Risk
  "risk/fraud": FraudDetectionList,
  "risk/blacklist": BlacklistList,
  "risk/rules": RiskRulesList,

  // Support
  "support/chat": ChatInterface,
  "support/disputes": DisputeList,
  "support/tickets": TicketList,

  // System
  "system/api-keys": ApiKeyList,
  "system/audit-logs": AuditLogList,
  "system/backups": BackupList,
  "system/currencies": CurrencyList,
  "system/email-templates": EmailTemplateList,
  "system/languages": LanguageList,
  "system/notifications": NotificationList,
  "system/sms-templates": SmsTemplateList,
  "system/webhooks": WebhookList,
  "system/zones": ZoneList,

  // Storefront (online-store)
  "online-store/landing-pages": LandingPageList,
  "online-store/plugins": PluginList,
  "online-store/themes": ThemeList,
};
