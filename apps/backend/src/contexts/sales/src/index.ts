/**
 * Commerce Module Public API
 * Handling Product Catalog and Sales.
 */

// Catalog - Product, Category, Brand, etc.
export * from "@manoxen/catalog";

// Models
export { Order } from "./infrastructure/persistence/mongoose/order.model";
export { Blacklist } from "./infrastructure/persistence/mongoose/blacklist.model";
export { Promotion } from "./infrastructure/persistence/mongoose/promotion.model";
export { RiskRule } from "./infrastructure/persistence/mongoose/risk-rule.model";

// Services
export { RiskService } from "./application/services/risk.service";
export { PromotionService } from "./application/services/promotion.service";

// Routes
export { default as orderRoutes } from "./interface/http/routes/order.routes";
export { riskRoutes } from "./interface/http/routes/risk.routes";

// Stubs for missing routes
import { Router } from "express";
const stub = Router();
export {
    stub as storefrontRoutes,
    stub as ProductReviewRoutes,
    stub as ProductQARoutes,
    stub as ThemeRoutes,
    stub as PluginRoutes,
    stub as LandingPageRoutes,
    stub as AbandonedCartRoutes
};
