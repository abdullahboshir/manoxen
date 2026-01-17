/**
 * Platform Module Public API
 * Core infrastructure and global services.
 */

// Organization - BusinessUnit (most commonly used)
export * from "./organization/business-unit/core/business-unit.interface";

export { default as BusinessUnit } from "./organization/business-unit/core/business-unit.model";

// Staff (interface and model exist, no service)
export * from "./staff/staff.interface";
export * from "./staff/staff.model";

// Queue & Automation
export * from "./queue/queue.interface";
export * from "./queue/queue.service";

// Other exports can be added as needed when files are confirmed to exist
// Organization, Outlet, License, Package modules are available but not currently imported from outside

















