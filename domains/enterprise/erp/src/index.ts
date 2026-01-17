/**
 * ERP Module Public API
 * Core back-office operations.
 */

// Inventory
export * from "./inventory/stock/stock.interface";
export * from "./inventory/stock/stock.model";
export * from "./inventory/stock/stock.service";
export * from "./inventory/inventory.adapter";

// Purchase
export * from "./purchase/purchase.interface";
export * from "./purchase/purchase.service";
export * from "./purchase/purchase.model";

// Routes
export { SupplierRoutes } from "./suppliers/supplier/supplier.routes.js";
export { PurchaseRoutes } from "./purchase/purchase.routes.js";
export { InventoryRoutes } from "./inventory/inventory.routes.js";
export { SalesReportRoutes } from "./reports/sales-report/sales-report.routes.js";
export { PurchaseReportRoutes } from "./reports/purchase-report/purchase-report.routes.js";
export { StockReportRoutes } from "./reports/stock-report/stock-report.routes.js";
export { ProfitLossRoutes } from "./reports/profit-loss/profit-loss.routes.js";
export { logisticsRoutes } from "./logistics/logistics.routes.js";
export { AccountRoutes } from "./accounting/accounts/accounts.routes.js";
export { TransactionRoutes } from "./accounting/transactions/transaction.routes.js";
export { BudgetRoutes } from "./accounting/budgets/budget.routes.js";


// Suppliers - May not exist with this exact path
// export * from "./suppliers/suppliers.interface";
// export * from "./suppliers/suppliers.service";




