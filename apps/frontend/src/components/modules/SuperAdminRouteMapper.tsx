import AccountList from "@/features/accounting/AccountList";
import BudgetList from "@/features/accounting/BudgetList";
import ExpenseList from "@/features/accounting/ExpenseList";
import TransactionList from "@/features/accounting/TransactionList";

import AffiliateList from "@/features/marketing/AffiliateList";
import AudienceList from "@/features/marketing/AudienceList";
import CampaignList from "@/features/marketing/CampaignList";
import CouponList from "@/features/marketing/CouponList";
import EventList from "@/features/marketing/EventList";
import PixelList from "@/features/marketing/PixelList";
import PromotionList from "@/features/marketing/PromotionList";
import SeoSettings from "@/features/marketing/SeoSettings";

import CourierList from "@/features/supply-chain/CourierList";
import ParcelList from "@/features/supply-chain/ParcelList";

import AssetList from "@/features/hrm/AssetList";
import AttendanceList from "@/features/hrm/AttendanceList";
import DepartmentList from "@/features/hrm/DepartmentList";
import DesignationList from "@/features/hrm/DesignationList";
import LeaveList from "@/features/hrm/LeaveList";
import PayrollList from "@/features/hrm/PayrollList";
import StaffList from "@/features/hrm/StaffList";

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
