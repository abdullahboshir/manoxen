/**
 * HRM Module Public API
 * Human Resource Management.
 */

// NOTE: These are available if needed cross-module
// Currently only used internally within HRM

// Uncomment when cross-module usage is confirmed:
// export * from "./attendance/attendance.interface";
// export * from "./leave/leave.interface";
// export * from "./payroll/payroll.interface";

// Routes
export { AttendanceRoutes } from "./attendance/attendance.routes";
export { LeaveRoutes } from "./leave/leave.routes";
export { PayrollRoutes } from "./payroll/payroll.routes";
export { DepartmentRoutes } from "./department/department.routes";
export { DesignationRoutes } from "./designation/designation.routes";
export { AssetRoutes } from "./asset/asset.routes";






