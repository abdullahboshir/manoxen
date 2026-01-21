import { authRoutes } from "@manoxen/iam/interface/http/routes/auth.routes";
import { Router } from "express";

const router = Router();

router.use("/", authRoutes);

export const authGroupRoutes = router;















