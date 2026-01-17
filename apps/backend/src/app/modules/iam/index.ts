/**
 * IAM Module Public API
 * This index bridges backend-specific implementations with core IAM logic.
 */

// Core Types & Constants (Re-exported from centralized package)
export * from '@manoxen/iam-core';

// Backend Implementations (Entities, Services, Models)

// User
export { 
  getUsersService, 
  getSingleUserService, 
  updateUserService, 
  deleteUserService,
  updateProfileService,
  getUserSettingsService,
  updateUserSettingsService
} from "./user/user.service";
export { User } from "./user/user.model";
export { UserBusinessAccess } from "./user-business-access/user-business-access.model";


// Role
export { roleService } from "./role/role.service";
export { Role } from "./role/role.model";


// Permission
export { permissionService, PermissionService } from "./permission/permission.service";
export { Permission } from "./permission/permission.model";









