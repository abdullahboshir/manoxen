/**
 * HRM Module Public API
 * Human Resource Management.
 */

// Domain Entities
export * from "./domain/entities/attendance.entity";
export * from "./domain/entities/shift.entity";
export * from "./domain/entities/asset-category.entity";
export * from "./domain/entities/asset.entity";
export * from "./domain/entities/department.entity";
export * from "./domain/entities/designation.entity";
export * from "./domain/entities/leave-type.entity";
export * from "./domain/entities/leave.entity";

// Application Services
export * from "./application/services/attendance.service";
export * from "./application/services/leave.service";

// Infrastructure Models
export * from "./infrastructure/persistence/mongoose/attendance.model";
export * from "./infrastructure/persistence/mongoose/shift.model";
export * from "./infrastructure/persistence/mongoose/asset-category.model";
export * from "./infrastructure/persistence/mongoose/department.model";
export * from "./infrastructure/persistence/mongoose/designation.model";
export * from "./infrastructure/persistence/mongoose/leave-type.model";
export * from "./infrastructure/persistence/mongoose/leave.model";

// Routes
export { AttendanceRoutes } from "./interface/http/routes/attendance.routes";
export { LeaveRoutes } from "./interface/http/routes/leave.routes";
export { PayrollRoutes } from "./interface/http/routes/payroll.routes";
export { DepartmentRoutes } from "./interface/http/routes/department.routes";
export { DesignationRoutes } from "./interface/http/routes/designation.routes";
export { AssetRoutes } from "./interface/http/routes/asset.routes";
