import { Router } from "express";
import { authMiddleware } from "@manoxen/iam";
import { USER_ROLE } from "@manoxen/iam-core";

const router = Router();

router.use(authMiddleware(USER_ROLE.SUPER_ADMIN, USER_ROLE.ORGANIZATION_OWNER));

router.get("/", (req, res) => {
    res.json({ message: "Supplier API Stub" });
});

export const SupplierRoutes = router;
