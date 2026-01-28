import { APP_MODULES } from "../module-registry";
import { RESOURCE_KEYS } from "../permission-keys";
import { Users } from "lucide-react";

export const organizationMenu = [
  APP_MODULES.DASHBOARD,
  {
    title: "Governance",
    path: "governance",
    icon: Users,
    module: "governance",
    resource: RESOURCE_KEYS.SHAREHOLDER,
    children: [
      {
        title: "Shareholders",
        path: "governance/shareholders",
        resource: RESOURCE_KEYS.SHAREHOLDER,
      },
      {
        title: "Board Meetings",
        path: "governance/meetings",
        resource: RESOURCE_KEYS.MEETING,
      },
      {
        title: "Compliance",
        path: "governance/compliance",
        resource: RESOURCE_KEYS.COMPLIANCE,
      },
    ],
  },
  { ...APP_MODULES.BUSINESS_UNITS, path: "business-units" },
  {
    title: "Organization Access",
    path: "user-management",
    icon: Users,
    children: [
      { title: "Business Admins", path: "user-management/business-users" },
      {
        title: "Roles & Permissions",
        path: "user-management/business-roles",
      },
    ],
  },
  {
    ...APP_MODULES.FINANCE,
    title: "Organization Finance",
    children: [
      { title: "Revenue Summary", path: "finance/revenue" },
      {
        title: "Subscriptions",
        path: "finance/subscriptions",
        resource: RESOURCE_KEYS.SUBSCRIPTION,
      },
      { title: "Invoices", path: "finance/invoices" },
    ],
  },
  APP_MODULES.REPORTS,
  { ...APP_MODULES.ORGANIZATION_SETTINGS, title: "Organization Settings" },
];
