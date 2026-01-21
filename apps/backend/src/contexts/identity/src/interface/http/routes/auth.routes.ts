import { Router } from "express";

import { loginZodSchema, setupPasswordZodSchema, resendSetupInvitationZodSchema } from "@manoxen/iam-core";
import { authMeController, loginController, logoutController, refreshTokenController, setupPasswordController, resendSetupInvitationController } from "../controllers/auth.controller";
import type { AnyZodObject } from "zod/v3";
import { validateRequest } from "@manoxen/core-util";
import auth from "../middleware";
import { USER_ROLE_ARRAY } from "@manoxen/iam-core";



const router = Router();


router.post('/login', validateRequest(loginZodSchema as unknown as AnyZodObject), loginController)

router.post(
  '/refresh-token',
  refreshTokenController
)

router.get('/me', auth(...USER_ROLE_ARRAY), authMeController)
router.post('/logout', logoutController)

// Public endpoint for new Organization Owners to set their initial password
router.post('/setup-password', validateRequest(setupPasswordZodSchema as unknown as AnyZodObject), setupPasswordController)

// Re-send invitation if expired
router.post('/resend-setup-invitation', validateRequest(resendSetupInvitationZodSchema as unknown as AnyZodObject), resendSetupInvitationController)



export const authRoutes = router; 

















