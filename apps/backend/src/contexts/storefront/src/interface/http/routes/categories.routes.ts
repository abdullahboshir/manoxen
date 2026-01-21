
import { categoryRoutes } from "@manoxen/catalog/index";
import { Router } from "express";



const router = Router();

router.use("/", categoryRoutes);


export default router;




















