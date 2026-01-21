/**
 * Supply Module Public API
 */

// Domain Entities
export * from "./domain/entities/stock.entity";

// Application Services & Adapters
export * from "./application/services/stock.service";
export { inventoryAdapter } from "./application/adapters/inventory.adapter";

// Infrastructure Models
export * from "./infrastructure/persistence/mongoose/stock.model";
export * from "./infrastructure/persistence/mongoose/purchase.model";

// Routes
export { InventoryRoutes } from "./interface/http/routes/inventory.routes";
export { SupplierRoutes } from "./interface/http/routes/supplier.routes";
export { PurchaseRoutes } from "./interface/http/routes/purchase.routes";
