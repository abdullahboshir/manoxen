export const APP_MODULES = [
  "pos",
  "erp",
  "hrm",
  "commerce",
  "crm",
  "logistics",
  "accounting",
  "reports",
  "integrations",
  "governance",
  "saas",
  "api_access",
  "marketing", // Included as it was seen in some enums
  "system", // Internal/System level module
] as const;

export type AppModule = (typeof APP_MODULES)[number];

export const APP_MODULE_LIST = [...APP_MODULES];
