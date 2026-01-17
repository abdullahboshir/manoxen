/**
 * Catalog Module Public API
 * Handling Product Master Data.
 */

// Core Product
export * from "./product/domain/product-core/product.interface";
export * from "./product/domain/product-core/product.adapter";
// Product model and service are now internal to Catalog

// Shared Product Features (Shared across domains)
export type { InventoryBase, PhysicalProperties, SEOData, TaxConfiguration, BundleProduct, ProductStatus, ProductAttributes, RatingSummary, RatingDistribution, DeliveryOptions } from "./product/product-shared/product-shared.interface";
export { InventoryBaseSchema, PhysicalPropertiesSchema, SEOSchema, TaxConfigurationSchema, BundleProductSchema, ProductStatusSchema, ProductAttributesSchema, RatingSummarySchema, DeliveryOptionsSchema, RatingDistributionSchema } from "./product/product-shared/product-shared.model";

// Product Features (Pricing, Shipping, Warranty-Return, Inventory)
export * from "./product/features/product-pricing/product-pricing.interface";
export { ProductPricing } from "./product/features/product-pricing/product-pricing.model";
export * from "./product/features/product-shipping/product-shipping.interface";
export { ProductShipping } from "./product/features/product-shipping/product-shipping.model";
export * from "./product/features/product-warranty-return/product-warranty-return.interface";
export { ProductWarrantyReturn } from "./product/features/product-warranty-return/product-warranty-return.model";
export * from "./product/features/inventory/stock.interface";
export { Stock } from "./product/features/inventory/stock.model";

// Category
export * from "./category/category.interface";
export * from "./category/category.model";
export * from "./category/category.service";

// Brand
export * from "./brand/brand.interface";
export * from "./brand/brand.model";
export * from "./brand/brand.service";

// Tax
export * from "./tax/tax.interface";
export * from "./tax/tax.model";
export * from "./tax/tax.service";

// Unit
export * from "./unit/unit.interface";
export * from "./unit/unit.model";
export * from "./unit/unit.service";

// Warranty
export * from "./warranty/warranty.interface";
export * from "./warranty/warranty.model";
export * from "./warranty/warranty.service";

// Attribute & Attribute Group
export * from "./attribute/attribute.interface";
export * from "./attribute/attribute.model";
export * from "./attribute/attribute.service";
export * from "./attribute-group/attribute-group.interface";
export * from "./attribute-group/attribute-group.model";
export * from "./attribute-group/attribute-group.service";

// Routes (Exported for Backend consumption)
export { productRoutes } from "./product/domain/product-core/product.routes";
export { categoryRoutes } from "./category/category.routes";
export { BrandRoutes } from "./brand/brand.routes";
export { UnitRoutes } from "./unit/unit.routes";
export { TaxRoutes } from "./tax/tax.routes";
export { attributeRoutes } from "./attribute/attribute.routes";
export { AttributeGroupRoutes } from "./attribute-group/attribute-group.routes";
export { WarrantyRoutes } from "./warranty/warranty.routes";




