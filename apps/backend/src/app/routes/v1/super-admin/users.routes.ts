import { permissionRoutes } from "#app/modules/iam/permission/permission.routes";
import { roleRoutes } from "#app/modules/iam/role/role.routes";
import { userRoutes } from "#app/modules/iam/user/user.routes";
import { Router } from "express";


const router = Router();

router.use("/permissions", permissionRoutes);
router.use("/roles", roleRoutes);
router.use("/", userRoutes);





export const userGroupRoutes = router;















