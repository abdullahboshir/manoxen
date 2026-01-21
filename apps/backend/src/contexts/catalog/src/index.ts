/**
 * Catalog Module Public API
 * Handling Product Master Data.
 */

export { manifest as domainManifest } from "./domain-manifest";

// Domain Layer
export * from "./domain";

// Application Layer
export * from "./application";

// Infrastructure Models (Mongoose)
export * from "./infrastructure/persistence/mongoose/product.model";
export * from "./infrastructure/persistence/mongoose/category.model";
export * from "./infrastructure/persistence/mongoose/brand.model";
export * from "./infrastructure/persistence/mongoose/tax.model";
export * from "./infrastructure/persistence/mongoose/unit.model";
export * from "./infrastructure/persistence/mongoose/warranty.model";
export * from "./infrastructure/persistence/mongoose/attribute.model";
export * from "./infrastructure/persistence/mongoose/attribute-group.model";

// Feature Models (Internal references but often exposed for complex queries)
// export * from "./infrastructure/persistence/mongoose/features/inventory/stock.model";
export * from "./infrastructure/persistence/mongoose/features/product-pricing/product-pricing.model";
export * from "./infrastructure/persistence/mongoose/features/product-shipping/product-shipping.model";
export * from "./infrastructure/persistence/mongoose/features/product-details/product-details.model";
export * from "./infrastructure/persistence/mongoose/features/product-variant/product-variant.model";
export * from "./infrastructure/persistence/mongoose/features/product-warranty-return/product-warranty-return.model";

// Shared Models
export * from "./infrastructure/persistence/mongoose/product-shared.model";

// Routes (Exported for Backend consumption)
export { productRoutes } from "./interface/http/routes/product.routes";
export { categoryRoutes } from "./interface/http/routes/category.routes";
export { BrandRoutes } from "./interface/http/routes/brand.routes";
export { UnitRoutes } from "./interface/http/routes/unit.routes";
export { TaxRoutes } from "./interface/http/routes/tax.routes";
export { attributeRoutes } from "./interface/http/routes/attribute.routes";
export { attributeGroupRoutes as AttributeGroupRoutes } from "./interface/http/routes/attribute-group.routes";
export { WarrantyRoutes } from "./interface/http/routes/warranty.routes";
