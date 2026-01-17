import { categoryRoutes } from "#domain/catalog/category/category.routes";
import { Router } from "express";

const router = Router();

router.use("/", categoryRoutes);

export default router;













