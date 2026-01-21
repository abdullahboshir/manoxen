/**
 * IAM Module Public API
 * This index bridges backend-specific implementations with core IAM logic.
 */

// Core Types & Constants (Re-exported from centralized package)
export * from '@manoxen/iam-core';

// Backend Implementations (Services, Models)
export * from "./application";

// Infrastructure Models (Aliases for direct access)
export { User } from "./infrastructure/persistence/mongoose/user.model";
export { UserBusinessAccess } from "./infrastructure/persistence/mongoose/user-business-access.model";
export { Role } from "./infrastructure/persistence/mongoose/role.model";
export { Permission } from "./infrastructure/persistence/mongoose/permission.model";
export { PermissionGroup } from "./infrastructure/persistence/mongoose/permission-group.model";

// Utils
export { genereteCustomerId } from "./application/services/user.utils";

// Routes
export { authRoutes } from "./interface/http/routes/auth.routes";
export { userRoutes } from "./interface/http/routes/user.routes";
export { roleRoutes } from "./interface/http/routes/role.routes";
export { permissionRoutes } from "./interface/http/routes/permission.routes";
export { PermissionGroupRoutes } from "./interface/http/routes/permission-group.routes";

// Middleware
export { authMiddleware, adminAuthMiddleware } from "./interface/http/middleware";

// Seeders
export { runRolePermissionSeeder } from "./infrastructure/seeders/index";


