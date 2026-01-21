import { Router } from "express";

// import businessAdminRoutes from "./vendor";

import { authGroupRoutes } from "./auth/auth.routes";
import { adminGroupRoutes } from "./admin.routes";
import { customerGroupRoutes } from "./customer.routes";
import { publicGroupRoutes } from "./public.routes";

// System & Organization
// Note: Package and License routes were missing - I'll mount them from @manoxen/system if available
// For now, I'll keep the imports but update them to @manoxen/organization/src/... if they are found later
// import { PackageRoutes } from "@manoxen/organization/interface/http/routes/package.routes";
// import { LicenseRoutes } from "@manoxen/organization/interface/http/routes/license.routes";

import { userRoutes } from "@manoxen/iam";

// Domain Routes
import { DepartmentRoutes, AttendanceRoutes, LeaveRoutes } from "@manoxen/hrm";
import { ShareholderRoutes } from "@manoxen/legal";
import { VotingRoutes } from "@manoxen/corporate";
import { MeetingRoutes } from "@manoxen/ops";
import { ComplianceRoutes } from "@manoxen/governance";

import { authMiddleware as auth } from "@manoxen/iam";
import { USER_ROLE } from "@manoxen/iam-core";
import { contextGuard } from "@manoxen/iam-core/src/middlewares/contextGuard";
import { requireModule, contextMiddleware } from "@manoxen/infra-common";
import { queryContext } from "@manoxen/iam-core/src/middlewares/queryContext";

import { auditMiddleware } from "@manoxen/system";
import { OrganizationRoutes } from "#domain/organization/index.js";

const router = Router();

// ========================================================================
// 🔓 PUBLIC ROUTES
// ========================================================================
router.use("/auth", authGroupRoutes);
router.use("/public", publicGroupRoutes);

// ========================================================================
// 🛡️ GLOBAL OPERATIONAL SECURITY LAYER (Centralized)
// ========================================================================
// Initialize Context first, then Auth, then Audit.
router.use(contextMiddleware); 
router.use(auth());            
router.use(queryContext());    
router.use(auditMiddleware);   

router.use("/super-admin", adminGroupRoutes);
router.use("/platform", adminGroupRoutes); // Alias for frontend compatibility 
router.use("/customer", customerGroupRoutes);
router.use("/user", userRoutes); // Profile, Settings, etc.
// router.use("/platform/packages", PackageRoutes);
// router.use("/platform/licenses", LicenseRoutes);
router.use("/enterprise/organizations", OrganizationRoutes);

// HRM Module - Licensed & Context Guarded
router.use("/hrm/departments", requireModule('hrm'), contextGuard(), DepartmentRoutes);
router.use("/hrm/attendance", requireModule('hrm'), contextGuard(), AttendanceRoutes);
router.use("/hrm/leave", requireModule('hrm'), contextGuard(), LeaveRoutes);

// Governance Module - Licensed & Context Guarded
router.use("/enterprise/legal/shareholders", requireModule('governance'), contextGuard(), ShareholderRoutes);
router.use("/enterprise/corporate/voting", requireModule('governance'), contextGuard(), VotingRoutes);
router.use("/enterprise/operations/meetings", requireModule('governance'), contextGuard(), MeetingRoutes);
router.use("/governance/compliance", requireModule('governance'), contextGuard(), ComplianceRoutes);
router.use("/governance/compliance", requireModule('governance'), contextGuard(), ComplianceRoutes);

export const v1Routes = router;





















