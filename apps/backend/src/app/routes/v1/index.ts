import { Router } from "express";

// import businessAdminRoutes from "./vendor";

import { authGroupRoutes } from "./auth/auth.routes";
import { adminGroupRoutes } from "./super-admin/index";
import { customerGroupRoutes } from "./customer/index";
import { publicGroupRoutes } from "./public/index";
import { PackageRoutes } from "#app/modules/platform/package/package.routes";
import { LicenseRoutes } from "#app/modules/platform/license/license.routes";
import { OrganizationRoutes } from "#app/modules/platform/organization/organization.routes";
import { userRoutes } from "#app/modules/iam/user/user.routes";
import { DepartmentRoutes } from "@manoxen/hrm/department/department.routes";
import { AttendanceRoutes } from "@manoxen/hrm/attendance/attendance.routes";
import { LeaveRoutes } from "@manoxen/hrm/leave/leave.routes";
import { ShareholderRoutes } from "@manoxen/governance/shareholder/shareholder.routes";
import { VotingRoutes } from "@manoxen/governance/voting/voting.routes";
import { MeetingRoutes } from "@manoxen/governance/meeting/meeting.routes";
import { ComplianceRoutes } from "@manoxen/governance/compliance/compliance.routes";

import requireModule from "#core/middleware/license.middleware";
import auth from "#core/middleware/auth";

import { auditMiddleware } from "#core/middleware/audit.middleware";
import contextMiddleware from "#core/middleware/context.middleware";
import { contextGuard, queryContext } from "#app/modules/iam/index";

const router = Router();

// ========================================================================
// ðŸ”“ PUBLIC ROUTES
// ========================================================================
router.use("/auth", authGroupRoutes);
router.use("/public", publicGroupRoutes);

// ========================================================================
// ðŸ›¡ï¸ GLOBAL OPERATIONAL SECURITY LAYER (Centralized)
// ========================================================================
// Initialize Context first, then Auth, then Audit.
router.use(contextMiddleware); 
router.use(auth());            
router.use(queryContext());    
router.use(auditMiddleware);   

router.use("/super-admin", adminGroupRoutes);
router.use("/customer", customerGroupRoutes);
router.use("/user", userRoutes); // Profile, Settings, etc.
router.use("/platform/packages", PackageRoutes);
router.use("/platform/licenses", LicenseRoutes);
router.use("/platform/organizations", OrganizationRoutes);

// HRM Module - Licensed & Context Guarded
router.use("/hrm/departments", requireModule('hrm'), contextGuard(), DepartmentRoutes);
router.use("/hrm/attendance", requireModule('hrm'), contextGuard(), AttendanceRoutes);
router.use("/hrm/leave", requireModule('hrm'), contextGuard(), LeaveRoutes);

// Governance Module - Licensed & Context Guarded
router.use("/governance/shareholders", requireModule('governance'), contextGuard(), ShareholderRoutes);
router.use("/governance/voting", requireModule('governance'), contextGuard(), VotingRoutes);
router.use("/governance/meetings", requireModule('governance'), contextGuard(), MeetingRoutes);
router.use("/governance/compliance", requireModule('governance'), contextGuard(), ComplianceRoutes);

export const v1Routes = router;



















