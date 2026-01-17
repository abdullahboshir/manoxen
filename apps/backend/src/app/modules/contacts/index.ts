/**
 * Contacts Module Public API
 * Customer and Supplier relationship management.
 */

// Customers
export * from "./customers/customer.interface";
export * from "./customers/customer.service";
export { default as Customer } from "./customers/customer.model";
export * from "./customers/customer.validation";

// Suppliers - Not currently used cross-module
// export * from "./suppliers/supplier.interface";
// export * from "./suppliers/supplier.service";

















