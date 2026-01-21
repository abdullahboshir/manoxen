export const MODULES = {
  POS: "pos",
  ERP: "erp",
  HRM: "hrm",
  COMMERCE: "commerce",
  CRM: "crm",
  LOGISTICS: "logistics",
  GOVERNANCE: "governance",
  INTEGRATIONS: "integrations",
  SAAS: "saas",
  ACCOUNTING: "accounting",
  MARKETING: "marketing",
  REPORTS: "reports",
} as const;

export type ModuleType = (typeof MODULES)[keyof typeof MODULES];

export const MODULE_OPTIONS = [
  { value: MODULES.POS, label: "POS System" },
  { value: MODULES.ERP, label: "Enterprise Resource Planning (ERP)" },
  { value: MODULES.HRM, label: "Human Resource Management (HRM)" },
  { value: MODULES.COMMERCE, label: "E-Commerce / Commerce" },
  { value: MODULES.CRM, label: "CRM Suite" },
  { value: MODULES.LOGISTICS, label: "Logistics & Supply Chain" },
  { value: MODULES.ACCOUNTING, label: "Accounting & Finance" },
  { value: MODULES.MARKETING, label: "Marketing Automation" },
  { value: MODULES.REPORTS, label: "Reports & Analytics" },
  { value: MODULES.GOVERNANCE, label: "Governance & Compliance" },
  { value: MODULES.INTEGRATIONS, label: "Third-Party Integrations" },
  { value: MODULES.SAAS, label: "SaaS Platform Features" },
];

// Helper to filter modules based on context if needed
export const getModuleOptions = (exclude: ModuleType[] = []) => {
  return MODULE_OPTIONS.filter((opt) => !exclude.includes(opt.value));
};
