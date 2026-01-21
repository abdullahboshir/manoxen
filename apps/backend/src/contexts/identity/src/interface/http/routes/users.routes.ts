import { permissionRoutes } from "./permission.routes";
import { roleRoutes } from "./role.routes";
import { userRoutes } from "./user.routes";
import { Router } from "express";


const router = Router();

router.use("/permissions", permissionRoutes);
router.use("/roles", roleRoutes);
router.use("/", userRoutes);





export const userGroupRoutes = router;















