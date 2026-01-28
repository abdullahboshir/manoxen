import { APP_MODULES, ROUTE_PATHS } from "../module-registry";
import { RESOURCE_KEYS, ACTION_KEYS } from "../permission-keys";
import { Users, CreditCard, Settings } from "lucide-react";

export const businessUnitMenu = [
  APP_MODULES.DASHBOARD,
  {
    ...APP_MODULES.POS_CONFIG,
    title: "POS Overview",
    badge: undefined,
  },
  { ...APP_MODULES.OUTLETS, module: "pos" },
  {
    ...APP_MODULES.CATALOG,
    module: "erp",
    children: [
      { title: "All Products", path: ROUTE_PATHS.CATALOG.PRODUCT.ROOT },
      {
        title: "Add Product",
        path: ROUTE_PATHS.CATALOG.PRODUCT.ADD,
        action: ACTION_KEYS.CREATE,
      },
      {
        title: "Categories",
        path: ROUTE_PATHS.CATALOG.CATEGORY,
        resource: RESOURCE_KEYS.CATEGORY,
      },
      {
        title: "Brands",
        path: ROUTE_PATHS.CATALOG.BRAND,
        resource: RESOURCE_KEYS.BRAND,
      },
      {
        title: "Units",
        path: ROUTE_PATHS.CATALOG.UNIT,
        resource: RESOURCE_KEYS.UNIT,
      },
      {
        title: "Attributes",
        path: ROUTE_PATHS.CATALOG.ATTRIBUTE,
        resource: RESOURCE_KEYS.ATTRIBUTE,
      },
      {
        title: "Attribute Groups",
        path: ROUTE_PATHS.CATALOG.ATTRIBUTE_GROUP,
        resource: RESOURCE_KEYS.ATTRIBUTE_GROUP,
      },
      {
        title: "Warranties",
        path: ROUTE_PATHS.CATALOG.WARRANTY,
        resource: RESOURCE_KEYS.WARRANTY,
      },
      {
        title: "Tax",
        path: ROUTE_PATHS.CATALOG.TAX,
        resource: RESOURCE_KEYS.TAX,
      },
    ],
  },
  {
    ...APP_MODULES.INVENTORY,
    module: "erp",
    children: [
      { title: "Stock Levels", path: ROUTE_PATHS.INVENTORY.ROOT },
      {
        title: "Purchases",
        path: ROUTE_PATHS.INVENTORY.PURCHASE,
        resource: RESOURCE_KEYS.PURCHASE,
      },
      {
        title: "Adjustments",
        path: ROUTE_PATHS.INVENTORY.ADJUSTMENTS,
        action: ACTION_KEYS.UPDATE,
      },
      { title: "Stock Ledger", path: ROUTE_PATHS.INVENTORY.LEDGER },
      {
        title: "Warehouses",
        path: ROUTE_PATHS.INVENTORY.WAREHOUSES,
        resource: RESOURCE_KEYS.WAREHOUSE,
      },
      {
        title: "Transfers",
        path: ROUTE_PATHS.INVENTORY.TRANSFERS,
        resource: RESOURCE_KEYS.TRANSFER,
        action: ACTION_KEYS.CREATE,
      },
      {
        title: "Suppliers",
        path: ROUTE_PATHS.SUPPLIERS.ROOT,
        resource: RESOURCE_KEYS.SUPPLIER,
      },
      {
        title: "Logistics",
        path: ROUTE_PATHS.LOGISTICS.ROOT,
        resource: RESOURCE_KEYS.COURIER,
      },
    ],
  },
  {
    ...APP_MODULES.SALES,
    title: "Sales & Orders",
    icon: CreditCard,
    module: "erp",
    children: [
      {
        title: "All Orders",
        path: ROUTE_PATHS.SALES.ROOT,
        resource: RESOURCE_KEYS.ORDER,
      },
      {
        title: "Returns",
        path: ROUTE_PATHS.SALES.RETURNS,
        resource: RESOURCE_KEYS.RETURN,
      },
      {
        title: "Shipping",
        path: ROUTE_PATHS.SALES.SHIPPING,
        resource: RESOURCE_KEYS.SHIPPING,
      },
      {
        title: "Invoices",
        path: ROUTE_PATHS.SALES.INVOICES,
        resource: RESOURCE_KEYS.INVOICE,
      },
    ],
  },
  { ...APP_MODULES.STOREFRONT, title: "E-Commerce", module: "commerce" },
  {
    ...APP_MODULES.CUSTOMERS,
    title: "CRM & Customers",
    module: "crm",
    children: [
      { title: "Customer List", path: ROUTE_PATHS.CUSTOMERS.ROOT },
      {
        title: "Add Customer",
        path: ROUTE_PATHS.CUSTOMERS.NEW,
        action: ACTION_KEYS.CREATE,
      },
      {
        title: "Loyalty Program",
        path: ROUTE_PATHS.CUSTOMERS.LOYALTY,
        resource: RESOURCE_KEYS.LOYALTY,
      },
      {
        title: "Subscriptions",
        path: ROUTE_PATHS.CUSTOMERS.SUBSCRIPTIONS,
        resource: RESOURCE_KEYS.SUBSCRIPTION,
      },
      {
        title: "Marketing",
        path: ROUTE_PATHS.MARKETING.ROOT,
        resource: RESOURCE_KEYS.PROMOTION,
      },
      {
        title: "Support Tickets",
        path: ROUTE_PATHS.SUPPORT.ROOT,
        resource: RESOURCE_KEYS.TICKET,
      },
    ],
  },
  { ...APP_MODULES.HRM, module: "hrm" },
  {
    title: "User Management",
    path: "user-management",
    icon: Users,
    children: [
      {
        title: "Staff / Users",
        path: "user-management/business-users",
        resource: RESOURCE_KEYS.STAFF,
        action: ACTION_KEYS.MANAGE,
      },
      {
        title: "Business Roles",
        path: "user-management/business-roles",
        resource: RESOURCE_KEYS.ROLE,
      },
    ],
  },
  {
    ...APP_MODULES.FINANCE,
    module: "finance",
    children: [
      ...(APP_MODULES.FINANCE.children || []),
      ...(APP_MODULES.ACCOUNTING.children || []),
    ],
  },
  APP_MODULES.REPORTS,
  {
    ...APP_MODULES.BUSINESS_SETTINGS,
    title: "Setup & Settings",
    children: [
      {
        title: "Business Settings",
        path: "business-settings?tab=overview",
        resource: RESOURCE_KEYS.BUSINESS_SETTING,
      },
      {
        title: "POS Configuration",
        path: "business-settings?tab=pos",
        resource: RESOURCE_KEYS.TERMINAL,
      },
      {
        title: "Outlet Settings",
        path: "outlet-settings",
        resource: RESOURCE_KEYS.OUTLET_SETTING,
      },
      {
        title: "Integrations",
        path: "integrations",
        resource: RESOURCE_KEYS.SYSTEM_CONFIG,
        module: "integrations",
      },
    ],
  },
];
