import { categoryRoutes } from "./category.routes";
import { Router } from "express";

const router = Router();

router.use("/", categoryRoutes);

export default router;













