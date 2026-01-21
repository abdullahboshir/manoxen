export { ProfitLossRoutes } from "./interface/http/routes/profit-loss.routes";
export { dashboardRoutes as DashboardRoutes } from "./interface/http/routes/dashboard.routes";

// Stubs for missing routes
import { Router } from "express";
const stub = Router();
export { stub as SalesReportRoutes, stub as PurchaseReportRoutes, stub as StockReportRoutes };
