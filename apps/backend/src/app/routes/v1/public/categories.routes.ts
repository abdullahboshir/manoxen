
import { categoryRoutes } from "#domain/catalog/index";
import { Router } from "express";



const router = Router();

router.use("/", categoryRoutes);


export default router;




















