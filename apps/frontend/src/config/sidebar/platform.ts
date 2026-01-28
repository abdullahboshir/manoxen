import { APP_MODULES } from "../module-registry";
import { RESOURCE_KEYS } from "../permission-keys";
import { DollarSign, BarChart3, Users } from "lucide-react";

export const platformMenu = [
  APP_MODULES.DASHBOARD,
  APP_MODULES.ORGANIZATIONS,
  {
    title: "SaaS Finance",
    path: "finance",
    icon: DollarSign,
    module: "platform",
    children: [
      {
        title: "Subscriptions",
        path: "finance/subscriptions",
        resource: RESOURCE_KEYS.SUBSCRIPTION,
      },
      {
        title: "Platform Payments",
        path: "finance/payments",
        resource: RESOURCE_KEYS.PAYMENT,
      },
      {
        title: "Revenue Analytics",
        path: "finance/revenue",
        resource: RESOURCE_KEYS.ANALYTICS_REPORT,
      },
    ],
  },
  APP_MODULES.PACKAGES,
  {
    ...APP_MODULES.USER_MANAGEMENT,
    children: [
      {
        title: "Platform Users",
        path: "user-management/platform-users",
      },
      {
        title: "Platform Roles",
        path: "user-management/platform-roles",
      },
    ],
  },
  APP_MODULES.SUPPORT,
  {
    title: "Platform Reports",
    path: "reports",
    icon: BarChart3,
    module: "platform",
    children: [
      {
        title: "Organization Analytics",
        path: "reports/organizations",
        resource: RESOURCE_KEYS.ANALYTICS_REPORT,
      },
      {
        title: "Usage Statistics",
        path: "reports/usage",
        resource: RESOURCE_KEYS.REPORT,
      },
      {
        title: "Platform Health",
        path: "reports/health",
        resource: RESOURCE_KEYS.REPORT,
      },
    ],
  },
  APP_MODULES.INTEGRATIONS,
  APP_MODULES.NOTIFICATIONS,
  APP_MODULES.PLATFORM_SETTINGS,
  APP_MODULES.SYSTEM,
];
