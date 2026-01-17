
import { productRoutes } from "@manoxen/catalog";
import { Router } from "express";



const router = Router();

router.use("/products", productRoutes);

export default router;















